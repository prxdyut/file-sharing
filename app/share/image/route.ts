import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const image = data.get("file") as File;
  console.log(data);
  
  return NextResponse.json({ data });
}
