'use server'

import { currentUser } from '@clerk/nextjs/server'
import { supabaseAdmin } from './admin'

// Admin email whitelist
const ADMIN_EMAILS = new Set([
  'shehzilshahzad14@gmail.com',
  'silentboys1117@gmail.com',
  'employeemanagement13@gmail.com',
])

// Verify the current user is an authorized admin
async function verifyAdmin() {
  const user = await currentUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const email = user.emailAddresses?.[0]?.emailAddress
  if (!email || !ADMIN_EMAILS.has(email.toLowerCase())) {
    throw new Error('Access denied: not an authorized admin')
  }

  return user
}

// ============================================================
// SERVICES
// ============================================================

export async function fetchAllServices() {
  await verifyAdmin()
  const { data, error } = await supabaseAdmin
    .from('services')
    .select('*')
    .order('order_index')

  if (error) throw new Error(error.message)
  return data
}

export async function createService(formData: {
  name: string
  description: string
  icon_svg?: string | null
  tags?: string[] | null
  order_index?: number
  is_active?: boolean
}) {
  await verifyAdmin()
  const { data, error } = await supabaseAdmin
    .from('services')
    .insert([formData])
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function updateService(id: string, formData: {
  name?: string
  description?: string
  icon_svg?: string | null
  tags?: string[] | null
  order_index?: number
  is_active?: boolean
}) {
  await verifyAdmin()
  const { data, error } = await supabaseAdmin
    .from('services')
    .update(formData)
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function deleteService(id: string) {
  await verifyAdmin()
  const { error } = await supabaseAdmin
    .from('services')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)
}

// ============================================================
// WORKS
// ============================================================

export async function fetchAllWorks() {
  await verifyAdmin()
  const { data, error } = await supabaseAdmin
    .from('works')
    .select('*')
    .order('order_index')

  if (error) throw new Error(error.message)
  return data
}

export async function createWork(formData: {
  title: string
  description: string
  category: string
  image_url?: string | null
  icon_svg?: string | null
  link?: string | null
  order_index?: number
  is_active?: boolean
}) {
  await verifyAdmin()
  const { data, error } = await supabaseAdmin
    .from('works')
    .insert([formData])
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function updateWork(id: string, formData: {
  title?: string
  description?: string
  category?: string
  image_url?: string | null
  icon_svg?: string | null
  link?: string | null
  order_index?: number
  is_active?: boolean
}) {
  await verifyAdmin()
  const { data, error } = await supabaseAdmin
    .from('works')
    .update(formData)
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function deleteWork(id: string) {
  await verifyAdmin()
  const { error } = await supabaseAdmin
    .from('works')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)
}

// ============================================================
// TESTIMONIALS
// ============================================================

export async function fetchAllTestimonials() {
  await verifyAdmin()
  const { data, error } = await supabaseAdmin
    .from('testimonials')
    .select('*')
    .order('order_index')

  if (error) throw new Error(error.message)
  return data
}

export async function createTestimonial(formData: {
  name: string
  company: string
  description: string
  profile_image_url?: string | null
  logo_image_url?: string | null
  order_index?: number
  is_active?: boolean
}) {
  await verifyAdmin()
  const { data, error } = await supabaseAdmin
    .from('testimonials')
    .insert([formData])
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function updateTestimonial(id: string, formData: {
  name?: string
  company?: string
  description?: string
  profile_image_url?: string | null
  logo_image_url?: string | null
  order_index?: number
  is_active?: boolean
}) {
  await verifyAdmin()
  const { data, error } = await supabaseAdmin
    .from('testimonials')
    .update(formData)
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function deleteTestimonial(id: string) {
  await verifyAdmin()
  const { error } = await supabaseAdmin
    .from('testimonials')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)
}

// ============================================================
// FAQS
// ============================================================

export async function fetchAllFaqs() {
  await verifyAdmin()
  const { data, error } = await supabaseAdmin
    .from('faqs')
    .select('*')
    .order('order_index')

  if (error) throw new Error(error.message)
  return data
}

export async function createFaq(formData: {
  question: string
  answer: string
  attached_links?: { url: string; label: string }[] | null
  order_index?: number
  is_active?: boolean
}) {
  await verifyAdmin()
  const { data, error } = await supabaseAdmin
    .from('faqs')
    .insert([formData])
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function updateFaq(id: string, formData: {
  question?: string
  answer?: string
  attached_links?: { url: string; label: string }[] | null
  order_index?: number
  is_active?: boolean
}) {
  await verifyAdmin()
  const { data, error } = await supabaseAdmin
    .from('faqs')
    .update(formData)
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function deleteFaq(id: string) {
  await verifyAdmin()
  const { error } = await supabaseAdmin
    .from('faqs')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)
}

// ============================================================
// MESSAGES
// ============================================================

export async function fetchAllMessages() {
  await verifyAdmin()
  const { data, error } = await supabaseAdmin
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data
}

export async function markMessageRead(id: string, isRead: boolean) {
  await verifyAdmin()
  const { data, error } = await supabaseAdmin
    .from('messages')
    .update({ is_read: isRead })
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

// ============================================================
// IMAGE UPLOAD (via server proxy)
// ============================================================

export async function uploadImage(formData: FormData): Promise<string> {
  await verifyAdmin()

  const file = formData.get('file') as File
  const bucket = formData.get('bucket') as string
  const folder = formData.get('folder') as string || ''

  if (!file || !bucket) {
    throw new Error('File and bucket are required')
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error('Please upload an image file')
  }

  // Validate file size (5MB)
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('File size must be less than 5MB')
  }

  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`
  const filePath = folder ? `${folder}/${fileName}` : fileName

  // Convert File to ArrayBuffer for server-side upload
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const { error: uploadError } = await supabaseAdmin.storage
    .from(bucket)
    .upload(filePath, buffer, {
      contentType: file.type,
      upsert: true,
    })

  if (uploadError) {
    throw new Error(uploadError.message)
  }

  const { data: { publicUrl } } = supabaseAdmin.storage
    .from(bucket)
    .getPublicUrl(filePath)

  return publicUrl
}
