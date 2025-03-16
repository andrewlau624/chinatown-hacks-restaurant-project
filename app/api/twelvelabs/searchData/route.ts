import { returnSearchData } from "@/lib/utils/twelvelabs"

export async function POST(req: Request) {
    const input = await req.json()
    try {
        const data = await returnSearchData(input.content)

        return Response.json({
            content: data
        })
    } catch(e) {
        console.log(e)
        return Response.json({content: "An unexpected error occured. Please try again."})
    }
}