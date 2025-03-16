import { TwelveLabs } from 'twelvelabs-js'

const client = new TwelveLabs({
    apiKey: process.env.TWELVELABS_API_KEY!
})

export async function returnSearchData(data: any) {
    const result = await client.search.query({
        indexId: "67d5bc1b7544793220a52e06",
        queryText: "hot pot",
        options: ["visual", "audio"]
      });

      console.log(result.data)

    const video = await client.index.video.retrieve(
        "<YOUR_INDEX_ID>",
        "<YOUR_VIDEO_ID>",
        { embed: true }
      );

    return result.data
}
