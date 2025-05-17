import { useEffect, useState, useRef } from 'react';


export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [revealed, setRevealed] = useState({});
  const [spotlightTransparent, setSpotlightTransparent] = useState(false);
  const [spotlightVisible, setSpotlightVisible] = useState(true); // novo estado
  const [velaBg, setVelaBg] = useState("/images/tris.png");
  const [joaVisible, setJoaVisible] = useState(false);
  const quackAudioRef = useRef(null);

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
    setSpotlightVisible(false);

    setTimeout(() => {
      setSpotlightTransparent(true);
      setJoaVisible(true);

      setTimeout(() => {
        setJoaVisible(false);
      }, 50);
    }, 700);
  } else {
    setSpotlightTransparent(false);
    setSpotlightVisible(true);
  }

  setVelaBg(prev => prev === "/images/tris.png" ? "/images/vela.png" : "/images/tris.png");
};

  const handleReveal = (key) => {
    setRevealed((prev) => ({ ...prev, [key]: true }));
  };

  return (
    <div 
      className="min-h-screen w-full relative bg-[url('/images/back.png')] overflow-hidden font-sans"
      style={{
      backgroundImage: "url('/images/back.png')",
      backgroundSize: "100vw 100vh", // ocupa toda a tela
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      }}
    >
    
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
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: 'url(/images/joa.png)',
            backgroundSize: '30px 30px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            position: 'fixed',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Conteúdo visível */}
      <div className="min-h-screen w-full relative z-20 perspective-750 preserve-3d text-white p-8 space-y-8">

        <div
          onClick={handleVelaClick}
          className={`absolute bottom-[35vh] right-[0vw] w-24 h-24 bg-contain bg-no-repeat text-black p-4 transition-all duration-700`}
          style={{ backgroundImage: `url(${velaBg})` }}
        ></div>


        {/* Surpresa 1 */}
        <div
          onClick={() => handleReveal('s1')}
          onMouseLeave={() => setRevealed((prev) => ({ ...prev, s1: false }))}
          className="absolute top-[50vh] left-[80vw] w-52 h-52 bg-[url('/images/fita.png')] bg-contain bg-no-repeat text-black p-4"
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
          className="absolute top-[70vh] left-[75vw] w-44 h-44 bg-[url('/images/copa.png')] bg-contain bg-no-repeat text-black p-4"
        >
          {/*revealed.s2 && (
            <div className="bg-white text-black p-4 rounded-xl shadow-lg">
              <div
                onClick={() => quackAudioRef.current && quackAudioRef.current.play()}
                className="absolute top-[10%] left-[90%] w-24 h-24 bg-[url('/images/quack.png')] bg-contain bg-no-repeat text-black p-4"
              ></div>
              <audio ref={quackAudioRef} src="/sounds/quack.mp3" />

              <div
                className="absolute top-[20%] left-[75%] w-24 h-24 bg-[url('/images/fifiu.png')] bg-contain bg-no-repeat text-black p-4"
              ></div>

              <div
                className="absolute top-[50%] left-[65%] w-24 h-24 bg-[url('/images/miau.png')] bg-contain bg-no-repeat text-black p-4"
              ></div>

              <div
                className="absolute top-[60%] left-[55%] w-24 h-24 bg-[url('/images/pexe.png')] bg-contain bg-no-repeat text-black p-4"
              ></div>

              <div
                className="absolute top-[70%] left-[25%] w-24 h-24 bg-[url('/images/auau.png')] bg-contain bg-no-repeat text-black p-4"
              ></div>

              <div
                className="absolute top-[37%] left-[60%] w-24 h-24 bg-[url('/images/cacos.png')] bg-contain bg-no-repeat text-black p-4"
              ></div>
            </div>
          )*/}
        </div>

        {/* Surpresa 3 */}
        <div
          onClick={() => handleReveal('s3')}
          onMouseLeave={() => setRevealed((prev) => ({ ...prev, s3: false }))}
          className="absolute top-[43vh] left-[0vw] w-72 h-72 bg-[url('/images/planilha.png')] bg-contain bg-no-repeat text-black p-4"
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

        {/* Surpresa 4 */}
        <div
          onClick={() => handleReveal('s4')}
          onMouseLeave={() => setRevealed((prev) => ({ ...prev, s4: false }))}
          className="absolute top-[65vh] left-[10vw] w-52 h-52 rotate-x-30 bg-[url('/images/bichos.png')] bg-contain bg-no-repeat text-black p-4"
        >
          {/*revealed.s4 && (
            <div className="bg-white text-black p-4 rounded-xl shadow-lg">
              🎁 Primeira surpresa: Te amo mais do que chocolate 🍫
            </div>
          )*/}
        </div>
      </div>
    </div>
  );
}
