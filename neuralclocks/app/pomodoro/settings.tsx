import { useState } from "react";
import { Stage } from "./types";

const PomodoroSettings = ({
  stages,
  setStages,
}: {
  stages: Stage[];
  setStages: (stages: Stage[]) => void;
}) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  // A copy of stages, which is applied when changes are confirmed.
  const [stagesSettings, setStagesSettings] = useState(stages);

  const confirmSettings = () => {
    setStages(stagesSettings);
    setSettingsOpen(false);
  };

  // Updates the duration of a stage.
  // For UX reasons, duration is displayed and inputted in minutes,
  // but it should be stored in seconds.
  const handleTimeChange = (stageName: string, newTimeMins: string) => {
    setStagesSettings(
      stagesSettings.map((stage) => {
        if (stage.name === stageName) {
          return {
            ...stage,
            duration: Number(parseFloat(newTimeMins).toFixed(2)) * 60, // Convert to seconds
          };
        }
        return stage;
      }),
    );
  };

  return (
    <div>
      <button className="mt-4" onClick={() => setSettingsOpen(!settingsOpen)}>
        Settings
      </button>
      {settingsOpen && (
        <div className="mt-4">
          {stagesSettings.map((thisStage) => (
            <div key={thisStage.name}>
              <div>{thisStage.label}</div>
              <input
                type="number"
                // Uses defaultValue and onBlur instead of value and onChange
                // to prevent input changes while the user is typing.
                defaultValue={Number((thisStage.duration / 60).toFixed(2))} // Convert to minutes
                onBlur={(e) => handleTimeChange(thisStage.name, e.target.value)}
              />
            </div>
          ))}
          <button
            className="mt-4"
            onClick={() => {
              confirmSettings();
            }}
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
};

export default PomodoroSettings;
