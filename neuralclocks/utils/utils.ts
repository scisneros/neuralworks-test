export const secToTime = (sec: number): string => {
  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = Math.floor(sec % 60);
  let time = "";
  if (hours > 0) {
    time += `${padTime(hours)}:`;
  }
  time += `${padTime(minutes)}:${padTime(seconds)}`;
  return time;
};

const padTime = (time: number): string => {
  return String(time).padStart(2, "0");
};
