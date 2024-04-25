import React, { useId, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { MiniMovieCard } from "../mini-movie-card/mini-movie-card";
import { SliderButtonPrev } from "./slider-button-prev";
import { SliderButtonNext } from "./slider-button-next";

import "./movies-slider.scss";

// TODO: fix the prev and next button
export const MoviesSlider = ({ movies, title, description = "Empty List" }) => {
  const sliderId = useId();
  const [showNext, setShowNext] = useState(false);
  const [showPrev, setShowPrev] = useState(false);

  function calculateNextButton() {
    const sliderContainer = document.getElementById(sliderId);
    const sliderContainerWidth = sliderContainer.clientWidth;
    const sliderContainerMaxScroll = sliderContainer.scrollWidth - sliderContainerWidth;
    setShowNext(sliderContainer.scrollLeft < sliderContainerMaxScroll);
  }

  function handleNextClick(event) {
    event.preventDefault();
    const sliderContainer = document.getElementById(sliderId);
    const sliderContainerWidth = sliderContainer.clientWidth;
    sliderContainer.scrollLeft = sliderContainer.scrollLeft + sliderContainerWidth;
    calculateNextButton();
    calculatePrevButton();
  }

  function calculatePrevButton() {
    const sliderContainer = document.getElementById(sliderId);
    setShowPrev(sliderContainer.scrollLeft > 0);
  }

  function handlePrevClick(event) {
    event.preventDefault();
    const sliderContainer = document.getElementById(sliderId);
    const sliderContainerWidth = sliderContainer.clientWidth;
    sliderContainer.scrollLeft -= sliderContainerWidth;
    calculateNextButton();
    calculatePrevButton();
  }

  useEffect(() => {
    const sliderContainer = document.getElementById(sliderId);

    if (sliderContainer) {
      calculateNextButton();
      calculatePrevButton();
    }

  });

  return (
    <Row>
      <Col md={12}>
        <h3 className="mb-4">{ title }</h3>
        {movies.length !== 0 ? (
          <section className="slider-wrapper">
            <SliderButtonPrev show={showPrev} sliderId={sliderId} onClick={handlePrevClick} />
            <SliderButtonNext show={showNext} sliderId={sliderId} onClick={handleNextClick} />
            <div className="slides-container" id={sliderId}>
              {movies.map(movie => (
                <div className="slide" key={movie.id}>
                  <MiniMovieCard movie={movie} />
                </div>
              ))}
            </div>
          </section>
        ) : (
          <p>{description}</p>
        )}
      </Col>
    </Row>
  )
}
