"use client"

import type React from "react"

import { useCallback, useRef, useState } from "react"
import Webcam from "react-webcam"
import { Camera, FileUp, RotateCcw, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

const ProductInsight = () => {
  const [facingMode, setFacingMode] = useState<"user" | { exact: "environment" }>("user")
  const [isProcessing, setIsProcessing] = useState(false)
  const [recognitionResult, setRecognitionResult] = useState<null | {
    productName: string
    confidence: number
    manufacturer: string
    origin: string
    category: string
    description: string
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

    // Simulate API call for product recognition
    setTimeout(() => {
      // Mock result - in a real app, this would come from an API
      setRecognitionResult({
        productName: "茅台飞天 (Moutai Flying Fairy)",
        confidence: 94,
        manufacturer: "贵州茅台酒股份有限公司",
        origin: "中国贵州省",
        category: "白酒 (Baijiu)",
        description: "茅台飞天是中国著名的高端白酒，采用优质高粱、小麦、水为原料，经传统工艺酿造而成。",
      })
      setIsProcessing(false)
      setShowResults(true)
    }, 2000)
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
    <div className="flex flex-col min-h-screen bg-background">
        <div className="mx-auto">
      <header className="border-b">
        <div className="container flex items-center h-16 px-4">
          <h1 className="text-xl font-bold">中国产品识别 | Chinese Product Recognition</h1>
          <Badge variant="outline" className="ml-auto">
            Beta
          </Badge>
        </div>
      </header>

      <main className="flex-1 container grid gap-6 py-6 md:grid-cols-2 px-4">
        <Card className="overflow-hidden">
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
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
              <CardDescription>
                {showResults
                  ? "Product successfully identified"
                  : "Capture or upload an image to identify a Chinese product"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!showResults && !isProcessing && (
                <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                  <Camera className="h-12 w-12 mb-4 opacity-20" />
                  <p>No product scanned yet</p>
                  <p className="text-sm mt-2">Use the camera to scan a Chinese product or upload an image</p>
                </div>
              )}

              {isProcessing && (
                <div className="space-y-4 py-6">
                  <Progress value={45} className="h-2" />
                  <p className="text-center text-sm text-muted-foreground">
                    Processing image and identifying product...
                  </p>
                </div>
              )}

              {showResults && recognitionResult && (
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
                      <p className="text-sm font-medium">Manufacturer:</p>
                      <p className="text-sm col-span-2">{recognitionResult.manufacturer}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <p className="text-sm font-medium">Origin:</p>
                      <p className="text-sm col-span-2">{recognitionResult.origin}</p>
                    </div>
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

                  <Button variant="outline" onClick={resetResults} className="w-full mt-4">
                    Scan Another Product
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Position the Chinese product in the center of the camera view</li>
                <li>Make sure the product label is clearly visible and well-lit</li>
                <li>Click the camera button to capture the image</li>
                <li>Wait for the analysis to complete</li>
                <li>View detailed product information in the results panel</li>
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

