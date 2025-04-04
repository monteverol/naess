import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

// const credentialsPath = path.join(process.cwd(), 'config', 'credentials.json');
// const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
console.log(process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'));

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

    const sheetId = process.env.GOOGLE_SHEET_ID;
    console.log("Server-side Sheet ID:", sheetId);

    const jobTitle = data.jobTitle;

    // Check if the sheet already exists
    const response = await sheets.spreadsheets.get({
      spreadsheetId: sheetId,
    });

    const sheetNames = response.data.sheets.map(sheet => sheet.properties.title);

    let range = `${jobTitle}!A1`; // Set the range to the desired sheet

    if (!sheetNames.includes(jobTitle)) {
      // If the sheet doesn't exist, create a new one
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: sheetId,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: jobTitle,
                },
              },
            },
          ],
        },
      });

      console.log(`Created new sheet: ${jobTitle}`);

      // Add headers to the new sheet
      range = `${jobTitle}!A1`;
      const headerValues = [
        ["Date Submitted", "Status", "First Name", "Middle Name", "Last Name", "Email", "Rank", "License", "Address", "Contact Number", "School From", "School Start", "School End", "Last Vessel Experience", "Last Sign Off", "Birthdate", "Age", "Educational Attainment"]
      ];

      await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range,
        valueInputOption: "RAW",
        insertDataOption: "INSERT_ROWS",
        requestBody: {
          values: headerValues,
        },
      });

      console.log(`Headers added to sheet: ${jobTitle}`);
    }

    const submissionDate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' });

    const values = [
      [
        submissionDate,
        "Not Yet Viewed",
        data.firstName || '',
        data.middleName || '',
        data.lastName || '',
        data.email || '',
        data.rank || '',
        data.license || '',
        data.address || '',
        data.contactNumber || '',
        data.schoolFrom || '',
        data.schoolStart || '',
        data.schoolEnd || '',
        data.lastVesselExperience || '',
        data.lastSignOff || '',
        data.birthdate || '',
        data.age || '',
        data.educationalAttainment || ''
      ]
    ];

    range = `${jobTitle}!A2`;

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values,
      },
    });

    console.log("Data successfully added to Google Sheet.");

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: process.env.COMPANY_EMAIL || process.env.GMAIL_EMAIL,
      subject: `New Job Application: ${data.jobTitle}`,
      html: generateEmailHtml(data),
      attachments: resumeFile ? [{
        filename: resumeFile.name,
        content: Buffer.from(await resumeFile.arrayBuffer()),
      }] : [],
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send confirmation email to applicant
    if (data.email) {
      const confirmationMailOptions = {
        from: process.env.GMAIL_EMAIL,
        to: data.email,
        subject: `Application Received: ${data.jobTitle}`,
        html: generateConfirmationEmailHtml(data),
      };
      await transporter.sendMail(confirmationMailOptions);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

function generateEmailHtml(data) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>New Job Application: ${data.jobTitle}</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
        }
        .container {
          background-color: white;
          border-radius: 8px;
          padding: 30px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: #1A384F;
          color: white;
          padding: 20px;
          border-radius: 8px 8px 0 0;
          text-align: center;
          margin: -30px -30px 20px -30px;
        }
        h1 {
          margin: 0;
          font-size: 24px;
        }
        .logo {
          max-width: 150px;
          margin-bottom: 15px;
        }
        .section {
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
        }
        .section:last-child {
          border-bottom: none;
        }
        .section-title {
          color: #1A384F;
          font-size: 18px;
          margin-bottom: 10px;
          font-weight: bold;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }
        .info-item {
          margin-bottom: 8px;
        }
        .info-label {
          font-weight: bold;
          color: #555;
        }
        .footer {
          margin-top: 30px;
          text-align: center;
          font-size: 14px;
          color: #777;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Job Application Received</h1>
        </div>
        
        <div class="section">
          <div class="section-title">Position Applied For</div>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Job Title</div>
              <div>${data.jobTitle}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Location</div>
              <div>${data.jobLocation}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Type</div>
              <div>${data.jobType}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Category</div>
              <div>${data.jobCategory}</div>
            </div>
          </div>
        </div>
        
        <div class="section">
          <div class="section-title">Applicant Information</div>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Full Name</div>
              <div>${data.firstName} ${data.middleName} ${data.lastName}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Rank</div>
              <div>${data.rank}</div>
            </div>
            <div class="info-item">
              <div class="info-label">License</div>
              <div>${data.license}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Birthdate</div>
              <div>${data.birthdate} (Age: ${data.age})</div>
            </div>
            <div class="info-item">
              <div class="info-label">Contact Number</div>
              <div>${data.contactNumber}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Email Address</div>
              <div>${data.email}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Address</div>
              <div>${data.address}</div>
            </div>
          </div>
        </div>
        
        <div class="section">
          <div class="section-title">Educational Background</div>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Educational Attainment</div>
              <div>${data.educationalAttainment}</div>
            </div>
            <div class="info-item">
              <div class="info-label">School Graduated</div>
              <div>${data.schoolFrom}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Years Attended</div>
              <div>${data.schoolStart} to ${data.schoolEnd}</div>
            </div>
          </div>
        </div>
        
        ${data.lastVesselExperience ? `
        <div class="section">
          <div class="section-title">Vessel Experience</div>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Last Vessel Experience</div>
              <div>${data.lastVesselExperience}</div>
            </div>
            ${data.lastSignOff ? `
            <div class="info-item">
              <div class="info-label">Last Sign Off</div>
              <div>${data.lastSignOff}</div>
            </div>
            ` : ''}
          </div>
        </div>
        ` : ''}
        
        ${data.resumeFile ? `
        <div class="section">
          <div class="section-title">Attachments</div>
          <div class="info-item">
            <div class="info-label">Resume</div>
            <div>${data.resumeFile.name} (attached)</div>
          </div>
        </div>
        ` : ''}
        
        <div class="footer">
          <p>This application was submitted via the NAESS Careers Portal.</p>
          <p>Please review this application at your earliest convenience.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateConfirmationEmailHtml(data) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Application Received: ${data.jobTitle}</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
        }
        .container {
          background-color: white;
          border-radius: 8px;
          padding: 30px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: #1A384F;
          color: white;
          padding: 20px;
          border-radius: 8px 8px 0 0;
          text-align: center;
          margin: -30px -30px 20px -30px;
        }
        h1 {
          margin: 0;
          font-size: 24px;
        }
        .logo {
          max-width: 150px;
          margin-bottom: 15px;
        }
        .content {
          margin-bottom: 20px;
        }
        .footer {
          margin-top: 30px;
          text-align: center;
          font-size: 14px;
          color: #777;
        }
        .job-details {
          background-color: #f5f5f5;
          padding: 15px;
          border-radius: 5px;
          margin: 15px 0;
        }
        .job-details p {
          margin: 5px 0;
        }
        .thank-you {
          font-size: 18px;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You for Your Application</h1>
        </div>
        
        <div class="content">
          <p class="thank-you">Dear ${data.firstName} ${data.lastName},</p>
          
          <p>We have received your application for the following position:</p>
          
          <div class="job-details">
            <p><strong>Position:</strong> ${data.jobTitle}</p>
            <p><strong>Location:</strong> ${data.jobLocation}</p>
            <p><strong>Type:</strong> ${data.jobType}</p>
          </div>
          
          <p>Our recruitment team will review your application carefully. If your qualifications match our requirements, we will contact you for the next steps in the hiring process.</p>
          
          <p>Please note that due to the volume of applications we receive, we may not be able to respond to each applicant individually. However, we appreciate the time and effort you put into applying with us.</p>
          
          <p>For any inquiries, please contact our HR department at hr@naess.com.ph.</p>
        </div>
        
        <div class="footer">
          <p>Best regards,</p>
          <p><strong>NAESS Philippines Recruitment Team</strong></p>
          <p>NAESS Philippines Inc.</p>
          <p>Email: hr@naess.com.ph | Phone: +63 2 123 4567</p>
        </div>
      </div>
    </body>
    </html>
  `;
}