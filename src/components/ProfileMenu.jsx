
import { useState } from 'react';
import { ChevronDown, UserRound, Info, LogOut } from 'lucide-react';

export default function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir menu do perfil"
        aria-expanded={isOpen}
        className="flex items-center gap-2 rounded-full p-1 hover:bg-purple-100"
      >
        <img
          src="/images/avatar.png"
          alt="Avatar do perfil"
          className="h-10 w-10 rounded-full object-cover"
        />

        <ChevronDown size={18} className="text-mauve" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-3 w-56 rounded-2xl border border-purple-100 bg-white p-3 shadow-xl">
          <div className="border-b border-purple-100 px-3 py-3">
            <p className="font-semibold text-ink">Meu perfil</p>
            <p className="text-sm text-gray-500">Visitante</p>
          </div>

          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-ink hover:bg-lavender"
          >
            <UserRound size={18} />
            Meu perfil
          </button>

          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-ink hover:bg-lavender"
          >
            <Info size={18} />
            Sobre o projeto
          </button>

          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-red-500 hover:bg-red-50"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      )}
    </div>
  );
}
