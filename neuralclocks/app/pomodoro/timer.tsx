"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import TimerProgress from "./progress";

/**
 * Timer component. Displays a timer that counts down from a given time
 * and buttons to start, pause and reset it.
 * Shows a progress ring that fills up as the timer counts down.
 * Plays a sound when the timer finishes.
 * @param startingTime Time to count down from, in seconds.
 * @param onStart Callback function to be called when the timer is started or resumed.
 * @param onFinish Callback function to be called when the timer finishes.
 * @param onPause Callback function to be called when the timer is paused.
 * @param onReset Callback function to be called when the timer is reset.
 */
const Timer = ({
  startingTime,
  onStart,
  onFinish,
  onPause,
  onReset,
}: {
  startingTime: number;
  onStart?: () => void;
  onFinish?: () => void;
  onPause?: () => void;
  onReset?: () => void;
}) => {
  const [time, setTime] = useState(0); // in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    setAudio(new Audio("audio/alarm-clock-short.mp3"));
  }, []);

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
      audio?.play();
      onFinish?.();
    }
    if (time < 0) {
      setTime(0);
    }
  }, [time]);

  useEffect(() => {
    handleReset();
  }, [startingTime]);

  const handleStart = () => {
    setIsRunning(true);
    onStart?.();
  };

  const handlePause = () => {
    setIsRunning(false);
    onPause?.();
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(startingTime);
    onReset?.();
  };

  return (
    <div className="text-center">
      <TimerProgress time={time} startingTime={startingTime} />
      <button
        className={clsx("mx-4 mt-4", { underline: isRunning })}
        onClick={() => handleStart()}
      >
        Start
      </button>
      <button
        className={clsx("mx-4 mt-4", { underline: !isRunning })}
        onClick={() => handlePause()}
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
