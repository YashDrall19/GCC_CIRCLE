import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      company,
      linkedin,
      report_name,
      report_file,
    } = body;

    if (
      !name ||
      !email ||
      !phone ||
      !company ||
      !linkedin ||
      !report_name
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing fields",
        },
        {
          status: 400,
        }
      );
    }

    await db.execute(
      `
      INSERT INTO report_downloads
      (
        report_name,
        report_file,
        name,
        email,
        phone,
        company,
        linkedin_url,
        ip_address,
        user_agent
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        report_name,
        report_file,
        name,
        email,
        phone,
        company,
        linkedin,
        req.headers.get("x-forwarded-for"),
        req.headers.get("user-agent"),
      ]
    );

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}