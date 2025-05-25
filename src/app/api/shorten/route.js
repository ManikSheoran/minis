import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
});

function generateShortCode(length = 6) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function POST(request) {
  const { url } = await request.json();
  if (!url) {
    return NextResponse.json({ error: "No URL provided" }, { status: 400 });
  }

  const shortCode = generateShortCode();

  try {
    await pool.query(
      "INSERT INTO urls (original_url, short_code) VALUES ($1, $2)",
      [url, shortCode]
    );
    return NextResponse.json({
      shortenedUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/${shortCode}`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}