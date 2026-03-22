import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';
import AuthLayout from './layouts/AuthLayout';
import ErrorBoundary from './components/ErrorBoundary';
import AdminGuard from './components/AdminGuard';
import UserGuard from './components/UserGuard';

import HomePage from './pages/User/HomePage';
import SwipePage from './pages/User/SwipePage';
import ProfilePage from './pages/User/ProfilePage';
import ExplorePage from './pages/User/ExplorePage';
import ChatPage from './pages/User/ChatPage';
import SettingsPage from './pages/User/SettingsPage';
import ExploreCategoryPage from './pages/User/ExploreCategoryPage';
import DatePostsPage from './pages/User/DatePostsPage';
import MyDatesPage from './pages/User/MyDatesPage';
import WalletPage from './pages/User/WalletPage';
import PremiumPage from './pages/User/PremiumPage';

import Dashboard from './pages/Admin/Dashboard';
import UserManagement from './pages/Admin/UserManagement';
import Reports from './pages/Admin/Reports';

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import OnboardingPage from './pages/Auth/OnboardingPage';
import LandingPage from './pages/Auth/LandingPage';
import NotFound from './pages/NotFound';

// Legal pages
import TermsPage from './pages/Legal/TermsPage';
import PrivacyPage from './pages/Legal/PrivacyPage';
import FAQPage from './pages/Legal/FAQPage';
import SafetyPage from './pages/Legal/SafetyPage';

// Lazy loaded pages
const NotificationsPage = lazy(() => import('./pages/User/NotificationsPage'));
const MatchesPage = lazy(() => import('./pages/User/MatchesPage'));
const EventDetailPage = lazy(() => import('./pages/User/EventDetailPage'));
const VenueProfilePage = lazy(() => import('./pages/User/VenueProfilePage'));
const VerifyIdentityPage = lazy(() => import('./pages/User/VerifyIdentityPage'));
const RateExperiencePage = lazy(() => import('./pages/User/RateExperiencePage'));
const FirstDateGuidePage = lazy(() => import('./pages/User/FirstDateGuidePage'));
const MoodStatusPage = lazy(() => import('./pages/User/MoodStatusPage'));
const ReferralPage = lazy(() => import('./pages/User/ReferralPage'));
const AIMatchInsightsPage = lazy(() => import('./pages/User/AIMatchInsightsPage'));
const IceBreakerPage = lazy(() => import('./pages/User/IceBreakerPage'));
const AdvancedSettingsPage = lazy(() => import('./pages/User/AdvancedSettingsPage'));
const EscrowPaymentPage = lazy(() => import('./pages/User/EscrowPaymentPage'));
const QuestsPage = lazy(() => import('./pages/User/QuestsPage'));
const LeaderboardPage = lazy(() => import('./pages/User/LeaderboardPage'));
const MemoriesPage = lazy(() => import('./pages/User/MemoriesPage'));
const GiftShopPage = lazy(() => import('./pages/User/GiftShopPage'));

// Phase 5 pages
const BookingConfirmPage = lazy(() => import('./pages/User/BookingConfirmPage'));
const SplitPaymentPage = lazy(() => import('./pages/User/SplitPaymentPage'));
const EventTicketPage = lazy(() => import('./pages/User/EventTicketPage'));
const WaitlistPage = lazy(() => import('./pages/User/WaitlistPage'));
const SpotlightPage = lazy(() => import('./pages/User/SpotlightPage'));
const StorytellingPage = lazy(() => import('./pages/User/StorytellingPage'));
const HelpCenterPage = lazy(() => import('./pages/User/HelpCenterPage'));
const CommunityRulesPage = lazy(() => import('./pages/User/CommunityRulesPage'));

// Phase 6 pages
const FlashMeetPage = lazy(() => import('./pages/User/FlashMeetPage'));
const PersonalInsightsPage = lazy(() => import('./pages/User/PersonalInsightsPage'));
const ConciergePage = lazy(() => import('./pages/User/ConciergePage'));
const FoodPreferencePage = lazy(() => import('./pages/User/FoodPreferencePage'));

// Partner portal
const PartnerDashboard = lazy(() => import('./pages/Partner/PartnerDashboard'));
const ManageEvents = lazy(() => import('./pages/Partner/ManageEvents'));
const ManageMenu = lazy(() => import('./pages/Partner/ManageMenu'));
const VenueAnalytics = lazy(() => import('./pages/Partner/VenueAnalytics'));
const PromotionManager = lazy(() => import('./pages/Partner/PromotionManager'));
const GuestManager = lazy(() => import('./pages/Partner/GuestManager'));
const RevenueReport = lazy(() => import('./pages/Partner/RevenueReport'));

import './App.css';
import './index.css';

const Loading = () => (
  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ textAlign: 'center', color: '#505965' }}>Đang tải...</div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Landing */}
            <Route path="/" element={<LandingPage />} />

            {/* Auth */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
            </Route>

            {/* Legal pages (public) */}
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/safety" element={<SafetyPage />} />

            {/* User App */}
            <Route
              path="/app"
              element={
                <UserGuard>
                  <UserLayout />
                </UserGuard>
              }
            >
              <Route index element={<SwipePage />} />
              <Route path="home" element={<HomePage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="explore" element={<ExplorePage />} />
              <Route path="explore/:id" element={<ExploreCategoryPage />} />
              <Route path="chat" element={<ChatPage />} />
              <Route path="dates" element={<DatePostsPage />} />
              <Route path="dates/:category" element={<DatePostsPage />} />
              <Route path="my-dates" element={<MyDatesPage />} />
              <Route path="wallet" element={<WalletPage />} />
              <Route path="matches" element={<MatchesPage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="premium" element={<PremiumPage />} />
              <Route path="event/:id" element={<EventDetailPage />} />
              <Route path="venue/:id" element={<VenueProfilePage />} />
              <Route path="verify" element={<VerifyIdentityPage />} />
              <Route path="rate/:id" element={<RateExperiencePage />} />
              <Route path="guide" element={<FirstDateGuidePage />} />
              <Route path="mood" element={<MoodStatusPage />} />
              <Route path="referral" element={<ReferralPage />} />
              <Route path="ai-match/:id" element={<AIMatchInsightsPage />} />
              <Route path="icebreaker/:id" element={<IceBreakerPage />} />
              <Route path="advanced-settings" element={<AdvancedSettingsPage />} />
              <Route path="escrow/:id" element={<EscrowPaymentPage />} />
              <Route path="quests" element={<QuestsPage />} />
              <Route path="leaderboard" element={<LeaderboardPage />} />
              <Route path="memories" element={<MemoriesPage />} />
              <Route path="gifts" element={<GiftShopPage />} />
              <Route path="booking-confirm" element={<BookingConfirmPage />} />
              <Route path="split-payment/:id" element={<SplitPaymentPage />} />
              <Route path="ticket/:id" element={<EventTicketPage />} />
              <Route path="waitlist" element={<WaitlistPage />} />
              <Route path="spotlight" element={<SpotlightPage />} />
              <Route path="stories" element={<StorytellingPage />} />
              <Route path="help" element={<HelpCenterPage />} />
              <Route path="community-rules" element={<CommunityRulesPage />} />
              <Route path="flash-meet" element={<FlashMeetPage />} />
              <Route path="insights" element={<PersonalInsightsPage />} />
              <Route path="concierge" element={<ConciergePage />} />
              <Route path="food-preferences" element={<FoodPreferencePage />} />
            </Route>

            {/* Admin */}
            <Route
              path="/admin"
              element={
                <AdminGuard>
                  <AdminLayout />
                </AdminGuard>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="reports" element={<Reports />} />
            </Route>

            {/* Partner Portal */}
            <Route path="/partner" element={<UserGuard><UserLayout /></UserGuard>}>
              <Route index element={<PartnerDashboard />} />
              <Route path="events" element={<ManageEvents />} />
              <Route path="menu" element={<ManageMenu />} />
              <Route path="analytics" element={<VenueAnalytics />} />
              <Route path="promotions" element={<PromotionManager />} />
              <Route path="guests" element={<GuestManager />} />
              <Route path="revenue" element={<RevenueReport />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
