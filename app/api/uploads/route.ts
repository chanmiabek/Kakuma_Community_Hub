import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Sign in to upload images." }, { status: 401 });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "Image uploads are not configured yet. Set the Cloudinary environment variables." },
      { status: 503 },
    );
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Choose an image to upload." }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "Only JPG, PNG, WebP and AVIF images are supported." }, { status: 415 });
  }
  if (file.size === 0 || file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "Image must be between 1 byte and 5 MB." }, { status: 413 });
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const folder = "kakuma-hub";
  const signatureBase = `folder=${folder}&timestamp=${timestamp}`;
  const signature = createHash("sha1").update(signatureBase + apiSecret).digest("hex");
  const upload = new FormData();
  upload.append("file", file, file.name);
  upload.append("api_key", apiKey);
  upload.append("timestamp", timestamp);
  upload.append("folder", folder);
  upload.append("signature", signature);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: upload,
      signal: AbortSignal.timeout(20_000),
    });
    const result = (await response.json().catch(() => ({}))) as {
      secure_url?: string;
      error?: { message?: string };
    };
    if (!response.ok || !result.secure_url) {
      return NextResponse.json(
        { error: result.error?.message ?? "The image provider rejected this upload." },
        { status: 502 },
      );
    }
    return NextResponse.json({ url: result.secure_url });
  } catch {
    return NextResponse.json({ error: "Image service is temporarily unavailable. Try again." }, { status: 502 });
  }
}
