// const {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
//   } = require("@google/generative-ai");

//   const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY;
//   const genAI = new GoogleGenerativeAI(apiKey);
  
//   const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash",
//   });
  
//   const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 64,
//     maxOutputTokens: 1000,
//     responseMimeType: "text/plain",
//   };
  
  
//    export const chatSession = model.startChat({
//       generationConfig,
//    // safetySettings: Adjust safety settings
//    // See https://ai.google.dev/gemini-api/docs/safety-settings
//       history: [
//       ],
//     });




import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/" // Replace with your actual API key
});

export async function POST(req: Request) {
  try {
    // Await the auth function
    const { userId } = await auth();

    const body = await req.json();
    const { messages } = body;

    // Check for user authorization
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if OpenAI API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 });
    }

    // Check if messages are provided
    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    // Add a system message to instruct the AI
    const systemMessage = {
      role: "system",
      content: "You are a helpful assistant. Provide concise and informative answers, avoiding any symbols like (*, @, #). If the user requests titles or lists, present them in a column format with number rather than a single line."
    };

    // Include the system message in the messages array
    const updatedMessages = [systemMessage, ...messages];

    // Call the OpenAI chat completion API
    const response = await openai.chat.completions.create({
      model: "gemini-2.0-flash-exp", // Use the GPT model you want
      messages: updatedMessages, // Add the system instruction
    });

    // Return the first message from the response
    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.error("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}










// import { AxiosError, AxiosResponse } from "axios";
// import { NextResponse } from "next/server";
// import axios from "axios";
// import { auth } from "@clerk/nextjs/server";

// // Function to retry API requests with delay and error handling
// const retryRequest = async (
//   url: string,
//   data: any,
//   headers: any,
//   retries: number = 3,
//   delay: number = 1000
// ): Promise<AxiosResponse<any>> => {
//   let attempt = 0;
//   let lastError: unknown;

//   while (attempt < retries) {
//     attempt++;
//     try {
//       const response = await axios.post(url, data, { headers });
//       return response;
//     } catch (error) {
//       lastError = error;
//       if (axios.isAxiosError(error)) {
//         // Handle retryable errors (e.g., 500 or network failures)
//         if (error.response?.status === 500 || error.code === 'ECONNREFUSED') {
//           console.warn(`Retry attempt ${attempt} failed. Retrying in ${delay * attempt}ms...`);
//           await new Promise(resolve => setTimeout(resolve, delay * attempt));
//         } else {
//           break; // Non-retryable error, exit loop
//         }
//       } else {
//         break; // Unknown error, exit loop
//       }
//     }
//   }

//   throw lastError; // Throw the last error after all retries fail
// };

// export async function POST(req: Request) {
//   try {
//     const { userId } = await auth();
//     const body = await req.json();
//     const { messages } = body;

//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     if (!process.env.GEMINI_API_KEY) {
//       return NextResponse.json(
//         { error: "Gemini API Key is not configured in environment variables." },
//         { status: 500 }
//       );
//     }

//     if (!messages || !Array.isArray(messages)) {
//       return NextResponse.json(
//         { error: "Messages are required and must be an array." },
//         { status: 400 }
//       );
//     }

//     const headers = {
//       Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
//       "Content-Type": "application/json",
//     };

//     // Making the API request with retry logic
//     try {
//       const response = await retryRequest(
//         "https://api.gemini.ai/v1/chat/completions",
//         { model: "gemini-1.5-flash", messages },
//         headers
//       );

//       // Ensure response data contains the expected structure
//       if (response.data && response.data.choices) {
//         return NextResponse.json(response.data.choices[0].message);
//       } else {
//         console.error("Unexpected response format", response);
//         return NextResponse.json(
//           { error: "Unexpected response format" },
//           { status: 500 }
//         );
//       }
//     } catch (error: unknown) {
//       console.error("Error occurred while calling Gemini API", error);

//       if (error instanceof AxiosError) {
//         console.error("Axios Error Details:", {
//           message: error.message,
//           responseData: error.response?.data || "No response data",
//           status: error.response?.status || "No status code",
//           headers: error.response?.headers || "No headers",
//         });

//         return NextResponse.json(
//           {
//             error: "Gemini API Error",
//             details: error.response?.data || error.message || "Unknown error",
//           },
//           { status: 500 }
//         );
//       } else if (error instanceof Error) {
//         return NextResponse.json(
//           {
//             error: "Internal Server Error",
//             details: error.message,
//           },
//           { status: 500 }
//         );
//       } else {
//         return NextResponse.json(
//           {
//             error: "Internal Server Error",
//             details: "An unknown error occurred.",
//           },
//           { status: 500 }
//         );
//       }
//     }
//   } catch (serverError: unknown) {
//     if (serverError instanceof Error) {
//       console.error("[Server Error]", serverError.message, serverError.stack);
//       return NextResponse.json(
//         {
//           error: "Internal Server Error",
//           details: serverError.message,
//         },
//         { status: 500 }
//       );
//     } else {
//       console.error("[Server Error] Unknown error type:", serverError);
//       return NextResponse.json(
//         {
//           error: "Internal Server Error",
//           details: "Unknown error occurred.",
//         },
//         { status: 500 }
//       );
//     }
//   }
// }


// // const { GoogleGenerativeAI } = require("@google/generative-ai");

// // const genAI = new GoogleGenerativeAI("AIzaSyCZDMkIa5zKdS2aU5BbrgEGSpXE7Zwi3TM");
// // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// // const prompt = "Explain how AI works";

// // const result = await model.generateContent(prompt);
// // console.log(result.response.text());

// // export { };
