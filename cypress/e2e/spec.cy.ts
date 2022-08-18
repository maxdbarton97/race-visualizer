// 73 seasons and 13 races for 2022 at the point of writing this test,
// so test for greater than or equal to this.

describe("Race Selection", () => {
  it("should display all seasons", () => {
    cy.visit("localhost:3000");
    cy.contains("Select Race").click();
    cy.get("[data-testid=RaceModal--season-btn]").should("have.length.gte", 73);
  });

  it("should display all races when selecting a season", () => {
    cy.contains("2022").click();
    cy.get(`[data-testid=RaceModal--race-btn]`).should("have.length.gte", 13);
  });
});

describe.only("Race Visualiser", () => {
  it("should display data on the selected race", () => {
    cy.visit("localhost:3000");
    cy.contains("Select Race").click();
    cy.contains("2022").click();
    cy.contains("Hungarian Grand Prix").click();

    // driver and time check
    cy.waitUntil(() => cy.contains("George Russel"));
    cy.waitUntil(() => cy.contains("1:28.391"));
  });

  it("should move drivers when the lap slider is moved", () => {
    const input = cy.get("[data-testid=Slider--input]");
    input.should("have.value", 1);

    const standings = cy.get("tbody").children();
    standings.should("have.length", 20);

    // check albon moved from 15th to 12th
    const albon = cy.contains("Alexander Albon").parent();
    albon.should("contain", "15");
    input.setSliderValue(2);
    albon.should("contain", "12");
  });

  it("should set a best label against the driver with the fastest lap", () => {
    cy.contains("BEST").parent().parent().contains("George Russell"); // lap 2
    const input = cy.get("[data-testid=Slider--input]");
    input.setSliderValue(4);
    cy.contains("BEST").parent().parent().contains("Carlos Sainz");
  });

  it("should update the event feed with the most recent lap data", () => {
    let mostRecentLapEvents = cy.get("[data-testid=Events]").first();
    mostRecentLapEvents.should("contain", "Lap 4");

    const input = cy.get("[data-testid=Slider--input]");
    input.setSliderValue(5);
    mostRecentLapEvents = cy.get("[data-testid=Events]").first();
    mostRecentLapEvents.should("contain", "Lap 5");
  });
});
