import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const image = data.get('image') as File

  return NextResponse.json({ image: image.name });
}
