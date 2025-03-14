import Image from 'next/image'
import Link from 'next/link'
import { BarChart3, DollarSign, Bell, Apple, Smartphone } from 'lucide-react'

export default function Home() {
    return (
        <main>
            {/* Navigation */}
            <nav className="flex items-center justify-between p-4 md:px-6">
                <div className="flex items-center">
                    <Link href="/" className="text-2xl font-bold text-blue-600 flex items-center">
                        <Image src="/logo.png" alt="Carculator Logo" width={32} height={32} className="mr-2" />
                        Carculator
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    <Link href="/features" className="text-gray-600 hover:text-gray-900">Features</Link>
                    <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900">How it Works</Link>
                    <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
                    <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
                    <Link href="/login" className="text-blue-600 hover:text-blue-700">Login</Link>
                    <Link href="/get-started" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="bg-white py-16 md:py-24">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="md:w-1/2 mb-12 md:mb-0">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                Track Your Fuel<br />
                                Expenses Smarter
                            </h1>
                            <p className="text-gray-600 text-lg mb-8">
                                Take control of your vehicle's fuel consumption and expenses with Carculator. The smart way to monitor and optimize your fuel costs.
                            </p>
                            <div className="flex space-x-4">
                                <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700">
                                    Explore Features
                                </button>
                                <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-md hover:bg-blue-50">
                                    Try Demo
                                </button>
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <div className="relative h-[400px] w-full">
                                <Image
                                    src="/phone-mockup.png"
                                    alt="Carculator App Interface"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-16">
                        Everything You Need to Track Your Fuel
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <BarChart3 className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Fuel Analytics</h3>
                            <p className="text-gray-600">
                                Track your fuel consumption patterns and get detailed insights about your vehicle's efficiency.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <DollarSign className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Cost Tracking</h3>
                            <p className="text-gray-600">
                                Monitor your fuel expenses and get monthly reports to help you budget better.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <Bell className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Smart Reminders</h3>
                            <p className="text-gray-600">
                                Get notifications for fuel refills and maintenance based on your driving patterns.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Steps Section */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-16">Get Started in Minutes</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                1
                            </div>
                            <h3 className="font-semibold mb-2">Download App</h3>
                            <p className="text-gray-600">Get Carculator from your app store</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                2
                            </div>
                            <h3 className="font-semibold mb-2">Add Your Vehicle</h3>
                            <p className="text-gray-600">Enter your vehicle details</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                3
                            </div>
                            <h3 className="font-semibold mb-2">Log Fuel Ups</h3>
                            <p className="text-gray-600">Record your fuel purchases</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                4
                            </div>
                            <h3 className="font-semibold mb-2">Track & Save</h3>
                            <p className="text-gray-600">Monitor and optimize costs</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-600 py-16">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-8">Ready to Start Saving?</h2>
                    <p className="text-blue-100 mb-8">Join thousands of users who are saving money with Carculator</p>
                    <div className="flex justify-center space-x-4">
                        <button className="bg-white text-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 flex items-center">
                            <Apple className="w-5 h-5 mr-2" />
                            Download for iOS
                        </button>
                        <button className="bg-white text-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 flex items-center">
                            <Smartphone className="w-5 h-5 mr-2" />
                            Download for Android
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <Link href="/" className="text-2xl font-bold flex items-center mb-4">
                                <Image src="/logo-white.png" alt="Carculator" width={32} height={32} className="mr-2" />
                                Carculator
                            </Link>
                            <p className="text-gray-400">Your smart fuel tracking companion</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Product</h3>
                            <ul className="space-y-2">
                                <li><Link href="/features" className="text-gray-400 hover:text-white">Features</Link></li>
                                <li><Link href="/pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
                                <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Company</h3>
                            <ul className="space-y-2">
                                <li><Link href="/about" className="text-gray-400 hover:text-white">About</Link></li>
                                <li><Link href="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
                                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Legal</h3>
                            <ul className="space-y-2">
                                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy</Link></li>
                                <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                        © 2024 Carculator. All rights reserved.
                    </div>
                </div>
            </footer>
        </main>
    )
}
