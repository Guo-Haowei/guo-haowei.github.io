import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function HeroCarousel({ slides, delay = 4000, loop = true }) {
  const autoplay = useRef(Autoplay({ delay, stopOnInteraction: false }));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop }, [autoplay.current]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  const scrollTo = useCallback((i) => emblaApi && emblaApi.scrollTo(i), [emblaApi]);
  const next = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const prev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);

  return (
    <section className="hero" ref={emblaRef} aria-roledescription="carousel">
      <div className="hero__track">
        {slides.map((src, i) => (
          <div className="hero__slide" key={i} aria-roledescription="slide">
            <img
              src={src}
              alt=""
              className="hero__img"
              // First image eager, others lazy for 4K
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          </div>
        ))}
      </div>

      {/* Arrows */}
      {slides.length > 1 && (
        <>
          <button className="hero__arrow hero__arrow--left" onClick={prev} aria-label="Previous slide">‹</button>
          <button className="hero__arrow hero__arrow--right" onClick={next} aria-label="Next slide">›</button>
        </>
      )}

      {/* Dots */}
      {slides.length > 1 && (
        <div className="hero__dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={"hero__dot" + (i === selected ? " is-active" : "")}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollTo(i)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
