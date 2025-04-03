import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import path from 'path';
import * as csv from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import { parse } from 'csv-parse/sync';
import { readFileSync, writeFileSync } from 'fs';

const prisma = new PrismaClient();

// Types for our data structures
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

interface ProviderCSVRow {
  firstName: string;
  lastName: string;
  personalEmail: string;
  phone: string;
  title: string;
  languages: string;
  bio: string;
  photoUrl: string;
  availability: string;
  medicalSchool: string;
  residency: string;
  residencyStartYear: string;
  residencyGradYear: string;
  personalBookingLink: string;
}

interface ProviderRecord {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  personalEmail: string;
  phone: string | null;
  fax: string | null;
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

// Main class for database operations
class DatabaseTools {
  private dataMode: 'test' | 'live';
  private prisma: PrismaClient;

  constructor() {
    this.dataMode = process.env.DATA_MODE === 'test' ? 'test' : 'live';
    this.prisma = prisma;
  }

  // Switch between test and live modes
  async switchMode(mode: 'test' | 'live') {
    this.dataMode = mode;
    process.env.DATA_MODE = mode;
    console.log(`Switched to ${mode} mode`);
  }

  // Import providers from CSV
  async importProviders(filePath: string) {
    try {
      const fileContent = readFileSync(filePath, 'utf-8');
      const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true
      });

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
      console.log(`Successfully imported providers from ${filePath}`);
    } catch (error) {
      console.error('Error importing providers:', error);
      throw error;
    }
  }

  // Export providers to CSV
  async exportProviders(outputPath: string) {
    try {
      const providers = await prisma.provider.findMany();
      const csvData = providers.map((provider: ProviderRecord): ProviderCSVRow => ({
        firstName: provider.firstName,
        lastName: provider.lastName,
        personalEmail: provider.personalEmail,
        phone: provider.phone || '',
        title: provider.title || '',
        languages: provider.languages.join(','),
        bio: provider.bio || '',
        photoUrl: provider.photoUrl || '',
        availability: provider.availability.toString(),
        medicalSchool: provider.medicalSchool || '',
        residency: provider.residency || '',
        residencyStartYear: provider.residencyStartYear?.toString() || '',
        residencyGradYear: provider.residencyGradYear?.toString() || '',
        personalBookingLink: provider.personalBookingLink || ''
      }));

      const header = Object.keys(csvData[0]).join(',') + '\n';
      const rows = csvData.map((row: ProviderCSVRow) => Object.values(row).join(',') + '\n');
      writeFileSync(outputPath, header + rows.join(''));

      console.log(`Successfully exported providers to ${outputPath}`);
    } catch (error) {
      console.error('Error exporting providers:', error);
      throw error;
    }
  }

  // Add or update a provider
  async upsertProvider(providerData: ProviderInput) {
    try {
      const provider = await prisma.provider.upsert({
        where: { personalEmail: providerData.personalEmail },
        update: providerData,
        create: providerData,
      });
      console.log(`Successfully upserted provider: ${provider.firstName} ${provider.lastName}`);
      return provider;
    } catch (error) {
      console.error('Error upserting provider:', error);
      throw error;
    }
  }

  // Search providers
  async searchProviders(query: string) {
    try {
      const providers = await prisma.provider.findMany({
        where: {
          OR: [
            { firstName: { contains: query, mode: 'insensitive' } },
            { lastName: { contains: query, mode: 'insensitive' } },
            { personalEmail: { contains: query, mode: 'insensitive' } }
          ]
        }
      });
      return providers;
    } catch (error) {
      console.error('Error searching providers:', error);
      throw error;
    }
  }

  async disconnect() {
    await this.prisma.$disconnect();
  }
}

// Export an instance of the tools
export const dbTools = new DatabaseTools();

// Command line interface
const runCommand = async (command: string, args: string[]) => {
  switch (command) {
    case 'switch-mode':
      await dbTools.switchMode(args[0] as 'test' | 'live');
      break;
    case 'import-providers':
      await dbTools.importProviders(args[0]);
      break;
    case 'export-providers':
      await dbTools.exportProviders(args[0]);
      break;
    case 'search-providers':
      const results = await dbTools.searchProviders(args[0]);
      console.log(JSON.stringify(results, null, 2));
      break;
    default:
      console.log(`
Available commands:
  switch-mode <test|live>
  import-providers <csv-file-path>
  export-providers <output-path>
  search-providers <search-term>
      `);
  }
  await dbTools.disconnect();
};

if (require.main === module) {
  const [,, command, ...args] = process.argv;
  runCommand(command, args).catch(console.error);
} 