import OpenAI from "openai";

const groq = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const productInsightPrompt = "Identify if the given product is a Chinese product. If it is, return the details in the following JSON schema. If the product is not Chinese, or cannot be physically consumed or used, return null for all fields. For the product link, perform a google search for the product name. Verify that the link redirects correctly to the google search  as such: https://www.google.com/search?q=[name]. If you cannot confidently determine if the text identifies a Chinese product, significantly lower the confidence levels. Follow the JSON schema precisely."
const restaurantFinderPrompt = "Find a Chinese restaurant in San Francisco, California, using the given food data. Include a diverse selection of both well-known and lesser-known restaurants, not just popular ones. Try to unprioritize Michelin star restaurants and prioritize cost. Verify that the restaurant is currently open and located in San Francisco. All preference combinations are on a scale of 100. If the restaurant offers an unusual or irregular combination of flavors, assign a low confidence score."

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
        temperature: 0.5
    })
}

export async function getRestaurantFinderCompletion(data: any) {
    return await groq.responses.create({
        model: "gpt-4o",
        text: {
            "format": {
              "type": "json_schema",
"name": "restaurant_array",
  "schema": {
    "type": "object",
    "properties": {
      "restaurants": {
        "type": "array",
        "description": "An array of restaurant objects ordered by confidence percentage.",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "The name of the restaurant."
            },
            "description": {
              "type": "string",
              "description": "A brief description of the restaurant and why it matches the taste."
            },
            "address": {
              "type": "string",
              "description": "The exact address of the restaurant."
            },
            "learn_more_link": {
              "type": "string",
              "description": "A link to learn more about the restaurant. If the restaurant has it's own website, link it. Otherwise, link a google search to the website: https://www.google.com/search?q=[name]"
            },
            "tags": {
              "type": "array",
              "description": "An array of tags associated with the restaurant.",
              "items": {
                "type": "string"
              }
            },
            "confidence_percentage": {
              "type": "number",
              "description": "The confidence percentage for the restaurant tastes compared to user preference."
            },
            "cuisine_type": {
              "type": "string",
              "description": "The type of cuisine offered by the restaurant."
            },
            "wait_time": {
              "type": "string",
              "description": "Estimated wait time for getting a table or service. One word only."
            },
            "price_range": {
              "type": "string",
              "description": "Price range of the restaurant represented by $, $$, or $$$.",
              "enum": [
                "$",
                "$$",
                "$$$"
              ]
            }
          },
          "required": [
            "name",
            "description",
            "address",
            "learn_more_link",
            "tags",
            "confidence_percentage",
            "cuisine_type",
            "wait_time",
            "price_range"
          ],
          "additionalProperties": false
        }
      }
    },
    "required": [
      "restaurants"
    ],
    "additionalProperties": false
  },
  "strict": true
            }
          },
        input: [
            {
                role: "user",
                content: [
                    {
                        type: "input_text",
                        text: restaurantFinderPrompt
                    },
                    {
                        type: "input_text",
                        text: data
                    }
                ]
            }
        ],
        tools: [
            {
                type: "web_search_preview",
                search_context_size: "high",
                user_location: {
                    type: "approximate",
                    city: "San Francisco, Chinatown",
                    region: "California",
                    country: "US"
                }
            }
        ],
        stream: false,
        temperature: 1
    })
}