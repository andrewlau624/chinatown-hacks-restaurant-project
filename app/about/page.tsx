"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { ChefHat, Utensils, Store, Users, ScrollText, MapPin } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://live.staticflickr.com/8491/8298064531_7837611209_b.jpg')",
            backgroundPosition: "center 70%",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40" />

        <div className="relative h-full flex flex-col items-center justify-center px-4 text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Celebrating Chinese Culinary Heritage
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Connecting communities through authentic flavors and cultural traditions
          </p>
          <div className="mt-10">
            <Link
              href="/restaurant-finder"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors duration-300"
            >
              Explore Our Cuisine
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image src="/Seasoning.png" alt="Traditional Chinese Seasonings" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="px-3 py-1 bg-red-600 rounded-full text-sm font-medium">Our Heritage</span>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Mission</h2>
              <div className="text-lg text-gray-700 leading-relaxed space-y-4">
                <p>
                  We're building a digital bridge between Chinatown supermarkets and home kitchens to demystify
                  traditional Chinese ingredients and cooking techniques.
                </p>
                <div className="pl-4 border-l-4 border-red-600">
                  <p className="text-gray-600 italic">
                    "Re-understanding seasonings through the lens—making each spice a cultural ambassador that tells the
                    story of our community."
                  </p>
                </div>
                <p>
                  Through our platform, we aim to preserve culinary traditions while supporting local businesses that
                  form the backbone of our community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">Core Features</h2>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-16">
            Innovative tools designed to connect you with authentic Chinese cuisine
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard
              icon={<Utensils className="w-8 h-8 text-red-600" />}
              title="Chinese Products Scanner"
              content="Real-time analysis of Chinese specialty products, providing benefits, categories, and cooking instructions to help you explore new ingredients with confidence."
            />
            <FeatureCard
              icon={<MapPin className="w-8 h-8 text-red-600" />}
              title="Restaurant Finder"
              content="From spicy Sichuan to delicate Cantonese, our intelligent system matches your taste preferences with the best authentic restaurants in San Francisco."
            />
          </div>
        </div>
      </section>

      {/* Cultural Value */}
      <section className="py-20 bg-red-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">Cultural Impact</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-6">
                <div className="bg-red-100 p-3 rounded-full">
                  <ScrollText className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold ml-4">Cultural Preservation</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Digitally preserving traditional cooking techniques</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Visual storytelling of the history behind each dish</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Connecting generations of culinary heritage</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-6">
                <div className="bg-red-100 p-3 rounded-full">
                  <Store className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold ml-4">Community Support</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Increasing customer flow to Chinese businesses in SF</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Providing convenience to both businesses and shoppers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Weekly cultural-themed restaurant highlights</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Difference */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">What Makes Us Different</h2>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-16">
            We go beyond recipes to create meaningful connections with Chinese culinary culture
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            <AdvantageItem
              icon={<Users className="w-6 h-6 text-red-600" />}
              title="Deep Cultural Connection"
              content="We don't just share recipes – we tell the immigration stories and cultural journeys behind each dish, connecting you to generations of tradition."
            />
            <AdvantageItem
              icon={<ChefHat className="w-6 h-6 text-red-600" />}
              title="Intelligent Flavor Matching"
              content="Using machine learning to analyze your taste preferences, we recommend the most suitable restaurants and cooking approaches tailored just for you."
            />
          </div>
          <div className="mt-16 text-center">
            <Link
              href="/restaurant-finder"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full 
                       transition-colors duration-300 text-lg font-medium inline-flex items-center"
            >
              Start Your Culinary Journey
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

// Feature Card Component
function FeatureCard({ icon, title, content }: { icon: React.ReactNode; title: string; content: string }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl font-bold mb-4 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{content}</p>
    </div>
  )
}

// Advantage Item Component
function AdvantageItem({ icon, title, content }: { icon: React.ReactNode; title: string; content: string }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-bold ml-3 text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600 leading-relaxed">{content}</p>
    </div>
  )
}

