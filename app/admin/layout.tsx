import { currentUser } from '@clerk/nextjs/server'
import AdminNavbar from '@/components/admin/AdminNavbar'
import Link from 'next/link'

const ADMIN_EMAILS = new Set([
    'shehzilshahzad14@gmail.com',
    'silentboys1117@gmail.com',
])

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const user = await currentUser()

    // No user = proxy.ts middleware already handles redirecting protected routes.
    // For /admin/login specifically (not protected by middleware), just render children.
    if (!user) {
        return <>{children}</>
    }

    const email = user.emailAddresses?.[0]?.emailAddress
    const isAdmin = email && ADMIN_EMAILS.has(email.toLowerCase())

    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
                <div className="max-w-md text-center">
                    <div className="w-16 h-16 mx-auto mb-6 bg-red-500/10 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
                    <p className="text-gray-400 mb-6">
                        Your email <span className="text-gray-300 font-medium">{email}</span> is not authorized to access the admin panel.
                    </p>
                    <Link
                        href="/"
                        className="inline-block bg-gray-700 hover:bg-gray-600 text-white px-6 py-2.5 rounded-lg transition-colors"
                    >
                        Go to Homepage
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            <AdminNavbar />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto">
                {children}
            </main>
        </div>
    )
}

