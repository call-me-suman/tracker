// import { getServerSideProps } from "next/dist/build/templates/pages";
// import { NextResponse } from "next/server";

interface Data {
  id: number;
  time: string;
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
// {
//   method: "GET",
//   mode: "cors", // Enables CORS
//   credentials: "include", // Include cookies in requests if required
//   headers: {
//     "Content-Type": "application/json",
//   },
// }
export default async function All() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/getitems`,
    {
      method: "GET",
      mode: "cors",
      credentials: "include",
      cache: "no-store",
    }
  );
  const data: Data[] = await response.json();
  console.log(data);

  return (
    <>
      {data.map((elem, index) => {
        return (
          <div key={index}>
            <p>ID: {elem.id}</p>
            <p>Time: {elem.time}</p>
            <p>Study: {elem.study}</p>
            <p>Deed: {elem.deed ? "Yes" : "No"}</p>
            <p>Sleep From: {elem.sleepfrom}</p>
            <p>Sleep To: {elem.sleepto}</p>
            <p>Protein: {elem.protein}</p>
            <p>Junk: {elem.junk ? "Yes" : "No"}</p>
            <p>Water: {elem.water ? "Yes" : "No"}</p>
            <p>Remarks: {elem.remarks}</p>
            <p>Total Sleep: {elem.totalsleep} hours</p>
            <p>Date: {elem.date}</p>
          </div>
        );
      })}
    </>
  );
}
