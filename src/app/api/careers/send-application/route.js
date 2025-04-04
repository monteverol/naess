// src/app/api/careers/send-application/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import graphQLClient from "../../../../lib/graphql/wordpress";

// Existing Google Sheets auth code...
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: 'v4', auth });

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    // Extract all form data
    const data = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    
    // Extract the file if it exists
    const resumeFile = formData.get('resumeFile');

    // Verify job exists via GraphQL
    try {
      const query = `
        query CheckJobExists($title: String!) {
          jobs(where: {title: $title}) {
            edges {
              node {
                id
                title
              }
            }
          }
        }
      `;
      
      const result = await graphQLClient.request(query, { title: data.jobTitle });
      
      // If job doesn't exist in WordPress
      if (result.jobs.edges.length === 0) {
        console.warn(`Job "${data.jobTitle}" not found in WordPress`);
        // Continue anyway as the job might be valid but not in WordPress yet
      }
    } catch (graphqlError) {
      console.error("GraphQL verification error:", graphqlError);
      // Continue with form submission even if GraphQL check fails
    }

    // Rest of your existing code for Google Sheets, email sending, etc.
    const sheetId = process.env.GOOGLE_SHEET_ID;
    // ... rest of the Google Sheets code
    
    // ... email sending code
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing application:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Existing email HTML generation functions remain the same
function generateEmailHtml(data) {
  // Existing code...
}

function generateConfirmationEmailHtml(data) {
  // Existing code...
}