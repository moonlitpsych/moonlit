import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function addCashToProviders() {
  try {
    // First, ensure we have a cash payer
    let cashPayer = await prisma.payer.findFirst({
      where: { name: 'cash' }
    });

    if (cashPayer) {
      // Update the existing cash payer
      cashPayer = await prisma.payer.update({
        where: { id: cashPayer.id },
        data: {
          displayName: 'Cash | Credit | ACH',
          paymentMethods: ['Cash', 'Credit Card', 'ACH']
        }
      });
      console.log('Updated cash payer:', cashPayer.displayName);
    } else {
      // Create the cash payer if it doesn't exist
      cashPayer = await prisma.payer.create({
        data: {
          name: 'cash',
          displayName: 'Cash | Credit | ACH',
          type: 'CASH',
          paymentMethods: ['Cash', 'Credit Card', 'ACH'],
          acceptedStates: ['UT'],
          isActive: true
        }
      });
      console.log('Created cash payer:', cashPayer.displayName);
    }

    // Get all providers
    const providers = await prisma.provider.findMany({
      include: {
        acceptedPayers: {
          where: {
            payer: {
              name: 'cash'
            }
          }
        }
      }
    });

    // Add cash payer to providers who don't have it
    for (const provider of providers) {
      if (provider.acceptedPayers.length === 0) {
        await prisma.providerPayer.create({
          data: {
            providerId: provider.id,
            payerId: cashPayer.id
          }
        });
        console.log(`Added Cash | Credit | ACH to provider: ${provider.firstName} ${provider.lastName}`);
      }
    }

    console.log('Successfully added Cash | Credit | ACH option to all providers');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addCashToProviders(); 