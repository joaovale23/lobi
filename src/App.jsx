import { useEffect, useState } from 'react';


export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [revealed, setRevealed] = useState({});
  const [spotlightTransparent, setSpotlightTransparent] = useState(false);
  const [spotlightVisible, setSpotlightVisible] = useState(true); // novo estado
  const [velaBg, setVelaBg] = useState("/tris.png");
  const [joaVisible, setJoaVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const spotlightStyle = {
    background: spotlightTransparent
      ? undefined
      : `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), rgb(0, 0, 0))`,
  };

  const handleVelaClick = () => {
  if (!spotlightTransparent) {
    setSpotlightVisible(false); // inicia transição do gradiente

    setTimeout(() => {
      setSpotlightTransparent(true); // gradiente some
      setJoaVisible(true);           // monta a div do joa.png

      setTimeout(() => {
        setJoaVisible(false);        // inicia transição para opacity-0
      }, 50); // pequeno delay para permitir montagem com opacity-100
    }, 700); // tempo igual ao transition-opacity
  } else {
    setSpotlightTransparent(false);
    setSpotlightVisible(true);
  }

  setVelaBg(prev => prev === "/tris.png" ? "/vela.png" : "/tris.png");
};

  const handleReveal = (key) => {
    setRevealed((prev) => ({ ...prev, [key]: true }));
  };

  return (
    <div className="min-h-screen w-full relative bg-[url('/back.png')] bg-cover overflow-hidden font-sans">
      {/* Luz que segue o mouse */}
      <div
        className={`absolute inset-0 z-30 pointer-events-none transition-opacity duration-700 ${
          spotlightVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={spotlightStyle}
      />

      {spotlightTransparent && (
        <div
          className={`pointer-events-none z-30 fixed transition-opacity duration-700 ${ joaVisible ? 'opacity-0' : 'opacity-100'}`}
          style={{
            left: mousePosition.x - 15,
            top: mousePosition.y - 15,
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: 'url(/joa.png)',
            backgroundSize: '19px 19px',
            border: '1px solid black',
            position: 'fixed',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Conteúdo visível */}
      <div className="min-h-screen w-full relative z-20 text-white p-8 space-y-8">

        <div
          onClick={handleVelaClick}
          className={`absolute bottom-[0] right-[0] w-24 h-24 bg-contain bg-no-repeat text-black p-4 rounded-xl shadow-lg`}
          style={{ backgroundImage: `url(${velaBg})` }}
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
