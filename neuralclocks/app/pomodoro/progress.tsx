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
}: {
  time: number;
  startingTime: number;
}) => {
  // Customizable.
  const stroke = 8;
  // Non-customizable. Radius is calculated relative to viewBox and stroke.
  // To control the size of the component, use its root's CSS width.
  const radius = 50 - stroke / 2;

  const progress = time / startingTime;

  return (
    <div className="relative mx-auto flex w-96 items-center justify-center">
      <svg viewBox="0 0 100 100" className="progress-ring">
        {/* Background circle */}
        <circle
          className={clsx(
            "fill-transparent",
            "stroke-red-200",
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
            "stroke-red-500",
            "[stroke-linecap:round]",
            "-rotate-90",
            "origin-center",
            "transition-all duration-300",
            { "opacity-0": progress === 1 },
          )}
          r={radius}
          cx={50}
          cy={50}
          style={{
            strokeWidth: stroke,
            strokeDasharray: `${2 * Math.PI * radius} ${2 * Math.PI * radius}`,
            strokeDashoffset: 2 * Math.PI * radius * progress,
          }}
        />
      </svg>
      {/* Digital clock */}
      <div className="absolute mb-2 text-8xl">{secToTime(time)}</div>
    </div>
  );
};

export default TimerProgress;
