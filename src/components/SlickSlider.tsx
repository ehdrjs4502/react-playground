import { useEffect, useRef } from "react";
import Slider, { Settings } from "react-slick";
import { slides, SlideData } from "../data";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import arrow from "../images/arrow.png";

const SlickSlider: React.FC = () => {
  const sliderRef = useRef<Slider>(null);
  const currentSlideRef = useRef<number>(0);
  const nextArrowRef = useRef<HTMLButtonElement>(null);
  const prevArrowRef = useRef<HTMLButtonElement>(null);
  const totalSlides = slides.length;

  const updateArrowVisibility = (currentSlide: number, slidesToShow: number) => {
    if (nextArrowRef.current) {
      nextArrowRef.current.style.display = currentSlide >= totalSlides - slidesToShow ? "none" : "block";
    }
    if (prevArrowRef.current) {
      prevArrowRef.current.style.display = currentSlide === 0 ? "none" : "block";
    }
  };

  useEffect(() => {
    if (sliderRef.current) {
      const slidesToShow = sliderRef.current.innerSlider.props.slidesToShow;
      updateArrowVisibility(currentSlideRef.current, slidesToShow);
    }
  }, []);

  const settings: Settings = {
    dots: false,
    infinite: false,
    draggable: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    beforeChange: (current: number, next: number) => {
      currentSlideRef.current = next;
    },
    afterChange: (current: number) => {
      if (sliderRef.current) {
        const slidesToShow = sliderRef.current.innerSlider.props.slidesToShow;
        currentSlideRef.current = current;
        updateArrowVisibility(currentSlideRef.current, slidesToShow);
      }
    },
    nextArrow: (
      <ArrowButton ref={nextArrowRef}>
        <img src={arrow} alt="Next" />
      </ArrowButton>
    ),
    prevArrow: (
      <ArrowButton ref={prevArrowRef}>
        <img src={arrow} alt="Prev" />
      </ArrowButton>
    ),
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container>
      <StyledSlider {...settings} ref={sliderRef}>
        {slides.map((slide: SlideData) => (
          <SlideItem key={slide.id}>
            <SlideImageWrapper>
              <SlideImage src={slide.imageUrl} alt={slide.title} />
            </SlideImageWrapper>
            <SlideTitle>{slide.title}</SlideTitle>
            <SlideDate>{slide.date}</SlideDate>
          </SlideItem>
        ))}
      </StyledSlider>
    </Container>
  );
};

export default SlickSlider;

// Styled Components

const Container = styled.div`
  width: 90%;

  @media (max-width: 479px) {
    width: 80%;
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

  .slick-slide {
    padding: 0 8px;
    box-sizing: border-box;
  }
`;

const ArrowButton = styled.button`
  top: 50%;
  z-index: 1;
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: initial;
  }

  img {
    width: 24px;
    height: auto;
  }
`;

const SlideItem = styled.div`
  display: flex;
`;

const SlideDate = styled.span`
  font-size: 14px;
`;

const SlideImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const SlideImage = styled.img`
  height: auto;
  width: 100%;
  margin: 0 auto;
`;

const SlideTitle = styled.h3`
  font-size: 24px;
  color: #333;
  margin: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
