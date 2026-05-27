import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    console.log(body)

    return NextResponse.json({
        success: true,
        data: body
    })
}

export async function GET(req: Request) {

    return NextResponse.json({
        success: true,
        data: "HEHE"
    })
}