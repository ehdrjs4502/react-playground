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
  width: 100%; /* 기본값으로 작은 화면에서는 전체 너비 */
  max-width: 1200px;
  @media (max-width: 720px) {
    width: 600px; /* 768px 이상의 화면에서는 600px 고정 */
  }

  @media (max-width: 479px) {
    width: 400px; /* 768px 이상의 화면에서는 600px 고정 */
  }
  margin: 0 auto; /* 중앙 정렬을 위해 margin을 자동으로 설정 */
`;

export default App;
