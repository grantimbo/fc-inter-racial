import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: string;
    }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
      true, // Prevents race conditions with Sanity CDN
    );

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    if (!body?._type) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    // 1. Revalidate the entire type (e.g., all players)
    revalidateTag(body._type, undefined as any);

    // 2. Optionally revalidate the specific item if a slug exists
    if (body.slug) {
      revalidateTag(`${body._type}:${body.slug}`, undefined as any);
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
