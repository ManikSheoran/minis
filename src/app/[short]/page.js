import { redirect } from "next/navigation";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
});

export default async function Page({ params }) {
  const { short } = params;

  try {
    const result = await pool.query(
      "SELECT original_url FROM urls WHERE short_code = $1",
      [short]
    );

    if (result.rows.length > 0) {
      redirect(result.rows[0].original_url);
    } else {
      return <h1>URL not found</h1>;
    }
  } catch (error) {
    if (error && typeof error === 'object' && 'digest' in error && error.digest.startsWith('NEXT_REDIRECT')) {
      throw error;
    }

    console.error("An unexpected error occurred:", error);
    return <h1>Error occurred</h1>;
  }
}