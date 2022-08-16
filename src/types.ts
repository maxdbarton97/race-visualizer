export type Race = {
  raceName: string;
  round: string;
  season: string;
};

export type Timing = {
  driverId: string;
  driverName: string;
  position: number;
  time: string;
  positionChange?: number;
  newFastest?: string;
  currentFastest?: string;
};

export type Lap = {
  Timings: Timing[];
};

export enum EventType {
  POSITION_GAINED = "POSITION_GAINED",
  POSITION_LOST = "POSITION_LOST",
  NEW_FASTEST_LAP = "NEW_FASTEST_LAP",
  START = "START",
  PIT_STOP = "PIT_STOP",
}

export type Event = {
  lap: number;
  type: EventType;
  message: string;
};

export type PitStop = {
  driverId: string;
  driverName: string;
  duration: string;
  lap: string;
  stop: string;
  time: string;
};

export type AppState = {
  seasons?: number[];
  races?: Race[];
  selectedSeason?: number;
  selectedRace?: Race;
};

export type AppAction =
  | { type: "SET_SEASONS"; payload: number[] }
  | { type: "SET_RACES"; payload: Race[] }
  | { type: "SET_SELECTED_SEASON"; payload: number }
  | { type: "SET_SELECTED_RACE"; payload: Race };
