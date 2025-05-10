import { useEffect, useState } from 'react';

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [revealed, setRevealed] = useState({});

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const spotlightStyle = {
    background: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), rgba(0,0,0,0.95))`,
  };

  const handleReveal = (key) => {
    setRevealed((prev) => ({ ...prev, [key]: true }));
  };

  return (
    <div className="min-h-screen w-full relative bg-black overflow-hidden font-sans">
      {/* Luz que segue o mouse */}
      <div
        className="absolute inset-0 z-10 pointer-events-none transition-all duration-100"
        style={spotlightStyle}
      />

      {/* Conteúdo visível */}
      <div className="relative z-20 text-white p-8 space-y-8">
        <h1 className="text-4xl font-bold text-center mb-12">Feliz Aniversário, Meu Amor 💖</h1>

        {/* Surpresa 1 */}
        <div
          onMouseEnter={() => handleReveal('s1')}
          className="absolute top-[30%] left-[20%] w-24 h-24 cursor-pointer"
        >
          {revealed.s1 && (
            <div className="bg-white text-black p-4 rounded-xl shadow-lg">
              🎁 Primeira surpresa: Te amo mais do que chocolate 🍫
            </div>
          )}
        </div>

        {/* Surpresa 2 */}
        <div
          onMouseEnter={() => handleReveal('s2')}
          className="absolute top-[55%] left-[65%] w-24 h-24 cursor-pointer"
        >
          {revealed.s2 && (
            <div className="bg-white text-black p-4 rounded-xl shadow-lg">
              📸 Lembra desse dia? (inserir imagem aqui)
            </div>
          )}
        </div>

        {/* Surpresa 3 */}
        <div
          onMouseEnter={() => handleReveal('s3')}
          className="absolute top-[75%] left-[35%] w-24 h-24 cursor-pointer"
        >
          {revealed.s3 && (
            <div className="bg-white text-black p-4 rounded-xl shadow-lg">
              🎶 Nossa música favorita vai tocar aqui...
              <audio controls className="mt-2">
                <source src="/musica.mp3" type="audio/mpeg" />
              </audio>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
