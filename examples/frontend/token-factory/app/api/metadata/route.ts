import pinataSDK from "@pinata/sdk";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const pinata = new pinataSDK({
      pinataJWTKey: process.env.PINATA_JWT,
    });
    const data = await request.json();
    const res = await pinata.pinJSONToIPFS(data);
    return NextResponse.json({ IpfsHash: res.IpfsHash }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
