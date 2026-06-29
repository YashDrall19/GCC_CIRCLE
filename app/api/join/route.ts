import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
    const [rows] = await db.query("Select * from leads");
    return NextResponse.json({
        success: true,
        message: "Hi There",
        data: rows
    });
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {first_name, last_name, email, phone, source, company, linkedin, title, agreed, whatsapp} = body;

        const [result] = await db.query(
            "INSERT INTO LEADS (first_name, last_name, email, phone, source, company, linkedin, title, agreed, whatsapp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [first_name, last_name, email, phone, source, company, linkedin, title, agreed, whatsapp]
        );
        return NextResponse.json({
            success: true,
            message: "Data added successfully",
        });
    } catch (error: unknown) {
        console.log(error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Unknown error", },
            { status: 500 }
        );
    }
}