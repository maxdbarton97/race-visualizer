import { cleanup, render, screen } from "@testing-library/react";
import { Event, EventType } from "../../types";
import Events from "./Events";

const mock: { events: Event[]; currentLap: number } = {
  events: [
    {
      lap: 1,
      message: " Lap Started",
      type: EventType.START,
    },

    {
      lap: 2,
      message: " Test",
      type: EventType.NEW_FASTEST_LAP,
    },
  ],
  currentLap: 1,
};

describe("Events", () => {
  afterEach(cleanup);
  it("should event information", () => {
    render(<Events events={mock.events} currentLap={mock.currentLap} />);
    const event = screen.getByText("Lap 1").parentElement?.parentElement;
    expect(event).toHaveTextContent("Lap Started");
  });

  it("should display lap events lte to current lap", () => {
    render(<Events events={mock.events} currentLap={mock.currentLap} />);
    let events = screen.getByTestId("Events");
    expect(events.childElementCount).toBe(1);

    mock.currentLap = 2;

    cleanup();
    render(<Events events={mock.events} currentLap={mock.currentLap} />);

    events = screen.getByTestId("Events");
    expect(events.childElementCount).toBe(2);
  });
});
