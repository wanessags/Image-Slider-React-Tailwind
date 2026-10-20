
import { ArrowRight, Search } from 'lucide-react';
import Background from './components/Background.jsx';
import ImageSlider from './components/ImageSlider.jsx';
import ProfileMenu from './components/ProfileMenu.jsx';

export default function App() {
  const scrollToSlider = () => {
    document.getElementById('explorar')?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative isolate min-h-screen overflow-hidden text-ink">
      <Background />

      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <header className="relative z-30 flex items-center justify-between border-b border-slate-200/80 py-6">
          <a
            href="#inicio"
            className="font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            <span className="text-mauve">Wild</span> Stories
          </a>

          <div className="flex items-center gap-5 sm:gap-9">
            <nav
              aria-label="Navegação principal"
              className="hidden items-center gap-8 text-sm font-medium sm:flex"
            >
              <a
                href="#explorar"
                className="border-b-2 border-mauve pb-2 text-ink transition hover:text-mauve"
              >
                Explorar
              </a>

              <a
                href="#sobre"
                className="pb-2 text-slate-500 transition hover:text-mauve"
              >
                Sobre
              </a>
            </nav>

            <button
              type="button"
              aria-label="Ir para a galeria"
              onClick={scrollToSlider}
              className="hidden text-ink transition hover:text-mauve sm:block"
            >
              <Search size={21} />
            </button>

            <ProfileMenu />
          </div>
        </header>

        <main
          id="inicio"
          className="grid min-h-[calc(100vh-105px)] gap-12 py-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-12"
        >
          <section
            id="sobre"
            aria-label="Apresentação"
            className="space-y-7"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] text-mauve">
                EXPLORAÇÃO • VIDA SELVAGEM
              </p>

              <div className="mt-5 h-[2px] w-12 bg-mauve" />
            </div>

            <h1 className="max-w-xl font-serif text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl xl:text-7xl">
              A natureza
              <br />
              em cada
              <br />
              <span className="text-mauve">detalhe.</span>
            </h1>

            <p className="max-w-md text-lg leading-relaxed text-slate-500">
              Descubra espécies extraordinárias em uma experiência
              visual interativa.
            </p>

            <button
              type="button"
              onClick={scrollToSlider}
              className="inline-flex items-center gap-5 rounded-full bg-mauve px-8 py-4 text-xs font-semibold tracking-[0.18em] text-white transition hover:bg-[#4d347c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mauve"
            >
              EXPLORAR ESPÉCIES
              <ArrowRight size={19} />
            </button>
          </section>

          <section id="explorar" aria-label="Explorar espécies">
            <ImageSlider />
          </section>
        </main>
      </div>
    </div>
  );
}
