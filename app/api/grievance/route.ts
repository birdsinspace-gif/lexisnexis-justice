import { NextResponse } from 'next/server';

type GrievancePayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  employmentStatus?: string;
  employmentStart?: string;
  employmentEnd?: string;
  position?: string;
  grievance?: string;
  criminalActivity?: string;
  anonymousSubmission?: boolean;
  agree?: boolean;
};

const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;

export async function POST(request: Request) {
  if (!GOOGLE_APPS_SCRIPT_URL) {
    return NextResponse.json(
      { error: 'Form endpoint is not configured yet. Add GOOGLE_APPS_SCRIPT_URL to continue.' },
      { status: 500 },
    );
  }

  let body: GrievancePayload;

  try {
    body = (await request.json()) as GrievancePayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  if (!body.fullName || !body.email || !body.grievance || !body.agree) {
    return NextResponse.json({ error: 'Missing required form fields.' }, { status: 400 });
  }

  try {
    const upstream = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...body,
        submittedAt: new Date().toISOString(),
        source: 'lexisnexis-justice',
      }),
      cache: 'no-store',
    });

    const upstreamText = await upstream.text();
    let upstreamJson: unknown = null;

    try {
      upstreamJson = upstreamText ? JSON.parse(upstreamText) : null;
    } catch {
      upstreamJson = upstreamText || null;
    }

    if (!upstream.ok) {
      return NextResponse.json(
        {
          error: 'Google Apps Script rejected the submission.',
          details: upstreamJson,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      upstream: upstreamJson,
    });
  } catch {
    return NextResponse.json(
      { error: 'Could not reach the submission service. Please try again shortly.' },
      { status: 502 },
    );
  }
}
