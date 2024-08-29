import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const imagesDir = path.join(process.cwd(), "public/images");
  try {
    const files = await fs.promises.readdir(imagesDir);
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|webp|gif)$/.test(file),
    );
    return NextResponse.json(imageFiles);
  } catch (err) {
    return NextResponse.json(
      { error: "Unable to scan directory" },
      { status: 500 },
    );
  }
}
