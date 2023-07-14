"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import TimerProgress from "./progress";

const Timer = ({
  startingTime,
  onFinish,
  onReset,
}: {
  startingTime: number;
  onFinish: () => void;
  onReset: () => void;
}) => {
  const [time, setTime] = useState(0); // in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning && time > 0) {
      const interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [isRunning]);

  useEffect(() => {
    if (time === 0) {
      setIsRunning(false);
      onFinish();
    }
    if (time < 0) {
      setTime(0);
    }
  }, [time]);

  useEffect(() => {
    handleReset();
  }, [startingTime]);

  const handleReset = () => {
    setIsRunning(false);
    setTime(startingTime);
    onReset();
  };

  return (
    <div className="text-center">
      <TimerProgress time={time} startingTime={startingTime} />
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
      <button className="mx-4 mt-4" onClick={() => handleReset()}>
        Reset
      </button>
    </div>
  );
};

export default Timer;
