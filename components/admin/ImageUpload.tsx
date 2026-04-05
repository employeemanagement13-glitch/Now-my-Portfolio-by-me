"use client"

import Image from "next/image"

import { useState, useRef } from 'react'
import { uploadImage } from '@/lib/supabase/proxy'

interface ImageUploadProps {
    bucket: string
    folder?: string
    currentUrl: string | null
    onUpload: (url: string | null) => void
    label?: string
}

export default function ImageUpload({
    bucket,
    folder = '',
    currentUrl,
    onUpload,
    label = 'Upload Image'
}: Readonly<ImageUploadProps>) {
    const [uploading, setUploading] = useState(false)
    const [previewUrl, setPreviewUrl] = useState<string | null>(currentUrl)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('bucket', bucket)
            formData.append('folder', folder)

            const url = await uploadImage(formData)
            setPreviewUrl(url)
            onUpload(url)
        } catch (error) {
            console.error('Upload error:', error)
            alert(error instanceof Error ? error.message : 'Upload failed')
        } finally {
            setUploading(false)
        }
    }

    const handleRemove = () => {
        setPreviewUrl(null)
        onUpload(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    return (
        <div className="space-y-2">
            <label className="block text-gray-300 text-sm font-medium">
                {label}
            </label>

            {previewUrl ? (
                <div className="relative inline-block">
                    <Image
                        src={previewUrl}
                        alt="Preview"
                        width={128}
                        height={128}
                        className="w-32 h-32 object-cover rounded-md border border-gray-600"
                    />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                        ×
                    </button>
                </div>
            ) : (
                <div className="flex items-center justify-center w-full sm:w-32 h-32 border-2 border-dashed border-gray-600 rounded-md bg-gray-800/50">
                    {uploading ? (
                        <div className="text-gray-400 flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Uploading...
                        </div>
                    ) : (
                        <div className="text-gray-500 text-sm">No image</div>
                    )}
                </div>
            )}

            <div className="flex flex-wrap gap-2">
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={uploading}
                    className="hidden"
                    id={`image-upload-${bucket}-${folder}`}
                />
                <label
                    htmlFor={`image-upload-${bucket}-${folder}`}
                    className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors ${uploading
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                        }`}
                >
                    {uploading ? 'Uploading...' : 'Choose File'}
                </label>

                {previewUrl && (
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium bg-red-600/10 hover:bg-red-600/20 text-red-400 transition-colors border border-red-500/20"
                    >
                        Remove
                    </button>
                )}
            </div>
        </div>
    )
}
