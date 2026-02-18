import { NextRequest, NextResponse } from 'next/server'

interface ContactPayload {
  name: string
  email: string
  subject: string
  message: string
  honeypot?: string
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactPayload = await request.json()
    const { name, email, subject, message, honeypot } = body

    // Honeypot spam check
    if (honeypot) {
      return NextResponse.json({ success: true }) // silently ignore bots
    }

    // Validate fields
    if (!name || name.trim().length < 2) {
      return NextResponse.json({ error: 'Name must be at least 2 characters' }, { status: 400 })
    }
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'A valid email address is required' }, { status: 400 })
    }
    if (!subject || subject.trim().length < 5) {
      return NextResponse.json({ error: 'Subject must be at least 5 characters' }, { status: 400 })
    }
    if (!message || message.trim().length < 20) {
      return NextResponse.json({ error: 'Message must be at least 20 characters' }, { status: 400 })
    }
    if (message.trim().length > 500) {
      return NextResponse.json({ error: 'Message must be 500 characters or less' }, { status: 400 })
    }

    // TODO: Add your preferred email service here (Resend, EmailJS, Nodemailer, etc.)
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({ from: 'noreply@yourdomain.com', to: 'basilin@live.com', subject, ... })

    return NextResponse.json({ success: true, message: 'Message received successfully' })
  } catch {
    return NextResponse.json({ error: 'Failed to process your request' }, { status: 500 })
  }
}
