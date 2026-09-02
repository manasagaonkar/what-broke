import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

    const response = await openai.responses.create({
      model: "gpt-5",
      input: `
You are an expert software debugging assistant.

Analyze the following software error and provide a practical explanation.

Error:
${error}
      `,
      text: {
        format: {
          type: "json_schema",
          name: "debug_result",
          strict: true,
          schema: {
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
            additionalProperties: false,
          },
        },
      },
    });

    const analysis = JSON.parse(response.output_text);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("AI analysis failed:", error);

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