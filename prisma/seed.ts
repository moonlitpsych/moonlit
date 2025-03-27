import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const INITIAL_PAYERS = [
  {
    name: 'aetna',
    displayName: 'Aetna',
    type: 'INSURANCE',
    networkName: 'Aetna Network',
    isActive: true,
    acceptedStates: ['UT'],
    paymentMethods: ['Electronic Claims']
  },
  {
    name: 'dmba',
    displayName: 'DMBA',
    type: 'INSURANCE',
    networkName: 'DMBA Network',
    isActive: true,
    acceptedStates: ['UT'],
    paymentMethods: ['Electronic Claims']
  },
  {
    name: 'first_health',
    displayName: 'First Health ( Aetna Network)',
    type: 'INSURANCE',
    networkName: 'First Health Network',
    isActive: true,
    acceptedStates: ['UT'],
    paymentMethods: ['Electronic Claims']
  },
  {
    name: 'molina',
    displayName: 'Molina',
    type: 'INSURANCE',
    networkName: 'Molina Healthcare',
    isActive: true,
    acceptedStates: ['UT'],
    paymentMethods: ['Electronic Claims']
  },
  {
    name: 'motiv',
    displayName: 'Motiv Health',
    type: 'INSURANCE',
    networkName: 'Motiv Network',
    isActive: true,
    acceptedStates: ['UT'],
    paymentMethods: ['Electronic Claims']
  },
  {
    name: 'optum',
    displayName: 'Optum',
    type: 'INSURANCE',
    networkName: 'Optum Network',
    isActive: true,
    acceptedStates: ['UT'],
    paymentMethods: ['Electronic Claims']
  },
  {
    name: 'selecthealth',
    displayName: 'SelectHealth',
    type: 'INSURANCE',
    networkName: 'SelectHealth Network',
    isActive: true,
    acceptedStates: ['UT'],
    paymentMethods: ['Electronic Claims']
  },
  {
    name: 'uofu',
    displayName: 'University of Utah',
    type: 'INSURANCE',
    networkName: 'U of U Health Plans',
    isActive: true,
    acceptedStates: ['UT'],
    paymentMethods: ['Electronic Claims']
  },
  {
    name: 'cash',
    displayName: 'Cash | Credit | ACH',
    type: 'CASH',
    isActive: true,
    acceptedStates: ['UT'],
    paymentMethods: ['Cash', 'Credit Card', 'ACH']
  }
] satisfies Prisma.PayerCreateInput[]

async function main() {
  console.log('Start seeding payers...')
  
  for (const payer of INITIAL_PAYERS) {
    const created = await prisma.payer.create({
      data: payer
    })
    console.log(`Created payer: ${created.displayName}`)
  }
  
  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 