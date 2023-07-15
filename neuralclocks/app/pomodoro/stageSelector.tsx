import { useContext } from "react";
import { PomodoroContext } from "./context";
import stageColors from "./colors";
import clsx from "clsx";
import { Stage } from "./types";

const StageSelector = ({
  getNextStage,
}: {
  getNextStage: () => Stage | null;
}) => {
  const { stages, currentStage, setCurrentStage, time, isRunning } =
    useContext(PomodoroContext);

  const isStandby = time === currentStage.duration && !isRunning;
  const isFinished = time === 0 && !isRunning;
  return (
    <>
      {stages.map((thisStage) => {
        const thisColors =
          stageColors[thisStage.name] || stageColors[stages[0].name];
        return (
          <button
            className={clsx(
              "relative mx-0.5 rounded-md border-2 border-transparent px-3 py-2 text-sm transition-colors sm:mx-3 sm:px-6 sm:py-2 sm:text-lg",
              thisStage.name === currentStage.name
                ? `${thisColors.button.bg} ${thisColors.button.hover} ${thisColors.text}`
                : thisColors.button.hoverLight,
            )}
            key={thisStage.name}
            onClick={() => setCurrentStage(thisStage)}
          >
            {thisStage.label}
            {thisStage.name === getNextStage()?.name &&
              (isFinished || isStandby) && (
                <span className="absolute left-0 top-0 -z-10 h-full w-full">
                  <span
                    className={clsx(
                      "inline-block h-full w-full animate-ping-button rounded-md border-2 text-sm",
                      thisColors.button.border,
                    )}
                  ></span>
                </span>
              )}
          </button>
        );
      })}
    </>
  );
};

export default StageSelector;
