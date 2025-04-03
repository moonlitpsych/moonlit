import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'csv-parse/sync';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string; // 'providers' | 'payers' | 'relationships'
    
    if (!file || !type) {
      return NextResponse.json(
        { error: 'File and type are required' },
        { status: 400 }
      );
    }

    // Read the file
    const buffer = Buffer.from(await file.arrayBuffer());
    const content = buffer.toString();

    // Parse CSV
    const records = parse(content, {
      columns: true,
      skip_empty_lines: true,
    });

    // Validate the data based on type
    const validationErrors = validateData(type, records);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { errors: validationErrors },
        { status: 400 }
      );
    }

    // Save to appropriate file
    const fileName = `${type}.json`;
    const filePath = path.join(DATA_DIR, fileName);
    await writeFile(filePath, JSON.stringify(records, null, 2));

    return NextResponse.json({
      message: `Successfully imported ${records.length} ${type}`,
      count: records.length
    });
  } catch (error) {
    console.error('Import error:', error);
    return NextResponse.json(
      { error: 'Failed to import data' },
      { status: 500 }
    );
  }
}

function validateData(type: string, records: any[]) {
  const errors: string[] = [];

  switch (type) {
    case 'providers':
      records.forEach((record, index) => {
        if (!record.firstName) errors.push(`Row ${index + 1}: Missing firstName`);
        if (!record.lastName) errors.push(`Row ${index + 1}: Missing lastName`);
        if (!record.email) errors.push(`Row ${index + 1}: Missing email`);
      });
      break;

    case 'payers':
      records.forEach((record, index) => {
        if (!record.name) errors.push(`Row ${index + 1}: Missing name`);
        if (typeof record.active === 'undefined') errors.push(`Row ${index + 1}: Missing active status`);
      });
      break;

    case 'relationships':
      records.forEach((record, index) => {
        if (!record.provider) errors.push(`Row ${index + 1}: Missing provider`);
        if (!record.payer) errors.push(`Row ${index + 1}: Missing payer`);
      });
      break;
  }

  return errors;
} 