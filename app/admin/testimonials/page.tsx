'use client'

import { useState, useEffect, useTransition, useCallback } from 'react'
import {
    fetchAllTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
} from '@/lib/supabase/proxy'
import { Testimonial } from '@/lib/database.type'
import ImageUpload from '@/components/admin/ImageUpload'

export default function TestimonialsAdmin() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        description: '',
        profile_image_url: '' as string | null,
        logo_image_url: '' as string | null,
        order_index: 0,
        is_active: true
    })
    const [editingId, setEditingId] = useState<string | null>(null)

    const loadTestimonials = useCallback(async () => {
        setLoading(true)
        try {
            const data = await fetchAllTestimonials()
            setTestimonials(data || [])
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Failed to load testimonials')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        loadTestimonials()
    }, [loadTestimonials])

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)

        startTransition(async () => {
            try {
                if (editingId) {
                    await updateTestimonial(editingId, formData)
                } else {
                    await createTestimonial(formData)
                }
                resetForm()
                await loadTestimonials()
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : 'Operation failed')
            }
        })
    }

    const handleEdit = (testimonial: Testimonial) => {
        setFormData({
            name: testimonial.name,
            company: testimonial.company,
            description: testimonial.description,
            profile_image_url: testimonial.profile_image_url ?? '',
            logo_image_url: testimonial.logo_image_url ?? '',
            order_index: testimonial.order_index,
            is_active: testimonial.is_active
        })
        setEditingId(testimonial.id)
    }

    const handleDelete = async (id: string) => {
        if (!globalThis.confirm('Are you sure you want to delete this testimonial?')) return
        setError(null)

        startTransition(async () => {
            try {
                await deleteTestimonial(id)
                await loadTestimonials()
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : 'Failed to delete')
            }
        })
    }

    const resetForm = () => {
        setFormData({
            name: '',
            company: '',
            description: '',
            profile_image_url: '',
            logo_image_url: '',
            order_index: 0,
            is_active: true
        })
        setEditingId(null)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-gray-400">Loading testimonials...</div>
            </div>
        )
    }

    let submitButtonText = 'Create Testimonial'
    if (isPending) {
        submitButtonText = 'Saving...'
    } else if (editingId) {
        submitButtonText = 'Update Testimonial'
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-white mb-6">Manage Testimonials</h1>

            {error && (
                <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-gray-800 p-4 sm:p-6 rounded-xl mb-8 border border-gray-700 shadow-xl">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
                    {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-1">Name</label>
                        <input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="company" className="block text-gray-300 text-sm font-medium mb-1">Company</label>
                        <input
                            id="company"
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                            required
                        />
                    </div>

                    <div>
                        <ImageUpload
                            bucket="testimonials"
                            folder="profiles"
                            currentUrl={formData.profile_image_url}
                            onUpload={(url) => setFormData({ ...formData, profile_image_url: url || null })}
                            label="Profile Image"
                        />
                    </div>

                    <div>
                        <ImageUpload
                            bucket="testimonials"
                            folder="logos"
                            currentUrl={formData.logo_image_url}
                            onUpload={(url) => setFormData({ ...formData, logo_image_url: url || null })}
                            label="Company Logo"
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
                        <label htmlFor="is_active" className="text-gray-300 text-sm font-medium uppercase">Is Active</label>
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
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Company</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Order</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Active</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700 bg-gray-800">
                        {testimonials.map((testimonial) => (
                            <tr key={testimonial.id} className="hover:bg-gray-700/30 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                    <div className="flex items-center gap-3">
                                        {testimonial.profile_image_url ? (
                                            <img src={testimonial.profile_image_url} alt={testimonial.name} className="w-8 h-8 rounded-full object-cover border border-gray-600" />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-[10px] text-gray-400 italic">No img</div>
                                        )}
                                        {testimonial.name}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{testimonial.company}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{testimonial.order_index}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${testimonial.is_active ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                        {testimonial.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button type="button" onClick={() => handleEdit(testimonial)} className="text-blue-400 hover:text-blue-300 mr-4 transition-colors">Edit</button>
                                    <button type="button" onClick={() => handleDelete(testimonial.id)} className="text-red-400 hover:text-red-300 transition-colors">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-md">
                        <div className="flex items-center gap-4 mb-4">
                            {testimonial.profile_image_url && (
                                <img src={testimonial.profile_image_url} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border border-gray-600" />
                            )}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-white font-bold truncate">{testimonial.name}</h3>
                                <p className="text-gray-400 text-sm truncate">{testimonial.company}</p>
                            </div>
                            <div className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${testimonial.is_active ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                {testimonial.is_active ? 'Active' : 'Inactive'}
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                            <div className="text-gray-500 text-xs text-center border px-2 py-1 rounded-sm border-gray-700/50">Order: {testimonial.order_index}</div>
                            <div className="flex gap-4">
                                <button type="button" onClick={() => handleEdit(testimonial)} className="text-blue-400 text-sm font-semibold">Edit</button>
                                <button type="button" onClick={() => handleDelete(testimonial.id)} className="text-red-400 text-sm font-semibold">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {testimonials.length === 0 && (
                <div className="bg-gray-800 rounded-xl p-12 text-center border border-gray-700">
                    <p className="text-gray-500">No testimonials yet</p>
                </div>
            )}
        </div>
    )
}
