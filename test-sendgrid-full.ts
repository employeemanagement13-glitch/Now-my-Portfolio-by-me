import { config } from 'dotenv'
config() // Load environment variables

import sgMail from '@sendgrid/mail'

console.log('🔍 Environment Variables Check:')
console.log('SENDGRID_API_KEY exists:', !!process.env.SENDGRID_API_KEY)
console.log('NEXT_PUBLIC_CONTACT_EMAIL:', process.env.NEXT_PUBLIC_CONTACT_EMAIL)
console.log('API Key length:', process.env.SENDGRID_API_KEY?.length || 0)

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  console.log('✅ SendGrid initialized')
  
  const testMsg = {
    to: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'shehzilshahzad51@gmail.com',
    from: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'startingasafreelancer@gmail.com',
    subject: 'Test from Node.js Script',
    text: 'Hello world!',
    html: '<strong>Hello world!</strong>',
  }

  sgMail
    .send(testMsg)
    .then(() => console.log('✅ Test email sent successfully'))
    .catch((error) => {
      console.error('❌ Test email failed:', error)
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        response: error.response?.body
      })
    })
} else {
  console.log('❌ No SendGrid API key found')
}
