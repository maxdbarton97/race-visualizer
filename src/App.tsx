/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FC } from "react";

import Events from "./components/Events";
import Slider from "./components/Slider";
import Standings from "./components/Standings";
import useRaceData from "./hooks/useRaceData";

const App: FC = () => {
  const { laps, setCurrentLap, currentLap, events } = useRaceData();

  const handleSliderChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setCurrentLap(Number(value));
  };

  if (!laps.length) return <p>loading</p>;

  const standings = laps[currentLap - 1].Timings;

  return (
    <div className="items-center justify-center flex-col p-10 h-screen overflow-hidden">
      <h1 className="text-center">Race Visualiser</h1>
      <h2 className="text-center mb-5">Hungary</h2>
      <Slider
        laps={laps.length}
        value={currentLap}
        onChange={handleSliderChange}
      />

      <div className="mt-10 flex flex-row gap-5 flex-1 h-[85%]">
        <div className="flex-1 overflow-auto">
          <Standings data={standings} />
        </div>
        <div className="flex-1 overflow-auto">
          <Events events={events} currentLap={currentLap} />
        </div>
      </div>
    </div>
  );
};

export default App;
