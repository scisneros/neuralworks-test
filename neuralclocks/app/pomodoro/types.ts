export type Stage = {
  name: string;
  label: string;
  duration: number;
};

export type StagesColors = {
  [key: string]: StageColors;
};

export type StageColors = {
  button: {
    bg: string;
    hover: string;
    hoverLight: string;
  };
  progress: {
    bg: string;
    stroke: string;
    fill: string;
  };
  text: string;
}