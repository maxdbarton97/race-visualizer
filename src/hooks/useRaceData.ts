/* eslint-disable no-param-reassign */
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Event, EventType, Lap, PitStop, Timing } from "../types";
import useAPI from "./useAPI";

type RaceDataHook = {
  laps: Lap[];
  currentLap: number;
  setCurrentLap: Dispatch<SetStateAction<number>>;
  events: Event[];
};

const useRaceData = (): RaceDataHook => {
  const { getLaps, getPitStops } = useAPI();
  const [currentLap, setCurrentLap] = useState<number>(1);
  const [laps, setLaps] = useState<Lap[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

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
        // check driver positions
        l.Timings.forEach(({ driverId, position, positionChange }) => {
          if (positionChange)
            if (positionChange > 0)
              tmpEvents.push({
                lap: i + 1,
                type: EventType.POSITION_GAINED,
                message: `${driverId} has moved up to position ${position}`,
              });
            else
              tmpEvents.push({
                lap: i + 1,
                type: EventType.POSITION_LOST,
                message: `${driverId} has moved down to position ${position}`,
              });
        });
      }

      // add pitstops
      pitStopData.forEach(({ lap, duration, driverId }) => {
        if (i + 1 === Number(lap))
          tmpEvents.push({
            lap: i + 1,
            type: EventType.PIT_STOP,
            message: ` ${driverId} pit stop (${duration})`,
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

  const fetchData = async (): Promise<void> => {
    const lapData = await getLaps();
    const pitStopData = await getPitStops();
    const lapDataWithPositionChanges = addPositionChanges(lapData);
    createEvents(lapDataWithPositionChanges, pitStopData);
    setLaps(lapDataWithPositionChanges);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    laps,
    currentLap,
    setCurrentLap,
    events,
  };
};

export default useRaceData;
