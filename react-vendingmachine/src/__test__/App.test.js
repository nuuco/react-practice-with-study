import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

const location = window.location;
const history = window.history;

describe("π react-router-dom νμ€νΈ μΌμ΄μ€", () => {
  beforeEach(() => {
    history.pushState({}, null, "/");
  });

  test("path κ²½λ‘κ° '/' μ΄λ©΄ <Management/> μ»΄ν¬λνΈκ° λλλ§ λμΌν©λλ€.", () => {
    render(<App/>, { wrapper: BrowserRouter });
    const isManagementTitle = screen.getByText(/^μν μΆκ°νκΈ°$/);
    const isManagementSubTitle = screen.getByText(/^μν νν©$/);
    expect(isManagementTitle).toBeInTheDocument();
    expect(isManagementSubTitle).toBeInTheDocument();
    expect(location.pathname).toBe('/');
  });

  test("path κ²½λ‘κ° '/charge' μ΄λ©΄ <Charge/> μ»΄ν¬λνΈκ° λλλ§ λμΌν©λλ€.", () => {
    history.pushState({}, null, "/charge");
    render(<App/>, { wrapper: BrowserRouter });
    const isChargeTitle = screen.getByText(/^μνκΈ° λμ  μΆ©μ νκΈ°$/);
    const isChargeSubTitle = screen.getByText(/^λμ  λ³΄μ  νν©$/);
    expect(isChargeTitle).toBeInTheDocument();
    expect(isChargeSubTitle).toBeInTheDocument();
    expect(location.pathname).toBe('/charge');
  });

  test("path κ²½λ‘κ° '/product' μ΄λ©΄ <Product/> μ»΄ν¬λνΈκ° λλλ§ λμΌν©λλ€.", () => {
    history.pushState({}, null, "/product");
    render(<App/>, { wrapper: BrowserRouter });
    const isProductTitle = screen.getByText(/^κΈμ‘ ν¬μ$/);
    const isProductSubTitle = screen.getByText(/^κ΅¬λ§€ν  μ μλ μν νν©$/);
    expect(isProductTitle).toBeInTheDocument();
    expect(isProductSubTitle).toBeInTheDocument();
    expect(location.pathname).toBe('/product');
  });

  test("μν κ΄λ¦¬ λ²νΌμ λλ₯΄λ©΄ '/' νμ΄μ§λ‘ λλλ§ λμΌν©λλ€.", () => {
    history.pushState({}, null, "/charge");
    render(<App/>, { wrapper: BrowserRouter });
    const $management = screen.getByRole("button", { name: "μν κ΄λ¦¬" });
    userEvent.click($management);
    expect(location.pathname).toBe("/");
  });
  
  test("μλ μΆ©μ  λ²νΌμ λλ₯΄λ©΄ '/charge' νμ΄μ§λ‘ λλλ§ λμΌν©λλ€.", () => {
    render(<App/>, { wrapper: BrowserRouter });
    const $chargement = screen.getByRole("button", { name: "μλ μΆ©μ " });
    userEvent.click($chargement);
    expect(location.pathname).toBe("/charge");
  });

  test("μν κ΅¬λ§€ λ²νΌμ λλ₯΄λ©΄ '/product' νμ΄μ§λ‘ λλλ§ λμΌν©λλ€.", () => {
    render(<App/>, { wrapper: BrowserRouter });
    const $productment = screen.getByRole("button", { name: "μν κ΅¬λ§€" });
    userEvent.click($productment);
    expect(location.pathname).toBe("/product");
  });
});