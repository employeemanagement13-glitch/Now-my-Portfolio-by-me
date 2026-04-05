import { SignIn } from '@clerk/nextjs'

export default function AdminLoginPage() {
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="max-w-sm w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
                    <p className="text-gray-400 text-sm">Sign in to manage your portfolio</p>
                </div>
                <SignIn
                    fallbackRedirectUrl="/admin"
                    appearance={{
                        elements: {
                            rootBox: 'mx-auto',
                            card: 'bg-gray-800 border border-gray-700 shadow-xl',
                            headerTitle: 'text-white',
                            headerSubtitle: 'text-gray-400',
                            socialButtonsBlockButton: 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600',
                            formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
                            formFieldInput: 'bg-gray-700 border-gray-600 text-white',
                            formFieldLabel: 'text-gray-300',
                            footerActionLink: 'text-blue-400 hover:text-blue-300',
                            identityPreviewEditButton: 'text-blue-400',
                            formFieldAction: 'text-blue-400',
                        },
                    }}
                />
            </div>
        </div>
    )
}
