import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, phone, email, linkedin, message } = body;

        const [result] = await db.query(
            "INSERT INTO contactform (name, phone, email, linkedin, message) VALUES (?, ?, ?, ?, ?)",
            [name, phone, email, linkedin, message]
        );

        return NextResponse.json({
            success: true,
            message: "Contact form submitted successfully",
        });

    } catch (error: unknown) {
        console.log(error);

        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}