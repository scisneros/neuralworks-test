"use client";

import { useEffect, useState } from "react";
import { secToTime } from "../../utils/utils";
import clsx from "clsx";

const Timer = ({ startingTime }: { startingTime: number }) => {
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
    setTime(startingTime);
  }, [startingTime]);

  return (
    <div className="text-center">
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
          setTime(startingTime);
          setIsRunning(false);
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default Timer;
