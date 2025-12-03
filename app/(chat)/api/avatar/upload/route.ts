import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  // FIX: Ensure filename exists before passing to put()
  if (!filename) {
    return NextResponse.json(
      { error: "Filename is required" },
      { status: 400 }
    );
  }

  // ⚠️ The below code is for App Router Route Handlers only
  // request.body can be null, but vercel blob handles it or we should validate,
  // but the specific error was about 'filename'.
  if (!request.body) {
    return NextResponse.json(
      { error: "No file body provided" },
      { status: 400 }
    );
  }

  const blob = await put(filename, request.body, {
    access: "public",
  });

  // Here's the code for Pages API Routes:
  // const blob = await put(filename, request, {
  //   access: 'public',
  // });

  return NextResponse.json(blob);
}

// ... rest of file
