import { secToTime } from "@/utils/utils";
import clsx from "clsx";

const TimerProgress = ({
  time,
  startingTime,
}: {
  time: number;
  startingTime: number;
}) => {
  // Customizable
  const stroke = 8;
  // Non-customizable
  const radius = 50 - stroke / 2;
  const progress = time / startingTime;

  return (
    <div className="relative mx-auto flex w-96 items-center justify-center">
      <svg viewBox="0 0 100 100" className="progress-ring">
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
      <div className="absolute mb-2 text-8xl">{secToTime(time)}</div>
    </div>
  );
};

export default TimerProgress;
