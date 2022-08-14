import axios from "axios";
import drivers from "../contants/drivers";
import { Lap, PitStop } from "../types";

type APIHook = {
  getLaps: () => Promise<Lap[]>;
  getPitStops: () => Promise<PitStop[]>;
};

const useAPI = (): APIHook => {
  const getLaps = async (): Promise<Lap[]> => {
    const { data } = await axios.get(
      `https://ergast.com/api/f1/2022/13/laps.json?limit=99999` // get all
    );

    // extrapolate the data
    const laps: Lap[] = data.MRData.RaceTable.Races[0].Laps;
    const lapsWithDrivers = laps.map((lap) => ({
      Timings: lap.Timings.map((timing) => ({
        position: Number(timing.position),
        // pretty the driver names
        driverId: drivers[timing.driverId],
        time: timing.time,
      })),
    }));

    return lapsWithDrivers;
  };

  const getPitStops = async (): Promise<PitStop[]> => {
    const { data } = await axios.get(
      "https://ergast.com/api/f1/2022/13/pitstops.json"
    );

    const pitStops: PitStop[] = data.MRData.RaceTable.Races[0].PitStops;
    const pitStopsWithDrivers = pitStops.map((ps) => ({
      ...ps,
      driverId: drivers[ps.driverId],
    }));

    return pitStopsWithDrivers;
  };

  return {
    getLaps,
    getPitStops,
  };
};

export default useAPI;
