import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

interface TransformedProvider {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  title: string | null;
  specialty: string | null;
  licenseNumber: string | null;
  state: string | null;
  npi: string | null;
  practiceName: string | null;
  practiceAddress: string | null;
  practicePhone: string | null;
  practiceEmail: string | null;
  availability: boolean;
  selfPayRate: number | null;
  bio: string | null;
  languages: string[];
  specialties: string[];
  photoUrl: string | null;
  isActive: boolean;
  isVerified: boolean;
  personalBookingUrl: string | null;
  acceptedPayers: Array<{
    providerId: string;
    payerId: string;
    createdAt: Date;
    updatedAt: Date;
    payer: {
      id: string;
      name: string;
      displayName: string;
      type: 'INSURANCE' | 'CASH' | 'MEDICAID' | 'MEDICARE';
    };
  }>;
  education: Array<{
    id: string;
    providerId: string;
    institution: string;
    degree: string;
    field: string;
    startDate: Date;
    endDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
  }>;
  insuranceAccepted: string[];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';
  const insurancePlans = searchParams.get('insurancePlans')?.split(',') || [];
  const languages = searchParams.get('languages')?.split(',') || [];
  const acceptingPatients = searchParams.get('acceptingPatients');
  const degrees = searchParams.get('degrees')?.split(',') || [];
  const sortBy = searchParams.get('sortBy') || 'name';

  try {
    // Build search conditions
    const searchConditions = {
      OR: [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { bio: { contains: search, mode: 'insensitive' } },
        { specialties: { hasSome: [search] } },
      ],
    };

    // Build filter conditions
    const filterConditions = [];

    if (insurancePlans.length > 0) {
      filterConditions.push({
        acceptedPayers: {
          some: {
            payer: {
              displayName: {
                in: insurancePlans
              }
            }
          }
        }
      });
    }

    if (languages.length > 0) {
      filterConditions.push({ languages: { hasSome: languages } });
    }

    if (acceptingPatients !== null) {
      filterConditions.push({
        availability: {
          equals: acceptingPatients === 'true'
        }
      });
    }

    if (degrees.length > 0) {
      filterConditions.push({ title: { in: degrees } });
    }

    // Combine all conditions
    const where = {
      isActive: true,
      AND: [searchConditions, ...filterConditions],
    };

    // Set order by
    const orderBy = sortBy === 'price'
      ? { selfPayRate: 'asc' }
      : { firstName: 'asc' };

    const providers = await prisma.provider.findMany({
      where,
      orderBy,
      include: {
        acceptedPayers: {
          include: {
            payer: true
          }
        },
        education: true
      }
    });

    // Transform the response to match the expected format
    const transformedProviders = providers.map((provider: any): TransformedProvider => {
      const { acceptedPayers, education, ...rest } = provider;
      return {
        ...rest,
        acceptedPayers,
        education,
        insuranceAccepted: acceptedPayers.map((ap: any) => ap.payer.displayName)
      };
    });

    return NextResponse.json(transformedProviders);
  } catch (error) {
    console.error('Error fetching providers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch providers' },
      { status: 500 }
    );
  }
} 