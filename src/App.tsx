/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FC, useContext, useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFlagCheckered,
  faArrowUp,
  faArrowDown,
  faCar,
  faStopwatch,
  faFaceFrown,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GridLoader } from "react-spinners";
import Events from "./components/Events/Events";
import Slider from "./components/Slider";
import Standings from "./components/Standings";
import useRaceData from "./hooks/useRaceData";
import RaceModal from "./components/RaceModal";
import useAPI from "./hooks/useAPI";
import AppContext from "./context";

library.add(
  faFlagCheckered,
  faArrowUp,
  faArrowDown,
  faCar,
  faStopwatch,
  faFaceFrown
);

const App: FC = () => {
  const { getSeasons } = useAPI();
  const { laps, setCurrentLap, currentLap, events, loading } = useRaceData();

  const {
    state: { selectedRace },
    dispatch,
  } = useContext(AppContext);

  const fetchSeasons = async (): Promise<void> => {
    const data = await getSeasons();
    dispatch({ type: "SET_SEASONS", payload: data });
  };

  useEffect(() => {
    fetchSeasons();
  }, []);

  const handleSliderChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setCurrentLap(Number(value));
  };

  const raceTitle = selectedRace
    ? `${selectedRace.season} ${selectedRace.raceName}`
    : "";

  return (
    <div className="flex flex-col p-6 absolute inset-0 overflow-hidden">
      <h1 className="text-center">Race Visualizer</h1>
      <h2 className="text-center mb-10">{raceTitle}</h2>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <GridLoader color="#A6ADBA" size={50} />
        </div>
      ) : laps ? (
        laps.length ? (
          <>
            <Slider
              laps={laps.length}
              value={currentLap}
              onChange={handleSliderChange}
            />

            <div className="mt-10 flex flex-row gap-5 flex-1 overflow-hidden">
              <div className="flex-1 overflow-auto">
                <Standings data={laps[currentLap - 1]?.Timings} />
              </div>
              <div className="flex-1 overflow-auto">
                <Events events={events} currentLap={currentLap} />
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 h-[85%] flex flex-col items-center justify-center gap-5">
            <FontAwesomeIcon
              icon="face-frown"
              className="text-gray-400"
              size="5x"
            />
            <p className="text-5xl">No Data. Select Another!</p>
          </div>
        )
      ) : (
        <div className="flex-1 h-[85%] flex flex-col items-center justify-center gap-5">
          <FontAwesomeIcon
            icon="flag-checkered"
            className="text-gray-400"
            size="5x"
          />
          <p className="text-5xl">Select a Race</p>
        </div>
      )}

      {/* race modal button */}
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        htmlFor="my-modal"
        className="btn btn-primary absolute top-5 right-5 modal-button"
      >
        Select Race
      </label>

      <RaceModal />
    </div>
  );
};

export default App;
