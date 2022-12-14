import { render, screen, queryByAttribute } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Charge from '../pages/Charge';

const getById = queryByAttribute.bind(null, "id");
const coins = { "500": 0, "100": 0, "50": 0, "10": 0 };
const setCoins = jest.fn();

describe("๐ random ํ์คํธ ์ผ์ด์ค", () => {
  test("Random์ pickNumberInRange ๋ฉ์๋๋ฅผ ์ฌ์ฉํ์ฌ ๋๋ค๊ฐ์ ์์ฑํด์ผํฉ๋๋ค.", () => {
    const { container } = render(<Charge coins={coins} setCoins={setCoins} />);
    const randomSpy = jest.spyOn(global.MissionUtils.Random, "pickNumberInRange");
    const $input = getById(container, "charge-input");
    const $button = screen.getByRole("button", { name: "์ถฉ์ ํ๊ธฐ" });
    userEvent.type($input, "450");
    userEvent.click($button, { target: { [$input.name]: { value: "450" } } });
    expect(randomSpy.mock.calls.length).toBeGreaterThan(0);
  });
});

describe("โ input ํ์คํธ ์ผ์ด์ค", () => {
  test("์ถฉ์ ํ  ๊ธ์ก์ด 10์ผ๋ก ๋๋์ด ๋จ์ด์ง์ง ์๋๋ค๋ฉด ๊ฒฝ๊ณ ์ฐฝ์ ๋ํ๋ด์ผ ํฉ๋๋ค.", () => {
    const alertSpy = jest.spyOn(window, "alert");
    const { container } = render(<Charge coins={coins} setCoins={setCoins} />);
    const $input = getById(container, "charge-input");
    const $button = screen.getByRole("button", { name: "์ถฉ์ ํ๊ธฐ" });
    userEvent.type($input, "11");
    userEvent.click($button, { target: { [$input.name]: { value: "11" } } });
    expect(alertSpy).toBeCalledTimes(1);
  });
});

describe("๐ ์๋ ์ถฉ์  ํญ ํ์คํธ ์ผ์ด์ค", () => {
  test("์ต์ด ๋์  ๋ณด์  ํํฉ์ ๋์ ์ ๊ฐ์๋ ๋ชจ๋ 0๊ฐ๋ก ์ด๊ธฐํ ๋์ด ์์ด์ผ ํฉ๋๋ค.", () => {
    render(<Charge coins={coins} setCoins={setCoins} />);
    const $coins = screen.getAllByText(/^0๊ฐ$/);
    expect($coins.length).toBe(4);
  });

  test("์ถฉ์ ํ๊ธฐ ๋ฒํผ์ ๋๋ฅด๋ฉด ํด๋น ๋ณด์  ๊ธ์ก + (์)์ผ๋ก ์ถฉ์ ํ ๊ธ์ก์ด ๋ํ๋์ผ ํฉ๋๋ค.", () => {
    const { container } = render(<Charge coins={coins} setCoins={setCoins} />);
    const $input = getById(container, "charge-input");
    const $button = screen.getByRole("button", { name: "์ถฉ์ ํ๊ธฐ" });
    userEvent.type($input, "450");
    userEvent.click($button, { target: { [$input.name]: { value: "450" } } });
    const $result = screen.getByText(/^๋ณด์  ๊ธ์ก/);
    expect($result.textContent).toContain("450์");
  });

  test("์ํ๊ธฐ ๋ณด์  ๊ธ์ก์ ๋์ ํ์ฌ ์ถฉ์ ํ  ์ ์์ด์ผ ํฉ๋๋ค.", () => {
    const { container } = render(<Charge coins={coins} setCoins={setCoins} />);
    const $input = getById(container, "charge-input");
    const $button = screen.getByRole("button", { name: "์ถฉ์ ํ๊ธฐ" });
    userEvent.type($input, "450");
    userEvent.click($button, { target: { [$input.name]: { value: "450" } } });
    const $result = screen.getByText(/^๋ณด์  ๊ธ์ก/);
    expect($result.textContent).toContain("450์");
    userEvent.type($input, "450");
    userEvent.click($button, { target: { [$input.name]: { value: "450" } } });
    expect($result.textContent).toContain("900์");
  });

  test("์ํ๊ธฐ ๋ณด์  ๊ธ์ก๋งํผ์ ๋์ ์ด ๋ฌด์์๋ก ์์ฑ๋์ด ํ๋ฉด์ ๋ํ๋์ผ ํฉ๋๋ค.", () => {
    const randomSpy = jest.spyOn(global.MissionUtils.Random, "pickNumberInRange");
    randomSpy.mockReturnValue(1);
    let coins = { "500": 0, "100": 0, "50": 0, "10": 0 };
    const setCoins = jest.fn();
    const { container } = render(<Charge coins={coins} setCoins={setCoins} />);
    const $input = getById(container, "charge-input");
    const $button = screen.getByRole("button", { name: "์ถฉ์ ํ๊ธฐ" });
    setCoins.mockImplementation((param) => coins = param);
    userEvent.type($input, "1000");
    userEvent.click($button, { target: { [$input.name]: { value: "1000" } } });
    expect(coins[500]).toBe(1);
    expect(coins[100]).toBe(1);
    expect(coins[50]).toBe(1);
    expect(coins[10]).toBe(35);
  });

  test("์ถ๊ฐ ์ถฉ์  ๊ธ์ก๋งํผ์ ๋์ ์ด ๋ฌด์์๋ก ์์ฑ๋์ด ๊ธฐ์กด ๋์ ๋ค์ ๋ํด์ ธ์ผ ํฉ๋๋ค.", () => {
    const randomSpy = jest.spyOn(global.MissionUtils.Random, "pickNumberInRange");
    randomSpy.mockReturnValue(1)
    let coins = { "500": 0, "100": 0, "50": 0, "10": 0 };
    const { container, rerender } = render(<Charge coins={coins} setCoins={setCoins} />);
    const $input = getById(container, "charge-input");
    const $button = screen.getByRole("button", { name: "์ถฉ์ ํ๊ธฐ" });
    setCoins.mockImplementation((param) => { coins = param });
    userEvent.type($input, "1000");
    userEvent.click($button, { target: { [$input.name]: { value: "1000" } } });
    rerender(<Charge coins={coins} setCoins={setCoins} />)
    userEvent.type($input, "1000");
    userEvent.click($button, { target: { [$input.name]: { value: "1000" } } });
    expect(setCoins).toBeCalledTimes(2);
    expect(coins[500]).toBe(2);
    expect(coins[100]).toBe(2);
    expect(coins[50]).toBe(2);
    expect(coins[10]).toBe(70);
  });
});