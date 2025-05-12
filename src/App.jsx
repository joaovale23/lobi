import { useEffect, useState } from 'react';

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [revealed, setRevealed] = useState({});
  const [spotlightTransparent, setSpotlightTransparent] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

   const spotlightStyle = {
    background: !spotlightTransparent
      ? `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), rgb(0, 0, 0))`
      : undefined,
  };

  const handleReveal = (key) => {
    setRevealed((prev) => ({ ...prev, [key]: true }));
  };

  return (
    <div className="min-h-screen w-full relative bg-[url('/back.png')] bg-cover overflow-hidden font-sans">
      {/* Luz que segue o mouse */}
      <div
        className={`absolute inset-0 z-30 pointer-events-none transition-opacity duration-700 ${spotlightTransparent ? 'opacity-0' : 'opacity-100'}`}
        style={spotlightStyle}
      />
      {spotlightTransparent && (
        <div
          className={`pointer-events-none z-30 fixed transition-opacity duration-700 ${spotlightTransparent ? 'opacity-100' : 'opacity-0'}`}
          style={{
            left: mousePosition.x - 15,
            top: mousePosition.y - 15,
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            boxShadow: '0 0 8px 4px rgba(255,255,255,0.3)',
            position: 'fixed',
            pointerEvents: 'none',
            transition: 'opacity 0.3s ease-in-out',
          }}
        />
      )}

      {/* Conteúdo visível */}
      <div className="min-h-screen w-full relative z-20 text-white p-8 space-y-8">
        <h1 className="text-4xl font-bold text-center mb-12">Feliz Aniversário, Meu Amor 💖</h1>

        <div
          onClick={() => setSpotlightTransparent(prev => !prev)}
          className="absolute bottom-[0] right-[0] w-24 h-24 bg-[url('/vela.png')] bg-contain bg-no-repeat text-black p-4 rounded-xl shadow-lg"
        ></div>


        {/* Surpresa 1 */}
        <div
          onClick={() => handleReveal('s1')}
          onMouseLeave={() => setRevealed((prev) => ({ ...prev, s1: false }))}
          className="absolute top-[30%] left-[20%] w-24 h-24 cursor-pointer bg-[url('/fita.png')] bg-contain bg-no-repeat text-black p-4 rounded-xl shadow-lg"
        >
          {/*revealed.s1 && (
            <div className="bg-white text-black p-4 rounded-xl shadow-lg">
              🎁 Primeira surpresa: Te amo mais do que chocolate 🍫
            </div>
          )*/}
        </div>

        {/* Surpresa 2 */}
        <div
          onClick={() => handleReveal('s2')}
          onMouseLeave={() => setRevealed((prev) => ({ ...prev, s2: false }))}
          className="absolute top-[55%] left-[65%] w-44 h-44 cursor-pointer bg-[url('/copa.png')] bg-contain bg-no-repeat text-black p-4 rounded-xl shadow-lg"
        >
          {/*revealed.s2 && (
            <div className="bg-white text-black p-4 rounded-xl shadow-lg">
              📸 Lembra desse dia? (inserir imagem aqui)
            </div>
          )*/}
        </div>

        {/* Surpresa 3 */}
        <div
          onClick={() => handleReveal('s3')}
          onMouseLeave={() => setRevealed((prev) => ({ ...prev, s3: false }))}
          className="absolute top-[70%] left-[50%] w-24 h-24 cursor-pointer bg-[url('/planilha.png')] bg-contain bg-no-repeat text-black p-4 rounded-xl shadow-lg"
        >
          {/*revealed.s3 && (
            <div className="bg-white text-black p-4 rounded-xl shadow-lg">
              🎶 Nossa música favorita vai tocar aqui...
              <audio controls className="mt-2">
                <source src="/musica.mp3" type="audio/mpeg" />
              </audio>
            </div>
          )*/}
        </div>

        <div
          className="absolute top-[10%] left-[90%] w-24 h-24 bg-[url('/quack.png')] bg-contain bg-no-repeat text-black p-4 rounded-xl shadow-lg"
        ></div>

        <div
          className="absolute top-[20%] left-[75%] w-24 h-24 bg-[url('/fifiu.png')] bg-contain bg-no-repeat text-black p-4 rounded-xl shadow-lg"
        ></div>

        <div
          className="absolute top-[50%] left-[65%] w-24 h-24 bg-[url('/miau.png')] bg-contain bg-no-repeat text-black p-4 rounded-xl shadow-lg"
        ></div>

        <div
          className="absolute top-[60%] left-[55%] w-24 h-24 bg-[url('/pexe.png')] bg-contain bg-no-repeat text-black p-4 rounded-xl shadow-lg"
        ></div>

        <div
          className="absolute top-[70%] left-[25%] w-24 h-24 bg-[url('/auau.png')] bg-contain bg-no-repeat text-black p-4 rounded-xl shadow-lg"
        ></div>
      </div>
    </div>
  );
}
