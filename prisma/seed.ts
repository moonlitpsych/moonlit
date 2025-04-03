import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create sample providers from CSV
  const providers = [
    {
      firstName: 'Travis',
      lastName: 'Norseth',
      title: 'MD',
      personalEmail: 'travis@moonlit.health',
      languages: ['English', 'Spanish'],
      photoUrl: '/images/Travis-Norseth-headshot.jpg',
      availability: true,
      npi: '1234567890',
      residencyStartYear: 2018,
      residencyGradYear: 2022,
    },
    {
      firstName: 'C. Rufus',
      lastName: 'Sweeney',
      title: 'MD',
      personalEmail: 'rufus@moonlit.health',
      languages: ['English', 'Spanish'],
      photoUrl: '/images/Rufus-Sweeney-headshot.jpg',
      availability: false,
      npi: '0987654321',
      residencyStartYear: 2015,
      residencyGradYear: 2019,
    }
  ];

  for (const providerData of providers) {
    const provider = await prisma.provider.create({
      data: providerData
    });
    console.log('Created provider:', provider.firstName, provider.lastName);
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 