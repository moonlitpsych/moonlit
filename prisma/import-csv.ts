import { PrismaClient, Prisma } from '@prisma/client'
import { parse } from 'csv-parse/sync'
import fs from 'fs'

const prisma = new PrismaClient()

// Map of common insurance name variations to standardized names
const PAYER_NAME_MAP: Record<string, string> = {
  // Aetna variations
  'aetna': 'aetna',
  'AETNA': 'aetna',
  'Aetna': 'aetna',
  
  // DMBA variations
  'dmba': 'dmba',
  'DMBA': 'dmba',
  
  // First Health variations
  'First Health': 'first_health',
  'First Health (Aetna Network)': 'first_health',
  'First Health ( Aetna Network)': 'first_health',
  'First Health/Aetna': 'first_health',
  
  // Molina variations
  'molina': 'molina',
  'Molina': 'molina',
  'MOLINA': 'molina',
  'Molina Healthcare': 'molina',
  
  // Motiv Health variations
  'motiv': 'motiv',
  'Motiv': 'motiv',
  'Motiv Health': 'motiv',
  'MOTIV': 'motiv',
  
  // Optum variations
  'optum': 'optum',
  'Optum': 'optum',
  'OPTUM': 'optum',
  
  // SelectHealth variations
  'selecthealth': 'selecthealth',
  'SelectHealth': 'selecthealth',
  'Select Health': 'selecthealth',
  'SELECTHEALTH': 'selecthealth',
  
  // University of Utah variations
  'University of Utah': 'uofu',
  'U of U': 'uofu',
  'UofU': 'uofu',
  'U of U Health Plans': 'uofu',
  
  // Cash/Self-pay variations
  'cash': 'cash',
  'Cash': 'cash',
  'Self Pay': 'cash',
  'self pay': 'cash',
  'Self-Pay': 'cash',
  'HSA/FSA': 'cash'
}

async function importProvidersFromCSV(filePath: string) {
  try {
    // First, ensure all payers exist
    const existingPayers = await prisma.payer.findMany()
    const payerNames = new Set(existingPayers.map((p: { name: string }) => p.name))
    
    if (payerNames.size === 0) {
      throw new Error('No payers found in database. Please run prisma db seed first.')
    }

    // Read and parse CSV
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    })

    // Process each record
    for (const record of records) {
      // Convert string arrays from CSV to actual arrays
      const languages = record.languages ? record.languages.split(',').map((lang: string) => lang.trim()) : []
      const specialties = record.specialties ? record.specialties.split(',').map((spec: string) => spec.trim()) : []
      
      // Normalize insurance plans to known payer names
      const insurancePlans = record.insuranceAccepted 
        ? record.insuranceAccepted
            .split(',')
            .map((plan: string) => plan.trim())
            .map((plan: string) => PAYER_NAME_MAP[plan])
            .filter((plan: string | undefined) => Boolean(plan))
            .filter((plan: string) => payerNames.has(plan))
        : []

      // Create the provider
      await prisma.provider.create({
        data: {
          firstName: record.firstName,
          lastName: record.lastName,
          email: record.email,
          phone: record.phone,
          title: record.title,
          specialty: record.specialty,
          licenseNumber: record.licenseNumber,
          state: record.state,
          npi: record.npi,
          practiceName: record.practiceName,
          practiceAddress: record.practiceAddress,
          practicePhone: record.practicePhone,
          practiceEmail: record.practiceEmail,
          availability: record.acceptingPatients === 'true',
          selfPayRate: record.selfPayRate ? parseFloat(record.selfPayRate) : null,
          bio: record.bio,
          languages: languages,
          specialties: specialties,
          photoUrl: record.photoUrl,
          isActive: record.isActive === 'true',
          isVerified: record.isVerified === 'true',
          acceptedPayers: {
            create: insurancePlans.map((payerName: string) => ({
              payer: {
                connect: { name: payerName }
              }
            }))
          }
        } satisfies Prisma.ProviderCreateInput
      })
    }

    console.log('Successfully imported providers from CSV')
  } catch (error) {
    console.error('Error importing providers:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Get the CSV file path from command line argument
const csvPath = process.argv[2]
if (!csvPath) {
  console.error('Please provide the path to the CSV file')
  process.exit(1)
}

importProvidersFromCSV(csvPath) 