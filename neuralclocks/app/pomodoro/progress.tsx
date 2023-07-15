import { secToTime } from "@/utils/utils";
import clsx from "clsx";
import { StageColors } from "./types";
import { useEffect } from "react";

/**
 * Component to handle the digital clock and progress ring
 * showing the timer completion.
 * @param time Current time left, in seconds.
 * @param startingTime Starting time to count down from, in seconds.
 */
const TimerProgress = ({
  time,
  startingTime,
  isRunning,
  colors,
}: {
  time: number;
  startingTime: number;
  isRunning: boolean;
  colors: StageColors;
}) => {
  // Customizable.
  const stroke = 10;
  // Non-customizable. Radius is calculated relative to viewBox and stroke.
  // To control the size of the component, use its root's CSS width.
  const radius = 50 - stroke / 2;

  // Check if the timer is at its starting time and not running.
  const isStandby = !isRunning && time === startingTime;

  // Timer progress. Goes from 1 to 0.
  const progress = Math.min(time / startingTime, 1);

  useEffect(() => {}, [startingTime]);

  return (
    <div className="relative mx-auto mb-4 flex w-10/12 items-center justify-center sm:w-80">
      <svg viewBox="0 0 100 100" className="progress-ring">
        {/* Background circle */}
        <circle
          className={clsx(
            "fill-transparent transition-[stroke] [stroke-linecap:round]",
            colors.progress.bg,
          )}
          r={radius}
          cx={50}
          cy={50}
          style={{
            strokeWidth: stroke,
          }}
        />
        {/* Progress circle */}
        <circle
          className={clsx(
            "origin-center -rotate-90 fill-transparent [stroke-linecap:round]",
            "[transition:stroke-dashoffset_300ms,stroke_500ms]",
            colors.progress.stroke,
          )}
          r={radius}
          cx={50}
          cy={50}
          style={{
            strokeWidth: stroke,
            strokeDasharray: `${2 * Math.PI * radius} ${2 * Math.PI * radius}`,
            strokeDashoffset:
              2 * Math.PI * radius * progress * (isStandby ? 0 : 1),
          }}
        />
      </svg>
      {/* Digital clock */}
      <div
        className={
          "absolute mb-2 font-mono text-7xl tracking-tighter duration-500"
        }
      >
        {secToTime(time)}
      </div>
    </div>
  );
};

export default TimerProgress;
