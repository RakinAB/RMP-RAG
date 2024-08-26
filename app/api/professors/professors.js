// app/api/professors/route.js
import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  const jsonDirectory = path.join(process.cwd(), 'reviews.json');
  const fileContents = await fs.readFile(jsonDirectory, 'utf8');
  const reviews = JSON.parse(fileContents);

  return NextResponse.json(reviews);
}
