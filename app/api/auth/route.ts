import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    // Demo hardcoded user (add Neon DB query later if needed)
    const demoPasswordHash = await bcrypt.hash('demo123', 10);
    
    if (email === 'admin@sprngenergy.com' && password === 'demo123') {
      const user = { email, role: 'admin' };
      const response = NextResponse.json({ message: 'Login successful', user });
      response.cookies.set('auth_token', 'demo-valid', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400,
      });
      return response;
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
