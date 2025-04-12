// app/api/propose-public-reminder/route.js
import nodemailer from 'nodemailer';

export async function POST(request) {
  const body = await request.json();
  const { date, time, text } = body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const approveUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/approve-public-reminder?date=${date}&time=${time}&text=${encodeURIComponent(text)}`;
  const rejectUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/reject-public-reminder?date=${date}&time=${time}`;

  const mailOptions = {
    from: process.env.GMAIL_EMAIL,
    to: process.env.COMPANY_EMAIL,
    subject: `📆 Public Reminder Proposal for ${date}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
          <style>
              body {
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  line-height: 1.6;
                  color: #333;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
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
                  font-size: 28px;
                  font-weight: bold;
              }
              .reminder-card {
                  background-color: #f8f9fa;
                  padding: 15px;
                  margin: 20px 0;
                  border-radius: 0 4px 4px 0;
              }
              .detail {
                  margin: 10px 0;
              }
              .detail strong {
                  color: #555;
              }
              .action-prompt {
                  margin: 25px 0 15px;
                  font-style: italic;
                  color: #555;
              }
              .action-buttons {
                  margin-top: 20px;
                  width: 100%;
                  display: flex;
                  gap: 15px;
                  justify-content: center;
              }
              .btn {
                  display: inline-block;
                  padding: 10px 15px;
                  text-decoration: none;
                  border-radius: 4px;
                  font-weight: bold;
                  margin-right: 15px;
                  width: 80px;
                  text-align: center;
              }
              .approve {
                  background-color: #34A853;
                  color: white;
              }
              .reject {
                  background-color: #EA4335;
                  color: white;
              }
              .footer {
                  margin-top: 30px;
                  font-size: 12px;
                  color: #999;
                  border-top: 1px solid #eee;
                  padding-top: 10px;
              }
          </style>
      </head>
      <body>
        <div class="container">
          <div class="header">Reminder Proposal</div>
          
          <div class="reminder-card">
              <div class="detail"><strong>Reminder:</strong> ${text}</div>
              <div class="detail"><strong>Date:</strong> ${date}</div>
              <div class="detail"><strong>Time:</strong> ${time}</div>
          </div>
          
          <div class="action-prompt">Would you like to make this reminder public?</div>
          
          <div class="action-buttons">
              <a href="${approveUrl}" class="btn approve">Approve</a>
              <a href="${rejectUrl}" class="btn reject">Reject</a>
          </div>
          
          <div class="footer">
              This is an automated message. Please do not reply directly to this email.
          </div>
        </div>
      </body>
      </html>
    `,
    headers: {
      'Content-Type': 'text/html; charset=utf-8'
    }
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ message: 'Proposal sent' }), { status: 200 });
  } catch (error) {
    console.error('Mail error:', error);
    return new Response(JSON.stringify({ message: 'Failed to send email' }), { status: 500 });
  }
}
