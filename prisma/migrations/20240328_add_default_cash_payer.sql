-- Add cash payer to all providers that don't have it
INSERT INTO "ProviderPayer" ("providerId", "payerId", "createdAt", "updatedAt")
SELECT 
  p."id" as "providerId",
  c."id" as "payerId",
  CURRENT_TIMESTAMP as "createdAt",
  CURRENT_TIMESTAMP as "updatedAt"
FROM "Provider" p
CROSS JOIN (
  SELECT id FROM "Payer" WHERE name = 'cash' LIMIT 1
) c
WHERE NOT EXISTS (
  SELECT 1 
  FROM "ProviderPayer" pp 
  WHERE pp."providerId" = p."id" 
  AND pp."payerId" = c."id"
); 