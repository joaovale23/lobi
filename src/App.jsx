import { useEffect, useState, useMemo, useRef } from 'react';


export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [revealed, setRevealed] = useState({});
  const [spotlightTransparent, setSpotlightTransparent] = useState(false);
  const [spotlightVisible, setSpotlightVisible] = useState(true); // novo estado
  const [velaBg, setVelaBg] = useState(`${import.meta.env.BASE_URL}images/tris.png`);
  const [backOff, setBackOff] = useState(`${import.meta.env.BASE_URL}images/backoff.png`);
  const [joaVisible, setJoaVisible] = useState(false);
  const [carrosselIndex, setCarrosselIndex] = useState(0);
  const [perguntaIndex, setPerguntaIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [resetNoButton, setResetNoButton] = useState(0);
  const [spotlightTyped, setSpotlightTyped] = useState('');
  const [typedFitaMessage, setTypedFitaMessage] = useState('');
  const [typedCopaMessage, setTypedCopaMessage] = useState('');
  const [typedPlanMessage, setTypedPlanMessage] = useState('');
  const [typedBichosMessage, setTypedBichosMessage] = useState('');
  const videoRef = useRef(null);
  const maria = useRef(null);
  const wowAudio = useRef(null);

  const setVideoRef = node => {
    if (node) {
      node.volume = 0.04;
    }
    videoRef.current = node;
  };

  const imagensCarrossel = [
    `${import.meta.env.BASE_URL}images/amo1.jpg`,
    `${import.meta.env.BASE_URL}images/amo2.jpg`,
    `${import.meta.env.BASE_URL}images/amo3.jpg`,
    `${import.meta.env.BASE_URL}images/amo4.jpg`,
  ];

  // Array de textos para cada imagem
  const textosCarrossel = [
    "01/01/2024 00:52",
    "01/01/2024 08:05",
    "14/08/2024 06:48",
    "09/11/2024 17:19",
  ];

  const perguntas = useMemo(() => [
  "Ocê me ama?",
  "Quer viver comigo?",
  "Deixa eu te cuidar pra sempre?",
  "Gostou da surpresa? 😭",
  "👁‍🗨 ABDICARIA DE TODA A VERDADE ABSOLUTA DO UNIVERSO PARA VIVER UM ROMANCE ETERNO COMIGO? 👁‍🗨",
  ], []);

  const spotlightMessage = "SHHHH... a gente tem que encontrar a velinha triste!";
  const fitaMessage = "Se o meu coração pudesse falar...";
  const copaMessage = "Pequenos recortes do tempo, nossas valiozas e simples memórias.";
  const planMessage = "Ser bobo com você é a melhor parte do meu dia fofura hihihi (responda com sabedoria. . .)";
  const bichosMessage = "Ou fofos, ou juntos, em todas as vidas: ";

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    setTypedText('');
    setResetNoButton(r => r + 1); // força o NoButton a resetar
    let i = 0;
    const current = perguntas[perguntaIndex];
    const interval = setInterval(() => {
      setTypedText(current.slice(0, i + 1));
      i++;
      if (i === current.length) clearInterval(interval);
    }, 90); // velocidade da digitação
    return () => clearInterval(interval);
  }, [perguntaIndex, perguntas]);

  useEffect(() => {
    if (!spotlightTransparent) {
      setSpotlightTyped('');
      let i = 0;
      const interval = setInterval(() => {
        setSpotlightTyped(spotlightMessage.slice(0, i + 1));
        i++;
        if (i === spotlightMessage.length) clearInterval(interval);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [spotlightTransparent]);

  useEffect(() => {
    if (revealed.s1) {
      setTypedFitaMessage('');
      let i = 0;
      const interval = setInterval(() => {
        setTypedFitaMessage(fitaMessage.slice(0, i + 1));
        i++;
        if (i === fitaMessage.length) clearInterval(interval);
      }, 90);
      return () => clearInterval(interval);
    }
  }, [revealed.s1, fitaMessage]);

  useEffect(() => {
    if (revealed.s2) {
      setTypedCopaMessage('');
      let i = 0;
      const interval = setInterval(() => {
        setTypedCopaMessage(copaMessage.slice(0, i + 1));
        i++;
        if (i === copaMessage.length) clearInterval(interval);
      }, 90);
      return () => clearInterval(interval);
    }
  }, [revealed.s2, copaMessage]);

  useEffect(() => {
    if (revealed.s3) {
      setTypedPlanMessage('');
      let i = 0;
      const interval = setInterval(() => {
        setTypedPlanMessage(planMessage.slice(0, i + 1));
        i++;
        if (i === planMessage.length) clearInterval(interval);
      }, 70);
      return () => clearInterval(interval);
    }
  }, [revealed.s3, planMessage]);

  useEffect(() => {
    if (revealed.s4) {
      setTypedBichosMessage('');
      let i = 0;
      const interval = setInterval(() => {
        setTypedBichosMessage(bichosMessage.slice(0, i + 1));
        i++;
        if (i === bichosMessage.length) clearInterval(interval);
      }, 90);
      return () => clearInterval(interval);
    }
  }, [revealed.s4, bichosMessage]);

  const spotlightStyle = {
    background: spotlightTransparent
      ? undefined
      : `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), rgb(0, 0, 0))`,
  };

  const handleVelaClick = () => {
  if (!spotlightTransparent) {
    if (wowAudio.current) {
    wowAudio.current.currentTime = 0;
    wowAudio.current.volume = 0.1;
    wowAudio.current.play();
    }

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

  setVelaBg(prev => prev === `${import.meta.env.BASE_URL}images/tris.png` ? `${import.meta.env.BASE_URL}images/vela.png` : `${import.meta.env.BASE_URL}images/tris.png`);
  setBackOff(prev => prev === `${import.meta.env.BASE_URL}images/backoff.png` ? `${import.meta.env.BASE_URL}images/back.png` : `${import.meta.env.BASE_URL}images/backoff.png`);
};

  const handleReveal = (key) => {
    setRevealed((prev) => ({ ...prev, [key]: true }));
  };

  useEffect(() => {
    if (revealed.s1 && maria.current) {
      maria.current.currentTime = 0;
      maria.current.play();
    }
  }, [revealed.s1]);

  return (
    <div 
      className="min-h-screen w-full relative overflow-hidden font-sans transition-all duration-700"
      style={{
        backgroundImage: `url(${backOff})`,
        backgroundSize: "100vw 100vh",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Texto digitado do spotlight */}
      {!spotlightTransparent && (
        <div className="absolute top-1/8 left-1/2 -translate-x-1/2 rounded-xl px-8 py-6 z-[100]">
          <span className="text-green-700 text-xl font-doto text-center block min-h-[2.5em]">
            {spotlightTyped}
          </span>
        </div>
      )}

      {/* Luz que segue o mouse */}
      <div
        className={`absolute inset-0 z-50 pointer-events-none transition-opacity duration-700 ${
          spotlightVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={spotlightStyle}
      />

      {spotlightTransparent && (
        <div
          className={`pointer-events-none z-50 fixed transition-opacity duration-700 ${ joaVisible ? 'opacity-0' : 'opacity-100'}`}
          style={{
            left: mousePosition.x - 15,
            top: mousePosition.y - 15,
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: `url(${import.meta.env.BASE_URL}images/joa.png)`,
            backgroundSize: '35px 35px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            position: 'fixed',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Conteúdo visível */}
      <div className="min-h-screen w-full perspective-750 preserve-3d text-white p-8 space-y-8">

        <div
          onClick={handleVelaClick}
          className={`absolute bottom-[35vh] right-[0vw] w-[5vw] h-[10vh] bg-contain bg-no-repeat text-black p-4 transition-all duration-700`}
          style={{ backgroundImage: `url(${velaBg})` }}
        ></div>


        {/* Surpresa 1 */}
        <div
          onClick={() => handleReveal('s1')}
          className={`absolute top-[51vh] left-[77vw] w-[10vw] h-[17vh] rotate-y-45 bg-contain bg-no-repeat text-black p-4
            transition-all duration-300 hover:scale-110 ${spotlightTransparent ? "" : "pointer-events-none opacity-60"}`}
          style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/fita.png)` }}
        ></div>

        {/* Surpresa 2 */}
        <div
          onClick={() => handleReveal('s2')}
          className={`absolute top-[70vh] left-[72vw] w-[10vw] h-[30vh] rotate-x-30 bg-contain bg-no-repeat text-black p-4
            transition-all duration-300 hover:scale-105 ${spotlightTransparent ? "" : "pointer-events-none opacity-60"}`}
          style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/copa.png)` }}
        ></div>

        {/* Surpresa 3 */}
        <div
          onClick={() => handleReveal('s3')}
          className={`absolute top-[43vh] left-[0vw] w-[10vw] h-[30vh] bg-contain bg-no-repeat text-black p-4
            transition-all duration-300 hover:scale-105 ${spotlightTransparent ? "" : "pointer-events-none opacity-60"}`}
          style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/planilha.png)` }}
        ></div>

        {/* Surpresa 4 */}
        <div
          onClick={() => handleReveal('s4')}
          className={`absolute top-[65vh] left-[13vw] w-[10vw] h-[20vh] rotate-x-30 bg-contain bg-no-repeat text-black p-4
            transition-all duration-300 hover:scale-105 ${spotlightTransparent ? "" : "pointer-events-none opacity-60"}`}
          style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/bichos.png)` }}
        ></div>
      </div>

      {/* Modais */}

      {revealed.s1 && (
        <div className="absolute left-1/2 top-[18vh] -translate-x-1/2 z-[120] pointer-events-none">
          <span className="text-green-700 text-xl font-doto text-center block min-h-[2.5em] drop-shadow-lg">
            {typedFitaMessage}
          </span>
        </div>
      )}

      {/* Modal Surpresa 1 */}
      {revealed.s1 && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-500"
          onClick={() => setRevealed(prev => ({ ...prev, s1: false }))}
        >
          <audio ref={maria} src={`${import.meta.env.BASE_URL}sounds/maria.m4a`} preload="auto" />
          <div
            className="relative rounded-2xl flex bg-center bg-contain bg-no-repeat flex-col items-center justify-center
            transition-all duration-500 scale-100 opacity-100 animate-fade-in"
            style={{
              minWidth: 500,
              minHeight: 500,
              maxWidth: 600,
              backgroundImage: `url(${import.meta.env.BASE_URL}images/fita.png)`,
            }}
            onClick={e => e.stopPropagation()}
          ></div>
        </div>
      )}
      
      {revealed.s2 && (
        <div className="absolute left-1/2 top-[15vh] -translate-x-1/2 z-[120] pointer-events-none">
          <span className="text-green-700 text-xl font-doto text-center block min-h-[2.5em] drop-shadow-lg">
            {typedCopaMessage}
          </span>
        </div>
      )}

      {/* Modal Surpresa 2 - Carrossel */}
      {revealed.s2 && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-500"
          onClick={() => setRevealed(prev => ({ ...prev, s2: false }))}
        >
          <div
            className="relative rounded-2xl flex flex-col items-center justify-center
            transition-all duration-500 scale-100 opacity-100 animate-fade-in"
            style={{ minWidth: 500, minHeight: 500, maxWidth: 600 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="relative flex items-center justify-center">
              <button
                className="w-[3vw] h-[3vh] px-2 py-1 bg-center bg-contain bg-no-repeat rounded hover:scale-110 transition cursor-none"
                style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/setal.png)` }}
                onClick={() => setCarrosselIndex(i => (i === 0 ? imagensCarrossel.length - 1 : i - 1))}
              >
              </button>
              <div className="relative w-[48vw] max-w-[400px] flex items-center justify-center overflow-visible">
                <div
                  className="absolute inset-0 pointer-events-none pb-[20%] pl-[4%] flex items-end justify-start"
                  style={{
                    backgroundImage: `url(${import.meta.env.BASE_URL}images/mold.png)`,
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    zIndex: 10,
                  }}
                >
                  <span className="text-yellow-900 text-xl font-doto drop-shadow-lg pointer-events-none text-center px-4">
                    {textosCarrossel[carrosselIndex]}
                  </span>
                </div>
                <img
                  src={imagensCarrossel[carrosselIndex]}
                  alt={`Amô ${carrosselIndex + 1}`}
                  className="w-[80%] h-[80%] mb-12 rounded shadow relative z-0"
                />
              </div>
              <button
                className="w-[3vw] h-[3vh] px-2 py-1 bg-center bg-contain bg-no-repeat rounded hover:scale-110 transition cursor-none"
                style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/setar.png)` }}
                onClick={() => setCarrosselIndex(i => (i === imagensCarrossel.length - 1 ? 0 : i + 1))}
              >
              </button>
            </div>
          </div>
        </div>
      )}

      {revealed.s3 && (
        <div className="absolute left-1/2 top-[5vh] -translate-x-1/2 z-[120] pointer-events-none">
          <span className="text-green-700 text-xl font-doto text-center block min-h-[2.5em] drop-shadow-lg">
            {typedPlanMessage}
          </span>
        </div>
      )}

      {/* Modal Surpresa 3 */}
      {revealed.s3 && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-500"
          onClick={() => setRevealed(prev => ({ ...prev, s3: false }))}
        >
          <div
            className="relative pt-[8%] rounded-2xl p-8 flex flex-col items-center justify-center
            transition-all duration-500 scale-100 opacity-100 animate-fade-in"
            style={{
              minWidth: 650,
              minHeight: 750,
              maxWidth: 600,
              backgroundImage: `url(${import.meta.env.BASE_URL}images/plack.png)`,
              backgroundSize: "650px 750px",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            onClick={e => e.stopPropagation()}
          >
            {!showVideo ? (
              <>
                <span className="text-black-900 text-xl px-4 mr-[12%] px-[30%] font-doto mb-8 text-center min-h-[2.5em]">
                  {typedText}
                </span>
                <div className="relative w-[350px] h-20 mr-[12%] flex items-center justify-center">
                  <div className="absolute left-[20%] top-1/2 -translate-y-1/2">
                    <NoButton reset={resetNoButton} />
                  </div>
                  <div className="absolute right-[20%] top-1/2 -translate-y-1/2">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white text-xl font-doto py-2 px-6 rounded-lg transition cursor-none"
                      onClick={() => {
                        if (perguntaIndex < perguntas.length - 1) {
                          setPerguntaIndex(i => i + 1);
                        } else {
                          setShowVideo(true);
                        }
                      }}
                    >
                      Sim
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col mr-[12.5%] items-center justify-center w-full h-full">
                <span className="text-black-900 text-xl font-doto mb-4 text-center">Ebaaa, eu te amo tanto ❤</span>
                <div className="w-full flex justify-center">
                  <video ref={setVideoRef} width="200" autoPlay loop className='rounded-lg shadow-lg'>
                    <source src={`${import.meta.env.BASE_URL}videos/yupii.mp4`} type="video/mp4" />
                  </video>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {revealed.s4 && (
        <div className="absolute left-1/2 top-[10vh] -translate-x-1/2 z-[120] pointer-events-none">
          <span className="text-green-700 text-xl font-doto text-center block min-h-[2.5em] drop-shadow-lg">
            {typedBichosMessage}
          </span>
        </div>
      )}

      {/* Modal Surpresa 4 */}
      {revealed.s4 && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-500"
          onClick={() => setRevealed(prev => ({ ...prev, s4: false }))}
        >
          <div
            className="relative z-40 text-black rounded-2xl shadow-2xl p-8 flex flex-wrap items-center justify-center gap-5
              transition-all duration-500 scale-100 opacity-100 animate-fade-in"
            style={{
              minWidth: 450,
              minHeight: 600,
              maxWidth: 450,
              maxHeight: 1000,
              backgroundImage: `url(${import.meta.env.BASE_URL}images/bichos.png)`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}
            onClick={e => e.stopPropagation()}
          >

            <div className="w-[8vw] h-[15vh] mt-20">
              <a
                className="block w-32 h-32 cursor-none"
                href="https://youtu.be/pxn0wL_uSm4?si=2rDLkFuBdIj4RKhG"
                target="_blank"
                rel="noopener noreferrer"
              ></a>
            </div>

            <div className="w-[8vw] h-[15vh] mt-20">
              <a
                className="block w-32 h-32 cursor-none"
                href="https://www.youtube.com/watch?v=y0sF5xhGreA"
                target="_blank"
                rel="noopener noreferrer"
              ></a>
            </div>

            <div className="w-[8vw] h-[15vh]">
              <a
                className="block w-32 h-32 cursor-none"
                href="https://www.youtube.com/watch?v=pvt1nrfI0YM"
                target="_blank"
                rel="noopener noreferrer"
              ></a>
            </div>

            <div className="w-[8vw] h-[15vh]">
              <a
                className="block w-32 h-32 cursor-none"
                href="https://www.youtube.com/watch?v=e90eWYPNtJ8"
                target="_blank"
                rel="noopener noreferrer"
              ></a>
            </div>

            <div className="w-[8vw] h-[15vh]">
              <a
                className="block w-32 h-32 cursor-none"
                href="https://www.youtube.com/watch?v=Pbug3PgchsI"
                target="_blank"
                rel="noopener noreferrer"
              ></a>
            </div>

            <div className="w-[8vw] h-[15vh]">
              <a
                className="block w-32 h-32 cursor-none"
                href="https://www.youtube.com/watch?v=hSIrKcMrGfs"
                target="_blank"
                rel="noopener noreferrer"
              ></a>
            </div>

          </div>
        </div>
      )}

      <audio ref={wowAudio} src={`${import.meta.env.BASE_URL}sounds/wow.mp3`} preload="auto" />
    </div>
  );
}

// Adicione este componente fora do App:
function NoButton({ reset }) {
  const [pos, setPos] = useState(null);

  useEffect(() => {
    setPos(null); // volta ao lugar padrão ao trocar de pergunta
  }, [reset]);

  const moveButton = () => {
    const top = Math.random() * 220;
    const left = Math.random() * 380;
    setPos({ top, left });
  };

  return (
    <button
      className={
        "bg-red-500 hover:bg-red-600 text-white text-xl font-doto py-2 px-6 rounded-lg transition cursor-none" +
        (pos ? " absolute" : "")
      }
      style={pos ? { top: pos.top, left: pos.left } : {}}
      onMouseEnter={e => {
        e.stopPropagation();
        moveButton();
      }}
    >
      Não
    </button>
  );
}
