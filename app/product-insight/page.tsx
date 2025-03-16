"use client"

import type React from "react"

import { useCallback, useRef, useState } from "react"
import Webcam from "react-webcam"
import { Camera, FileUp, RotateCcw, Loader2, ChefHat, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const ProductInsight = () => {
  const [facingMode, setFacingMode] = useState<"user" | { exact: "environment" }>("user")
  const [isProcessing, setIsProcessing] = useState(false)
  const [recognitionResult, setRecognitionResult] = useState<null | {
    productName: string
    confidence: number
    category: string
    description: string
    benefits: string
    drawbacks: string
    recipes?: Array<{
      name: string
      description: string
      difficulty: string
      prepTime: string
      ingredients: string[]
      url: string
    }>
  }>(null)
  const [showResults, setShowResults] = useState(false)

  const camera = useRef<any>(null)

  const capture = useCallback(async () => {
    const imageSrc = camera.current?.getScreenshot()
    if (imageSrc) {
      await processImage(imageSrc)
    }
  }, [camera])

  const processImage = async (imageSrc: string) => {
    setIsProcessing(true)
    setShowResults(false)

    try {
      const res = await fetch("/api/groq/product-insight", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: imageSrc }),
      })

      const data = await res.json()
      const dataContent = JSON.parse(data.content)

      if(dataContent.name == "null")
        setRecognitionResult(null)

      setRecognitionResult({
        productName: dataContent.name,
        confidence: dataContent.confidence_percentage,
        category: dataContent.category,
        description: dataContent.description,
        benefits: dataContent.benefits,
        drawbacks: dataContent.drawbacks,
        recipes: dataContent.recipes,
      })

      setIsProcessing(false)
      setShowResults(true)
    } catch (error) {
      console.error("Error processing image:", error)
      setIsProcessing(false)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] != null) {
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload = (event) => {
        if (event.target?.result) {
          processImage(event.target.result as string)
        }
      }
    }
  }

  const toggleCamera = () => {
    if (facingMode === "user") {
      setFacingMode({ exact: "environment" })
    } else {
      setFacingMode("user")
    }
  }

  const resetResults = () => {
    setShowResults(false)
    setRecognitionResult(null)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background bg-[url(https://img.freepik.com/free-vector/vintage-koi-fish-decorated-background_53876-115220.jpg?t=st=1742080510~exp=1742084110~hmac=1d9d70cae937d84cfe6ae3c59422775d559bb41a5ff30a58f604e0dfa4bc652f&w=1060)] bg-cover bg-no-repeat">
      <div className="mx-auto mt-5">
        <header className="border rounded-full px-10 bg-white w-full shadow-md">
          <div className="container flex items-center h-16 px-4">
            <h1 className="sm:text-xl font-bold md:text">中国产品识别 | Chinese Product Recognition</h1>
            <Badge variant="outline" className="ml-auto">
              Beta
            </Badge>
          </div>
        </header>

        <main className="flex-1 container grid gap-6 py-6 md:grid-cols-2 px-4">
          <Card className="overflow-hidden  shadow-md">
            <CardHeader className="pb-2">
              <CardTitle>Camera View</CardTitle>
              <CardDescription>Position the product in the center of the frame</CardDescription>
            </CardHeader>
            <CardContent className="p-0 relative">
              <div className="relative aspect-video bg-muted">
                <Webcam
                  className={"w-full " + (facingMode === "user" && "scale-x-[-1]")}
                  audio={false}
                  ref={camera}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{ facingMode: facingMode }}
                />

                {isProcessing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="flex flex-col items-center gap-2 text-white">
                      <Loader2 className="h-8 w-8 animate-spin" />
                      <p>Analyzing product...</p>
                    </div>
                  </div>
                )}

                <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full h-12 w-12 shadow-lg"
                    onClick={toggleCamera}
                  >
                    <RotateCcw className="h-6 w-6" />
                  </Button>

                  <Button
                    size="icon"
                    variant="default"
                    className="rounded-full h-16 w-16 shadow-lg"
                    onClick={capture}
                    disabled={isProcessing}
                  >
                    <Camera className="h-8 w-8" color="#FFFFFF" />
                  </Button>

                  <div className="relative">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full h-12 w-12 shadow-lg"
                      disabled={isProcessing}
                      asChild
                    >
                      <label htmlFor="content">
                        <FileUp className="h-6 w-6" />
                      </label>
                    </Button>
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      id="content"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {showResults && recognitionResult ? (
              <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full grid-cols-2 shadow-md">
                  <TabsTrigger value="info">Product Info</TabsTrigger>
                  <TabsTrigger value="recipes">Recipes</TabsTrigger>
                </TabsList>
                <TabsContent value="info" className="mt-4">
                  <Card className=" shadow-md">
                    <CardHeader>
                      <CardTitle>Product Information</CardTitle>
                      <CardDescription>{ recognitionResult.productName ? "Product successfully identified" : "No product found"}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold">{recognitionResult.productName}</h3>
                          <Badge variant={recognitionResult.confidence > 90 ? "default" : "secondary"}>
                            {recognitionResult.confidence}% match
                          </Badge>
                        </div>

                        <Separator />

                        <div className="grid gap-2">
                          <div className="grid grid-cols-3 gap-1">
                            <p className="text-sm font-medium">Category:</p>
                            <p className="text-sm col-span-2">{recognitionResult.category}</p>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <p className="text-sm font-medium mb-1">Description:</p>
                          <p className="text-sm">{recognitionResult.description}</p>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-1">Benefits:</p>
                          <p className="text-sm">{recognitionResult.benefits}</p>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-1">Drawbacks:</p>
                          <p className="text-sm">{recognitionResult.drawbacks}</p>
                        </div>

                        <Button variant="outline" onClick={resetResults} className="w-full mt-4">
                          Scan Another Product
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="recipes" className="mt-4">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center">
                        <ChefHat className="mr-2 h-5 w-5" />
                        <CardTitle>Recipes with {recognitionResult.productName}</CardTitle>
                      </div>
                      <CardDescription>Discover delicious ways to use this product in your cooking</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {recognitionResult.recipes && recognitionResult.recipes.length > 0 ? (
                          recognitionResult.recipes.map((recipe, index) => (
                            <div key={index} className="space-y-3">
                              <div>
                                <h3 className="text-lg font-semibold">{recipe.name}</h3>
                                <div className="flex gap-2 mt-1">
                                  <Badge variant="outline">{recipe.difficulty}</Badge>
                                  <Badge variant="outline">{recipe.prepTime}</Badge>
                                </div>
                              </div>
                              <p className="text-sm">{recipe.description}</p>

                              <div>
                                <p className="text-sm font-medium mb-1">Key Ingredients:</p>
                                <ul className="text-sm list-disc pl-5 space-y-1">
                                  {recipe.ingredients.slice(0, 3).map((ingredient, idx) => (
                                    <li key={idx}>{ingredient}</li>
                                  ))}
                                  {recipe.ingredients.length > 3 && (
                                    <li>And {recipe.ingredients.length - 3} more...</li>
                                  )}
                                </ul>
                              </div>

                              <Button variant="outline" size="sm" className="gap-1" asChild>
                                <a href={recipe.url} target="_blank" rel="noopener noreferrer">
                                  <span>Learn More</span>
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              </Button>

                              {recognitionResult.recipes && index < recognitionResult.recipes.length - 1 && <Separator className="my-3" />}
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-6 text-muted-foreground">
                            <ChefHat className="h-12 w-12 mx-auto mb-3 opacity-20" />
                            <p>No recipes found for this product</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Product Information</CardTitle>
                  <CardDescription>
                    {isProcessing
                      ? "Processing image and identifying product..."
                      : "Capture or upload an image to identify a Chinese product"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!isProcessing ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                      <Camera className="h-12 w-12 mb-4 opacity-20" />
                      <p>No product scanned yet</p>
                      <p className="text-sm mt-2">Use the camera to scan a Chinese product or upload an image</p>
                    </div>
                  ) : (
                    <div className="space-y-4 py-6">
                      <Progress value={45} className="h-2" />
                      <p className="text-center text-sm text-muted-foreground">
                        Processing image and identifying product...
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>How to Use</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Position the Chinese product in the center of the camera view</li>
                  <li>Make sure the product label is clearly visible and well-lit</li>
                  <li>Click the camera button to capture the image</li>
                  <li>Wait for the analysis to complete</li>
                  <li>View detailed product information and recipe suggestions</li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ProductInsight

