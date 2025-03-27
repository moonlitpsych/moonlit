-- Add sample education data for existing providers
INSERT INTO "Education" ("id", "providerId", "institution", "degree", "field", "startDate", "endDate", "createdAt", "updatedAt")
SELECT 
  gen_random_uuid(),
  p.id,
  CASE p.title
    WHEN 'MD' THEN 'University of Utah School of Medicine'
    WHEN 'DO' THEN 'Rocky Vista University College of Osteopathic Medicine'
    WHEN 'NP' THEN 'University of Utah College of Nursing'
    WHEN 'PA' THEN 'University of Utah Physician Assistant Program'
  END,
  p.title,
  'Medicine',
  '2015-01-01'::timestamp,
  '2019-01-01'::timestamp,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM "Provider" p
WHERE p.title IN ('MD', 'DO', 'NP', 'PA');

-- Add residency data for MD/DO providers
INSERT INTO "Education" ("id", "providerId", "institution", "degree", "field", "startDate", "endDate", "createdAt", "updatedAt")
SELECT 
  gen_random_uuid(),
  p.id,
  'Mayo Clinic',
  'Residency',
  'Psychiatry',
  '2019-01-01'::timestamp,
  '2023-01-01'::timestamp,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM "Provider" p
WHERE p.title IN ('MD', 'DO'); 