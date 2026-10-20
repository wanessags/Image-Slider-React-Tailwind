
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function SliderControls({
  index,
  count,
  onPrevious,
  onNext,
  onSelect,
}) {
  return (
    <div
      className="mt-3 flex items-center justify-center gap-6 sm:gap-10"
      role="group"
      aria-label="Controles do carrossel"
    >
      <button
        type="button"
        onClick={onPrevious}
        aria-label="Imagem anterior"
        className="flex h-12 w-12 items-center justify-center rounded-full border border-violet-100 bg-white text-ink shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-violet-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mauve sm:h-14 sm:w-14"
      >
        <ArrowLeft size={22} strokeWidth={1.8} />
      </button>

      <div
        className="flex items-center gap-3"
        role="group"
        aria-label="Selecionar imagem"
      >
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`Ir para imagem ${i + 1}`}
            aria-current={i === index ? 'true' : undefined}
            className={`rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mauve ${
              i === index
                ? 'h-3 w-3 bg-mauve'
                : 'h-2.5 w-2.5 bg-violet-200 hover:bg-violet-400'
            }`}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onNext}
        aria-label="Próxima imagem"
        className="flex h-12 w-12 items-center justify-center rounded-full border border-violet-100 bg-white text-ink shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-violet-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mauve sm:h-14 sm:w-14"
      >
        <ArrowRight size={22} strokeWidth={1.8} />
      </button>
    </div>
  );
}
