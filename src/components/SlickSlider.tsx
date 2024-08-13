import { useState, useEffect, useRef, useCallback } from "react";
import Slider, { Settings } from "react-slick";
import { slides, SlideData } from "../data";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import arrow from "../images/arrow.png";
import { url } from "inspector";

const NextArrow: React.FC<any> = (props) => (
  <ArrowBase {...props}>
    <img src={arrow} alt="Next" />
  </ArrowBase>
);

const PrevArrow: React.FC<any> = (props) => (
  <ArrowBase {...props}>
    <img src={arrow} alt="Prev" />
  </ArrowBase>
);

const SlickSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [slidesToShow, setSlidesToShow] = useState<number>(3);
  const slidesToScroll = 3;
  const totalSlides = slides.length;
  const sliderRef = useRef<Slider>(null);

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (sliderRef.current) {
        const slickInstance = sliderRef.current.innerSlider;
        setSlidesToShow(slickInstance.props.slidesToShow);
      }
    };

    updateSlidesToShow(); // 초기 실행

    window.addEventListener("resize", updateSlidesToShow); // 윈도우 크기 변경 감지

    return () => {
      window.removeEventListener("resize", updateSlidesToShow); // 이벤트 리스너 제거
    };
  }, []);

  const settings: Settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow,
    slidesToScroll,
    arrows: true,
    beforeChange: (current: number, next: number) => {
      setCurrentSlide(next);
      if (sliderRef.current) {
        const slickInstance = sliderRef.current.innerSlider;
        setSlidesToShow(slickInstance.props.slidesToShow);
      }
    },
    afterChange: (current: number) => setCurrentSlide(current),
    nextArrow: currentSlide >= totalSlides - slidesToShow ? null : <NextArrow />,
    prevArrow: currentSlide === 0 ? null : <PrevArrow />,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <StyledSlider {...settings} ref={sliderRef}>
        {slides.map((slide: SlideData) => (
          <SlideItem key={slide.id}>
            <SlideImageWrapper>
              <SlideImage src={slide.imageUrl} alt={slide.title} />
            </SlideImageWrapper>
            <SlideTitle>{slide.title}</SlideTitle>
          </SlideItem>
        ))}
      </StyledSlider>
    </div>
  );
};

const ArrowBase = styled.div`
  display: block;
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${arrow});

  img {
    width: 24px;
    height: auto;
  }
`;

const StyledSlider = styled(Slider)`
  .slick-prev::before,
  .slick-next:before {
    opacity: 0;
    display: none;
  }

  .slick-next {
    right: -24px;
  }

  .slick-prev {
    left: -24px;
  }

  .slick-disabled {
    cursor: default;
  }
`;

const SlideItem = styled.div`
  display: flex;
`;

const SlideImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const SlideImage = styled.img`
  height: auto;
`;

const SlideTitle = styled.h3`
  font-size: 24px;
  color: #333;
`;

export default SlickSlider;
