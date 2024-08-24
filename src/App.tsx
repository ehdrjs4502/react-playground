import "./App.css";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import SlickSlider from "./components/SlickSlider";
import styled from "styled-components";

let a = new Array(10000).fill(0);

function App() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResizeOrScroll = () => {
      const width = window.innerWidth;
      const isFixed = document.body.style.position === "fixed";

      if (width >= 800) {
        // 800px 이상일 때, fixed 상태 해제 및 스크롤 복구
        if (isFixed) {
          restoreScroll();
        }
        return;
      }

      if (isOpen && width < 800) {
        // 메뉴가 열려 있고 800px 미만일 때 스크롤 고정
        if (!isFixed) {
          fixedScroll();
        }
      } else {
        // 메뉴가 닫혔을 때 스크롤 위치 복구
        restoreScroll();
      }
    };

    const fixedScroll = () => {
      const scrollY = window.scrollY;
      document.body.style.cssText = `
        position: fixed; 
        top: -${scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
    };

    const restoreScroll = () => {
      const scrollY = parseInt(document.body.style.top || "0", 10);
      if (scrollY) {
        document.body.style.cssText = "";
        window.scrollTo(0, scrollY * -1);
      }
    };

    // 초기 실행
    handleResizeOrScroll();

    // 뷰포트의 width 변경 및 스크롤 감지
    window.addEventListener("resize", handleResizeOrScroll);

    return () => {
      window.removeEventListener("resize", handleResizeOrScroll);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="App"
      style={{ display: "flex", flexDirection: "column", justifyContent: "center", backgroundColor: "beige" }}
    >
      <Wrapper>
        {/* <SlickSlider /> */}
        <div style={{ position: "fixed", left: "20px", top: "20px" }}>
          <button onClick={toggleMenu}>{isOpen ? "Close Menu" : "Open Menu"}</button>
        </div>
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
  height: 1200px;

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
