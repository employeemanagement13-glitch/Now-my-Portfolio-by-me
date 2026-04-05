"use client" // Add this at the top

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Work } from '../database.type'
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js'

export const useWorks = () => {
  const [works, setWorks] = useState<Work[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const handleInsert = (payload: RealtimePostgresChangesPayload<Work>) => {
    const newWork = payload.new as Work
    if (newWork.is_active) {
      setWorks((prev) => [...prev, newWork])
    }
  }

  const handleUpdate = (payload: RealtimePostgresChangesPayload<Work>) => {
    const updatedWork = payload.new as Work
    setWorks((prev) => {
      if (updatedWork.is_active) {
        return prev.map((item) => (item.id === updatedWork.id ? updatedWork : item))
      }
      return prev.filter((item) => item.id !== updatedWork.id)
    })
  }

  const handleDelete = (payload: RealtimePostgresChangesPayload<Work>) => {
    setWorks((prev) => prev.filter((item) => item.id !== (payload.old as Work).id))
  }

  useEffect(() => {
    const fetchWorks = async () => {
      const { data, error } = await supabase
        .from('works')
        .select('*')
        .eq('is_active', true)
        .order('order_index')

      if (error) {
        console.error('Error fetching works:', error)
      } else {
        setWorks(data || [])
      }
      setLoading(false)
    }

    fetchWorks()

    // Subscribe to real-time changes
    const channel = supabase
      .channel('works-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'works',
        },
        handleInsert
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'works',
        },
        handleUpdate
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'works',
        },
        handleDelete
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  return { works, loading }
}
