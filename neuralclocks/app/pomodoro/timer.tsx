"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import TimerProgress from "./progress";
import { HiArrowPath, HiPause, HiPlay } from "react-icons/hi2";
import { StageColors } from "./types";

/**
 * Timer component. Displays a timer that counts down from a given time
 * and buttons to start, pause and reset it.
 * Shows a progress ring that fills up as the timer counts down.
 * Plays a sound when the timer finishes.
 * @param startingTime Time to count down from, in seconds.
 * @param colors Color scheme for the timer.
 * @param onStart Callback function to be called when the timer is started or resumed.
 * @param onFinish Callback function to be called when the timer finishes.
 * @param onPause Callback function to be called when the timer is paused.
 * @param onReset Callback function to be called when the timer is reset.
 */
const Timer = ({
  startingTime,
  colors,
  onStart,
  onFinish,
  onPause,
  onReset,
}: {
  startingTime: number;
  colors: StageColors;
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

  const handlePlayPause = () => {
    if (!isRunning) {
      setIsRunning(true);
      onStart?.();
    } else {
      setIsRunning(false);
      onPause?.();
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(startingTime);
    onReset?.();
  };

  return (
    <div className="mt-4 text-center sm:mt-6">
      <TimerProgress
        time={time}
        startingTime={startingTime}
        isRunning={isRunning}
        colors={colors}
      />
      <button
        className={clsx(
          "mx-auto mt-6 block rounded-full px-6 py-2 text-3xl duration-500",
          `${colors.button.bg} ${colors.button.hover} ${colors.text}`,
          { underline: isRunning },
        )}
        onClick={() => handlePlayPause()}
      >
        {isRunning ? <HiPause /> : <HiPlay />}
      </button>
      <button
        className="mx-auto mt-4 block rounded-full bg-gray-200 px-4 py-1 align-middle transition-colors hover:bg-gray-300"
        onClick={() => handleReset()}
      >
        <HiArrowPath className="mb-1 mr-2 inline-block" />
        Reset
      </button>
    </div>
  );
};

export default Timer;
