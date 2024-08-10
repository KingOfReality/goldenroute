-- CreateTable
CREATE TABLE "Mission" (
    "id" SERIAL NOT NULL,
    "planeIcao24" TEXT NOT NULL,
    "planeCountry" TEXT NOT NULL,
    "planeLatitude" DOUBLE PRECISION NOT NULL,
    "planeLongitude" DOUBLE PRECISION NOT NULL,
    "planeSpeed" DOUBLE PRECISION NOT NULL,
    "threatLatitude" DOUBLE PRECISION NOT NULL,
    "threatLongitude" DOUBLE PRECISION NOT NULL,
    "threatRadius" DOUBLE PRECISION NOT NULL,
    "threatSpeed" DOUBLE PRECISION NOT NULL,
    "closeTime" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Mission_pkey" PRIMARY KEY ("id")
);
