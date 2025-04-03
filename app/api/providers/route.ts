import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Build where conditions
    const where: any = {};
    
    // Search by name
    const search = searchParams.get('search');
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    // Filter by availability
    const availability = searchParams.get('availability');
    if (availability === 'true') {
      where.availability = true;
    }
    
    // Filter by active status
    const isActive = searchParams.get('isActive');
    if (isActive === 'true') {
      where.isActive = true;
    }

    // Order by parameters
    const orderBy: any = {};
    const sortBy = searchParams.get('sortBy') || 'lastName';
    const sortOrder = searchParams.get('sortOrder') || 'asc';
    orderBy[sortBy] = sortOrder;

    const providers = await prisma.provider.findMany({
      where,
      orderBy,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        title: true,
        personalEmail: true,
        phone: true,
        fax: true,
        bio: true,
        languages: true,
        photoUrl: true,
        availability: true,
        npi: true,
        personalBookingLink: true,
        address: true,
        medicalSchool: true,
        residency: true,
        residencyStartYear: true,
        residencyGradYear: true,
        isActive: true,
        isVerified: true
      }
    });

    return NextResponse.json(providers);
  } catch (error) {
    console.error('Error fetching providers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch providers' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const provider = await prisma.provider.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        title: data.title,
        personalEmail: data.personalEmail,
        phone: data.phone,
        fax: data.fax,
        bio: data.bio,
        languages: data.languages || [],
        photoUrl: data.photoUrl,
        availability: data.availability || false,
        npi: data.npi,
        personalBookingLink: data.personalBookingLink,
        address: data.address,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
        locationOfBirth: data.locationOfBirth,
        stateLicenseNumbers: data.stateLicenseNumbers,
        deaNumber: data.deaNumber,
        ssn: data.ssn,
        medicalSchool: data.medicalSchool,
        residency: data.residency,
        residencyStartYear: data.residencyStartYear,
        residencyGradYear: data.residencyGradYear,
        isActive: true,
        isVerified: false
      }
    });

    return NextResponse.json(provider);
  } catch (error) {
    console.error('Error creating provider:', error);
    return NextResponse.json(
      { error: 'Failed to create provider' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    const provider = await prisma.provider.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json(provider);
  } catch (error) {
    console.error('Error updating provider:', error);
    return NextResponse.json(
      { error: 'Failed to update provider' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Provider ID is required' },
        { status: 400 }
      );
    }

    await prisma.provider.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Provider deleted successfully' });
  } catch (error) {
    console.error('Error deleting provider:', error);
    return NextResponse.json(
      { error: 'Failed to delete provider' },
      { status: 500 }
    );
  }
} 