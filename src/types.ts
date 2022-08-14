export type Timing = {
  driverId: string;
  position: number;
  time: string;
  positionChange?: number;
};

export type Lap = {
  Timings: Timing[];
};

export enum EventType {
  POSITION_GAINED = "POSITION_GAINED",
  POSITION_LOST = "POSITION_LOST",
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
  duration: string;
  lap: string;
  stop: string;
  time: string;
};
