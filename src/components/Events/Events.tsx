import React, { FC, forwardRef, useEffect, useState } from "react";
import FlipMove from "react-flip-move";
import { Event, EventType } from "../../types";
import Collapse, { CollapseProps } from "../Collapse";
import FastestLap from "./components/FastestLap";
import PitStop from "./components/PitStop";
import PositionGained from "./components/PositionGained";
import PositionLost from "./components/PositionLost";
import StartEvent from "./components/StartEvent";

type EventsProps = {
  events: Event[];
  currentLap: number;
};

type EventsByLap = { [x: number]: Event[] };

const EventComponentMap = {
  [EventType.START]: StartEvent,
  [EventType.POSITION_GAINED]: PositionGained,
  [EventType.POSITION_LOST]: PositionLost,
  [EventType.PIT_STOP]: PitStop,
  [EventType.NEW_FASTEST_LAP]: FastestLap,
};

const FunctionalCollapse = forwardRef<HTMLDivElement, CollapseProps>(
  ({ children, ...props }, ref) => (
    <div ref={ref}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Collapse {...props}>{children}</Collapse>
    </div>
  )
);

const Events: FC<EventsProps> = ({ events, currentLap }) => {
  // bucket the events into their own laps
  const [eventsByLap, setEventsByLap] = useState<EventsByLap>({});

  useEffect(() => {
    const tmpEventsByLap: EventsByLap = {};
    events.forEach((e) => {
      if (e.lap <= currentLap) {
        const arr = tmpEventsByLap[e.lap] || [];
        tmpEventsByLap[e.lap] = [...arr, e];
      }
    });
    setEventsByLap(tmpEventsByLap);
  }, [currentLap]);

  return (
    // https://github.com/joshwcomeau/react-flip-move/issues/273
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <FlipMove>
      {Object.entries(eventsByLap)
        .reverse()
        .map(([lapNumber, evs]) => (
          <FunctionalCollapse
            key={lapNumber}
            title={`Lap ${lapNumber}`}
            tabIndex={Number(lapNumber)}
            last={currentLap === Number(lapNumber)}
          >
            {evs.map((e) => EventComponentMap[e.type](e))}
          </FunctionalCollapse>
        ))}
    </FlipMove>
  );
};

export default Events;
