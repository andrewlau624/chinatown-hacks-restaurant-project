import OpenAI from "openai";

const groq = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const productInsightPrompt = "Identify if the given product is a Chinese product. If it is, return the details in the following JSON schema. If the product is not Chinese, or cannot be physically consumed or used, return null for all fields. For the product link, perform a web search to find the most accurate and existing page. Verify that the link redirects correctly to the relevant product page and exists on the page's website. If there is not relevant link or the page does not exist on the website, return a google search for it. If you cannot confidently determine if the text identifies a Chinese product, significantly lower the confidence levels. Follow the JSON schema precisely."

export async function getProductInsightCompletion(imageBase64: string) {
    return await groq.responses.create({
        model: "gpt-4o",
        text: {
            "format": {
              "type": "json_schema",
              "name": "chinese_product",
              "strict": true,
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the Chinese product."
                  },
                  "category": {
                    "type": "string",
                    "description": "The category the product belongs to."
                  },
                  "description": {
                    "type": "string",
                    "description": "A description of the Chinese product."
                  },
                  "confidence_percentage": {
                    "type": "integer",
                    "description": "Confidence percentage indicating the reliability of the data."
                  },
                  "benefits": {
                    "type": "string",
                    "description": "Benefits associated with using the Chinese product."
                  },
                  "drawbacks": {
                    "type": "string",
                    "description": "Drawbacks or downsides of using the Chinese product."
                  },
                  "recipes": {
                    "type": "array",
                    "description": "A collection of recipes that include the product.",
                    "items": {
                      "type": "object",
                      "properties": {
                        "name": {
                          "type": "string",
                          "description": "The name of the recipe."
                        },
                        "description": {
                          "type": "string",
                          "description": "A description of the recipe."
                        },
                        "difficulty": {
                          "type": "string",
                          "description": "The difficulty level of the recipe."
                        },
                        "prepTime": {
                          "type": "string",
                          "description": "Preparation time for the recipe."
                        },
                        "ingredients": {
                          "type": "array",
                          "description": "List of ingredients needed for the recipe.",
                          "items": {
                            "type": "string"
                          }
                        },
                        "url": {
                          "type": "string",
                          "description": "A URL link to the recipe."
                        }
                      },
                      "required": [
                        "name",
                        "description",
                        "difficulty",
                        "prepTime",
                        "ingredients",
                        "url"
                      ],
                      "additionalProperties": false
                    }
                  }
                },
                "required": [
                  "name",
                  "category",
                  "description",
                  "confidence_percentage",
                  "benefits",
                  "drawbacks",
                  "recipes"
                ],
                "additionalProperties": false
              }
            }
          },
        input: [
            {
                role: "user",
                content: [
                    {
                        type: "input_text",
                        text: productInsightPrompt
                    },
                    {
                        type: "input_image",
                        image_url: imageBase64,
                        detail: "high"
                    }
                ]
            }
        ],
        tools: [
            {
                type: "web_search_preview",
                search_context_size: "high",
                user_location: {
                    type: "approximate"
                }
            }
        ],
        stream: false,
        temperature: 0.25
    })
}