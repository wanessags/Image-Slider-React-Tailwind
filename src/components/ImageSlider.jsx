
import { useEffect, useState } from 'react';
import { slides } from '../data/slides.js';
import SliderControls from './SliderControls.jsx';

export default function ImageSlider() {
  // Inicia no terceiro slide: Panda-gigante
  const [index, setIndex] = useState(2);

  const activeSlide = slides[index];

  // Navegação circular
  const next = () => {
    setIndex((current) => (current + 1) % slides.length);
  };

  const previous = () => {
    setIndex(
      (current) =>
        (current - 1 + slides.length) % slides.length
    );
  };

  // Navegação pelas setas do teclado
  useEffect(() => {
    function handleKeyDown(event) {
      if (
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.target?.isContentEditable ||
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(
          event.target?.tagName
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
      className="relative w-full min-w-0"
    >
      {/* Área das fotografias */}
      <div className="relative mx-auto h-[390px] w-full sm:h-[470px] lg:h-[510px]">

        {slides.map((slide, i) => {
          let position = i - index;

          // Mantém cinco imagens organizadas circularmente
          const half = Math.floor(slides.length / 2);

          if (position > half) {
            position -= slides.length;
          }

          if (position < -half) {
            position += slides.length;
          }

          const isActive = position === 0;
          const distance = Math.abs(position);

          // Cartões laterais menores
          const scale = isActive
            ? 1
            : distance === 1
              ? 0.87
              : 0.72;

          // Inclinação sutil
          const rotation = isActive
            ? 0
            : position < 0
              ? -2
              : 2;

          // Mantém as imagens dentro do espaço do slider
          const horizontalPosition = 50 + position * 11;

          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Selecionar ${slide.animal}`}
              aria-current={isActive ? 'true' : undefined}
              className={`absolute top-1/2 h-[88%] w-[58%] overflow-hidden rounded-[22px] border border-white/70 bg-slate-100 p-0 text-left shadow-lg transition-all duration-500 ease-out focus-visible:outline-2 focus-visible:outline-mauve sm:w-[54%] lg:w-[56%] ${
                isActive
                  ? 'shadow-[0_25px_55px_rgba(32,22,57,0.22)]'
                  : 'hover:brightness-105'
              }`}
              style={{
                left: `${horizontalPosition}%`,
                zIndex: 10 - distance,
                transform: `
                  translate(-50%, -50%)
                  scale(${scale})
                  rotate(${rotation}deg)
                `,
              }}
            >
              <img
                src={slide.image}
                alt=""
                className="h-full w-full object-cover"
              />

              {/* Descrição exibida somente no slide central */}
              {isActive && (
                <div
                  className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-4 pb-5 pt-20 text-white sm:px-6 sm:pb-7"
                >
                  <p className="mb-2 text-[10px] font-medium tracking-[0.25em] text-white/80">
                    {String(index + 1).padStart(2, '0')}
                    {' / '}
                    {String(slides.length).padStart(2, '0')}
                  </p>

                  <h2 className="font-serif text-2xl font-bold leading-tight sm:text-3xl">
                    {activeSlide.animal}
                  </h2>

                  <div className="my-3 h-[2px] w-10 bg-violet-400" />

                  <p className="mb-2 text-xs font-medium leading-relaxed text-white/95 sm:text-sm">
                    {activeSlide.summary}
                  </p>

                  <p className="line-clamp-3 text-xs leading-relaxed text-white/80">
                    {activeSlide.description}
                  </p>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Controles de navegação */}
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
