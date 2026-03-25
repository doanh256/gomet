import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth.js';

const prisma = new PrismaClient();
const router = Router();

// ============================================
// 1. GET /nearby-venues
//    Get venues near a location
//    Query: ?lat=10.77&lng=106.69&radius=5
// ============================================
router.get('/nearby-venues', async (req, res) => {
  try {
    const { lat, lng, radius = 5 } = req.query;

    const venues = await prisma.venue.findMany({
      orderBy: { rating: 'desc' },
    });

    if (lat && lng) {
      const userLat = parseFloat(lat);
      const userLng = parseFloat(lng);
      const maxRadius = parseFloat(radius);

      const venuesWithDistance = venues
        .map(venue => {
          const distance = venue.latitude && venue.longitude
            ? haversineDistance(userLat, userLng, venue.latitude, venue.longitude)
            : null;
          return { ...venue, distance };
        })
        .filter(v => v.distance !== null && v.distance <= maxRadius)
        .sort((a, b) => a.distance - b.distance);

      return res.json(venuesWithDistance);
    }

    // No coordinates: return all venues sorted by rating
    res.json(venues);
  } catch (err) {
    console.error('Error fetching nearby venues:', err);
    res.status(500).json({ error: 'Lỗi lấy danh sách quán gần đây' });
  }
});

// ============================================
// 2. GET /nearby-events
//    Get events near a location (upcoming only)
//    Query: ?lat=10.77&lng=106.69&radius=5
// ============================================
router.get('/nearby-events', async (req, res) => {
  try {
    const { lat, lng, radius = 5 } = req.query;

    const events = await prisma.event.findMany({
      where: { status: 'upcoming' },
      orderBy: { date: 'asc' },
    });

    if (lat && lng) {
      const userLat = parseFloat(lat);
      const userLng = parseFloat(lng);
      const maxRadius = parseFloat(radius);

      // Events linked to venues with coordinates
      const eventsWithVenues = await Promise.all(
        events.map(async (event) => {
          if (event.venueId) {
            const venue = await prisma.venue.findUnique({
              where: { id: event.venueId },
            });
            if (venue?.latitude && venue?.longitude) {
              const distance = haversineDistance(userLat, userLng, venue.latitude, venue.longitude);
              return { ...event, distance, venueLat: venue.latitude, venueLng: venue.longitude };
            }
          }
          return { ...event, distance: null };
        })
      );

      const nearbyEvents = eventsWithVenues
        .filter(e => e.distance !== null && e.distance <= maxRadius)
        .sort((a, b) => a.distance - b.distance);

      return res.json(nearbyEvents);
    }

    // No coordinates: return all upcoming events
    res.json(events);
  } catch (err) {
    console.error('Error fetching nearby events:', err);
    res.status(500).json({ error: 'Lỗi lấy sự kiện gần đây' });
  }
});

// ============================================
// 3. GET /nearby-users
//    Get active users nearby (Nearby Foodies)
//    Requires auth. Returns district/city only, not exact coords.
// ============================================
router.get('/nearby-users', authMiddleware, async (req, res) => {
  try {
    const currentUserId = req.user.id;

    // Get blocked user IDs
    const blocks = await prisma.block.findMany({
      where: {
        OR: [
          { blockerId: currentUserId },
          { blockedId: currentUserId },
        ],
      },
    });

    const blockedIds = new Set(
      blocks.map(b => b.blockerId === currentUserId ? b.blockedId : b.blockerId)
    );
    blockedIds.add(currentUserId); // exclude self

    const users = await prisma.user.findMany({
      where: {
        id: { notIn: [...blockedIds] },
        role: 'user',
        location: { not: null },
      },
      select: {
        id: true,
        name: true,
        avatar: true,
        location: true,
        bio: true,
        age: true,
        gender: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: 'desc' },
      take: 20,
    });

    // Return only district/city info, no exact coordinates
    const safeUsers = users.map(u => ({
      id: u.id,
      name: u.name,
      avatar: u.avatar,
      location: u.location,
      bio: u.bio ? u.bio.substring(0, 100) : null,
      age: u.age,
      gender: u.gender,
      lastActive: u.updatedAt,
    }));

    res.json(safeUsers);
  } catch (err) {
    console.error('Error fetching nearby users:', err);
    res.status(500).json({ error: 'Lỗi lấy người dùng lân cận' });
  }
});

// ============================================
// 4. GET /heatmap
//    Activity heatmap data by HCMC district
// ============================================
router.get('/heatmap', async (req, res) => {
  try {
    // Hardcoded HCMC districts with center coordinates and mock activity levels
    const districts = [
      { id: 'quan_1', name: 'Quận 1', lat: 10.7756, lng: 106.7019, activity: 95 },
      { id: 'quan_2', name: 'Quận 2 (Thủ Đức)', lat: 10.7868, lng: 106.7512, activity: 72 },
      { id: 'quan_3', name: 'Quận 3', lat: 10.7834, lng: 106.6868, activity: 88 },
      { id: 'quan_4', name: 'Quận 4', lat: 10.7578, lng: 106.7013, activity: 55 },
      { id: 'quan_5', name: 'Quận 5', lat: 10.7540, lng: 106.6633, activity: 65 },
      { id: 'quan_6', name: 'Quận 6', lat: 10.7480, lng: 106.6353, activity: 40 },
      { id: 'quan_7', name: 'Quận 7', lat: 10.7340, lng: 106.7217, activity: 78 },
      { id: 'quan_8', name: 'Quận 8', lat: 10.7242, lng: 106.6283, activity: 35 },
      { id: 'quan_10', name: 'Quận 10', lat: 10.7728, lng: 106.6669, activity: 70 },
      { id: 'quan_11', name: 'Quận 11', lat: 10.7614, lng: 106.6462, activity: 45 },
      { id: 'quan_12', name: 'Quận 12', lat: 10.8671, lng: 106.6413, activity: 30 },
      { id: 'binh_thanh', name: 'Bình Thạnh', lat: 10.8106, lng: 106.7091, activity: 82 },
      { id: 'phu_nhuan', name: 'Phú Nhuận', lat: 10.7989, lng: 106.6800, activity: 75 },
      { id: 'tan_binh', name: 'Tân Bình', lat: 10.8014, lng: 106.6492, activity: 58 },
      { id: 'tan_phu', name: 'Tân Phú', lat: 10.7904, lng: 106.6267, activity: 42 },
      { id: 'go_vap', name: 'Gò Vấp', lat: 10.8386, lng: 106.6652, activity: 50 },
      { id: 'binh_tan', name: 'Bình Tân', lat: 10.7652, lng: 106.6040, activity: 32 },
      { id: 'thu_duc', name: 'TP. Thủ Đức', lat: 10.8494, lng: 106.7537, activity: 68 },
    ];

    // Augment with real venue counts per district
    const venueCounts = await prisma.venue.groupBy({
      by: ['district'],
      _count: { id: true },
    });

    const venueMap = {};
    for (const vc of venueCounts) {
      venueMap[vc.district] = vc._count.id;
    }

    const heatmapData = districts.map(d => ({
      ...d,
      venueCount: venueMap[d.name] || 0,
    }));

    res.json(heatmapData);
  } catch (err) {
    console.error('Error fetching heatmap:', err);
    res.status(500).json({ error: 'Lỗi lấy dữ liệu heatmap' });
  }
});

// ============================================
// HELPERS
// ============================================

/**
 * Haversine formula to calculate distance between two coordinates in km
 */
function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 100) / 100; // round to 2 decimals
}

function toRad(deg) {
  return deg * (Math.PI / 180);
}

export default router;
