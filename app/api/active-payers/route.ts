import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Return empty array since we no longer have the Payer model
    return NextResponse.json([]);
  } catch (error) {
    console.error('Error fetching active payers:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 