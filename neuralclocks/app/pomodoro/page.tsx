"use client";

import { createContext, useEffect, useState } from "react";
import Timer from "./timer";
import { Stage } from "./types";
import PomodoroSettings from "./settings";
import clsx from "clsx";
import stageColors from "./colors";
import { PomodoroContext } from "./context";

// To modify the default stages, change the values in this array.
// Stages can be added/removed without breaking the app, but progressions and
// colors won't work as expected without further modifications.
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
  const [time, setTime] = useState(0); // in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [message, setMessage] = useState("");

  const getNextStage: () => Stage | null = () => {
    let nextStage: Stage | null;
    if (currentStage.name === "pomodoro") {
      if (pomodoroCount % 4 === 0) {
        nextStage = stages.find((stage) => stage.name === "long") || null;
      } else {
        nextStage = stages.find((stage) => stage.name === "short") || null;
      }
    } else {
      nextStage = stages.find((stage) => stage.name === "pomodoro") || null;
    }
    return nextStage;
  };

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
      setPomodoroCount(pomodoroCount + 1);
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
      <PomodoroContext.Provider
        value={{
          stages,
          setStages,
          currentStage,
          setCurrentStage,
          pomodoroCount,
          setPomodoroCount,
          time,
          setTime,
          isRunning,
          setIsRunning,
        }}
      >
        <PomodoroSettings />
        {stages.map((thisStage) => {
          const thisColors =
            stageColors[thisStage.name] || stageColors[stages[0].name];
          return (
            <button
              className={clsx(
                "mx-0.5 mt-8 rounded-md border-2 border-transparent px-3 py-2 text-sm transition-colors sm:mx-3 sm:px-6 sm:py-2 sm:text-lg",
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
          onFinish={handleTimerFinish}
          onReset={handleTimerReset}
          colors={stageColors[currentStage.name] || stageColors[stages[0].name]}
        />
      </PomodoroContext.Provider>
      <div className="mt-4 min-h-[2rem] text-2xl">
        Pomodoros completed: {pomodoroCount}
      </div>
      <div className="mt-4 min-h-[2rem] text-2xl">
        Next stage: {getNextStage()?.label || "None"}
      </div>
      <div className="mt-4 min-h-[2rem] text-2xl">{message}</div>
    </div>
  );
}
