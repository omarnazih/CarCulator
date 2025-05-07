import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Calculator } from 'lucide-react'

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
            {/* Navigation */}
            <nav className="flex items-center justify-between p-4 md:px-6">
                <div className="flex items-center">
                    <Link href="/" className="text-2xl font-bold text-blue-600 flex items-center">
                        <Calculator className="w-8 h-8 mr-2" />
                        Carculator
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    <Link href="/login" className="text-blue-600 hover:text-blue-700">Login</Link>
                    <Link href="/get-started" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="container mx-auto px-6 py-20 md:py-32">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                        Track Your Fuel Expenses
                    </h1>
                    <p className="text-xl text-gray-600 mb-12">
                        The simplest way to monitor your vehicle's fuel consumption and save money on gas.
                    </p>
                    <Link
                        href="/fuel-tracking"
                        className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                        Start Tracking Now
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>
            </section>
        </main>
    )
}
