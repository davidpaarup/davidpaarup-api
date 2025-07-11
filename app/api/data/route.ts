import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Read the data.json file
    const dataPath = path.join(process.cwd(), 'app', 'api', 'data', 'data.json');
    const data = fs.readFileSync(dataPath, 'utf8');
    
    // Parse the JSON data
    const jsonData = JSON.parse(data);
    
    // Return the data as a JSON response
    return NextResponse.json(jsonData);
  } catch (error) {
    // Handle any errors (file not found, invalid JSON, etc.)
    console.error('Error reading data.json:', error);
    return NextResponse.json(
      { error: 'Failed to load data' },
      { status: 500 }
    );
  }
}