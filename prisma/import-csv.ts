import { PrismaClient } from '@prisma/client'
import { parse } from 'csv-parse/sync'
import { readFileSync } from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function importProviders(csvPath: string) {
  try {
    const fileContent = readFileSync(csvPath, 'utf-8')
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    })

    for (const record of records) {
      const providerData = {
        firstName: record.firstName,
        lastName: record.lastName,
        personalEmail: record.personalEmail,
        phone: record.phone,
        title: record.title,
        languages: record.languages ? record.languages.split(',').map((l: string) => l.trim()) : [],
        bio: record.bio,
        photoUrl: record.photoUrl,
        availability: record.availability === 'true',
        medicalSchool: record.medicalSchool,
        residency: record.residency,
        residencyStartYear: record.residencyStartYear ? parseInt(record.residencyStartYear, 10) : null,
        residencyGradYear: record.residencyGradYear ? parseInt(record.residencyGradYear, 10) : null,
        personalBookingLink: record.personalBookingLink
      }

      await prisma.provider.create({
        data: providerData
      })
    }

    console.log('Successfully imported providers')
  } catch (error) {
    console.error('Error importing providers:', error)
    throw error
  }
}

async function main() {
  const csvPath = path.join(process.cwd(), 'data', 'providers.csv')
  await importProviders(csvPath)
  await prisma.$disconnect()
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
}) 