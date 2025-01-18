// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
  
// });

// export async function POST(req: Request) {
//   try {
//     // Await the auth function
//     const { userId } = await auth();

//     const body = await req.json();
//     const { prompt, amount = 1, resolution = "512x512" } = body;

//     // Check for user authorization
//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // Check if OpenAI API key is configured
//     if (!process.env.OPENAI_API_KEY) {
//       return new NextResponse("OpenAI API Key not configured", { status: 500 });
//     }

//     // Check if messages are provided
//     if (!prompt) {
//       return new NextResponse("Prompt is required", { status: 400 });
//     }

//     if (!amount) {
//       return new NextResponse("Amount is required", { status: 400 });
//     }

//     if (!resolution) {
//       return new NextResponse("Resolution are required", { status: 400 });
//     }

//     const response = await openai.images.generate({
//       prompt,
//       n: parseInt(amount, 10), // Ensure this is an integer
//       size: resolution, // e.g., "512x512"
//     });
//     // Return the first message from the response
//     return NextResponse.json({ success: true, data: response.data });
//   } catch (error) {
//     console.error("[Image_ERROR]", error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }


import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;

    // Check for user authorization
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if Replicate API key is configured
    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json({ error: "Replicate API Key not configured" }, { status: 500 });
    }

    // Validate the prompt
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Prepare input for Replicate
    const input = {
      prompt,
      aspect_ratio: resolution,
    };

    // Call Replicate's API
    // const response = await replicate.run("ideogram-ai/ideogram-v2", { input });

    const response = await replicate.run("black-forest-labs/flux-1.1-pro-ultra", { input });

    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    console.error("[Image_ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}






















































// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// // Define the Hugging Face API endpoint and your model
// const endpoint = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3-medium-diffusers";

// export async function POST(req: { json: () => any; }) {
//   try {
//     // Authenticate user
//     const { userId } = await auth();

//     // If user is not authenticated, return an error
//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // Parse the request body
//     const body = await req.json();
//     const { prompt, amount = 1, resolution = "512x512" } = body;

//     // Validate the required fields
//     if (!prompt) {
//       return new NextResponse("Prompt is required", { status: 400 });
//     }

//     if (!process.env.HUGGINGFACE_API_KEY) {
//       return new NextResponse("Hugging Face API Key not configured", { status: 500 });
//     }

//     // Debugging logs
//     console.log("Starting request to Hugging Face API...");
//     console.log("Prompt:", prompt);
//     console.log("Amount:", amount);
//     console.log("Resolution:", resolution);

//     // Make the request to the Hugging Face API
//     const response = await fetch(endpoint, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         inputs: prompt,
//         options: { wait_for_model: true },
//       }),
//     });

//     // Handle non-OK responses from Hugging Face API
//     if (!response.ok) {
//       const errorDetails = await response.text();
//       console.error("Hugging Face API Error:", errorDetails);
//       return new NextResponse("Error from Hugging Face API", { status: response.status });
//     }

//     // Parse the result from the Hugging Face API
//     const result = await response.json();

//     // Return the result to the frontend
//     return NextResponse.json({ success: true, data: result });
//   } catch (error) {
//     console.error("[HuggingFace_API_ERROR]", error);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// }


























// export default async function handler(req: { method: string; body: { prompt: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: unknown; }): void; new(): any; }; }; }) {
//   if (req.method === "POST") {
//     try {
//       const { prompt } = req.body;

//       const response = await axios.post(
//         "https://api-inference.huggingface.co/models/strangerzonehf/Flux-Midjourney-Mix2-LoRA",
//         { inputs: prompt },
//         {
//           headers: {
//             Authorization: "Bearer"+process.env.HUGGINGFACE_API_KEY,
//             "Content-Type": "application/json",
//           },
//           responseType: "blob",
//         }
//       );

//       res.status(200).json(response.data);
//     } catch (e) {
//       res.status(500).json({ error:e });
//     }
//   } else {
//     res.status(405).json({ error: "Method not allowed" });
//   }
// }
