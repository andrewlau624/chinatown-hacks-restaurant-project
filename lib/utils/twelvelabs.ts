import { TwelveLabs } from 'twelvelabs-js'

const client = new TwelveLabs({
    apiKey: process.env.TWELVELABS_API_KEY!
})

export async function returnSearchData(data: string) {
    const result = await client.search.query({
        indexId: process.env.TWELVELABS_INDEX_ID!,
        queryText: data,
        options: ["visual", "audio"]
    });

    return result.data
}

export async function returnVideoData(data: any) {
    const videoLinks = await client.index.video.retrieve(
        process.env.TWELVELABS_INDEX_ID!,
        data.content[0].videoId,
        { embed: true }
    );

    return videoLinks.hls
}
