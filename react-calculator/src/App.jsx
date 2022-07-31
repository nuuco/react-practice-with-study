import React, {useState} from 'react'

const App = () => {
    /* 함수 작성 */
    const [displayNum1, setDisplayNum1] = useState("0");
    const [displayNum2, setDisplayNum2] = useState("");
    const [displayOper, setDisplayOper] = useState("");

    //숫자 입력 이벤트
    const inputNum = (event) => {
        //1. displayOper 값이 ""이면, displayNum1 이 입력된다.
        if(displayOper === ""){
            //2. displayNum1이 0일 경우, 입력값을 대체
            if(displayNum1 === "0" ) setDisplayNum1(event.target.value);
            //3. displayNum1 이 0이 아니고, 3자리 수가 아닐 경우 입력값 추가
            if(displayNum1 !== "0" && displayNum1.length < 3) setDisplayNum1(displayNum1 + event.target.value);
        } else { //4. displayOper 값이 있다면, displayNum2 가 입력된다.
            //5.displayNum2 이 3자리 수가 아닐 경우 입력값 추가
            if(displayNum2 === "0" ) setDisplayNum2(event.target.value);
            else if(displayNum2.length < 3) setDisplayNum2(displayNum2 + event.target.value);
        }
    }
    
    //숫자 번호판 배열 -> jsx 에서 map 으로 버튼 생성
    const digit = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

    //연산자 입력 이벤트 핸들러
    const inputOper = (event) => {
        if(event.target.value !== "=" && displayNum2 === "") setDisplayOper(event.target.value);
    }

    // = 연산자 입력시 실행할 이벤트 핸들러
    const calculate = () => {
        let result = 0;
        const num1 = parseInt(displayNum1);
        const num2 = parseInt(displayNum2);
        switch(displayOper){
            case "/" : 
                result = parseInt(num1 / num2); break;
            case "X" :
                result = num1 * num2; break;
            case "-" :
                result = num1 - num2; break;
            case "+" :
                result = num1 + num2; break;
            default:  
                //switch 문에 default case가 없으면 경고 문구가 떠서 작성함.
        };

        setDisplayNum1("" + result);
        setDisplayNum2("");
        setDisplayOper("");
    }

    //클리어(AC) 이벤트 핸들러
    const clear = () => {
        setDisplayNum1("0");
        setDisplayNum2("");
        setDisplayOper("");
    }
    
    return <div id="app">
        <div className="calculator">
            <h1 id="total"><span>{displayNum1}</span><span className={displayOper === "" ? null : 'oper-container'}>{displayOper}</span><span>{displayNum2}</span></h1>
            <div className="digits flex">
                {digit.map((num) => {
                    return (
                        <button className="digit" onClick={(inputNum)} key={num} value={num}>{num}</button>
                    )
                })}
            </div>
            <div className="modifiers subgrid">
                <button className="modifier" onClick={clear}>AC</button>
            </div>
            <div className="operations subgrid">
                <button className="operation" onClick={inputOper} value="/">/</button>
                <button className="operation" onClick={inputOper} value="X">X</button>
                <button className="operation" onClick={inputOper} value="-">-</button>
                <button className="operation" onClick={inputOper} value="+">+</button>
                <button className="operation" onClick={calculate} value="=">=</button>
            </div>
        </div>
    </div>
}

export default App;