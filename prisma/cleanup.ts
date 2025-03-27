import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function cleanup() {
  try {
    console.log('Starting cleanup...')

    // Get all valid payer IDs
    const validPayers = await prisma.payer.findMany({
      select: { id: true }
    })
    const validPayerIds = new Set(validPayers.map(p => p.id))

    // Get all ProviderPayer relationships
    const relationships = await prisma.providerPayer.findMany()
    
    // Find orphaned relationships (where payer no longer exists)
    const orphanedRelationships = relationships.filter(rel => !validPayerIds.has(rel.payerId))
    
    if (orphanedRelationships.length > 0) {
      console.log(`Found ${orphanedRelationships.length} orphaned relationships. Deleting...`)
      
      // Delete orphaned relationships
      for (const rel of orphanedRelationships) {
        await prisma.providerPayer.delete({
          where: {
            providerId_payerId: {
              providerId: rel.providerId,
              payerId: rel.payerId
            }
          }
        })
      }
      
      console.log('Orphaned relationships deleted.')
    } else {
      console.log('No orphaned relationships found.')
    }

    console.log('Cleanup completed successfully.')
  } catch (error) {
    console.error('Error during cleanup:', error)
  } finally {
    await prisma.$disconnect()
  }
}

cleanup() 