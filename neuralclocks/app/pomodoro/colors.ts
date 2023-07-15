import { StagesColors } from "./types";

// Define colors for each stage. They have to be explicitly declared
// because Tailwind doesn't support dynamic class names.
const stageColors: StagesColors = {
  pomodoro: {
    button: {
      bg: "bg-primary-500",
      hover: "hover:bg-primary-600",
      hoverLight: "hover:bg-primary-100 hover:text-primary-700",
      border: "border-primary-500",
    },
    progress: {
      bg: "stroke-primary-100",
      stroke: "stroke-primary-500",
      fill: "fill-primary-50",
    },
    text: "text-white",
  },

  short: {
    button: {
      bg: "bg-sky-500",
      hover: "hover:bg-sky-600",
      hoverLight: "hover:bg-sky-100 hover:text-sky-700",
      border: "border-sky-500",
    },
    progress: {
      bg: "stroke-sky-200",
      stroke: "stroke-sky-500",
      fill: "fill-sky-50",
    },
    text: "text-white",
  },

  long: {
    button: {
      bg: "bg-teal-500",
      hover: "hover:bg-teal-600",
      hoverLight: "hover:bg-teal-100 hover:text-teal-700",
      border: "border-teal-500",
    },
    progress: {
      bg: "stroke-teal-200",
      stroke: "stroke-teal-500",
      fill: "fill-teal-50",
    },
    text: "text-white",
  },
};

export default stageColors;
