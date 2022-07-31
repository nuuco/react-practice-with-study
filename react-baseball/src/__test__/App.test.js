import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';

describe("🚀 random 테스트 케이스", () => {
    test("Random의 pickUniqueNumbersInRange 메소드를 사용하여 랜덤값을 생성해야합니다.", () => {
        const random = global.MissionUtils.Random.pickUniqueNumbersInRange;
        render(<App/>);
        expect(random).toHaveBeenCalledTimes(1);
    });
});

describe("✅ input 테스트 케이스", () => {
    test("input의 입력값에 맞게 입력값이 변해야합니다.", () => {
        const { container } = render(<App />);
        const $input = container.querySelector("input");
        fireEvent.change($input, { target: { value: "193" } });
        const inputValue = screen.getByDisplayValue("193");
        expect(inputValue.value).toEqual("193");
    });

    test("문자가 들어올 경우 alert 경고창으로 나타내야합니다.", () => {
        const alertMock = jest.spyOn(window, "alert");
        const { container } = render(<App />);
        const $input = container.querySelector("input");
        fireEvent.change($input, { target: { value: "123a" } });
        expect(alertMock).toHaveBeenCalledTimes(1);
    });

    test("중복된 숫자가 들어올 경우 alert 경고창으로 나타내야합니다.", () => {
        const alertMock = jest.spyOn(window, "alert");
        const { container } = render(<App />);
        const $input = container.querySelector("input");
        fireEvent.change($input, { target: { value: "122" } });
        expect(alertMock).toHaveBeenCalledTimes(1);
    });

    test("4자리이상 숫자가 들어올 경우 alert 경고창으로 나타내야합니다.", () => {
        const alertMock = jest.spyOn(window, "alert");
        const { container } = render(<App />);
        const $input = container.querySelector("input");
        fireEvent.change($input, { target: { value: "1234" } });
        expect(alertMock).toHaveBeenCalledTimes(1);
    });
});

describe("⚾️ 아구 게임 테스트 케이스", () => {
    test("볼이 0이고 스트라이크가 0이면 화면에 낫싱이 출력되야 합니다.", () => {
        const { container } = render(<App />);
        const $input = container.querySelector("input");
        const $button = container.querySelector("button");
        const $result = container.querySelector("#result");
        fireEvent.change($input, { target: { value: "456" } });
        fireEvent.click($button);
        expect($result.textContent).toEqual("낫싱");
    });

    test("볼이 0이고 스트라이크가 1이면 화면에 1스트라이크가 출력되야 합니다.", () => {
        const { container } = render(<App />);
        const $input = container.querySelector("input");
        const $button = container.querySelector("button");
        const $result = container.querySelector("#result");
        fireEvent.change($input, { target: { value: "429" } });
        fireEvent.click($button);
        expect($result.textContent).toEqual("1스트라이크");
    });

    test("볼이 1이고 스트라이크가 0이면 화면에 1볼이 출력되야 합니다.", () => {
        const { container } = render(<App />);
        const $input = container.querySelector("input");
        const $button = container.querySelector("button");
        const $result = container.querySelector("#result");
        fireEvent.change($input, { target: { value: "981" } });
        fireEvent.click($button);
        expect($result.textContent).toEqual("1볼");
    });

    test("볼이 0이고 스트라이크가 3이면 화면에 승리가 출력되야 합니다.", () => {
        const { container } = render(<App />);
        const $input = container.querySelector("input");
        const $button = container.querySelector("button");
        const $result = container.querySelector("#result");
        fireEvent.change($input, { target: { value: "123" } });
        fireEvent.click($button);
        expect($result.textContent).toEqual("승리");
    });

    test("볼이 2이고 스트라이크가 1이면 화면에 2볼 1스트라이크가 출력되야 합니다.", () => {
        const { container } = render(<App />);
        const $input = container.querySelector("input");
        const $button = container.querySelector("button");
        const $result = container.querySelector("#result");
        fireEvent.change($input, { target: { value: "321" } });
        fireEvent.click($button);
        expect($result.textContent).toEqual("2볼 1스트라이크");
    });
});

describe("🎊 승리 테스트 케이스", () => {
    const { reload } = window.location;

    beforeAll(() => {
        Object.defineProperty(window, 'location', {
            writable: true,
            value: { reload: jest.fn() },
        });
    });

    afterAll(() => {
        window.location.reload = reload;
    });

    test("승리시 재시작 버튼이 나타나야 합니다.", () => {
        const { container } = render(<App />);
        const $input = container.querySelector("input");
        const $button = container.querySelector("button");
        const $result = container.querySelector("#result");
        fireEvent.change($input, { target: { value: "123" } });
        fireEvent.click($button);
        expect($result.textContent).toEqual("승리");
        const $resetbutton = screen.getByText("재시작");
        expect($resetbutton).toBeInTheDocument();
    });

    test("재시작 버튼을 눌렀을 경우 window.confirm 창을 나타내야합니다.", () => {
        const confirmMock = jest.spyOn(window, "confirm");
        const { container } = render(<App />);
        const $input = container.querySelector("input");
        const $button = container.querySelector("button");
        const $result = container.querySelector("#result");
        fireEvent.change($input, { target: { value: "123" } });
        fireEvent.click($button);
        expect($result.textContent).toEqual("승리");
        const $resetbutton = screen.getByText("재시작");
        fireEvent.click($resetbutton);
        expect(confirmMock).toHaveBeenCalledTimes(1);
    });

    test("재시작 버튼을 눌렀을 경우 confirm의 확인을 눌러야 새로고침이 되어야 합니다. (🌈 window.location.reload 사용)", () => {
        jest.spyOn(window, "confirm")
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(true);
        const reloadMock = jest.spyOn(window.location, "reload");
        const { container } = render(<App />);
        const $input = container.querySelector("input");
        const $button = container.querySelector("button");
        const $result = container.querySelector("#result");
        fireEvent.change($input, { target: { value: "123" } });
        fireEvent.click($button);
        expect($result.textContent).toEqual("승리");
        const $resetbutton = screen.getByText("재시작");
        fireEvent.click($resetbutton);
        expect(reloadMock).toHaveBeenCalledTimes(0);
        fireEvent.click($resetbutton);
        expect(reloadMock).toHaveBeenCalledTimes(1);
    });
});