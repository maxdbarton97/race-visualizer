import axios from "axios";
import { Lap, PitStop, Race } from "../types";

const useAPI = () => {
  const getSeasons = async (): Promise<number[]> => {
    const { data } = await axios.get(
      `https://ergast.com/api/f1/seasons.json?limit=99999` // get all
    );

    const seasons = data.MRData.SeasonTable.Seasons.map(
      (s: { season: string }) => Number(s.season)
    );

    return seasons;
  };
  const getSeasonRaces = async (season: number): Promise<Race[]> => {
    const { data } = await axios.get(
      `http://ergast.com/api/f1/${season}.json?limit=99999` // get all
    );

    const races = data.MRData.RaceTable.Races.filter(
      ({ date }: { date: string }) => {
        const todayDate = new Date().toISOString().slice(0, 10);
        return todayDate > date;
      }
    ).map(({ raceName, round, season: s }: Race) => ({
      raceName,
      round,
      season: s,
    }));

    return races;
  };

  const getDriverName = async (driverId: string): Promise<string> => {
    const { data } = await axios.get(
      `https://ergast.com/api/f1/drivers/${driverId}.json`
    );

    const { givenName, familyName } = data.MRData.DriverTable.Drivers[0];
    return `${givenName} ${familyName}`;
  };

  const getLaps = async (race: Race): Promise<Lap[]> => {
    const { data } = await axios.get(
      `https://ergast.com/api/f1/${race.season}/${race.round}/laps.json?limit=99999` // get all
    );

    if (!data.MRData.RaceTable.Races[0]) return [];

    // extrapolate the data
    const laps: Lap[] = data.MRData.RaceTable.Races[0].Laps;

    const lapsWithDriversAsync = laps.map(async (lap) => {
      const TimingsAsync = lap.Timings.map(async (timing) => {
        const driverName = await getDriverName(timing.driverId);
        return {
          driverId: timing.driverId,
          driverName,
          position: Number(timing.position),
          time: timing.time,
        };
      });

      const Timings = await Promise.all(TimingsAsync);
      return { Timings };
    });

    const lapsWithDrivers = await Promise.all(lapsWithDriversAsync);
    return lapsWithDrivers;
  };

  const getPitStops = async (race: Race): Promise<PitStop[]> => {
    const { data } = await axios.get(
      `https://ergast.com/api/f1/${race.season}/${race.round}/pitstops.json`
    );

    if (!data.MRData.RaceTable.Races[0]) return [];

    const pitStops: PitStop[] = data.MRData.RaceTable.Races[0].PitStops;
    const pitStopsWithDriversAsync = pitStops.map(async (p) => {
      const driverName = await getDriverName(p.driverId);
      return { ...p, driverName };
    });

    const pitStopsWithDrivers = await Promise.all(pitStopsWithDriversAsync);
    return pitStopsWithDrivers;
  };

  return {
    getLaps,
    getPitStops,
    getSeasons,
    getSeasonRaces,
    getDriverName,
  };
};

export default useAPI;
