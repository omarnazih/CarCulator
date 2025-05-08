import Link from 'next/link'
import { Calculator } from 'lucide-react'

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Navigation */}
            <nav className="flex items-center justify-between p-4 md:px-6">
                <div className="flex items-center">
                    <Link href="/" className="text-2xl font-bold text-blue-600 flex items-center">
                        <Calculator className="w-6 h-6 mr-2" />
                        Carculator
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    <Link href="/login" className="text-blue-600 hover:text-blue-700">Login</Link>
                    <Link href="/get-started" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <section className="bg-white rounded-2xl shadow-lg overflow-hidden my-8">
                    <div className="flex flex-col md:flex-row items-center">
                        {/* Left */}
                        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                Track Your Fuel Expenses
                            </h1>
                            <p className="mt-4 text-lg text-gray-600 max-w-xl">
                                The simplest way to monitor your vehicle's fuel consumption and save money on gas.
                            </p>
                            <div className="mt-8">
                                <Link href="/fuel-tracking" className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-yellow-500 transition-colors inline-block">
                                    Start Tracking Now
                                </Link>
                            </div>
                        </div>
                        {/* Right */}
                        <div className="w-full md:w-1/2 p-6">
                            <div className="relative h-full">
                                <img
                                    src="/car.jpg"
                                    alt="Car"
                                    className="w-full h-full object-cover rounded-xl shadow-md"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}
