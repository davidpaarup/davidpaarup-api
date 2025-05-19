import { NextResponse } from 'next/server';
import { list, ListCommandOptions } from "@vercel/blob";

export async function GET() {

  const options: ListCommandOptions = { 
    token: process.env.NEXT_PUBLIC_TOKEN // TODO: is this public?
  }

  const result = await list(options);
  
  return new NextResponse(JSON.stringify(result), {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json',
    },
  });
}