// app/api/allblogs/route.ts
import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongooseConnect';
import { Blog } from '../../../../lib/models/Blog';

export async function GET() {
  try {
    await connectMongoDB();
    const blogs = await Blog.find({});
    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
