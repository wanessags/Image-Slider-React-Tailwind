
import { useEffect, useState } from 'react';
import { slides } from '../data/slides.js';
import SliderControls from './SliderControls.jsx';

export default function ImageSlider() {
  const [index, setIndex] = useState(2);

  const active = slides[index];

  const next = () => {
    setIndex((current) => (current + 1) % slides.length);
  };

  const previous = () => {
    setIndex(
      (current) =>
        (current - 1 + slides.length) % slides.length
    );
  };

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.altKey || event.ctrlKey || event.metaKey) {
        return;
      }

      if (
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(
          document.activeElement?.tagName
        )
      ) {
        return;
      }

      if (event.key === 'ArrowRight') {
        setIndex(
          (current) => (current + 1) % slides.length
        );
      }

      if (event.key === 'ArrowLeft') {
        setIndex(
          (current) =>
            (current - 1 + slides.length) % slides.length
        );
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <section
      aria-label="Galeria da vida selvagem"
      aria-roledescription="carousel"
      className="w-full min-w-0"
    >
      {/* Galeria de imagens sobrepostas */}
      <div className="relative flex h-[420px] items-center justify-center sm:h-[520px] lg:h-[570px]">

        {slides.map((slide, i) => {
          let position = i - index;

          if (position > Math.floor(slides.length / 2)) {
            position -= slides.length;
          }

          if (position < -Math.floor(slides.length / 2)) {
            position += slides.length;
          }

          const isActive = position === 0;
          const distance = Math.abs(position);

          const zIndex = 10 - distance;
          const scale = isActive
            ? 1
            : distance === 1
              ? 0.88
              : 0.76;

          const rotation = isActive
            ? 0
            : position < 0
              ? -3
              : 3;

          return (
            <div
              key={slide.id}
              className={`absolute left-1/2 top-1/2 h-[85%] w-[68%] overflow-hidden rounded-[24px] border border-white/60 bg-slate-100 shadow-xl transition-all duration-500 ease-out sm:w-[56%] lg:w-[58%] ${
                isActive
                  ? 'shadow-[0_25px_65px_rgba(37,24,65,0.20)]'
                  : 'cursor-pointer'
              }`}
              style={{
                zIndex,
                transform: `
                  translate(
                    calc(-50% + ${position * 44}%),
                    -50%
                  )
                  scale(${scale})
                  rotate(${rotation}deg)
                `,
              }}
              onClick={() => {
                if (!isActive) {
                  setIndex(i);
                }
              }}
            >
              {/* Fotografia */}
              <img
                src={slide.image}
                alt={isActive ? slide.alt : ''}
                aria-hidden={!isActive}
                className="h-full w-full object-cover"
              />

              {/* Informações do animal ativo */}
              {isActive && (
                <div
                  aria-live="polite"
                  className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent px-5 pb-6 pt-20 text-white sm:px-7 sm:pb-8"
                >
                  <p className="mb-2 text-[10px] font-semibold tracking-[0.25em] text-white/80 sm:text-xs">
                    {String(index + 1).padStart(2, '0')}
                    {' / '}
                    {String(slides.length).padStart(2, '0')}
                  </p>

                  <h2 className="font-serif text-2xl font-bold leading-tight sm:text-4xl">
                    {active.animal}
                  </h2>

                  <div className="my-3 h-[2px] w-12 bg-violet-400" />

                  <p className="mb-2 text-xs font-medium text-white/90 sm:text-sm">
                    {active.summary}
                  </p>

                  <p className="line-clamp-3 text-xs leading-relaxed text-white/80 sm:text-sm">
                    {active.description}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Botões e indicadores */}
      <SliderControls
        index={index}
        count={slides.length}
        onPrevious={previous}
        onNext={next}
        onSelect={setIndex}
      />
    </section>
  );
}
