-- CreateTable
CREATE TABLE "Provider" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "title" TEXT,
    "specialty" TEXT,
    "licenseNumber" TEXT,
    "state" TEXT,
    "npi" TEXT,
    "practiceName" TEXT,
    "practiceAddress" TEXT,
    "practicePhone" TEXT,
    "practiceEmail" TEXT,
    "availability" BOOLEAN NOT NULL DEFAULT false,
    "insuranceAccepted" JSONB,
    "selfPayRate" DOUBLE PRECISION,
    "bio" TEXT,
    "languages" TEXT[],
    "specialties" TEXT[],
    "photoUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "personalBookingUrl" TEXT,

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certification" (
    "id" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "issuer" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Certification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Provider_email_key" ON "Provider"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Provider_licenseNumber_key" ON "Provider"("licenseNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Provider_npi_key" ON "Provider"("npi");

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certification" ADD CONSTRAINT "Certification_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
