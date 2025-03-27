/*
  Warnings:

  - You are about to drop the column `insuranceAccepted` on the `Provider` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PayerType" AS ENUM ('INSURANCE', 'CASH', 'MEDICAID', 'MEDICARE');

-- AlterTable
ALTER TABLE "Provider" DROP COLUMN "insuranceAccepted";

-- CreateTable
CREATE TABLE "Payer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "type" "PayerType" NOT NULL,
    "networkName" TEXT,
    "contactInfo" JSONB,
    "claimsAddress" TEXT,
    "electronicPayerId" TEXT,
    "effectiveDate" TIMESTAMP(3),
    "contractTerms" TEXT,
    "paymentMethods" TEXT[],
    "claimsRequirements" TEXT,
    "acceptedStates" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProviderPayer" (
    "providerId" TEXT NOT NULL,
    "payerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProviderPayer_pkey" PRIMARY KEY ("providerId","payerId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payer_name_key" ON "Payer"("name");

-- AddForeignKey
ALTER TABLE "ProviderPayer" ADD CONSTRAINT "ProviderPayer_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProviderPayer" ADD CONSTRAINT "ProviderPayer_payerId_fkey" FOREIGN KEY ("payerId") REFERENCES "Payer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
