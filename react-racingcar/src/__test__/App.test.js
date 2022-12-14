import { render, fireEvent, queryByAttribute, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const getById = queryByAttribute.bind(null, 'id');

describe("๐ random ํ์คํธ ์ผ์ด์ค", () => {
    test("Random์ pickNumberInRange ๋ฉ์๋๋ฅผ ์ฌ์ฉํ์ฌ ๋๋ค๊ฐ์ ์์ฑํด์ผํฉ๋๋ค.", () => {
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

describe("โ input ํ์คํธ ์ผ์ด์ค", () => {
    test("#text-input์ ์๋ ฅ๊ฐ์ ๋ง๊ฒ ์๋ ฅ๊ฐ์ด ๋ณํด์ผํฉ๋๋ค.", () => {
        const { container } = render(<App />);
        const $textInput = getById(container, "text-input");
        fireEvent.change($textInput, { target: { value: "race1,race2,race3,race4" } });
        const inputValue = screen.getByDisplayValue("race1,race2,race3,race4");
        expect(inputValue.value).toEqual("race1,race2,race3,race4");
    });

    test("#number-input์ ์๋ ฅ๊ฐ์ ๋ง๊ฒ ์๋ ฅ๊ฐ์ด ๋ณํด์ผํฉ๋๋ค2.", () => {
        const { container } = render(<App />);
        const $textInput = getById(container, "number-input");
        fireEvent.change($textInput, { target: { value: "10" } });
        const inputValue = screen.getByDisplayValue("10");
        expect(inputValue.value).toEqual("10");
    });

    test("์๋์ฐจ์ ์ด๋ฆ์ (,)๋ก ๊ตฌ๋ถํ๋ฉฐ ๋ฒํผ์ ๋๋ฅธ ๊ฒฝ์ฐ ๊ฐ๊ฐ์ ์๋์ฐจ์ด๋ฆ์ด 6๊ธ์ ์ด์์ผ ๊ฒฝ์ฐ ๊ฒฝ๊ณ ์ฐฝ์ผ๋ก ๋ํ๋ด์ผ ํฉ๋๋ค.", () => {
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

    test("๋ฒํผ์ ๋๋ฅผ ๊ฒฝ์ฐ ์ด๋ํ๋ ์๋ ฅ๊ฐ์ด 0์ด ๋ค์ด์ฌ ๊ฒฝ์ฐ ๊ฒฝ๊ณ ์ฐฝ์ผ๋ก ๋ํ๋ด์ผ ํฉ๋๋ค.", () => {
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

describe("๐ ์๋์ฐจ ํ์คํธ ์ผ์ด์ค", () => {
    test("์๋์ฐจ์ ๊ฐ์์ ๋ง๊ฒ ํ๋ฉด์ ์๋์ฐจ๊ฐ ์ถ๋ ฅ๋์ด์ผ ํฉ๋๋ค.", () => {
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

    test("์๋์ฐจ์ ๊ฐ์์ ๋ฐ๋ณต ์นด์ดํธ๋งํผ pickNumberInRange์ด ํธ์ถ๋์ด์ผ ํฉ๋๋ค.", () => {
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

    test("์ ์งํ๋ ์กฐ๊ฑด์ pickNumberInRange ๋ฉ์๋๋ฅผ ์ฌ์ฉํ์ฌ 4 ์ด์์ธ ๊ฒฝ์ฐ์๋ง ์ ์งํฉ๋๋ค.", () => {
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

    test("๊ฒ์์ด ์ข๋ฃ๋ ๋ค์ ํ๋ฉด์ ์ต์ข ์ฐ์น์๊ฐ ์ถ๋ ฅ๋์ด์ผ ํฉ๋๋ค.", () => {
        const { container } = render(<App />);
        const $textInput = getById(container, "text-input");
        const $numberInput = getById(container, "number-input");
        const $textButton = getById(container, "text-button");
        const $numberButton = getById(container, "number-button");
        fireEvent.change($textInput, { target: { value: "race1,race2,race3,race4" } });
        userEvent.click($textButton);
        fireEvent.change($numberInput, { target: { value: 2 } });
        userEvent.click($numberButton);
        const winnerText = screen.getByText(/์ฐ์น์/);
        expect(winnerText).toBeInTheDocument();
    });
});

describe("๐ ์น๋ฆฌ ํ์คํธ ์ผ์ด์ค", () => {
    test("์ฐ์น์๊ฐ ์ฌ๋ฌ๋ช์ผ ๊ฒฝ์ฐ ์ผํ(,)๋ฅผ ์ด์ฉํ์ฌ ๊ตฌ๋ถํ์ฌ ์ถ๋ ฅ๋์ด์ผ ํฉ๋๋ค.", () => {
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
        const winnerText = screen.getByText(/์ฐ์น์/);
        expect(winnerText).toHaveTextContent(/race3/);
        expect(winnerText).toHaveTextContent(/race4/);
    });
});