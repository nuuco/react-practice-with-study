import "@testing-library/jest-dom";

const pickNumberInRange = jest.fn();

beforeEach(() => {
  window.alert = jest.fn();
  global.MissionUtils = {
    Random: {
        pickNumberInRange
    }
}
})