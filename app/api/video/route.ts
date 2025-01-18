import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from "replicate"

import { writeFile } from "node:fs/promises";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN
})

export async function POST(req: Request) {
  try {
    // Await the auth function
    const { userId } = await auth();

    const body = await req.json();
    const { prompt } = body;

    // Check for user authorization
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if messages are provided
    if (!prompt) {
      return new NextResponse("Video Prompt is required", { status: 400 });
    }
  
   
   
    
    
    const input = {
        prompt: prompt
    };
    
    const response = await replicate.run("luma/ray", { input });
    
    // await writeFile("output.mp4", output);
    //=> output.mp4 written to disk
    return NextResponse.json(response);
  } catch (error) {
    console.error("[VIDEO_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}









