import { Dispatch, SetStateAction, createContext } from "react";
import { Stage } from "./types";

export const PomodoroContext: React.Context<PomodoroContextProps> =
  createContext<PomodoroContextProps>({} as PomodoroContextProps);

type PomodoroContextProps = {
  stages: Stage[];
  setStages: Dispatch<SetStateAction<Stage[]>>;
  currentStage: Stage;
  setCurrentStage: Dispatch<SetStateAction<Stage>>;
  pomodoroCount: number;
  setPomodoroCount: Dispatch<SetStateAction<number>>;
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
  isRunning: boolean;
  setIsRunning: Dispatch<SetStateAction<boolean>>;
};
