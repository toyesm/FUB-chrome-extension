import { NextRequest, NextResponse } from 'next/server';

const FUB_BASE_URL = 'https://api.followupboss.com/v1';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleRequest(request, params, 'GET');
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleRequest(request, params, 'POST');
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleRequest(request, params, 'PUT');
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleRequest(request, params, 'DELETE');
}

async function handleRequest(
  request: NextRequest,
  params: { params: Promise<{ path: string[] }> },
  method: string
) {
  try {
    // Get API key from environment
    const apiKey = process.env.FUB_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'FUB_API_KEY not configured' },
        { status: 500 }
      );
    }

    // Extract path from catch-all route
    const { path } = await params.params;
    const fubPath = path.join('/');

    // Get query parameters from the request
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();

    // Build the full FUB API URL
    const fubUrl = `${FUB_BASE_URL}/${fubPath}${queryString ? `?${queryString}` : ''}`;

    // Prepare headers with Basic Auth (API key as username, blank password)
    const authHeader = 'Basic ' + Buffer.from(`${apiKey}:`).toString('base64');
    const headers: HeadersInit = {
      'Authorization': authHeader,
      'Content-Type': 'application/json',
    };

    // Prepare request options
    const options: RequestInit = {
      method,
      headers,
    };

    // Add body for POST/PUT requests
    if (method === 'POST' || method === 'PUT') {
      const body = await request.json();
      options.body = JSON.stringify(body);
    }

    // Make request to FUB API
    const response = await fetch(fubUrl, options);
    const data = await response.json();

    // Return the response from FUB API
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('FUB API proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to communicate with FUB API', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
