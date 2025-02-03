import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

// POST Request Handler

// study: study,
// workout: workout,
// deed: deed,
// water: water,
// junk: junk,
// sleepfrom: sleepStart,
// sleepto: wakeUp,
// totalsleep: calculateSleepDuration(),
// protein: protein,
// remarks: remarks,
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);
    const {
      date,
      study,
      workout,
      deed,
      water,
      junk,
      sleepfrom,
      sleepto,
      totalsleep,
      protein,
      remarks,
    } = body;

    await sql`
      INSERT INTO alldata
      (date,
      study,
      workout,
      deed,
      water,
      junk,
      sleepfrom,
      sleepto,
      totalsleep,
      protein,
      remarks)
       VALUES
       (${date}, ${study}, ${workout}, ${deed}, ${water}, ${junk}, ${sleepfrom},${sleepto}, ${totalsleep}, ${protein},${remarks});
     `;

    return NextResponse.json(
      { message: "Item added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding item:", error);
    return NextResponse.json({ error: "Failed to add item" }, { status: 500 });
  }
}
