import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { Readable } from 'stream';

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive"
  ],
});

const sheets = google.sheets({ version: 'v4', auth });
const drive = google.drive({ version: 'v3', auth });

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    // Extract all form data into a plain object
    const data = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    const resumeFile = formData.get('resumeFile');
    let resumeLink = '';

    if (resumeFile) {
      // Ensure all required fields exist and are strings
      const jobCategory = data.jobCategory || 'Unknown';
      const jobDivision = data.jobDivision || 'Unknown';
      const jobTitle = data.jobTitle || 'Unknown';
      const firstName = data.firstName || 'Unknown';
      const lastName = data.lastName || 'Unknown';
      
      resumeLink = await uploadResumeToDrive(
        resumeFile,
        `${firstName}_${lastName}`,
        [
          data.jobClass || 'Uncategorized',
          jobCategory,
          jobDivision,
          jobTitle
        ].filter(Boolean) // Remove any falsy values
      );      
    }

    const sheetId = process.env.GOOGLE_SHEET_ID;
    const jobTitle = `${data.jobCategory} - ${data.jobDivision} - ${data.jobTitle}`.slice(0, 100);
    const submissionDate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' });

    const sheetInfo = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
    const sheetNames = sheetInfo.data.sheets.map(sheet => sheet.properties.title);

    // Only create the sheet if it doesn't exist
    if (!sheetNames.includes(jobTitle)) {
      const createSheetResponse = await sheets.spreadsheets.batchUpdate({
        spreadsheetId: sheetId,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: { title: jobTitle }
              }
            }
          ]
        },
      });

      const newSheetId = createSheetResponse.data.replies[0].addSheet.properties.sheetId;

      // Add headers
      const range = `${jobTitle}!A1:T1`;
      const headers = [[
        "Date Submitted", "Status", "Resume", "Availability Date", "Rank", "License", "First Name", "Middle Name", "Last Name",
        "Email", "Address", "Contact Number", "School From", "School Start", "School End", "Last Vessel Experience", "Last Sign Off",
        "Birthdate", "Age", "Educational Attainment"
      ]];

      await sheets.spreadsheets.values.update({
        spreadsheetId: sheetId,
        range,
        valueInputOption: "RAW",
        requestBody: { values: headers },
      });

      // Style the header and set up the sheet
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: sheetId,
        requestBody: {
          requests: [
            // Just the dropdown
            {
              setDataValidation: {
                range: {
                  sheetId: newSheetId,
                  startRowIndex: 1,
                  endRowIndex: 1000,
                  startColumnIndex: 1,
                  endColumnIndex: 2,
                },
                rule: {
                  condition: {
                    type: 'ONE_OF_LIST',
                    values: [
                      { userEnteredValue: 'Not Yet Viewed' },
                      { userEnteredValue: 'Viewed' },
                      { userEnteredValue: 'Rejected' },
                      { userEnteredValue: 'Accepted' }
                    ],
                  },
                  showCustomUi: true,
                  strict: true,
                },
              },
            },
            // Optional: freeze top row
            {
              updateSheetProperties: {
                properties: {
                  sheetId: newSheetId,
                  gridProperties: {
                    frozenRowCount: 1,
                  },
                },
                fields: 'gridProperties.frozenRowCount',
              },
            },
          ],
        },
      });      

      // Add conditional formatting for Status column
      const formatRules = [
        {
          addConditionalFormatRule: {
            rule: {
              ranges: [{
                sheetId: newSheetId,
                startRowIndex: 1,
                startColumnIndex: 1,
                endColumnIndex: 2
              }],
              booleanRule: {
                condition: {
                  type: 'TEXT_EQ',
                  values: [{ userEnteredValue: 'Not Yet Viewed' }]
                },
                format: {
                  backgroundColor: { red: 1, green: 1, blue: 0 } // Yellow
                }
              }
            },
            index: 0
          }
        },
        {
          addConditionalFormatRule: {
            rule: {
              ranges: [{
                sheetId: newSheetId,
                startRowIndex: 1,
                startColumnIndex: 1,
                endColumnIndex: 2
              }],
              booleanRule: {
                condition: {
                  type: 'TEXT_EQ',
                  values: [{ userEnteredValue: 'Viewed' }]
                },
                format: {
                  backgroundColor: { red: 0.8, green: 0.8, blue: 1 } // Light blue
                }
              }
            },
            index: 1
          }
        },
        {
          addConditionalFormatRule: {
            rule: {
              ranges: [{
                sheetId: newSheetId,
                startRowIndex: 1,
                startColumnIndex: 1,
                endColumnIndex: 2
              }],
              booleanRule: {
                condition: {
                  type: 'TEXT_EQ',
                  values: [{ userEnteredValue: 'Rejected' }]
                },
                format: {
                  backgroundColor: { red: 1, green: 0.8, blue: 0.8 } // Light red
                }
              }
            },
            index: 2
          }
        },
        {
          addConditionalFormatRule: {
            rule: {
              ranges: [{
                sheetId: newSheetId,
                startRowIndex: 1,
                startColumnIndex: 1,
                endColumnIndex: 2
              }],
              booleanRule: {
                condition: {
                  type: 'TEXT_EQ',
                  values: [{ userEnteredValue: 'Accepted' }]
                },
                format: {
                  backgroundColor: { red: 0.8, green: 1, blue: 0.8 } // Light green
                }
              }
            },
            index: 3
          }
        },
        // ✅ Explicitly reset all formatting for rows 2–1000
        {
          repeatCell: {
            range: {
              sheetId: newSheetId,
              startRowIndex: 1,
              endRowIndex: 1000,
              startColumnIndex: 0,
              endColumnIndex: 20,
            },
            cell: {
              userEnteredFormat: {
                backgroundColor: { red: 1, green: 1, blue: 1 }, // White
                textFormat: {
                  foregroundColor: { red: 0, green: 0, blue: 0 }, // Black text
                  fontSize: 10,
                  bold: false
                },
                horizontalAlignment: "LEFT"
              }
            },
            fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)',
          }
        }
      ];

      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: sheetId,
        requestBody: {
          requests: formatRules
        }
      });
    }

    // Append row with form data (this will automatically inherit the dropdown and formatting)
    const rowValues = [[
      submissionDate,
      "Not Yet Viewed", // Default status
      resumeLink,
      data.availabilityDate || '',
      data.rank || '',
      data.license || '',
      data.firstName || '',
      data.middleName || '',
      data.lastName || '',
      data.email || '',
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
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `${jobTitle}!A2`,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: rowValues },
    });

    // ... (rest of the email sending code remains the same)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD,
      }
    });

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
    console.error('Error occurred:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

async function uploadResumeToDrive(file, applicantName, hierarchy = []) {
  if (!Array.isArray(hierarchy)) {
    hierarchy = [];
  }

  let currentParentId = process.env.GOOGLE_DRIVE_FOLDER_ID;

  for (const folder of hierarchy) {
    if (folder) { // Only process non-empty folder names
      currentParentId = await ensureFolderExists(folder, currentParentId);
    }
  }

  const fileMetadata = {
    name: `${applicantName}_Resume_${Date.now()}.pdf`,
    parents: [currentParentId],
  };

  const media = {
    mimeType: file.type,
    body: Readable.from(Buffer.from(await file.arrayBuffer())),
  };

  const response = await drive.files.create({
    resource: fileMetadata,
    media,
    fields: 'id',
  });

  const fileId = response.data.id;

  await drive.permissions.create({
    fileId,
    requestBody: {
      role: 'reader',
      type: 'anyone',
    },
  });

  return `https://drive.google.com/file/d/${fileId}/view`;
}

async function ensureFolderExists(folderName, parentId = null) {
  if (!folderName || typeof folderName !== 'string') {
    throw new Error('Invalid folder name provided');
  }

  // Search for the folder under the parent
  const queryParts = [
    `mimeType='application/vnd.google-apps.folder'`, 
    `name='${folderName.replace(/'/g, "\\'")}'`, 
    `trashed=false`
  ];
  
  if (parentId) queryParts.push(`'${parentId}' in parents`);
  const query = queryParts.join(" and ");

  const res = await drive.files.list({
    q: query,
    fields: 'files(id, name)',
  });

  if (res.data.files.length > 0) {
    return res.data.files[0].id;
  }

  // If not found, create it
  const fileMetadata = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder',
    ...(parentId && { parents: [parentId] })
  };

  const file = await drive.files.create({
    resource: fileMetadata,
    fields: 'id',
  });

  return file.data.id;
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
            <p><strong>Class:</strong> ${data.jobClass}</p>
            <p><strong>Division:</strong> ${data.jobDivision}</p>
            <p><strong>Type:</strong> ${data.jobType}</p>
          </div>
          
          <p>Our recruitment team will review your application carefully. If your qualifications match our requirements, we will contact you for the next steps in the hiring process.</p>
          
          <p>Please note that due to the volume of applications we receive, we may not be able to respond to each applicant individually. However, we appreciate the time and effort you put into applying with us.</p>
          
          <p>For any inquiries, please contact our HR department at recruitment@naess.com.ph.</p>
        </div>
        
        <div class="footer">
          <p>Best regards,</p>
          <p><strong>NAESS Philippines Recruitment Team</strong></p>
          <p>NAESS Philippines Inc.</p>
          <p>Email: recruitment@naess.com.ph | Phone: +63 2 123 4567</p>
        </div>
      </div>
    </body>
    </html>
  `;
}