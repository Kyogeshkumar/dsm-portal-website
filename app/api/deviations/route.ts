import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const sites = await sql`SELECT site_id, site_name FROM sites ORDER BY site_name;`;
    return NextResponse.json({ sites });
  } catch (error) {
    console.error('Sites API error:', error);
    return NextResponse.json({ error: 'Failed to fetch sites' }, { status: 500 });
  }
}
