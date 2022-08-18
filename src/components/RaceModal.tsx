import { ChangeEvent, FC, useContext, useRef, useState } from "react";
import AppContext from "../context";
import useAPI from "../hooks/useAPI";
import { Race } from "../types";

const RaceModal: FC = () => {
  const {
    state: { seasons, races },
    dispatch,
  } = useContext(AppContext);

  const { getSeasonRaces } = useAPI();
  const [tmpSelectedSeason, setTmpSelectedSeason] = useState<number | null>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSeasonSelect = async (s: number): Promise<void> => {
    dispatch({ type: "SET_SELECTED_SEASON", payload: s });
    setTmpSelectedSeason(s);
    const data = await getSeasonRaces(s);
    dispatch({ type: "SET_RACES", payload: data });
  };

  const handleRaceSelect = async (r: Race): Promise<void> => {
    dispatch({ type: "SET_SELECTED_RACE", payload: r });
    setTmpSelectedSeason(null);
    if (inputRef.current) {
      inputRef.current.checked = false;
    }
  };

  const handleToggle = ({
    target: { checked },
  }: ChangeEvent<HTMLInputElement>): void => {
    if (!checked) {
      setTmpSelectedSeason(null);
    }
  };

  let title;
  if (tmpSelectedSeason) title = "Select Race";
  else title = "Select Season";

  return (
    <>
      <input
        onChange={handleToggle}
        ref={inputRef}
        type="checkbox"
        id="my-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box w-10/12 max-w-5xl">
          <h2 className="font-bold">{title}</h2>
          {!tmpSelectedSeason ? (
            <div className="grid grid-cols-10">
              {seasons ? (
                seasons.map((s) => (
                  <button
                    data-testid="RaceModal--season-btn"
                    key={s}
                    type="button"
                    className="btn btn-accent my-2 mr-4"
                    onClick={() => handleSeasonSelect(s)}
                  >
                    {s}
                  </button>
                ))
              ) : (
                <p>Loading seasons...</p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-6">
              {races ? (
                races.map((r) => (
                  <button
                    data-testid="RaceModal--race-btn"
                    key={`${r.season}-${r.raceName}`}
                    type="button"
                    className="btn btn-primary my-2 mr-4"
                    onClick={() => handleRaceSelect(r)}
                  >
                    {r.raceName}
                  </button>
                ))
              ) : (
                <p>Loading races..</p>
              )}
            </div>
          )}

          <div className="modal-action">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="my-modal" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default RaceModal;
