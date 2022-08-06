import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

const location = window.location;
const history = window.history;

describe("📟 react-router-dom 테스트 케이스", () => {
  beforeEach(() => {
    history.pushState({}, null, "/");
  });

  test("path 경로가 '/' 이면 <Management/> 컴포넌트가 랜더링 되야합니다.", () => {
    render(<App/>, { wrapper: BrowserRouter });
    const isManagementTitle = screen.getByText(/^상품 추가하기$/);
    const isManagementSubTitle = screen.getByText(/^상품 현황$/);
    expect(isManagementTitle).toBeInTheDocument();
    expect(isManagementSubTitle).toBeInTheDocument();
    expect(location.pathname).toBe('/');
  });

  test("path 경로가 '/charge' 이면 <Charge/> 컴포넌트가 랜더링 되야합니다.", () => {
    history.pushState({}, null, "/charge");
    render(<App/>, { wrapper: BrowserRouter });
    const isChargeTitle = screen.getByText(/^자판기 동전 충전하기$/);
    const isChargeSubTitle = screen.getByText(/^동전 보유 현황$/);
    expect(isChargeTitle).toBeInTheDocument();
    expect(isChargeSubTitle).toBeInTheDocument();
    expect(location.pathname).toBe('/charge');
  });

  test("path 경로가 '/product' 이면 <Product/> 컴포넌트가 랜더링 되야합니다.", () => {
    history.pushState({}, null, "/product");
    render(<App/>, { wrapper: BrowserRouter });
    const isProductTitle = screen.getByText(/^금액 투입$/);
    const isProductSubTitle = screen.getByText(/^구매할 수 있는 상품 현황$/);
    expect(isProductTitle).toBeInTheDocument();
    expect(isProductSubTitle).toBeInTheDocument();
    expect(location.pathname).toBe('/product');
  });

  test("상품 관리 버튼을 누르면 '/' 페이지로 랜더링 되야합니다.", () => {
    history.pushState({}, null, "/charge");
    render(<App/>, { wrapper: BrowserRouter });
    const $management = screen.getByRole("button", { name: "상품 관리" });
    userEvent.click($management);
    expect(location.pathname).toBe("/");
  });
  
  test("잔돈 충전 버튼을 누르면 '/charge' 페이지로 랜더링 되야합니다.", () => {
    render(<App/>, { wrapper: BrowserRouter });
    const $chargement = screen.getByRole("button", { name: "잔돈 충전" });
    userEvent.click($chargement);
    expect(location.pathname).toBe("/charge");
  });

  test("상품 구매 버튼을 누르면 '/product' 페이지로 랜더링 되야합니다.", () => {
    render(<App/>, { wrapper: BrowserRouter });
    const $productment = screen.getByRole("button", { name: "상품 구매" });
    userEvent.click($productment);
    expect(location.pathname).toBe("/product");
  });
});