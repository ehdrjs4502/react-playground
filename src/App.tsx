import "./App.css";
import { useState, useTransition } from "react";
import SlickSlider from "./components/SlickSlider";
import styled from "styled-components";

let a = new Array(10000).fill(0);

function App() {
  let [name, setName] = useState(0);
  let [isPending, startTransition] = useTransition(); //상태 업데이트를 비동기적으로 처리하여 UI의 부드러운 전환을 가능하게 함

  return (
    <div className="App" style={{ display: "flex", justifyContent: "center", backgroundColor: "beige" }}>
      <Wrapper>
        <SlickSlider />
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  max-width: 1300px;
  padding: 0px 48px 76px 48px;
  width: 100%;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    width: 500px;
    padding: 40px 20px;
  }

  @media (max-width: 479px) {
    width: 400px;
  }
  margin: 0 auto; /* 중앙 정렬을 위해 margin을 자동으로 설정 */
`;

export default App;
