// app/api/reservations/route.ts
// API Route for handling reservation form submissions via Resend

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Define the request body type
interface ReservationRequest {
  name: string;
  email: string;
  phone: string;
  guests: string;
  date: string;
  time: string;
  message?: string;
}

// POST handler for reservation submissions
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body: ReservationRequest = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.phone || !body.guests || !body.date || !body.time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Le Seven Restaurant <reservations@leseven-grenoble.fr>',
      to: ['restaurantleseven38@gmail.com'], // Restaurant email
      replyTo: body.email,
      subject: `Nouvelle réservation - ${body.name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #92C6C4 0%, #98A88B 100%);
                color: white;
                padding: 30px;
                text-align: center;
                border-radius: 10px 10px 0 0;
              }
              .content {
                background: #f9f9f9;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .field {
                margin-bottom: 15px;
                padding: 10px;
                background: white;
                border-radius: 5px;
              }
              .label {
                font-weight: bold;
                color: #92C6C4;
                display: block;
                margin-bottom: 5px;
              }
              .value {
                color: #333;
              }
              .message-box {
                background: white;
                padding: 15px;
                border-left: 4px solid #92C6C4;
                margin-top: 20px;
                border-radius: 5px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Nouvelle Réservation</h1>
                <p>Le Seven Restaurant</p>
              </div>
              <div class="content">
                <div class="field">
                  <span class="label">Nom:</span>
                  <span class="value">${body.name}</span>
                </div>
                <div class="field">
                  <span class="label">Email:</span>
                  <span class="value">${body.email}</span>
                </div>
                <div class="field">
                  <span class="label">Téléphone:</span>
                  <span class="value">${body.phone}</span>
                </div>
                <div class="field">
                  <span class="label">Nombre de personnes:</span>
                  <span class="value">${body.guests}</span>
                </div>
                <div class="field">
                  <span class="label">Date:</span>
                  <span class="value">${new Date(body.date).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div class="field">
                  <span class="label">Heure:</span>
                  <span class="value">${body.time}</span>
                </div>
                ${body.message ? `
                  <div class="message-box">
                    <span class="label">Message:</span>
                    <p class="value">${body.message}</p>
                  </div>
                ` : ''}
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Reservation submitted successfully',
        id: data?.id,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// OPTIONS handler for CORS preflight
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}

/*
 * MIGRATION NOTES:
 *
 * 1. API routes in Next.js App Router are named `route.ts`
 *    (not `index.ts` or `api.ts`)
 *
 * 2. Export functions named after HTTP methods (GET, POST, etc.)
 *
 * 3. Use NextRequest and NextResponse from 'next/server'
 *
 * 4. Environment variables are accessed via process.env
 *    (no special NEXT_PUBLIC_ prefix needed in API routes)
 *
 * 5. Request body is parsed with request.json()
 *
 * 6. Resend is initialized once at the top of the file
 *
 * 7. All error handling should return appropriate status codes
 *
 * 8. This replaces the Vercel serverless function approach
 */
