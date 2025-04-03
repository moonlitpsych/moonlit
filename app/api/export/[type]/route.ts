import { NextRequest, NextResponse } from 'next/server';
import { stringify } from 'csv-stringify/sync';
import { readFile } from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string } }
) {
  try {
    const { type } = params;
    
    if (!type) {
      return NextResponse.json(
        { error: 'Type parameter is required' },
        { status: 400 }
      );
    }

    // Read the JSON file
    const filePath = path.join(DATA_DIR, `${type}.json`);
    const jsonContent = await readFile(filePath, 'utf-8');
    const records = JSON.parse(jsonContent);

    // Convert to CSV
    const csv = stringify(records, { header: true });

    // Create response with CSV file
    const response = new NextResponse(csv);
    response.headers.set('Content-Type', 'text/csv');
    response.headers.set('Content-Disposition', `attachment; filename="${type}.csv"`);

    return response;
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      { error: 'Failed to export data' },
      { status: 500 }
    );
  }
} 