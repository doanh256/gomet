-- CreateTable
CREATE TABLE "Venue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL DEFAULT 'TP.HCM',
    "latitude" REAL,
    "longitude" REAL,
    "priceRange" TEXT,
    "rating" REAL NOT NULL DEFAULT 0,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "phone" TEXT,
    "openHours" TEXT,
    "images" TEXT,
    "tags" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "description" TEXT,
    "director" TEXT,
    "duration" INTEGER,
    "rating" REAL NOT NULL DEFAULT 0,
    "releaseDate" TEXT,
    "posterUrl" TEXT,
    "trailerUrl" TEXT,
    "isShowing" BOOLEAN NOT NULL DEFAULT true,
    "cinema" TEXT,
    "showTimes" TEXT,
    "price" INTEGER,
    "tags" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "venueId" TEXT,
    "venueName" TEXT,
    "address" TEXT,
    "date" DATETIME NOT NULL,
    "endDate" DATETIME,
    "price" INTEGER NOT NULL DEFAULT 0,
    "maxAttendees" INTEGER NOT NULL DEFAULT 50,
    "currentAttendees" INTEGER NOT NULL DEFAULT 0,
    "hostId" TEXT,
    "hostName" TEXT,
    "images" TEXT,
    "tags" TEXT,
    "status" TEXT NOT NULL DEFAULT 'upcoming',
    "isHot" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
