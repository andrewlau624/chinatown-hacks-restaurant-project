"use client"

import { BoxReveal } from "@/components/magicui/box-reveal"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, UtensilsIcon } from "lucide-react"
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

const RestaurantFinder = () => {
  const [open, setOpen] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [result, setResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const formSchema = z.object({
    meal: z.string({
      required_error: "Please select a meal type",
    }),
    sweetness: z.number().min(0).max(100),
    sourness: z.number().min(0).max(100),
    spiciness: z.number().min(0).max(100),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sweetness: 50,
      sourness: 50,
      spiciness: 50,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)

      setOpen(false)
      setIsLoading(false)
      setTimeout(() => setShowResults(true), 500)
    } catch (error) {
      setIsLoading(false)
      console.error("Error fetching restaurant recommendation:", error)
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
              <span className="font-semibold text-white">Artificial Intelligence.</span>
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
        <DialogContent className="sm:max-w-[425px] border-red-200 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-red-700">Restaurant Preferences</DialogTitle>
            <DialogDescription>
              Tell us about your meal preferences to get a personalized recommendation.
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

              <DialogFooter>
                <Button
                  type="submit"
                  className="w-full hover:cursor-pointer bg-red-700 hover:bg-red-600"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Finding your restaurant...
                    </>
                  ) : (
                    "Find My Restaurant"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={showResults} onOpenChange={setShowResults}>
        <DialogContent className="sm:max-w-[425px] border-red-200 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-red-700">Your Restaurant Recommendation</DialogTitle>
            <DialogDescription>Based on your preferences, we recommend:</DialogDescription>
          </DialogHeader>

          <div className="p-6 bg-red-50 rounded-lg text-center border border-red-100 shadow-inner">
            <p className="text-lg font-medium text-red-900">
              {result || "The AI is still thinking about your perfect restaurant match..."}
            </p>
          </div>

          <DialogFooter>
            <Button
              onClick={() => setShowResults(false)}
              className="w-full hover:cursor-pointer bg-red-700 hover:bg-red-600"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default RestaurantFinder

