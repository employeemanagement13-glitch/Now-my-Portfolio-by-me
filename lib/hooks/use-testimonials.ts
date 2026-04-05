'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Testimonial } from '../database.type'
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js'

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const handleInsert = (payload: RealtimePostgresChangesPayload<Testimonial>) => {
    setTestimonials((prev) => [...prev, payload.new as Testimonial])
  }

  const handleUpdate = (payload: RealtimePostgresChangesPayload<Testimonial>) => {
    setTestimonials((prev) =>
      prev.map((item) =>
        item.id === (payload.new as Testimonial).id ? (payload.new as Testimonial) : item
      )
    )
  }

  const handleDelete = (payload: RealtimePostgresChangesPayload<Testimonial>) => {
    setTestimonials((prev) =>
      prev.filter((item) => item.id !== (payload.old as Testimonial).id)
    )
  }

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .order('order_index')

      if (error) {
        console.error('Error fetching testimonials:', error)
      } else {
        setTestimonials(data || [])
      }
      setLoading(false)
    }

    fetchTestimonials()

    // Subscribe to real-time changes
    const channel = supabase
      .channel('testimonials-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'testimonials',
        },
        handleInsert
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'testimonials',
        },
        handleUpdate
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'testimonials',
        },
        handleDelete
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  return { testimonials, loading }
}
