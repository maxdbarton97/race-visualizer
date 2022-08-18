declare namespace Cypress {
  interface Chainable<Subject> {
    setSliderValue(value: number): Chainable<Subject>;
  }
}
