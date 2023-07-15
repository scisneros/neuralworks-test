"use client";

import { useEffect, useState } from "react";
import Timer from "./timer";
import { Stage } from "./types";
import PomodoroSettings from "./settings";
import clsx from "clsx";
import stageColors from "./colors";

// To modify the default stages, change the values in this array.
// Stages can be added/removed. Color schemes must be modified from colors.ts.
// name: Identifies the stage. Should be unique.
// label: Displayed text.
// duration: Duration of the stage in seconds.
const stagesDefaults: Stage[] = [
  { name: "pomodoro", label: "Pomodoro", duration: 2 },
  { name: "short", label: "Short Break", duration: 5 * 60 },
  { name: "long", label: "Long Break", duration: 15 * 60 },
];

export default function Pomodoro() {
  const [stages, setStages] = useState(stagesDefaults);
  const [currentStage, setCurrentStage] = useState(stages[0]);
  const [message, setMessage] = useState("");

  // React states are immutable, so changing stages creates a new object.
  // Because currentStage is passed by reference to the object,
  // it needs to be updated when stages are updated.
  useEffect(() => {
    setCurrentStage(
      stages.find((stage) => stage.name === currentStage.name) || stages[0],
    );
  }, [stages]);

  const handleTimerFinish = () => {
    if (currentStage.name === "pomodoro") {
      setMessage("Time for a break!");
    } else {
      setMessage("Time to get back to work!");
    }
  };

  const handleTimerReset = () => {
    setMessage("");
  };

  return (
    <div className={"text-center"}>
      <h1 className="mb-2 mt-8">Pomodoro Timer</h1>
      <PomodoroSettings stages={stages} setStages={setStages} />
      {stages.map((thisStage) => {
        const thisColors =
          stageColors[thisStage.name] || stageColors[stages[0].name];
        return (
          <button
            className={clsx(
              "mx-3 mb-6 mt-8 rounded-lg border-2 border-transparent px-6 py-3 text-xl transition-colors",
              thisStage.name === currentStage.name
                ? `${thisColors.button.bg} ${thisColors.button.hover} ${thisColors.text}`
                : thisColors.button.hoverLight,
            )}
            key={thisStage.name}
            onClick={() => setCurrentStage(thisStage)}
          >
            {thisStage.label}
          </button>
        );
      })}
      <Timer
        startingTime={currentStage.duration}
        onFinish={handleTimerFinish}
        onReset={handleTimerReset}
        colors={stageColors[currentStage.name] || stageColors[stages[0].name]}
      />
      <div className="mt-4 min-h-[2rem] text-2xl">{message}</div>
    </div>
  );
}
