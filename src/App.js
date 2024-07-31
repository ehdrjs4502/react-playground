import "./App.css";
import { useState, useTransition } from "react";

let a = new Array(10000).fill(0);

function App() {
  let [name, setName] = useState(0);
  let [isPending, startTransition] = useTransition(); //상태 업데이트를 비동기적으로 처리하여 UI의 부드러운 전환을 가능하게 함

  return (
    <div className="App">
      <input
        onChange={(e) => {
          startTransition(() => {
            // 성능 저하 일으키는 state 변경함수 감싸주기
            setName(e.target.value);
          });
        }}
      ></input>

      {isPending ? (
        <div>로딩중..</div>
      ) : (
        a.map(() => {
          return <div>{name}</div>;
        })
      )}
    </div>
  );
}

export default App;
