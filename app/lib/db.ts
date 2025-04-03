import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

const prisma = global.prisma || new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATA_MODE === 'live' 
        ? process.env.DATABASE_URL 
        : process.env.TEST_DATABASE_URL
    },
  },
})

if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export default prisma 