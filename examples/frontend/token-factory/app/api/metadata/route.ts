import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pinataContent: data }),
    });
    if (!res.ok) throw new Error(`Pinata responded ${res.status}`);
    const { IpfsHash } = await res.json();
    return NextResponse.json({ IpfsHash }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
