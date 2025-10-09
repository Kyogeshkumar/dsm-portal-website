import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const siteId = searchParams.get('siteId');
    const date = searchParams.get('date');

    if (!siteId || !date) {
      return NextResponse.json({ error: 'Missing siteId or date' }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL!);
    const deviations = await sql`
      SELECT hour, forecast, actual, deviation_percent 
      FROM deviations 
      WHERE site_id = ${siteId} AND date = ${date}
      ORDER BY hour;
    `;

    return NextResponse.json({ deviations });
  } catch (error) {
    console.error('Deviations API error:', error);
    return NextResponse.json({ error: 'Failed to fetch deviations' }, { status: 500 });
  }
}
