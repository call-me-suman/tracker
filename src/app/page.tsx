"use client";

import { useEffect, useState } from "react";
// import { start } from "repl";

export default function Page() {
  const [today, setToday] = useState(new Date());
  const [study, setstudy] = useState("");
  const [workout, setworkout] = useState("");
  const [deed, setdeed] = useState("");
  const [water, setwater] = useState("");
  const [junk, setjunk] = useState("");
  const [sleepStart, setSleepStart] = useState("");
  const [wakeUp, setWakeUp] = useState("");
  const [protein, setprotein] = useState({
    eggs: 0,
    chicken: 0,
    chickpeas: 0,
    soya: 0,
  });
  const [remarks, setremarks] = useState("");

  // Function to calculate total protein

  const studyarray = ["next", "gd", "ai", "none"];
  const workoutarray = [
    "back",
    "chest",
    "arms",
    "shoulder",
    "leg",
    "home",
    "none",
  ];
  const ynarray = ["yes", "no"];
  // function proteincalculator(eggs,chicken){  }
  useEffect(() => {
    setToday(new Date());
  }, []);
  const proteinContent = {
    eggs: 5.0, // 5g protein per egg
    chicken: 0.27, // 27g protein per 100g
    chickpeas: 0.19, // 19g protein per 100g
    soya: 0.36, // 36g protein per 100g
  };

  const calculateprotein = (protein: {
    eggs: number;
    chicken: number;
    chickpeas: number;
    soya: number;
  }): number => {
    const { eggs, chicken, chickpeas, soya } = protein;
    const result =
      eggs * proteinContent.eggs +
      chicken * proteinContent.chicken +
      chickpeas * proteinContent.chickpeas +
      soya * proteinContent.soya;
    return parseFloat(result.toFixed(2)); // Ensures the result is a float with 2 decimal places
  };

  const calculateSleepDuration = () => {
    // Parse the time inputs into hours and minutes
    const [startHours, startMinutes] = sleepStart.split(":").map(Number);
    const [wakeHours, wakeMinutes] = wakeUp.split(":").map(Number);

    // Calculate the total minutes for both times
    const startTotalMinutes = startHours * 60 + startMinutes;
    const wakeTotalMinutes = wakeHours * 60 + wakeMinutes;

    // Handle cases where wake-up time is on the next day
    const totalSleepMinutes =
      wakeTotalMinutes >= startTotalMinutes
        ? wakeTotalMinutes - startTotalMinutes
        : 1440 - startTotalMinutes + wakeTotalMinutes; // 1440 = total minutes in a day

    // Convert total minutes to hours as a float
    const sleepTimeInHours = (totalSleepMinutes / 60).toFixed(2);

    return sleepTimeInHours;
  };
  function handleInputs(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const numericValue = parseFloat(value);
    setprotein((prevState) => ({
      ...prevState,
      [name]: numericValue >= 0 ? parseFloat(value) : 0,
    }));
  }

  async function addtodb(body: string) {
    try {
      // Call your API route for saving the data
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/additems`,
        {
          method: "POST",
          mode: "cors", // Enables CORS
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        }
      );

      if (res.ok) {
        // On success, redirect or show a success message
        // router.push("/");
        console.log("good");
      } else {
        console.error("Failed to submit form");
      }
    } catch (err) {
      console.error("Error submitting form", err);
    }
  }
  return (
    <>
      {/* time */}
      <div id="time">
        <button
          onClick={() => {
            const x = today.setDate(today.getDate() - 1);
            setToday(new Date(x));
          }}
        >
          previous
        </button>
        <h1>{today.toLocaleDateString("en-US")}</h1>
      </div>
      {/* study */}
      <div id="study">
        <h3>did you study?</h3>
        {studyarray.map((elem) => {
          return (
            <button
              id={elem}
              key={elem}
              onClick={() => {
                if (!study) setstudy(elem);
                console.log(study);
              }}
            >
              {elem}
            </button>
          );
        })}
      </div>

      {/* workout */}
      <div id="workout">
        <h3>did you workout?</h3>
        {workoutarray.map((elem) => {
          return (
            <button
              id={elem}
              key={elem}
              onClick={() => {
                if (!workout) setworkout(elem);
                console.log(workout);
              }}
            >
              {elem}
            </button>
          );
        })}
      </div>

      {/* deed */}
      <div id="deed">
        <h3>did you deed?</h3>
        {ynarray.map((elem) => {
          return (
            <button
              id={elem}
              key={elem}
              onClick={() => {
                if (!deed) setdeed(elem);
                console.log(deed);
              }}
            >
              {elem}
            </button>
          );
        })}
      </div>

      {/* junk */}
      <div id="junk">
        <h3>did you eat junk?</h3>
        {ynarray.map((elem) => {
          return (
            <button
              id={elem}
              key={elem}
              onClick={() => {
                if (!junk) setjunk(elem);
                console.log(junk);
              }}
            >
              {elem}
            </button>
          );
        })}
      </div>
      {/* water */}
      <div id="water">
        <h3>did drink enough water?</h3>
        {ynarray.map((elem) => {
          return (
            <button
              id={elem}
              key={elem}
              onClick={() => {
                if (!water) setwater(elem);
                console.log(water);
              }}
            >
              {elem}
            </button>
          );
        })}
      </div>

      {/* sleep */}
      <div id="sleep">
        <h4>from </h4>
        <input
          type="time"
          value={sleepStart}
          onChange={(e) => setSleepStart(e.target.value)}
        />
        <hr />
        <h4>to</h4>
        <input
          type="time"
          value={wakeUp}
          onChange={(e) => setWakeUp(e.target.value)}
        />
      </div>

      {/* protein */}
      <div id="protein">
        <h4>eggs</h4>
        <input type="number" name="eggs" onChange={handleInputs} />
        <h4>chicken</h4>
        <input type="number" name="chicken" onChange={handleInputs} />
        <h4>chickpeas</h4>
        <input type="number" name="chickpeas" onChange={handleInputs} />
        <h4>soya</h4>
        <input type="number" name="soya" onChange={handleInputs} />
      </div>
      {/* remarks */}
      <h4>remarks</h4>
      <input
        type="text"
        onChange={(e) => {
          setremarks(e.target.value);
        }}
      />
      {/* submit */}
      <h1
        onClick={() => {
          const all = {
            date: today.toLocaleDateString("en-US"),
            study: study,
            workout: workout,
            deed: deed,
            water: water,
            junk: junk,
            sleepfrom: sleepStart,
            sleepto: wakeUp,
            totalsleep: calculateSleepDuration(),
            protein: calculateprotein(protein),
            remarks: remarks,
          };

          addtodb(JSON.stringify(all));
        }}
      >
        submit
      </h1>
    </>
  );
}
