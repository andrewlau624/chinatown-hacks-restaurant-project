"use client"

import type React from "react"
import ReactHlsPlayer from 'react-hls-player';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  UtensilsIcon,
  BookOpen,
  ChevronRight,
  MapPin,
  ShoppingBag,
  Search,
  Star,
  Clock,
  DollarSign,
  Award,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Hero from "@/components/hero"
import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

import restaurantImage from "@/components/img/chinese_restaurant.png"
import marketImage from "@/components/img/chinese_market.png"
import zyImage from "@/components/img/zy.avif"
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity"

const HomeContent = () => {
  const router = useRouter()
  const playerRef = useRef<any>(null);

  const [searchQuery, setSearchQuery] = useState("")
  const [showVideoPopup, setShowVideoPopup] = useState(false)
  const [videoInfo, setVideoInfo] = useState({ title: "", description: "", url: "", startPos: 0 })

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const query = searchQuery.toLowerCase()

    if(!query)
      return

    const searchRes = await fetch("/api/twelvelabs/searchData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: query }),
    })
    
    const searchData = await searchRes.json()

    if(!searchData)
      return

    const videoRes = await fetch("/api/twelvelabs/videoSearch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: searchData }),
    })
    
    const videoData = await videoRes.json()

      setVideoInfo({
        title: "Featured Video",
        description:
          "Explore this video to learn more about Z & Y Restaurant.",
        url: JSON.parse(videoData.content).videoUrl,
        startPos: searchData.content[0].start
      })
      setShowVideoPopup(true)
  }

  return (
    <div className="relative bg-cover bg-[url(https://images.unsplash.com/photo-1597626697193-f4c4f08b8cdb?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-80% z-0"></div>

      <Hero />
      <VelocityScroll className="text-white/60 font-thin text-sm" defaultVelocity={1}>
        Community. Local Business. Cultural.
      </VelocityScroll>
      <div className="container mx-auto px-4 py-16 relative z-10 mt-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-15 max-w-5xl mx-auto">
          <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300 pt-0 bg-white/95">
            <div className="relative h-64">
              <Image
                src={restaurantImage || "/placeholder.svg"}
                alt="Chinese Restaurant"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">Restaurants</span>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center">
                <UtensilsIcon className="mr-2 h-5 w-5" />
                Restaurant Finder
              </CardTitle>
              <CardDescription>Find the perfect Chinese restaurant based on your taste preferences.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600">Discover local Chinese restaurants with authentic cuisine</p>
                </div>
                <div className="flex items-start">
                  <BookOpen className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600">
                    Get personalized recommendations based on your flavor preferences
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-red-700 hover:bg-red-600 text-white"
                onClick={() => router.push("/restaurant-finder")}
              >
                Find Restaurants
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300 pt-0 bg-white/95">
            <div className="relative h-64">
              <Image src={marketImage || "/placeholder.svg"} alt="Chinese Market" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">Ingredients</span>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Product Insight
              </CardTitle>
              <CardDescription>Learn about authentic Chinese ingredients and their culinary uses.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-start">
                  <BookOpen className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600">
                    Explore traditional Chinese ingredients and their health benefits
                  </p>
                </div>
                <div className="flex items-start">
                  <UtensilsIcon className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600">
                    Discover recipes and cooking techniques for authentic Chinese dishes
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-red-700 hover:bg-red-600 text-white"
                onClick={() => router.push("/product-insight")}
              >
                Explore Ingredients
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-32 max-w-6xl mx-auto">
          <div className="text-center mb-12 bg-white/95 shadow-2xl p-5 rounded-2xl">
            <Badge className="bg-red-600 text-white mb-2">Featured</Badge>
            <h2 className="text-4xl font-bold text-red-800 mb-4">Restaurant of the Week</h2>
            <p className="text-black/80 max-w-2xl mx-auto">
              Each week we highlight an exceptional Chinese restaurant that exemplifies authentic cuisine and cultural
              heritage.
            </p>
          </div>

          <Card className="overflow-hidden border-none shadow-2xl bg-white/95 py-0">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="lg:col-span-2 relative h-80 lg:h-auto">
                <Image
                  src={zyImage}
                  alt="Z & Y Restaurant"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-600 text-white">Szechuan Cuisine</Badge>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <div className="flex items-center space-x-1 bg-black/60 text-white px-2 py-1 rounded-full text-sm">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <Star className="h-3 w-3 fill-slate-400 text-slate-400" />
                    <span className="ml-1">4.1 (3,279)</span>
                  </div>
                  <Badge variant="outline" className="bg-black/60 text-white border-none">
                    <Award className="h-3 w-3 mr-1" /> Michelin Recommended
                  </Badge>
                </div>
              </div>

              <div className="lg:col-span-3 p-6 lg:p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-3xl font-bold text-red-800">Z & Y Restaurant</h3>
                    <p className="text-gray-600 flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1 text-red-600" />
                      655 Jackson St, San Francisco, CA 94133
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center text-gray-600 mb-1">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>11:30 AM - 9:30 PM</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2" />
                      <span>30 and under</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-6">
                  Z & Y Restaurant is a renowned Szechuan restaurant in San Francisco's Chinatown, famous for its
                  authentic and fiery Szechuan cuisine. Chef Han Li Zhao, who previously cooked for government officials
                  in China, brings traditional techniques and bold flavors to signature dishes like Chicken with
                  Explosive Chili Pepper and Tea-Smoked Duck.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white/80 shadow-sm p-3 rounded-lg">
                    <h4 className="font-medium text-red-800 mb-1">Signature Dish</h4>
                    <p className="text-sm text-gray-700">Chicken with Explosive Chili Pepper</p>
                  </div>
                  <div className="bg-white/80 shadow-sm p-3 rounded-lg">
                    <h4 className="font-medium text-red-800 mb-1">Chef's Special</h4>
                    <p className="text-sm text-gray-700">Tan Tan Noodles</p>
                  </div>
                  <div className="bg-white/80 shadow-sm p-3 rounded-lg">
                    <h4 className="font-medium text-red-800 mb-1">Must Try</h4>
                    <p className="text-sm text-gray-700">Peking Duck</p>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-800 mb-3">Search for Video Insights</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Type keywords like "spicy", "seafood", "noodles", or "dishes" to discover video content about Z & Y
                    Restaurant with <b>TwelveLabs'</b> video intelligence platform.
                  </p>
                  <form onSubmit={handleSearch} className="flex gap-2">
                    <Input
                      type="text"
                      maxLength={15}
                      placeholder="Search for videos about Z & Y..."
                      value={searchQuery}
                      onChange={(e:any) => setSearchQuery(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" className="bg-red-700 hover:bg-red-600">
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                  </form>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    className="border-red-200 text-red-700 hover:bg-red-50"
                    onClick={() => window.open("https://www.zandyrestaurant.com", "_blank")}
                  >
                    Visit Website
                  </Button>
                  <Button
                    className="bg-red-700 hover:bg-red-600 text-white"
                    onClick={() =>
                      window.open("https://www.opentable.com/z-and-y-restaurant", "_blank")
                    }
                  >
                    Make Reservation
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Dialog open={showVideoPopup} onOpenChange={setShowVideoPopup}>
        <DialogContent className="w-full max-w-[90%] sm:max-w-2xl mx-auto px-4 sm:px-6 flex flex-col items-center">
          <DialogHeader className="text-center">
            <DialogTitle className="text-xl font-bold text-red-800">{videoInfo.title}</DialogTitle>
            <DialogDescription>{videoInfo.description}</DialogDescription>
          </DialogHeader>

          <div className="w-full flex justify-center items-center mt-2">
            <div className="w-full max-w-3xl aspect-w-16 aspect-h-9 bg-black rounded-md overflow-hidden">
              <ReactHlsPlayer
                className="w-full h-full"
                playerRef={playerRef}
                src={videoInfo.url}
                autoPlay={false}
                controls={true}
                hlsConfig={{ startPosition: videoInfo.startPos }}
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button onClick={() => setShowVideoPopup(false)} className="bg-red-700 hover:bg-red-600">
              Close Video
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default HomeContent

