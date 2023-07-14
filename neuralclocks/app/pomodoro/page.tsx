"use client";

import { useEffect, useState } from "react";
import { secToTime } from "../../utils/utils";
import clsx from "clsx";

export default function Pomodoro() {
  const [stage, setStage] = useState(0);
  const [time, setTime] = useState(0); // in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [isRunning]);

  useEffect(() => {
    setIsRunning(false);
    setTime(stages[stage].duration);
  }, [stage]);

  const stages: Array<{
    id: number;
    label: string;
    duration: number;
  }> = [
    {
      id: 0,
      label: "Pomodoro",
      duration: 25 * 60,
    },
    {
      id: 1,
      label: "Short Break",
      duration: 5 * 60,
    },
    {
      id: 2,
      label: "Long Break",
      duration: 15 * 60,
    },
  ];

  return (
    <div className="text-center">
      <h1>Pomodoro</h1>
      {stages.map((step) => (
        <button
          className="mx-4 mt-4"
          key={step.id}
          onClick={() => setStage(step.id)}
        >
          {step.label}
        </button>
      ))}
      <div className="mt-4 text-8xl">{secToTime(time)}</div>
      <button
        className={clsx("mx-4 mt-4", { underline: isRunning })}
        onClick={() => setIsRunning(true)}
      >
        Start
      </button>
      <button
        className={clsx("mx-4 mt-4", { underline: !isRunning })}
        onClick={() => setIsRunning(false)}
      >
        Pause
      </button>
      <button
        className="mx-4 mt-4"
        onClick={() => {
          setTime(stages[stage].duration);
          setIsRunning(false);
        }}
      >
        Reset
      </button>
    </div>
  );
}
