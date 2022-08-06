import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Management from '../pages/Management';

describe("✅ input 테스트 케이스", () => {
  test("상품명이 입력되지 않았으면 경고창을 나타내야 합니다.", () => {
    const alertSpy = jest.spyOn(window, "alert");
    render(<Management />);
    const $managementProductInput = screen.getByPlaceholderText("상품명"); 
    const $managementPriceInput = screen.getByPlaceholderText("가격");
    const $managementCountInput = screen.getByPlaceholderText("수량");
    const $managementSubmit = screen.getByRole("button", { name: "추가하기" });
    fireEvent.change($managementProductInput, { target: { value: "" } });
    userEvent.type($managementPriceInput, "1000");
    userEvent.type($managementCountInput, "20");
    userEvent.click($managementSubmit, { target: {
      [$managementProductInput.name]: { value: "" },
      [$managementPriceInput.name]: { value: "1000" },
      [$managementCountInput.name]: { value: "20" }
    }});
    expect(alertSpy).toBeCalledTimes(1);
  });

  test("가격이 입력되지 않았으면 경고창을 나타내야 합니다.", () => {
    const alertSpy = jest.spyOn(window, "alert");
    render(<Management />);
    const $managementProductInput = screen.getByPlaceholderText("상품명"); 
    const $managementPriceInput = screen.getByPlaceholderText("가격");
    const $managementCountInput = screen.getByPlaceholderText("수량");
    const $managementSubmit = screen.getByRole("button", { name: "추가하기" });
    userEvent.type($managementProductInput, "환타");
    fireEvent.change($managementPriceInput, { target: { value: "" } });
    userEvent.type($managementCountInput, "20");
    userEvent.click($managementSubmit, { target: {
      [$managementProductInput.name]: { value: "환타" },
      [$managementPriceInput.name]: { value: "" },
      [$managementCountInput.name]: { value: "20" }
    }});
    expect(alertSpy).toBeCalledTimes(1);
  });

  test("수량이 입력되지 않았으면 경고창을 나타내야 합니다.", () => {
    const alertSpy = jest.spyOn(window, "alert");
    render(<Management />);
    const $managementProductInput = screen.getByPlaceholderText("상품명"); 
    const $managementPriceInput = screen.getByPlaceholderText("가격");
    const $managementCountInput = screen.getByPlaceholderText("수량");
    const $managementSubmit = screen.getByRole("button", { name: "추가하기" });
    userEvent.type($managementProductInput, "환타");
    userEvent.type($managementPriceInput, "1000");
    fireEvent.change($managementCountInput, { target: { value: "" } });
    userEvent.click($managementSubmit, { target: {
      [$managementProductInput.name]: { value: "환타" },
      [$managementPriceInput.name]: { value: "1000" },
      [$managementCountInput.name]: { value: "" }
    }});
    expect(alertSpy).toBeCalledTimes(1);
  });

  test("수량은 0보다 작거나 같으면 경고창을 나타내야 합니다.", () => {
    const alertSpy = jest.spyOn(window, "alert");
    render(<Management />);
    const $managementProductInput = screen.getByPlaceholderText("상품명"); 
    const $managementPriceInput = screen.getByPlaceholderText("가격");
    const $managementCountInput = screen.getByPlaceholderText("수량");
    const $managementSubmit = screen.getByRole("button", { name: "추가하기" });
    userEvent.type($managementProductInput, "환타");
    userEvent.type($managementPriceInput, "1000");
    userEvent.type($managementCountInput, "0");
    userEvent.click($managementSubmit, { target: {
      [$managementProductInput.name]: { value: "환타" },
      [$managementPriceInput.name]: { value: "1000" },
      [$managementCountInput.name]: { value: "0" }
    }});
    expect(alertSpy).toBeCalledTimes(1);
    userEvent.type($managementProductInput, "환타");
    userEvent.type($managementPriceInput, "1000");
    userEvent.type($managementCountInput, "-1");
    userEvent.click($managementSubmit, { target: {
      [$managementProductInput.name]: { value: "환타" },
      [$managementPriceInput.name]: { value: "1000" },
      [$managementCountInput.name]: { value: "-1" }
    }});
    expect(alertSpy).toBeCalledTimes(2);
  });

  test("상품 가격은 100원 부터 시작해야 하며 10원으로 나누어 떨어지지 않으면 경고창을 나타내야 합니다.", () => {
    const alertSpy = jest.spyOn(window, "alert");
    render(<Management />);
    const $managementProductInput = screen.getByPlaceholderText("상품명"); 
    const $managementPriceInput = screen.getByPlaceholderText("가격");
    const $managementCountInput = screen.getByPlaceholderText("수량");
    const $managementSubmit = screen.getByRole("button", { name: "추가하기" });
    userEvent.type($managementProductInput, "환타");
    userEvent.type($managementPriceInput, "90");
    userEvent.type($managementCountInput, "20");
    userEvent.click($managementSubmit, { target: {
      [$managementProductInput.name]: { value: "환타" },
      [$managementPriceInput.name]: { value: "90" },
      [$managementCountInput.name]: { value: "20" }
    }});
    expect(alertSpy).toBeCalledTimes(1);
    userEvent.type($managementProductInput, "환타");
    userEvent.type($managementPriceInput, "11001");
    userEvent.type($managementCountInput, "20");
    userEvent.click($managementSubmit, { target: {
      [$managementProductInput.name]: { value: "환타" },
      [$managementPriceInput.name]: { value: "11001" },
      [$managementCountInput.name]: { value: "20" }
    }});
    expect(alertSpy).toBeCalledTimes(2);
  });
});

describe("🥤 상품 관리 탭 테스트 케이스", () => {
  test("최초 상품 목록은 비워진 상태여야 합니다.", () => {
    const products = [];
    const setProducts = jest.mock();
    const { container } = render(<Management products={products} setProducts={setProducts}/>);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const $td = container.querySelectorAll("td");
    expect($td).toHaveLength(0);
  });

  test("사용자가 추가한 상품이 화면에 나타나야 합니다.", () => {
    const products = [];
    const setProducts = jest.fn();
    render(<Management products={products} setProducts={setProducts} />);
    const $managementProductInput = screen.getByPlaceholderText("상품명"); 
    const $managementPriceInput = screen.getByPlaceholderText("가격");
    const $managementCountInput = screen.getByPlaceholderText("수량");
    const $managementSubmit = screen.getByRole("button", { name: "추가하기" });
    setProducts.mockImplementation((param) => products.push(...param));
    userEvent.type($managementProductInput, "환타");
    userEvent.type($managementPriceInput, "1000");
    userEvent.type($managementCountInput, "20");
    userEvent.click($managementSubmit, { target: {
      [$managementProductInput.name]: { value: "환타" },
      [$managementPriceInput.name]: { value: "1000" },
      [$managementCountInput.name]: { value: "20" }
    }});
    expect(setProducts).toHaveBeenCalledTimes(1);
    expect(products[0]).toStrictEqual({ 
      [$managementProductInput.name]: "환타",
      [$managementPriceInput.name]: "1000",
      [$managementCountInput.name]: "20"
    });
    render(<Management products={products} setProducts={setProducts} />);
    const $product = screen.getByText(/^환타$/); 
    const $price = screen.getByText(/^1000$/);
    const $count = screen.getByText(/^20$/);
    expect($product).toBeInTheDocument();
    expect($price).toBeInTheDocument();
    expect($count).toBeInTheDocument();
  });
});