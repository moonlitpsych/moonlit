import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type ProviderTitle = 'MD' | 'DO' | 'NP' | 'PA'

const SCHOOL_MAP: Record<ProviderTitle, string> = {
  'MD': 'University of Utah School of Medicine',
  'DO': 'Rocky Vista University College of Osteopathic Medicine',
  'NP': 'University of Utah College of Nursing',
  'PA': 'University of Utah Physician Assistant Program'
}

async function addEducation() {
  try {
    // Get all providers with MD, DO, NP, or PA titles
    const providers = await prisma.provider.findMany({
      where: {
        title: {
          in: Object.keys(SCHOOL_MAP)
        }
      },
      select: {
        id: true,
        title: true
      }
    })

    for (const provider of providers) {
      const title = provider.title as ProviderTitle // Safe because of the where clause
      const schoolName = SCHOOL_MAP[title]

      // Add medical school education
      await prisma.education.create({
        data: {
          providerId: provider.id,
          institution: schoolName,
          degree: title,
          field: 'Medicine',
          startDate: new Date('2015-01-01'),
          endDate: new Date('2019-01-01'),
        }
      })

      // Add residency for MD/DO providers
      if (title === 'MD' || title === 'DO') {
        await prisma.education.create({
          data: {
            providerId: provider.id,
            institution: 'Mayo Clinic',
            degree: 'Residency',
            field: 'Psychiatry',
            startDate: new Date('2019-01-01'),
            endDate: new Date('2023-01-01'),
          }
        })
      }
    }

    console.log('Successfully added education data')
  } catch (error) {
    console.error('Error adding education data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

addEducation() 