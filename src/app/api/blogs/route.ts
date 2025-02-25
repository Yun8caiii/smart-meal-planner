// app/api/blogs/route.ts
import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongooseConnect';
import { Blog } from '../../../../lib/models/Blog';

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const body = await request.json();

    const newBlog = await Blog.create(body);
    return NextResponse.json({ success: true, data: newBlog }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
