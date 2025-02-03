import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    (await cookies()).set("theme", "dark");

    const { rows }: { rows: data[] } = await sql`SELECT * FROM alldata;`;
    interface data {
      date: string;
      study: string;
      deed: boolean;
      sleepfrom: string;
      sleepto: string;
      totalsleep: number;
      protein: number;
      junk: boolean;
      water: boolean;
      remarks: string;
    }

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Failed to get the items", error);
    return NextResponse.json(
      { error: "Failed to get the items" },
      { status: 500 }
    );
  }
}
