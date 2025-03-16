"use client"

import { BoxReveal } from "@/components/magicui/box-reveal"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Clock, ExternalLink, Loader2, MapPin, UtensilsIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface Restaurant {
  name: string
  description: string
  address: string
  learn_more_link: string
  tags: string[]
  confidence_percentage: number
  cuisine_type: string
  wait_time: string
  price_range: "$" | "$$" | "$$$"
}

interface RestaurantResponse {
  restaurants: Restaurant[]
}

const RestaurantFinder = () => {
  const [open, setOpen] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [result, setResult] = useState<RestaurantResponse | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const formSchema = z.object({
    meal: z.string({ required_error: "Please select a meal type" }),
    sweetness: z.number().min(0).max(100),
    sourness: z.number().min(0).max(100),
    spiciness: z.number().min(0).max(100),
    bitterness: z.number().min(0).max(100),
    saltiness: z.number().min(0).max(100),
    umami: z.number().min(0).max(100),
    texture: z.string().optional(),
    temperature: z.string().optional(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sweetness: 50,
      sourness: 50,
      spiciness: 50,
      bitterness: 50,
      saltiness: 50,
      umami: 50,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)

      const res = await fetch("/api/groq/restaurant-finder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: JSON.stringify(values) }),
      })

      const data = await res.json()

      setResult(JSON.parse(data.content))
      setCurrentIndex(0) 

      setOpen(false)
      setIsLoading(false)
      setTimeout(() => setShowResults(true), 500)
    } catch (error) {
      setIsLoading(false)
      console.error("Error fetching restaurant recommendations:", error)
    }
  }

  const nextRestaurant = () => {
    if (result && currentIndex < result.restaurants.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const prevRestaurant = () => {
    if (result && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <div className="flex flex-col overflow-hidden min-h-screen bg-background bg-[url(https://images.unsplash.com/photo-1578762857609-6ffbcb8b4642?q=80&w=1927&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-no-repeat after:absolute after:inset-0 after:bg-black/60">
      <div className="mx-auto mt-[6.5rem] w-9/12 sm:w-11/12 z-10 relative">
        <BoxReveal boxColor={"#e00700"} duration={0.5}>
          <p className="text-[10vw] font-semibold text-white">
            Restaurant Finder<span className="text-red-600">.</span>
          </p>
        </BoxReveal>

        <BoxReveal boxColor={"#e00700"} duration={0.5}>
          <h2 className="mt-[.5rem] text-[2rem] text-white">Discover the perfect restaurant for you through AI.</h2>
        </BoxReveal>

        <BoxReveal boxColor={"#e00700"} duration={0.5}>
          <div className="mt-6">
            <p className="text-[1.2rem] text-white">
              Fill out a short survey and your restaurant preference will be decided by{" "}
              <span className="font-semibold text-white">ChatGPT 4o.</span>
              <br />
            </p>
          </div>
        </BoxReveal>

        <BoxReveal boxColor={"#e00700"} duration={0.5}>
          <div className="mt-10">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-red-800 hover:bg-red-600 hover:cursor-pointer shadow-lg hover:shadow-red-200/50 transition-all duration-300"
              onClick={() => setOpen(true)}
            >
              <UtensilsIcon className="mr-2 h-5 w-5" />
              Find My Restaurant
            </Button>
          </div>
        </BoxReveal>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full max-w-[90vw] sm:max-w-[425px] max-h-[80vh] overflow-y-auto overflow-x-hidden border-red-200 shadow-lg p-4 sm:p-6 no-scrollbar">
          <DialogHeader>
            <DialogTitle className="text-red-700">Restaurant Preferences</DialogTitle>
            <DialogDescription>
              Tell us about your meal preferences to get personalized recommendations.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="meal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meal Type</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="hover:cursor-pointer">
                          <SelectValue placeholder="Select a meal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem className="hover:cursor-pointer" value="Breakfast">
                            Breakfast
                          </SelectItem>
                          <SelectItem className="hover:cursor-pointer" value="Lunch">
                            Lunch
                          </SelectItem>
                          <SelectItem className="hover:cursor-pointer" value="Dinner">
                            Dinner
                          </SelectItem>
                          <SelectItem className="hover:cursor-pointer" value="Snack">
                            Snack
                          </SelectItem>
                          <SelectItem className="hover:cursor-pointer" value="Dessert">
                            Dessert
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sweetness"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sweetness Preference</FormLabel>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Less Sweet</span>
                      <FormControl>
                        <Slider
                          min={0}
                          max={100}
                          step={1}
                          value={[field.value]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                          className="flex-1 hover:cursor-pointer"
                        />
                      </FormControl>
                      <span className="text-sm text-muted-foreground">More Sweet</span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sourness"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sourness Preference</FormLabel>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Less Sour</span>
                      <FormControl>
                        <Slider
                          min={0}
                          max={100}
                          step={1}
                          value={[field.value]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                          className="flex-1 hover:cursor-pointer"
                        />
                      </FormControl>
                      <span className="text-sm text-muted-foreground">More Sour</span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="spiciness"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Spiciness Preference</FormLabel>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Less Spicy</span>
                      <FormControl>
                        <Slider
                          min={0}
                          max={100}
                          step={1}
                          value={[field.value]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                          className="flex-1 hover:cursor-pointer"
                        />
                      </FormControl>
                      <span className="text-sm text-muted-foreground">More Spicy</span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bitterness"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bitterness Preference</FormLabel>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Less Bitter</span>
                      <FormControl>
                        <Slider
                          min={0}
                          max={100}
                          step={1}
                          value={[field.value]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                          className="flex-1 hover:cursor-pointer"
                        />
                      </FormControl>
                      <span className="text-sm text-muted-foreground">More Bitter</span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="saltiness"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Saltiness Preference</FormLabel>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Less Salty</span>
                      <FormControl>
                        <Slider
                          min={0}
                          max={100}
                          step={1}
                          value={[field.value]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                          className="flex-1 hover:cursor-pointer"
                        />
                      </FormControl>
                      <span className="text-sm text-muted-foreground">More Salty</span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="umami"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Umami Preference</FormLabel>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Less Umami</span>
                      <FormControl>
                        <Slider
                          min={0}
                          max={100}
                          step={1}
                          value={[field.value]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                          className="flex-1 hover:cursor-pointer"
                        />
                      </FormControl>
                      <span className="text-sm text-muted-foreground">More Umami</span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="texture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Texture Preference (Optional)</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select texture" />
                        </SelectTrigger>
                        <SelectContent>
                          {["Crunchy", "Creamy", "Chewy", "Soft", "Crispy"].map((texture) => (
                            <SelectItem key={texture} value={texture}>
                              {texture}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="temperature"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Temperature Preference (Optional)</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select temperature" />
                        </SelectTrigger>
                        <SelectContent>
                          {["Hot", "Warm", "Cold", "Room Temperature"].map((temp) => (
                            <SelectItem key={temp} value={temp}>
                              {temp}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="submit"
                  className="w-full hover:cursor-pointer bg-red-700 hover:bg-red-600"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Finding restaurants...
                    </>
                  ) : (
                    "Find Restaurants"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={showResults} onOpenChange={setShowResults}>
        <DialogContent className="w-full max-w-[90vw] sm:max-w-[550px] max-h-[80vh] overflow-y-auto overflow-x-hidden border-red-200 shadow-lg p-0 no-scrollbar">
          <div className="bg-gradient-to-r from-red-800 to-red-900 text-white p-6 rounded-t-lg">
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl font-bold">Your Restaurant Matches</DialogTitle>
              <DialogDescription className="text-red-100">
                Based on your taste preferences, we recommend:
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="p-6">
            {result && result.restaurants.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <Badge variant="outline" className="bg-red-50 text-red-800 border-red-200">
                      {currentIndex + 1} of {result.restaurants.length}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={prevRestaurant}
                      disabled={currentIndex === 0}
                      className="h-8 w-8 p-0 border-red-200"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Previous</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={nextRestaurant}
                      disabled={currentIndex === result.restaurants.length - 1}
                      className="h-8 w-8 p-0 border-red-200"
                    >
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">Next</span>
                    </Button>
                  </div>
                </div>

                <Card className="border-red-200 shadow-md overflow-hidden pt-0">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
                    <img
                      src="https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1932&auto=format&fit=crop"
                      alt="Restaurant"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 z-20">
                      <Badge className="bg-red-600 text-white hover:bg-red-700">
                        {result.restaurants[currentIndex].cuisine_type}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl font-bold text-red-800">
                        {result.restaurants[currentIndex].name}
                      </CardTitle>
                      <div className="flex flex-col items-end">
                        <span className="text-sm text-gray-500">Confidence</span>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={result.restaurants[currentIndex].confidence_percentage}
                            className="w-24 h-2"
                          />
                          <span className="text-sm font-medium">
                            {result.restaurants[currentIndex].confidence_percentage}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pb-2">
                    <p className="text-gray-700 mb-4">{result.restaurants[currentIndex].description}</p>

                    <div className="flex items-start space-x-2 mb-4">
                      <MapPin className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-600">{result.restaurants[currentIndex].address}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {result.restaurants[currentIndex].tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-red-50 text-red-800 border-red-200">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Separator className="my-4 bg-red-100" />

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-gray-500 text-xs">Price Range</p>
                        <p className="font-medium">{result.restaurants[currentIndex].price_range}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Cuisine</p>
                        <p className="font-medium">{result.restaurants[currentIndex].cuisine_type}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Wait Time</p>
                        <div className="flex items-center justify-center">
                          <Clock className="h-3 w-3 mr-1 text-gray-500" />
                          <p className="font-medium">{result.restaurants[currentIndex].wait_time}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-2">
                    <Button
                      className="w-full bg-red-700 hover:bg-red-600 text-white"
                      onClick={() => window.open(result.restaurants[currentIndex].learn_more_link, "_blank")}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Learn More
                    </Button>
                  </CardFooter>
                </Card>
              </>
            ) : (
              <div className="p-6 bg-red-50 rounded-lg text-center border border-red-100 shadow-inner">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-red-600" />
                <p className="text-lg font-medium text-red-900">Finding your perfect restaurant matches...</p>
              </div>
            )}

            <div className="mt-6 text-center">
              <Button
                onClick={() => setShowResults(false)}
                variant="outline"
                className="border-red-200 text-red-700 hover:bg-red-50"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default RestaurantFinder

