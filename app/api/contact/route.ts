import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { google } from 'googleapis'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, phone, type, message, submittedAt } = body

    // 1. Send Email via Nodemailer
    // NOTE: This requires environment variables: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER, // e.g., pinp10000@gmail.com
        pass: process.env.SMTP_PASS, // App Password
      },
    })

    const mailOptions = {
      from: `"피플인피플 웹사이트" <${process.env.SMTP_USER}>`,
      to: 'pinp10000@gmail.com', // Recipient
      subject: `[무료 사업지 검토 신청] ${name}님 - ${type}`,
      text: `
        접수 시간: ${submittedAt}
        성함/회사명: ${name}
        연락처: ${phone}
        문의 유형: ${type}
        
        상세 내용:
        ${message}
      `,
      html: `
        <h3>무료 사업지 검토 신청 접수</h3>
        <p><strong>접수 시간:</strong> ${submittedAt}</p>
        <p><strong>성함/회사명:</strong> ${name}</p>
        <p><strong>연락처:</strong> ${phone}</p>
        <p><strong>문의 유형:</strong> ${type}</p>
        <p><strong>상세 내용:</strong></p>
        <div style="background: #f5f5f5; padding: 15px; border-left: 4px solid #00C4A1;">
          ${message.replace(/\n/g, '<br/>')}
        </div>
      `,
    }

    // 2. Save to Google Sheets (Optional but requested)
    // Requires: GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET_ID
    if (process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_SHEET_ID) {
      try {
        const auth = new google.auth.GoogleAuth({
          credentials: {
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          },
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        })

        const sheets = google.sheets({ version: 'v4', auth })
        await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range: 'Sheet1!A:E',
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [[submittedAt, name, phone, type, message]],
          },
        })
      } catch (sheetError) {
        console.error('Google Sheets Error:', sheetError)
        // We continue anyway so the email still tries to send
      }
    }

    // Execute Email Sending
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await transporter.sendMail(mailOptions)
    } else {
        console.warn('SMTP credentials missing. Email not sent.')
        // If no credentials, we might want to return success for UI but log it
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Contact API Error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
