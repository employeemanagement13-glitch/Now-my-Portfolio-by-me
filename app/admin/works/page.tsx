'use client'

import { useState, useEffect, useTransition, useCallback } from 'react'
import {
    fetchAllWorks,
    createWork,
    updateWork,
    deleteWork,
} from '@/lib/supabase/proxy'
import { Work } from '@/lib/database.type' // Fixed import path
import ImageUpload from '@/components/admin/ImageUpload'

export default function WorksAdmin() {
    const [works, setWorks] = useState<Work[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    // Include link field in formData
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        image_url: '' as string | null,
        icon_svg: '' as string | null,
        link: '' as string | null, // Add this field
        order_index: 0,
        is_active: true
    })

    const [editingId, setEditingId] = useState<string | null>(null)

    const loadWorks = useCallback(async () => {
        setLoading(true)
        try {
            const data = await fetchAllWorks()
            setWorks(data || [])
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Failed to load works')
            console.error('Load works error:', err)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        loadWorks()
    }, [loadWorks])

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)

        startTransition(async () => {
            try {
                if (editingId) {
                    await updateWork(editingId, formData)
                } else {
                    await createWork(formData)
                }
                resetForm()
                await loadWorks()
            } catch (err: unknown) {
                const errorMessage = err instanceof Error ? err.message : 'Operation failed'
                setError(errorMessage)
                console.error('Submit error:', err)
            }
        })
    }

    const handleEdit = (work: Work) => {
        setFormData({
            title: work.title,
            description: work.description,
            category: work.category,
            image_url: work.image_url ?? '',
            icon_svg: work.icon_svg ?? '',
            link: work.link ?? '', // Add this field
            order_index: work.order_index,
            is_active: work.is_active
        })
        setEditingId(work.id)
    }

    const handleDelete = async (id: string) => {
        if (!globalThis.confirm('Are you sure you want to delete this work?')) return
        setError(null)

        startTransition(async () => {
            try {
                await deleteWork(id)
                await loadWorks()
            } catch (err: unknown) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to delete'
                setError(errorMessage)
                console.error('Delete error:', err)
            }
        })
    }

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            category: '',
            image_url: '',
            icon_svg: '',
            link: '', // Add this field
            order_index: 0,
            is_active: true
        })
        setEditingId(null)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-gray-400">Loading works...</div>
            </div>
        )
    }

    let submitButtonText = 'Create Work'
    if (isPending) {
        submitButtonText = 'Saving...'
    } else if (editingId) {
        submitButtonText = 'Update Work'
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-white mb-6">Manage Works</h1>

            {error && (
                <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-gray-800 p-4 sm:p-6 rounded-xl mb-8 border border-gray-700 shadow-xl">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
                    {editingId ? 'Edit Work' : 'Add New Work'}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="title" className="block text-gray-300 text-sm font-medium mb-1">Title</label>
                        <input
                            id="title"
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-gray-300 text-sm font-medium mb-1">Category</label>
                        <input
                            id="category"
                            type="text"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="link" className="block text-gray-300 text-sm font-medium mb-1">Link (Optional)</label>
                        <input
                            id="link"
                            type="url"
                            value={formData.link ?? ''}
                            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                            placeholder="https://example.com"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <ImageUpload
                            bucket="works"
                            folder="images"
                            currentUrl={formData.image_url}
                            onUpload={(url) => setFormData({ ...formData, image_url: url || null })}
                            label="Work Image"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="icon_svg" className="block text-gray-300 text-sm font-medium mb-1">Icon SVG</label>
                        <textarea
                            id="icon_svg"
                            value={formData.icon_svg ?? ''}
                            onChange={(e) => setFormData({ ...formData, icon_svg: e.target.value })}
                            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white font-mono text-xs"
                            rows={3}
                            placeholder="Paste SVG markup here..."
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="description" className="block text-gray-300 text-sm font-medium mb-1">Description</label>
                        <textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                            rows={3}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="order_index" className="block text-gray-300 text-sm font-medium mb-1">Order Index</label>
                        <input
                            id="order_index"
                            type="number"
                            value={formData.order_index}
                            onChange={(e) => setFormData({ ...formData, order_index: Number.parseInt(e.target.value, 10) || 0 })}
                            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            id="is_active"
                            type="checkbox"
                            checked={formData.is_active}
                            onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                            className="mr-2"
                        />
                        <label htmlFor="is_active" className="text-gray-300 text-sm font-medium">Is Active</label>
                    </div>
                </div>

                <div className="flex space-x-3">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md transition-colors"
                    >
                        {submitButtonText}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-xl">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-900/50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Link</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Order</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Active</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700 bg-gray-800">
                        {works.map((work) => (
                            <tr key={work.id} className="hover:bg-gray-700/30 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                    <div className="flex items-center gap-3">
                                        {work.image_url ? (
                                            <img src={work.image_url} alt={work.title} className="w-10 h-10 rounded object-cover border border-gray-700 shadow-sm" />
                                        ) : (
                                            <div className="w-10 h-10 rounded bg-gray-700 flex items-center justify-center text-[10px] text-gray-500 italic">No img</div>
                                        )}
                                        {work.title}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    <span className="px-2 py-0.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded text-[10px]">{work.category}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    {work.link ? (
                                        <a href={work.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline inline-flex items-center gap-1">
                                            View <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                                        </a>
                                    ) : (
                                        <span className="text-gray-600 text-xs italic">No link</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">{work.order_index}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${work.is_active ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                        {work.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button type="button" onClick={() => handleEdit(work)} className="text-blue-400 hover:text-blue-300 mr-4 transition-colors">Edit</button>
                                    <button type="button" onClick={() => handleDelete(work.id)} className="text-red-400 hover:text-red-300 transition-colors">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {works.map((work) => (
                    <div key={work.id} className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-md">
                        <div className="flex items-start gap-4 mb-4">
                            {work.image_url && (
                                <img src={work.image_url} alt={work.title} className="w-16 h-16 rounded object-cover border border-gray-700" />
                            )}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-white font-bold truncate">{work.title}</h3>
                                <p className="text-xs text-gray-500 mb-2">{work.category}</p>
                                <div className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${work.is_active ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                    {work.is_active ? 'Active' : 'Inactive'}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                            <div className="flex gap-4">
                                {work.link && (
                                    <a href={work.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 text-xs flex items-center hover:text-white">
                                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                                        Visit
                                    </a>
                                )}
                                <span className="text-gray-600 text-xs">Order: {work.order_index}</span>
                            </div>
                            <div className="flex gap-4">
                                <button type="button" onClick={() => handleEdit(work)} className="text-blue-400 text-sm font-semibold">Edit</button>
                                <button type="button" onClick={() => handleDelete(work.id)} className="text-red-400 text-sm font-semibold">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {works.length === 0 && (
                <div className="bg-gray-800 rounded-xl p-12 text-center border border-gray-700">
                    <p className="text-gray-500">No works yet</p>
                </div>
            )}
        </div>
    )
}
