import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Get all payers that have at least one active provider
    const activePayers = await prisma.payer.findMany({
      where: {
        providers: {
          some: {
            provider: {
              isActive: true
            }
          }
        }
      },
      select: {
        id: true,
        name: true,
        displayName: true,
      },
      orderBy: {
        displayName: 'asc'
      }
    });

    return NextResponse.json(activePayers);
  } catch (error) {
    console.error('Error fetching active payers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch active payers' },
      { status: 500 }
    );
  }
} 