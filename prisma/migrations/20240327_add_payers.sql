-- CreateEnum
CREATE TYPE "PayerType" AS ENUM ('INSURANCE', 'CASH', 'MEDICAID', 'MEDICARE');

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

-- Insert initial payers
INSERT INTO "Payer" (
    "id", 
    "name", 
    "displayName", 
    "type", 
    "networkName",
    "acceptedStates",
    "paymentMethods",
    "isActive", 
    "createdAt", 
    "updatedAt"
)
VALUES 
    (gen_random_uuid(), 'selecthealth', 'SelectHealth', 'INSURANCE', 'SelectHealth Network', ARRAY['UT'], ARRAY['Electronic Claims'], true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'optum_medicaid', 'Optum Medicaid', 'MEDICAID', 'Optum Network', ARRAY['UT'], ARRAY['Electronic Claims'], true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'aetna_first_health', 'Aetna/First Health Network', 'INSURANCE', 'First Health Network', ARRAY['UT'], ARRAY['Electronic Claims'], true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'first_health_aetna', 'First Health (Aetna Network)', 'INSURANCE', 'First Health Network', ARRAY['UT'], ARRAY['Electronic Claims'], true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'university_of_utah', 'University of Utah', 'INSURANCE', 'U of U Health Plans', ARRAY['UT'], ARRAY['Electronic Claims'], true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'motiv_health', 'Motiv Health', 'INSURANCE', 'Motiv Network', ARRAY['UT'], ARRAY['Electronic Claims'], true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'dmba', 'DMBA', 'INSURANCE', 'DMBA Network', ARRAY['UT'], ARRAY['Electronic Claims'], true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'molina', 'Molina', 'INSURANCE', 'Molina Healthcare', ARRAY['UT'], ARRAY['Electronic Claims'], true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'cash', 'Cash', 'CASH', NULL, ARRAY['UT'], ARRAY['Cash', 'Credit Card', 'HSA/FSA'], true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Migrate existing data from insuranceAccepted JSON field
-- Note: You'll need to write a data migration script to handle this if you have existing data 