import "@testing-library/jest-dom";

const pickNumberInRange = jest.fn();
const pickUniqueNumbersInRange = jest.fn();

beforeEach(() => {
    window.confirm = jest.fn();
    window.alert = jest.fn();
    global.MissionUtils = {
        Random: {
            pickNumberInRange,
            pickUniqueNumbersInRange
        }
    }
    pickNumberInRange
    .mockReturnValueOnce(1)
    .mockReturnValueOnce(2)
    .mockReturnValueOnce(3)
    .mockReturnValue(4);

    pickUniqueNumbersInRange.mockReturnValue([1,2,3]);
});