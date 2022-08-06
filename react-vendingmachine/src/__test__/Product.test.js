import { render, screen, queryByAttribute } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Product from "../pages/Product";

const getById = queryByAttribute.bind(null, "id");
const products = [];
const setProducts = jest.fn();
const coins = { "500": 0, "100": 0, "50": 0, "10": 0 };
const setCoins = jest.fn();

describe("✅ input 테스트 케이스", () => {
  test("충전할 금액이 10으로 나누어 떨어지지 않는다면 경고창을 나타내야 합니다.", () => {
    const alertSpy = jest.spyOn(window, "alert");
    const { container } = render(<Product products={products} setProducts={setProducts} coins={coins} setCoins={setCoins}/>);
    const $input = getById(container, "product-input");
    const $button = screen.getByRole("button", { name: "투입하기" });
    userEvent.type($input, "11");
    userEvent.click($button, { target: { [$input.name]: { value: "11" } } });
    expect(alertSpy).toBeCalledTimes(1);
  });
});

describe("💰 상품 구매 탭 테스트 케이스", () => {
  test("잔돈의 동전에 개수는 모두 0개로 초기화 되어 있어야 합니다.", () => {
    render(<Product products={products} setProducts={setProducts} coins={coins} setCoins={setCoins}/>);
    const $coins = screen.getAllByText(/^0개$/);
    expect($coins.length).toBe(4);
  });

  test("투입하기 버튼을 누르면 해당 투입 금액 + (원)으로 투입한 금액이 나타나야 합니다.", () => {
    const { container } = render(<Product products={products} setProducts={setProducts} coins={coins} setCoins={setCoins}/>);
    const $input = getById(container, "product-input");
    const $button = screen.getByRole("button", { name: "투입하기" });
    userEvent.type($input, "450");
    userEvent.click($button, { target: { [$input.name]: { value: "450" } } });
    const $result = screen.getByText(/^투입한 금액/);
    expect($result.textContent).toContain("450원");
  });

  test("금액을 누적하여 투입할 수 있어야 합니다.", () => {
    const { container } = render(<Product products={products} setProducts={setProducts} coins={coins} setCoins={setCoins}/>);
    const $input = getById(container, "product-input");
    const $button = screen.getByRole("button", { name: "투입하기" });
    userEvent.type($input, "450");
    userEvent.click($button, { target: { [$input.name]: { value: "450" } } });
    userEvent.type($input, "450");
    userEvent.click($button, { target: { [$input.name]: { value: "450" } } });
    const $result = screen.getByText(/^투입한 금액/);
    expect($result.textContent).toContain("900원");
  });

  test("해당 상품을 구매하면 구매한 가격만큼 투입한 금액을 빼줘야 합니다.", () => {
    const products = [{ product: "솔의눈", price: "1000", count: "1" }];
    const setProducts = jest.fn();
    const { container } = render(<Product products={products} setProducts={setProducts} coins={coins} setCoins={setCoins}/>);
    const $input = getById(container, "product-input");
    const $button = screen.getByRole("button", { name: "투입하기" });
    const $buyButton = screen.getByRole("button", { name: "구매하기" });
    userEvent.type($input, "2000");
    userEvent.click($button, { target: { [$input.name]: { value: "2000" } } });
    userEvent.click($buyButton);
    const $result = screen.getByText(/^투입한 금액/);
    expect($result.textContent).toContain("1000원");
  });

  test("투입한 금액보다 상품의 금액이 크면 경고창을 나타내야 합니다.", () => {
    const alertSpy = jest.spyOn(window, "alert");
    const products = [{ product: "솔의눈", price: "2500", count: "1" }];
    const setProducts = jest.fn();
    const { container } = render(<Product products={products} setProducts={setProducts} coins={coins} setCoins={setCoins}/>);
    const $input = getById(container, "product-input");
    const $button = screen.getByRole("button", { name: "투입하기" });
    const $buyButton = screen.getByRole("button", { name: "구매하기" });
    userEvent.type($input, "2000");
    userEvent.click($button, { target: { [$input.name]: { value: "2000" } } });
    userEvent.click($buyButton);
    expect(alertSpy).toBeCalledTimes(1);
  });

  test("품절된 상품이 있으면 버튼이 disabled 되어야 합니다.", () => {
    const products = [{ product: "솔의눈", price: "1000", count: "1" }];
    const setProducts = jest.fn();
    const { rerender } = render(<Product products={products} setProducts={setProducts} coins={coins} setCoins={setCoins}/>);
    const $button = screen.getByRole("button", { name: "구매하기" });
    userEvent.click($button);
    rerender(<Product products={products} setProducts={setProducts}/>)
    expect($button).toBeDisabled();
  });

  test("반환하기 버튼을 누르면 투입한 금액이 0원이 되어야 합니다.", () => {
    const { rerender } = render(<Product products={products} setProducts={setProducts} coins={coins} setCoins={setCoins}/>);
    const $button = screen.getByRole("button", { name: "반환하기" });
    userEvent.click($button);
    rerender(<Product products={products} setProducts={setProducts} coins={coins} setCoins={setCoins}/>);
    const $result = screen.getByText(/^투입한 금액/);
    expect($result.textContent).toContain("0원");
  });

  test("반환하기 버튼을 누르면 현재 보유하고 있는 잔돈을 기준으로 최소의 동전의 개수를 반환해야 합니다.", () => {
    const coins = { "500": 3, "100": 4, "50": 2, "10": 100 };
    const { container } = render(<Product products={products} setProducts={setProducts} coins={coins} setCoins={setCoins}/>);
    const $input = getById(container, "product-input");
    const $button = screen.getByRole("button", { name: "투입하기" });
    const $buyButton = screen.getByRole("button", { name: "반환하기" });
    userEvent.type($input, "2000");
    userEvent.click($button, { target: { [$input.name]: { value: "2000" } } });
    userEvent.click($buyButton);
    const $coins = screen.getAllByText(/개$/);
    expect($coins[0].textContent).toMatch(/^3개$/);
    expect($coins[1].textContent).toMatch(/^4개$/);
    expect($coins[2].textContent).toMatch(/^2개$/);
    expect($coins[3].textContent).toMatch(/^0개$/);
  });

  test("잔돈을 반환할 수 없는 경우 잔돈으로 반환할 수 있는 금액만 반환해야 합니다.", () => {
    const coins = { "500": 3, "100": 4, "50": 1, "10": 4 };
    const { container } = render(<Product products={products} setProducts={setProducts} coins={coins} setCoins={setCoins}/>);
    const $input = getById(container, "product-input");
    const $button = screen.getByRole("button", { name: "투입하기" });
    const $buyButton = screen.getByRole("button", { name: "반환하기" });
    userEvent.type($input, "2000");
    userEvent.click($button, { target: { [$input.name]: { value: "2000" } } });
    userEvent.click($buyButton);
    const $coins = screen.getAllByText(/개$/);
    expect($coins[0].textContent).toMatch(/^3개$/);
    expect($coins[1].textContent).toMatch(/^4개$/);
    expect($coins[2].textContent).toMatch(/^1개$/);
    expect($coins[3].textContent).toMatch(/^4개$/);
  });
});