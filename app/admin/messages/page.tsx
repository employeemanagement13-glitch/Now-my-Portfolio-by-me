"use client"

import { useState, useEffect } from 'react'
import { fetchAllMessages, markMessageRead } from '@/lib/supabase/proxy'

interface Message {
    id: string
    created_at: string
    name: string
    email: string
    message: string
    is_read: boolean
    replied_at: string | null
    reply_message: string | null
    metadata?: Record<string, unknown> | null
}

export default function MessagesAdmin() {
    const [messages, setMessages] = useState<Message[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        loadMessages()
    }, [])

    const loadMessages = async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await fetchAllMessages()
            setMessages((data as Message[]) || [])
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Failed to load messages'
            setError(message)
        } finally {
            setLoading(false)
        }
    }

    const handleMarkRead = async (id: string, currentStatus: boolean) => {
        try {
            await markMessageRead(id, !currentStatus)
            setMessages(prev =>
                prev.map(m => m.id === id ? { ...m, is_read: !currentStatus } : m)
            )
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Failed to update message'
            alert(message)
        }
    }

    if (loading) {
        return <div className="p-8 text-white">Loading messages...</div>
    }

    if (error) {
        return (
            <div className="p-8">
                <div className="bg-red-500/10 text-red-400 p-4 rounded">
                    Error: {error}
                </div>
                <button
                    onClick={loadMessages}
                    className="mt-4 bg-gray-700 text-white px-4 py-2 rounded"
                >
                    Retry
                </button>
            </div>
        )
    }

    const unread = messages.filter(m => !m.is_read).length

    return (
        <div className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h1 className="text-2xl font-bold text-white">
                    Messages ({messages.length})
                    {unread > 0 && (
                        <span className="ml-3 text-sm bg-blue-600 text-white px-2 py-0.5 rounded-full">
                            {unread} unread
                        </span>
                    )}
                </h1>
                <button
                    onClick={loadMessages}
                    className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors text-sm"
                >
                    Refresh
                </button>
            </div>

            {messages.length === 0 ? (
                <div className="text-gray-400 text-center py-16">No messages yet.</div>
            ) : (
                <div className="space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`bg-gray-800 p-4 sm:p-5 rounded-xl border transition-all duration-200 ${message.is_read ? 'border-gray-700 opacity-75' : 'border-blue-500/40 shadow-lg shadow-blue-500/5'}`}
                        >
                            <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                                <div className="flex-1 min-w-0 w-full">
                                    <div className="flex items-center justify-between mb-1 gap-2">
                                        <div className="font-bold text-white truncate text-base">{message.name}</div>
                                        <span className={`sm:hidden shrink-0 w-2 h-2 rounded-full ${message.is_read ? 'bg-gray-600' : 'bg-blue-500 animate-pulse'}`}></span>
                                    </div>
                                    <div className="text-gray-400 text-xs sm:text-sm truncate mb-3">{message.email}</div>
                                    <div className="text-gray-300 text-sm mt-3 [wrap:break-word] [word-break:break-word] leading-relaxed p-3 rounded-lg border border-gray-700/50 bg-gray-900/30">
                                        {message.message}
                                    </div>
                                    <div className="text-gray-500 text-[10px] sm:text-xs mt-4 flex items-center gap-1.5">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {new Date(message.created_at).toLocaleString()}
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleMarkRead(message.id, message.is_read)}
                                    className={`w-full sm:w-auto shrink-0 text-xs font-semibold px-4 py-2.5 rounded-lg transition-all duration-200 ${message.is_read
                                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20'
                                        }`}
                                >
                                    {message.is_read ? 'Mark as Unread' : 'Mark as Read'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
