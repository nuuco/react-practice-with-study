import { render, screen, queryByAttribute } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Charge from '../pages/Charge';

const getById = queryByAttribute.bind(null, "id");
const coins = { "500": 0, "100": 0, "50": 0, "10": 0 };
const setCoins = jest.fn();

describe("🚀 random 테스트 케이스", () => {
  test("Random의 pickNumberInRange 메소드를 사용하여 랜덤값을 생성해야합니다.", () => {
    const { container } = render(<Charge coins={coins} setCoins={setCoins} />);
    const randomSpy = jest.spyOn(global.MissionUtils.Random, "pickNumberInRange");
    const $input = getById(container, "charge-input");
    const $button = screen.getByRole("button", { name: "충전하기" });
    userEvent.type($input, "450");
    userEvent.click($button, { target: { [$input.name]: { value: "450" } } });
    expect(randomSpy.mock.calls.length).toBeGreaterThan(0);
  });
});

describe("✅ input 테스트 케이스", () => {
  test("충전할 금액이 10으로 나누어 떨어지지 않는다면 경고창을 나타내야 합니다.", () => {
    const alertSpy = jest.spyOn(window, "alert");
    const { container } = render(<Charge coins={coins} setCoins={setCoins} />);
    const $input = getById(container, "charge-input");
    const $button = screen.getByRole("button", { name: "충전하기" });
    userEvent.type($input, "11");
    userEvent.click($button, { target: { [$input.name]: { value: "11" } } });
    expect(alertSpy).toBeCalledTimes(1);
  });
});

describe("📀 잔돈 충전 탭 테스트 케이스", () => {
  test("최초 동전 보유 현황의 동전에 개수는 모두 0개로 초기화 되어 있어야 합니다.", () => {
    render(<Charge coins={coins} setCoins={setCoins} />);
    const $coins = screen.getAllByText(/^0개$/);
    expect($coins.length).toBe(4);
  });

  test("충전하기 버튼을 누르면 해당 보유 금액 + (원)으로 충전한 금액이 나타나야 합니다.", () => {
    const { container } = render(<Charge coins={coins} setCoins={setCoins} />);
    const $input = getById(container, "charge-input");
    const $button = screen.getByRole("button", { name: "충전하기" });
    userEvent.type($input, "450");
    userEvent.click($button, { target: { [$input.name]: { value: "450" } } });
    const $result = screen.getByText(/^보유 금액/);
    expect($result.textContent).toContain("450원");
  });

  test("자판기 보유 금액을 누적하여 충전할 수 있어야 합니다.", () => {
    const { container } = render(<Charge coins={coins} setCoins={setCoins} />);
    const $input = getById(container, "charge-input");
    const $button = screen.getByRole("button", { name: "충전하기" });
    userEvent.type($input, "450");
    userEvent.click($button, { target: { [$input.name]: { value: "450" } } });
    const $result = screen.getByText(/^보유 금액/);
    expect($result.textContent).toContain("450원");
    userEvent.type($input, "450");
    userEvent.click($button, { target: { [$input.name]: { value: "450" } } });
    expect($result.textContent).toContain("900원");
  });

  test("자판기 보유 금액만큼의 동전이 무작위로 생성되어 화면에 나타나야 합니다.", () => {
    const randomSpy = jest.spyOn(global.MissionUtils.Random, "pickNumberInRange");
    randomSpy.mockReturnValue(1);
    let coins = { "500": 0, "100": 0, "50": 0, "10": 0 };
    const setCoins = jest.fn();
    const { container } = render(<Charge coins={coins} setCoins={setCoins} />);
    const $input = getById(container, "charge-input");
    const $button = screen.getByRole("button", { name: "충전하기" });
    setCoins.mockImplementation((param) => coins = param);
    userEvent.type($input, "1000");
    userEvent.click($button, { target: { [$input.name]: { value: "1000" } } });
    expect(coins[500]).toBe(1);
    expect(coins[100]).toBe(1);
    expect(coins[50]).toBe(1);
    expect(coins[10]).toBe(35);
  });

  test("추가 충전 금액만큼의 동전이 무작위로 생성되어 기존 동전들에 더해져야 합니다.", () => {
    const randomSpy = jest.spyOn(global.MissionUtils.Random, "pickNumberInRange");
    randomSpy.mockReturnValue(1)
    let coins = { "500": 0, "100": 0, "50": 0, "10": 0 };
    const { container, rerender } = render(<Charge coins={coins} setCoins={setCoins} />);
    const $input = getById(container, "charge-input");
    const $button = screen.getByRole("button", { name: "충전하기" });
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