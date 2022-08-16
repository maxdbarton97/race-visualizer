/* eslint-disable no-param-reassign */
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import AppContext from "../context";
import { Event, EventType, Lap, PitStop, Race, Timing } from "../types";
import addPositionPrefix from "../utils/addPositionPrefix";
import useAPI from "./useAPI";

type RaceDataHook = {
  laps: Lap[] | undefined;
  currentLap: number;
  setCurrentLap: Dispatch<SetStateAction<number>>;
  events: Event[];
  fetchData: (race: Race) => Promise<void>;
  loading: boolean;
};

const useRaceData = (): RaceDataHook => {
  const { getLaps, getPitStops } = useAPI();
  const [currentLap, setCurrentLap] = useState<number>(1);
  const [laps, setLaps] = useState<Lap[] | undefined>();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    state: { selectedRace },
  } = useContext(AppContext);

  const createEvents = (lapData: Lap[], pitStopData: PitStop[]) => {
    const tmpEvents: Event[] = [];
    lapData.forEach((l, i) => {
      if (i === 0) {
        tmpEvents.push({
          lap: i + 1,
          message: "Race Started!",
          type: EventType.START,
        });
      } else {
        l.Timings.forEach(
          ({ driverName, position, positionChange, newFastest }) => {
            if (positionChange)
              if (positionChange > 0)
                tmpEvents.push({
                  lap: i + 1,
                  type: EventType.POSITION_GAINED,
                  message: `${driverName} up to ${addPositionPrefix(position)}`,
                });
              else
                tmpEvents.push({
                  lap: i + 1,
                  type: EventType.POSITION_LOST,
                  message: `${driverName} down to ${addPositionPrefix(
                    position
                  )}`,
                });

            if (newFastest)
              tmpEvents.push({
                lap: i + 1,
                type: EventType.NEW_FASTEST_LAP,
                message: `${driverName} fastest lap - ${newFastest}`,
              });
          }
        );
      }

      // add pitstops
      pitStopData.forEach(({ lap, duration, driverName }) => {
        if (i + 1 === Number(lap))
          tmpEvents.push({
            lap: i + 1,
            type: EventType.PIT_STOP,
            message: ` ${driverName} pitted - ${duration}`,
          });
      });
    });

    setEvents(tmpEvents);
  };

  const addPositionChanges = (lapData: Lap[]): Lap[] =>
    lapData.map((l, i) => {
      if (i === 0) return l;
      // check driver positions
      return {
        Timings: l.Timings.map((t) => {
          // dirver should always have a prev lap, so cast the type
          const { position: prevPosition } = lapData[i - 1].Timings.find(
            ({ driverId: di }) => t.driverId === di
          ) as Timing;

          if (prevPosition !== t.position) {
            t.positionChange = prevPosition - t.position;
          }

          return t;
        }),
      };
    });

  const calculateFastestLaps = (lapData: Lap[]) => {
    let fastest = lapData[0].Timings[0];

    const lapsWithFastest = lapData.map((lap, i) => {
      const fastestOfLap = lap.Timings.reduce(
        (f, l) => (l.time < f.time ? l : f),
        fastest
      );

      const indexOfFastestDriver = lapData[i].Timings.findIndex(
        ({ driverId }) => {
          return fastestOfLap.driverId === driverId;
        }
      );

      // is the fastest driver still in the race?
      if (indexOfFastestDriver >= 0) {
        lap.Timings[indexOfFastestDriver].currentFastest = fastest.time;
        if (fastestOfLap.time < fastest.time)
          lap.Timings[indexOfFastestDriver].newFastest = fastestOfLap.time;
      }

      fastest = fastestOfLap;
      return lap;
    });

    return lapsWithFastest;
  };

  const fetchData = async (race: Race): Promise<void> => {
    setLoading(true);
    const lapData = await getLaps(race);
    if (lapData.length) {
      const pitStopData = await getPitStops(race);
      const lapDataWithPositionChanges = addPositionChanges(lapData);
      const lapsWithFastest = calculateFastestLaps(lapDataWithPositionChanges);
      createEvents(lapsWithFastest, pitStopData);
      setLaps(lapsWithFastest.slice());
    } else setLaps([]);

    setCurrentLap(1);
    setLoading(false);
  };

  useEffect(() => {
    if (selectedRace) fetchData(selectedRace);
  }, [selectedRace]);

  return {
    laps,
    currentLap,
    setCurrentLap,
    events,
    fetchData,
    loading,
  };
};

export default useRaceData;
