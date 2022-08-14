import React, { FC, forwardRef, useEffect, useState } from "react";
import FlipMove from "react-flip-move";
import { Event, EventType } from "../types";
import Collapse, { CollapseProps } from "./Collapse";

type EventsProps = {
  events: Event[];
  currentLap: number;
};

type EventsByLap = { [x: number]: Event[] };

const EventComponentMap = {
  [EventType.START]: ({ message }: Event) => <p key={message}>🏁 {message}</p>,
  [EventType.POSITION_GAINED]: ({ message }: Event) => (
    <p key={message} className="text-green-400">
      ⬆ {message}
    </p>
  ),
  [EventType.POSITION_LOST]: ({ message }: Event) => (
    <p key={message} className="text-red-400">
      ⬇ {message}
    </p>
  ),

  [EventType.PIT_STOP]: ({ message }: Event) => (
    <p key={message} className="text-red-400">
      🛞 {message}
    </p>
  ),
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
