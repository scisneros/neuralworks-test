import { useState } from "react";
import { Stage } from "./types";
import { HiCog6Tooth } from "react-icons/hi2";
import { Transition } from "@headlessui/react";

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
      <button
        className="mx-auto block rounded-full bg-gray-200 px-4 py-1 align-middle transition-colors hover:bg-gray-300"
        onClick={() => setSettingsOpen(!settingsOpen)}
      >
        <HiCog6Tooth className="mb-1 mr-2 inline-block" />
        {settingsOpen ? "Hide settings" : "Settings"}
      </button>
      <Transition
        show={settingsOpen}
        enterFrom="opacity-0 scale-75"
        enterTo="opacity-100 scale-100"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-75"
        className="transition-[opacity, transform] duration-100 origin-top"
      >
        <div className="mt-4 flex justify-center">
          {stagesSettings.map((thisStage) => (
            <div className="mx-4" key={thisStage.name}>
              <div>{thisStage.label}</div>
              <input
                type="number"
                className="w-20 rounded-md border border-gray-300 px-3 py-1 focus:border-primary focus:ring-primary"
                // Uses defaultValue and onBlur instead of value and onChange
                // to prevent input changes while the user is typing.
                defaultValue={Number((thisStage.duration / 60).toFixed(2))} // Convert to minutes
                onBlur={(e) => handleTimeChange(thisStage.name, e.target.value)}
              />
              <div>mins</div>
            </div>
          ))}
        </div>
        <button
          className="mt-4 mx-auto block rounded-full text-white bg-emerald-500 px-4 py-1 align-middle transition-colors hover:bg-emerald-600"
          onClick={() => {
            confirmSettings();
          }}
        >
          Apply
        </button>
      </Transition>
    </div>
  );
};

export default PomodoroSettings;
