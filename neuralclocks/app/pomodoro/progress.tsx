import { secToTime } from "@/utils/utils";
import clsx from "clsx";

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
}: {
  time: number;
  startingTime: number;
  isRunning: boolean;
}) => {
  // Customizable.
  const stroke = 8;
  // Non-customizable. Radius is calculated relative to viewBox and stroke.
  // To control the size of the component, use its root's CSS width.
  const radius = 50 - stroke / 2;

  // Check if the timer is at its starting time and not running.
  const isStandby = !isRunning && time === startingTime;

  // Timer progress. Goes from 1 to 0.
  const progress = time / startingTime;

  return (
    <div className="relative mx-auto mb-4 flex w-11/12 items-center justify-center sm:w-80">
      <svg viewBox="0 0 100 100" className="progress-ring">
        {/* Background circle */}
        <circle
          className={clsx(
            "fill-transparent",
            "stroke-primary-100",
            "[stroke-linecap:round]",
            "transition-all duration-300",
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
            "fill-transparent",
            "stroke-primary",
            "[stroke-linecap:round]",
            "-rotate-90",
            "origin-center",
            "transition-all duration-300",
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
      <div className="absolute mb-2 font-mono text-7xl font-bold text-primary-dark">
        {secToTime(time)}
      </div>
    </div>
  );
};

export default TimerProgress;
