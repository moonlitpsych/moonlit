import { PrismaClient } from '@prisma/client';
import { parse } from 'csv-parse/sync';
import { readFileSync } from 'fs';
import path from 'path';

const prisma = new PrismaClient();

interface ProviderInput {
  firstName: string;
  lastName: string;
  personalEmail: string;
  phone: string | null;
  title: string | null;
  languages: string[];
  bio: string | null;
  photoUrl: string | null;
  availability: boolean;
  medicalSchool: string | null;
  residency: string | null;
  residencyStartYear: number | null;
  residencyGradYear: number | null;
  personalBookingLink: string | null;
}

async function manageProviders() {
  try {
    // Read and parse CSV
    const csvPath = path.join(process.cwd(), 'data', 'providers.csv');
    const fileContent = readFileSync(csvPath, 'utf-8');
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    });

    // Import each provider
    for (const record of records) {
      const provider: ProviderInput = {
        firstName: record.firstName,
        lastName: record.lastName,
        personalEmail: record.personalEmail,
        phone: record.phone || null,
        title: record.title || null,
        languages: record.languages ? record.languages.split(',').map((l: string) => l.trim()) : [],
        bio: record.bio || null,
        photoUrl: record.photoUrl || null,
        availability: record.availability === 'true',
        medicalSchool: record.medicalSchool || null,
        residency: record.residency || null,
        residencyStartYear: record.residencyStartYear ? parseInt(record.residencyStartYear, 10) : null,
        residencyGradYear: record.residencyGradYear ? parseInt(record.residencyGradYear, 10) : null,
        personalBookingLink: record.personalBookingLink || null
      };

      await prisma.provider.create({ data: provider });
    }

    console.log('Successfully imported providers');
  } catch (error) {
    console.error('Error importing providers:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

manageProviders(); 