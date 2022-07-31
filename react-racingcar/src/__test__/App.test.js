import { render, fireEvent, queryByAttribute, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const getById = queryByAttribute.bind(null, 'id');

describe("🚀 random 테스트 케이스", () => {
    test("Random의 pickNumberInRange 메소드를 사용하여 랜덤값을 생성해야합니다.", () => {
        const { container } = render(<App />);
        const randomSpy = jest.spyOn(global.MissionUtils.Random, "pickNumberInRange");
        const $textInput = getById(container, "text-input");
        const $numberInput = getById(container, "number-input");
        const $textButton = getById(container, "text-button");
        const $numberButton = getById(container, "number-button");
        fireEvent.change($textInput, { target: { value: "race1,race2,race3,race4" } });
        userEvent.click($textButton);
        fireEvent.change($numberInput, { target: { value: 2 } });
        userEvent.click($numberButton);
        expect(randomSpy.mock.calls.length).toBeGreaterThanOrEqual(1);
    });
});

describe("✅ input 테스트 케이스", () => {
    test("#text-input의 입력값에 맞게 입력값이 변해야합니다.", () => {
        const { container } = render(<App />);
        const $textInput = getById(container, "text-input");
        fireEvent.change($textInput, { target: { value: "race1,race2,race3,race4" } });
        const inputValue = screen.getByDisplayValue("race1,race2,race3,race4");
        expect(inputValue.value).toEqual("race1,race2,race3,race4");
    });

    test("#number-input의 입력값에 맞게 입력값이 변해야합니다2.", () => {
        const { container } = render(<App />);
        const $textInput = getById(container, "number-input");
        fireEvent.change($textInput, { target: { value: "10" } });
        const inputValue = screen.getByDisplayValue("10");
        expect(inputValue.value).toEqual("10");
    });

    test("자동차의 이름은 (,)로 구분하며 버튼을 누른 경우 각각의 자동차이름이 6글자 이상일 경우 경고창으로 나타내야 합니다.", () => {
        const alertMock = jest.spyOn(window, "alert");
        const { container } = render(<App />);
        const $input = getById(container, "text-input");
        const $button = getById(container, "text-button");
        fireEvent.change($input, { target: { value: "a,ab,abc,abcd,abcdf" } });
        userEvent.click($button);
        fireEvent.change($input, { target: { value: "a,ab,abc,abcd,abcdfe" } });
        userEvent.click($button);
        expect(alertMock).toBeCalledTimes(1);
    });

    test("버튼을 누를 경우 이동하는 입력값이 0이 들어올 경우 경고창으로 나타내야 합니다.", () => {
        const mockAlart = jest.spyOn(window, "alert");
        const { container } = render(<App />);
        const $input = getById(container, "number-input");
        const $button = getById(container, "number-button");
        fireEvent.change($input, { target: { value: '0' } });
        userEvent.click($button);
        expect($input.value).toBe('0');
        expect(mockAlart).toHaveBeenCalledTimes(1);
    });
});

describe("🏎 자동차 테스트 케이스", () => {
    test("자동차의 개수에 맞게 화면에 자동차가 출력되어야 합니다.", () => {
        const { container } = render(<App />);
        const $textInput = getById(container, "text-input");
        const $numberInput = getById(container, "number-input");
        const $textButton = getById(container, "text-button");
        const $numberButton = getById(container, "number-button");
        fireEvent.change($textInput, { target: { value: "race1,race2,race3,race4" } });
        userEvent.click($textButton);
        fireEvent.change($numberInput, { target: { value: 2 } });
        userEvent.click($numberButton);
        const components = screen.getAllByText(/^race/i);
        expect(components.length).toBe(8);
    });

    test("자동차의 개수와 반복 카운트만큼 pickNumberInRange이 호출되어야 합니다.", () => {
        const { container } = render(<App />);
        const randomSpy = jest.spyOn(global.MissionUtils.Random, "pickNumberInRange");
        const $textInput = getById(container, "text-input");
        const $numberInput = getById(container, "number-input");
        const $textButton = getById(container, "text-button");
        const $numberButton = getById(container, "number-button");
        fireEvent.change($textInput, { target: { value: "race1,race2,race3,race4" } });
        userEvent.click($textButton);
        fireEvent.change($numberInput, { target: { value: 2 } });
        userEvent.click($numberButton);
        expect(randomSpy).toBeCalledTimes(8);
    });

    test("전진하는 조건은 pickNumberInRange 메소드를 사용하여 4 이상인 경우에만 전진합니다.", () => {
        const { container } = render(<App />);
        jest.spyOn(global.MissionUtils.Random, "pickNumberInRange")
            .mockReturnValueOnce(4)
            .mockReturnValueOnce(4)
            .mockReturnValueOnce(4)
            .mockReturnValueOnce(4)
            .mockReturnValueOnce(3)
            .mockReturnValueOnce(3)
            .mockReturnValueOnce(5)
            .mockReturnValueOnce(5)
        const $textInput = getById(container, "text-input");
        const $numberInput = getById(container, "number-input");
        const $textButton = getById(container, "text-button");
        const $numberButton = getById(container, "number-button");
        fireEvent.change($textInput, { target: { value: "race1,race2,race3,race4" } });
        userEvent.click($textButton);
        fireEvent.change($numberInput, { target: { value: 2 } });
        userEvent.click($numberButton);
        const firstRaceCar = screen.getAllByText(/^race1/);
        const lastRaceCar = screen.getAllByText(/^race4/);
        expect(firstRaceCar[0]).toHaveTextContent("race1: -");
        expect(firstRaceCar[1]).toHaveTextContent("race1: -");
        expect(lastRaceCar[0]).toHaveTextContent("race4: -");
        expect(lastRaceCar[1]).toHaveTextContent("race4: --");
    });

    test("게임이 종료된 뒤에 화면에 최종 우승자가 출력되어야 합니다.", () => {
        const { container } = render(<App />);
        const $textInput = getById(container, "text-input");
        const $numberInput = getById(container, "number-input");
        const $textButton = getById(container, "text-button");
        const $numberButton = getById(container, "number-button");
        fireEvent.change($textInput, { target: { value: "race1,race2,race3,race4" } });
        userEvent.click($textButton);
        fireEvent.change($numberInput, { target: { value: 2 } });
        userEvent.click($numberButton);
        const winnerText = screen.getByText(/우승자/);
        expect(winnerText).toBeInTheDocument();
    });
});

describe("🎊 승리 테스트 케이스", () => {
    test("우승자가 여러명일 경우 쉼표(,)를 이용하여 구분하여 출력되어야 합니다.", () => {
        const { container } = render(<App />);
        jest.spyOn(global.MissionUtils.Random, "pickNumberInRange")
            .mockReturnValueOnce(4)
            .mockReturnValueOnce(4)
            .mockReturnValueOnce(4)
            .mockReturnValueOnce(4)
            .mockReturnValueOnce(3)
            .mockReturnValueOnce(3)
            .mockReturnValueOnce(5)
            .mockReturnValueOnce(5)
        const $textInput = getById(container, "text-input");
        const $numberInput = getById(container, "number-input");
        const $textButton = getById(container, "text-button");
        const $numberButton = getById(container, "number-button");
        fireEvent.change($textInput, { target: { value: "race1,race2,race3,race4" } });
        userEvent.click($textButton);
        fireEvent.change($numberInput, { target: { value: 2 } });
        userEvent.click($numberButton);
        const winnerText = screen.getByText(/우승자/);
        expect(winnerText).toHaveTextContent(/race3/);
        expect(winnerText).toHaveTextContent(/race4/);
    });
});