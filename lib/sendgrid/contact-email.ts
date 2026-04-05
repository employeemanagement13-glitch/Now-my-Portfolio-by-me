import { sgMail } from './client'

interface ContactFormData {
  name: string
  email: string
  message: string
}

export async function sendContactNotification(formData: ContactFormData) {
  console.log('📧 Preparing to send contact notification...')

  // Check if SendGrid is configured
  if (!process.env.SENDGRID_API_KEY) {
    console.log('⚠️ SendGrid API key not configured')
    return { success: true, message: 'Email skipped - API key not configured' }
  }

  if (!process.env.NEXT_PUBLIC_CONTACT_EMAIL) {
    console.log('⚠️ Contact email not configured')
    return { success: true, message: 'Email skipped - contact email not configured' }
  }

  try {
    console.log('📧 Sending email with config:', {
      to: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
      from: process.env.NEXT_PUBLIC_CONTACT_EMAIL
    })

    const msg = {
      to: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
      from: process.env.NEXT_PUBLIC_CONTACT_EMAIL, // Must be same as verified sender
      replyTo: {
        email: formData.email,
        name: formData.name
      },
      subject: `New Contact Form: ${formData.name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px">
          <h2 style="color:#333">New Portfolio Contact</h2>
          <p><strong style="color:#555">From:</strong> ${formData.name} (${formData.email})</p>
          <p><strong style="color:#555">Message:</strong></p>
          <div style="background:#f5f5f5;padding:15px;border-radius:5px;margin:10px 0">
            <p style="margin:0;white-space:pre-wrap">${formData.message}</p>
          </div>
          <p style="font-size:12px;color:#888;margin-top:20px">
            Sent from portfolio contact form
          </p>
        </div>
      `,
    }

    await sgMail.send(msg)
    console.log('✅ Email sent successfully to:', process.env.NEXT_PUBLIC_CONTACT_EMAIL)
    return { success: true, message: 'Email sent successfully' }
  } catch (error: any) {
    console.error('❌ SendGrid error details:', {
      message: error.message,
      code: error.code,
      statusCode: error.response?.statusCode,
      body: error.response?.body
    })

    // Still succeed because we want to save the message even if email fails
    return {
      success: true,
      message: 'Message saved to database (email notification failed)',
      error: error.message
    }
  }
}
