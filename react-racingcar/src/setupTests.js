import "@testing-library/jest-dom";

const pickNumberInRange = jest.fn()

beforeEach(() => {
    global.alert = jest.fn();
    global.MissionUtils = {
        Random: {
            pickNumberInRange
        }
    }
});