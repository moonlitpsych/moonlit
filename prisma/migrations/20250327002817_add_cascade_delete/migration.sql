-- DropForeignKey
ALTER TABLE "ProviderPayer" DROP CONSTRAINT "ProviderPayer_payerId_fkey";

-- DropForeignKey
ALTER TABLE "ProviderPayer" DROP CONSTRAINT "ProviderPayer_providerId_fkey";

-- AddForeignKey
ALTER TABLE "ProviderPayer" ADD CONSTRAINT "ProviderPayer_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProviderPayer" ADD CONSTRAINT "ProviderPayer_payerId_fkey" FOREIGN KEY ("payerId") REFERENCES "Payer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
