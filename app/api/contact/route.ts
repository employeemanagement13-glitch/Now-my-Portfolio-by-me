import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { sendContactNotification } from '@/lib/sendgrid/contact-email'

// Function to verify email format only
function verifyEmailFormat(email: string): { valid: boolean; message: string } {
  try {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    
    if (!isValid) {
      return {
        valid: false,
        message: 'Please enter a valid email address format (example@domain.com)'
      };
    }
    
    return {
      valid: true,
      message: 'Email format is valid'
    };
    
  } catch (error) {
    console.error('Email format validation error:', error);
    return {
      valid: false,
      message: 'Error validating email format'
    };
  }
}

export async function POST(request: Request) {
  console.log('📥 Contact form submission received')
  
  try {
    const { name, email, message } = await request.json()
    console.log('📝 Form data:', { name, email, messageLength: message?.length })

    // Validate input
    if (!name || !email || !message) {
      console.log('❌ Validation failed: missing fields')
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Validate email format only
    console.log('🔍 Validating email format:', email)
    const emailValidation = verifyEmailFormat(email);
    
    if (!emailValidation.valid) {
      console.log('❌ Email format validation failed:', emailValidation.message)
      return NextResponse.json(
        { error: emailValidation.message },
        { status: 400 }
      );
    }

    // Insert into database
    console.log('💾 Saving to database...')
    const { data, error: dbError } = await supabaseAdmin
      .from('messages')
      .insert([{ 
        name, 
        email, 
        message,
        // Store basic metadata
        metadata: {
          emailValidation: emailValidation,
          processedAt: new Date().toISOString()
        }
      }])
      .select()
      .single()

    if (dbError) {
      console.error('❌ Database error:', dbError)
      return NextResponse.json(
        { error: 'Failed to save message to database', details: dbError.message },
        { status: 500 }
      )
    }
    
    console.log('✅ Message saved to database:', data.id)

    // Send email notification (don't fail if email fails)
    console.log('📧 Sending email notification...')
    const emailResult = await sendContactNotification({ name, email, message })
    console.log('📧 Email result:', emailResult)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully',
      data,
      emailStatus: emailResult
    })
  } catch (error: any) {
    console.error('💥 API error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}
