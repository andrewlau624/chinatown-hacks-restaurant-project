import { getRestaurantFinderCompletion } from "@/lib/utils/groq"

export async function POST(req: Request) {
    const input = await req.json()

    try {
        const chatCompletion = await getRestaurantFinderCompletion(input.content)
        return Response.json({
            content: chatCompletion.output_text || ""
        })
    } catch(e) {
        console.log(e)
        return Response.json({content: "An unexpected error occured. Please try again."})
    }
}