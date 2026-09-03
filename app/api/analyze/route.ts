// Open AI- chatgtp code

// import OpenAI from "openai";
// import { NextResponse } from "next/server";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const error = body.error;

//     if (!error || typeof error !== "string") {
//       return NextResponse.json(
//         {
//           error: "Please provide a valid error message.",
//         },
//         {
//           status: 400,
//         }
//       );
//     }

//     const response = await openai.responses.create({
//       model: "gpt-5",
//       input: `
// You are an expert software debugging assistant.

// Analyze the following software error and provide a practical explanation.

// Error:
// ${error}
//       `,
//       text: {
//         format: {
//           type: "json_schema",
//           name: "debug_result",
//           strict: true,
//           schema: {
//             type: "object",
//             properties: {
//               category: {
//                 type: "string",
//               },
//               severity: {
//                 type: "string",
//                 enum: ["LOW", "MEDIUM", "HIGH"],
//               },
//               title: {
//                 type: "string",
//               },
//               rootCause: {
//                 type: "string",
//               },
//               explanation: {
//                 type: "string",
//               },
//               possibleFixes: {
//                 type: "array",
//                 items: {
//                   type: "string",
//                 },
//               },
//               recommendedFix: {
//                 type: "string",
//               },
//             },
//             required: [
//               "category",
//               "severity",
//               "title",
//               "rootCause",
//               "explanation",
//               "possibleFixes",
//               "recommendedFix",
//             ],
//             additionalProperties: false,
//           },
//         },
//       },
//     });

//     const analysis = JSON.parse(response.output_text);

//     return NextResponse.json(analysis);
//   } catch (error) {
//     console.error("AI analysis failed:", error);

//     return NextResponse.json(
//       {
//         error: "Failed to analyze the error.",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }









import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

async function analyzeWithGemini(errorMessage: string) {
  let lastError: unknown;

  // Try Gemini up to 3 times
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      console.log(
        `Gemini analysis attempt ${attempt} of 3`
      );

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",

        contents: `
You are an expert software debugging assistant.

Analyze the following software error.

Your goal is to help a developer understand:
- what broke
- why it broke
- how to fix it

Be practical and concise.

Error:
${errorMessage}
        `,

        config: {
          responseMimeType: "application/json",

          responseSchema: {
            type: "object",

            properties: {
              category: {
                type: "string",
              },

              severity: {
                type: "string",
                enum: ["LOW", "MEDIUM", "HIGH"],
              },

              title: {
                type: "string",
              },

              rootCause: {
                type: "string",
              },

              explanation: {
                type: "string",
              },

              possibleFixes: {
                type: "array",
                items: {
                  type: "string",
                },
              },

              recommendedFix: {
                type: "string",
              },
            },

            required: [
              "category",
              "severity",
              "title",
              "rootCause",
              "explanation",
              "possibleFixes",
              "recommendedFix",
            ],
          },
        },
      });

      // Success 🎉
      return response;
    } catch (error: unknown) {
      lastError = error;

      const status =
        typeof error === "object" &&
        error !== null &&
        "status" in error
          ? (error as { status?: number }).status
          : undefined;

      console.log(
        `Gemini attempt ${attempt} failed with status: ${status}`
      );

      // If this is NOT a 503 error, don't retry
      if (status !== 503) {
        throw error;
      }

      // If all 3 attempts failed, throw the error
      if (attempt === 3) {
        throw error;
      }

      // Wait before trying again
      const waitTime = attempt * 2000;

      console.log(
        `Waiting ${waitTime}ms before retrying Gemini...`
      );

      await delay(waitTime);
    }
  }

  throw lastError;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const error = body.error;

    if (!error || typeof error !== "string") {
      return NextResponse.json(
        {
          error: "Please provide a valid error message.",
        },
        {
          status: 400,
        }
      );
    }

    // Call Gemini with retry logic
    const response = await analyzeWithGemini(error);

    if (!response.text) {
      throw new Error("Gemini returned an empty response.");
    }

    const analysis = JSON.parse(response.text);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Gemini analysis failed:", error);

    return NextResponse.json(
      {
        error: "Failed to analyze the error.",
      },
      {
        status: 500,
      }
    );
  }
}