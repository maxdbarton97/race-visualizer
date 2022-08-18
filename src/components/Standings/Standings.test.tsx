import { cleanup, render, screen } from "@testing-library/react";
import { Timing } from "../../types";
import Standings from "./Standings";

const mock: { data: Timing[] } = {
  data: [
    {
      driverId: "stroll",
      driverName: "Lance Stroll",
      position: 7,
      time: "1:22:345",
      positionChange: 2,
      newFastest: "1:22:345",
      currentFastest: "1:22:345",
    },
    {
      driverId: "vettel",
      driverName: "Sebastian Vettel",
      position: 3,
      time: "1:23:456",
    },
  ],
};

describe("Standings", () => {
  beforeEach(() => {
    render(<Standings data={mock.data} />);
  });

  afterEach(cleanup);

  it("should display all driver", () => {
    const standings = document.querySelector("tbody");
    expect(standings?.childElementCount).toBe(2);
  });
  it("should display driver information", () => {
    const vettelRow = screen.getByText("Sebastian Vettel").parentElement;
    expect(vettelRow).toHaveTextContent("3");
    expect(vettelRow).toHaveTextContent("-");
    expect(vettelRow).toHaveTextContent("1:23:456");
    expect(vettelRow).not.toHaveTextContent("BEST");
  });

  it("should sort by position", () => {
    const standings = document.querySelector("tbody");
    expect(standings?.firstChild).toHaveTextContent("Sebastian Vettel");
    expect(standings?.lastChild).toHaveTextContent("Lance Stroll");
  });

  it("should display position change as a positive or negative integer", () => {
    const vettelRow = screen.getByText("Lance Stroll").parentElement;
    expect(vettelRow).toHaveTextContent("+2");
  });

  it("should display best when driver has current fastest set", () => {
    const vettelRow = screen.getByText("Lance Stroll").parentElement;
    expect(vettelRow).toHaveTextContent("BEST");
  });

  // Would be nice to check for background colors,
  // but this would be better off inside a seperate row component test.
  // some of the above should belong there too
});
