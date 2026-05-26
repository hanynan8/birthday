"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false });

// ─── Theme ────────────────────────────────────────────────────────────────────
const T = {
  bg:          "#fdf8f0",
  accent:      "#c9960a",
  accentLight: "#a07008",
  accentDark:  "#7a5206",
  pink:        "#d4427a",
  purple:      "#7c3aed",
  textMuted:   "rgba(60,40,10,0.6)",
  heroFrom:    "#fff8e8",
  heroTo:      "#fdf0d8",
  wishBg:      "#fff4e6",
  wheelBg:     "#fef9f0",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const WISHES = [
  { icon: "heart",  color: "#d4427a", title: "الصحة",    text: "ربنا يديك صحة فالق كبير او طية" },
  { icon: "spark",  color: "#c9960a", title: "السعادة",  text: "تكون اسعد من حفرية عاشت مليون سنة" },
  { icon: "trophy", color: "#7c3aed", title: "النجاح",   text: "تنجح في حياتك زي ما الماية بتنجح انها تنحت الصغر" },
];

const SEGMENTS = [
  { label: "💸 100 جنيه كاش", color: "#f7c948", textColor: "#1a0a2e", isPrize: true  },
  { label: "🎉 حاول تاني",    color: "#a855f7", textColor: "#fff",    isPrize: false },
  { label: "❤️ بالتوفيق",    color: "#ff6eb4", textColor: "#fff",    isPrize: false },
  { label: "🎊 هديه قريباً", color: "#2563eb", textColor: "#fff",    isPrize: false },
  { label: "✨ يلا تاني",    color: "#16a34a", textColor: "#fff",    isPrize: false },
  { label: "🌟 محظوظ!",      color: "#dc2626", textColor: "#fff",    isPrize: false },
  { label: "🎁 مفاجأه",      color: "#0891b2", textColor: "#fff",    isPrize: false },
  { label: "💫 يالا تاني",   color: "#7c3aed", textColor: "#fff",    isPrize: false },
];
const PRIZE_INDEX = 0;

const PROFILE_IMG = "https://github.com/hanynan8/e-commerce/blob/main/510658925_122188786898280891_7047425652297071951_n.jpg?raw=true";

const SONG_URL = "https://raw.githubusercontent.com/hanynan8/e-commerce/main/5u4xTa3LR2U.mp3";

const PARTICLE_ICONS = [
  { path: "M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2 1 2 1M2 21h20M7 8v2M12 8v2M17 8v2", color:"#c9960a", l:"10%", dur:"9s",  del:"0s"  },
  { path: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",                       color:"#e0b030", l:"50%", dur:"8s",  del:"5s"  },
  { path: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0zM20 3v4M22 5h-4M4 17v2M5 18H3", color:"#7c3aed", l:"70%", dur:"12s", del:"1s"  },
  { path: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z", color:"#d4427a", l:"85%", dur:"10s", del:"7s"  },
  { path: "M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z", color:"#2563eb", l:"25%", dur:"13s", del:"4s"  },
];

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Great+Vibes&family=Cinzel+Decorative:wght@400;700&display=swap');
*{box-sizing:border-box}
body{background:#fdf8f0;margin:0;font-family:'Cairo',sans-serif;direction:rtl}
@keyframes floatUp{0%{transform:translateY(0);opacity:0}15%{opacity:.6}85%{opacity:.3}100%{transform:translateY(-440px) rotate(var(--rot,360deg));opacity:0}}
@keyframes blink{0%,100%{opacity:.45}50%{opacity:1}}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.07)}}
@keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}
@keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes popIn{0%{transform:scale(.5) rotate(-10deg);opacity:0}70%{transform:scale(1.1) rotate(3deg)}100%{transform:scale(1) rotate(0);opacity:1}}
@keyframes starFloat{0%,100%{transform:translateY(0) rotate(0deg);opacity:.45}50%{transform:translateY(-14px) rotate(180deg);opacity:.8}}
@keyframes confettiFall{0%{transform:translateY(-10px) rotate(0deg);opacity:1}100%{transform:translateY(420px) rotate(720deg);opacity:0}}
@keyframes fadeSlideUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes glowPulse{0%,100%{box-shadow:0 0 30px rgba(201,150,10,.25),0 0 60px rgba(124,58,237,.12)}50%{box-shadow:0 0 45px rgba(201,150,10,.38),0 0 90px rgba(124,58,237,.2)}}
@keyframes photoReveal{0%{opacity:0;transform:scale(.88) translateY(24px)}100%{opacity:1;transform:scale(1) translateY(0)}}
.fp{position:fixed;bottom:0;pointer-events:none;user-select:none;animation:floatUp ease-in-out infinite;font-size:1.6rem;z-index:0}
.shimmer-btn{background:linear-gradient(90deg,#a07008 0%,#c9960a 40%,#e8c050 50%,#c9960a 60%,#a07008 100%);background-size:400px 100%;animation:shimmer 2.2s linear infinite;color:#fff}
.wheel-pointer{width:0;height:0;border-left:18px solid transparent;border-right:18px solid transparent;border-top:40px solid #c9960a;filter:drop-shadow(0 4px 10px rgba(201,150,10,.5))}
.confetti-piece{position:fixed;pointer-events:none;animation:confettiFall linear forwards;border-radius:2px;z-index:999}
.fade-slide{animation:fadeSlideUp .7s cubic-bezier(.22,1,.36,1) both}
.hero-photo{animation:photoReveal .9s cubic-bezier(.22,1,.36,1) .2s both}
.hero-photo-wrap{animation:glowPulse 3.5s ease-in-out infinite}
.reveal{opacity:0;transform:translateY(44px);transition:opacity .8s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
.reveal.revealed{opacity:1;transform:translateY(0)}
.reveal-d1{transition-delay:.12s}.reveal-d2{transition-delay:.24s}.reveal-d3{transition-delay:.36s}
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function launchConfetti() {
  const colors = ["#c9960a","#d4427a","#7c3aed","#2563eb","#16a34a","#f87171"];
  for (let i = 0; i < 80; i++) {
    const el = document.createElement("div");
    el.className = "confetti-piece";
    el.style.cssText = `left:${Math.random()*100}vw;top:-10px;width:${Math.random()*8+6}px;height:${Math.random()*14+8}px;background:${colors[i%colors.length]};animation-duration:${Math.random()*2+2}s;animation-delay:${Math.random()*1.5}s`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 5000);
  }
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("revealed"); io.unobserve(e.target); } }),
      { threshold: 0.3 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── FloatingParticles ────────────────────────────────────────────────────────
function FloatingParticles() {
  return (
    <>
      {PARTICLE_ICONS.map((p, i) => (
        <span key={i} className="fp" style={{ left: p.l, animationDuration: p.dur, animationDelay: p.del, "--rot": "360deg", display: "inline-flex" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: .55 }}>
            <path d={p.path} />
          </svg>
        </span>
      ))}
    </>
  );
}

// ─── Confetti ─────────────────────────────────────────────────────────────────
function Confetti() {
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [run, setRun] = useState(false);
  useEffect(() => {
    setSize({ w: window.innerWidth, h: window.innerHeight });
    setRun(true);
    const fn = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return run ? (
    <ReactConfetti width={size.w} height={size.h} recycle gravity={0.03} numberOfPieces={120}
      colors={["#c9960a","#d4427a","#7c3aed","#2563eb","#16a34a"]} />
  ) : null;
}

// ─── StarsBg ──────────────────────────────────────────────────────────────────
function StarsBg() {
  const [stars, setStars] = useState([]);
  useEffect(() => {
    setStars(Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.sin(i * 137.5) * 45 + 50,
      top:  Math.cos(i * 97.3)  * 45 + 50,
      size: 2 + (i % 3),
      dur:  2 + (i % 3),
      del:  i * 0.3,
    })));
  }, []);
  return (
    <>
      {stars.map(s => (
        <div key={s.id} style={{
          position: "fixed", left: s.left + "%", top: s.top + "%",
          width: s.size + "px", height: s.size + "px", borderRadius: "50%",
          background: T.accent, opacity: 0.35, pointerEvents: "none",
          animation: `starFloat ${s.dur}s ease-in-out ${s.del}s infinite`,
        }} />
      ))}
    </>
  );
}

// ─── Audio singleton (outside React — never garbage collected) ────────────────
let _bgAudio = null;
function getBgAudio() {
  if (!_bgAudio) {
    _bgAudio = new Audio(SONG_URL);
    _bgAudio.loop = true;
    _bgAudio.volume = 0.75;
    _bgAudio.addEventListener("loadedmetadata", () => {
      _bgAudio.currentTime = 12;
    }, { once: true });
  }
  return _bgAudio;
}
// ─── Envelope ─────────────────────────────────────────────────────────────────
function Envelope({ onOpen }) {
  const [open, setOpen] = useState(false);

  function click() {
    if (open) return;
    setOpen(true);
    const audio = getBgAudio();
    audio.play().catch(() => {});
    const seek = () => {
      if (audio.currentTime < 12) {
        audio.currentTime = 12;
      }
      audio.removeEventListener("timeupdate", seek);
    };
    audio.addEventListener("timeupdate", seek);
    setTimeout(onOpen, 920);
  }
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: `radial-gradient(ellipse at 50% 40%,#fff8e8 0%,${T.bg} 70%)` }}>
      <FloatingParticles />
      <StarsBg />

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 w-full">
        {!open && (
          <span style={{ fontFamily: "'Cairo',sans-serif", fontSize: "clamp(1.2rem,4vw,1.7rem)", color: T.accent, animation: "blink 2.2s ease-in-out infinite", letterSpacing: ".08em", textAlign: "center" }}>
            🎂 افتح الظرف 🎂
          </span>
        )}

        {/* Envelope */}
        <div onClick={click} className="relative cursor-pointer transition-transform duration-300 hover:scale-105"
          style={{ width: "min(380px,calc(100vw - 48px))", height: "min(252px,calc((100vw - 48px)*.663))",
            filter: "drop-shadow(0 24px 60px rgba(201,150,10,.3))",
            animation: open ? "envVanish .9s cubic-bezier(.4,0,1,1) forwards" : "none",
          }}>

          {/* Body */}
          <div className="absolute inset-0 rounded-sm" style={{ background: "linear-gradient(135deg,#fff8e8 0%,#fdedc4 55%,#fce8a8 100%)", border: "1px solid rgba(201,150,10,.35)" }} />

          {/* Bottom triangles */}
          <div style={{ position:"absolute",bottom:0,left:0,width:0,height:0,borderBottom:"calc(min(252px,(100vw - 48px)*.663)*.5) solid #fce8a8",borderRight:"calc(min(380px,100vw - 48px)*.5) solid transparent" }} />
          <div style={{ position:"absolute",bottom:0,right:0,width:0,height:0,borderBottom:"calc(min(252px,(100vw - 48px)*.663)*.5) solid #fce8a8",borderLeft:"calc(min(380px,100vw - 48px)*.5) solid transparent" }} />

          {/* V bottom */}
          <div style={{ position:"absolute",bottom:0,left:0,right:0,overflow:"hidden",height:140 }}>
            <div style={{ position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",width:0,height:0,borderLeft:"calc(min(380px,100vw - 48px)*.5) solid transparent",borderRight:"calc(min(380px,100vw - 48px)*.5) solid transparent",borderBottom:"calc(min(252px,(100vw - 48px)*.663)*.555) solid #fdedc4" }} />
          </div>

          {/* Flap */}
          <div style={{
            position:"absolute",top:0,left:0,width:0,height:0,
            borderLeft:"calc(min(380px,100vw - 48px)*.5) solid transparent",
            borderRight:"calc(min(380px,100vw - 48px)*.5) solid transparent",
            borderTop:"calc(min(252px,(100vw - 48px)*.663)*.5) solid #fce8a8",
            transformOrigin:"top center",
            transition:"transform .85s cubic-bezier(.3,0,.2,1)",
            transform: open ? "rotateX(180deg)" : "rotateX(0deg)",
            zIndex: 5,
          }} />

          {/* Seal */}
          <div className="absolute z-10 rounded-full flex items-center justify-center"
            style={{ top:"44%",left:"50%",transform:"translate(-50%,-50%)",width:"clamp(44px,13vw,58px)",height:"clamp(44px,13vw,58px)",background:`radial-gradient(circle at 38% 32%,#e8c050,#c9960a)`,boxShadow:"0 6px 24px rgba(201,150,10,.4)",fontSize:"clamp(1.2rem,5vw,1.7rem)" }}>
            🎂
          </div>

          {/* To label */}
          <div className="absolute bottom-[5%] left-0 right-0 text-center z-[8]">
            <span style={{ fontFamily:"'Cairo',sans-serif",fontSize:"clamp(.7rem,2vw,.85rem)",letterSpacing:".3em",color:"rgba(160,112,8,.65)",textTransform:"uppercase",display:"block",marginBottom:4 }}>To</span>
            <span style={{ fontFamily:"'Great Vibes',cursive",fontSize:"clamp(1.8rem,6vw,2.2rem)",color:T.accentDark,textShadow:"0 2px 16px rgba(201,150,10,.25)",lineHeight:1.2 }}>
              Geo: Youssef Mohsen
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes envVanish{to{transform:translateY(-55px) scale(.87);opacity:0}}
        @keyframes blink{0%,100%{opacity:.45}50%{opacity:1}}
        @keyframes starFloat{0%,100%{transform:translateY(0) rotate(0deg);opacity:.45}50%{transform:translateY(-14px) rotate(180deg);opacity:.8}}
      `}</style>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  useReveal();
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 py-24 text-center"
      style={{ background: `linear-gradient(160deg,${T.heroFrom} 0%,${T.heroTo} 100%)` }}>
      <FloatingParticles />
      <div style={{ position:"absolute",inset:0,background:"radial-gradient(circle at 25% 30%,rgba(124,58,237,.08) 0%,transparent 55%),radial-gradient(circle at 75% 70%,rgba(201,150,10,.06) 0%,transparent 50%)",pointerEvents:"none" }} />

      <div className="relative z-[2] flex flex-col items-center gap-8 mx-auto w-full max-w-[680px] px-8 py-14 rounded-3xl"
        style={{ background:"rgba(255,255,255,.85)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",border:"1px solid rgba(201,150,10,.2)",boxShadow:"0 32px 80px rgba(201,150,10,.12)" }}>

        {/* Photo */}
        <div className="reveal hero-photo-wrap rounded-full"
          style={{ padding:4,background:`linear-gradient(135deg,#c9960a,#d4427a,#7c3aed)`,borderRadius:"50%" }}>
          <div style={{ borderRadius:"50%",overflow:"hidden",width:"clamp(140px,38vw,200px)",height:"clamp(140px,38vw,200px)",background:"#fdf8f0",border:"3px solid rgba(201,150,10,.2)" }}>
            <img src={PROFILE_IMG} alt="صاحبي العزيز" className="hero-photo"
              style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",display:"block" }} />
          </div>
        </div>

        <div className="reveal" style={{ fontSize:"clamp(2.5rem,10vw,4.5rem)",animation:"pulse 2s ease-in-out infinite",lineHeight:1 }}>🎂</div>

        <h1 className="reveal reveal-d1"
          style={{ fontFamily:"'Cinzel Decorative','Cairo',serif",fontSize:"clamp(1.6rem,6vw,3rem)",background:`linear-gradient(135deg,#a07008,#d4427a,#7c3aed)`,backgroundSize:"200%",animation:"gradShift 4s ease infinite",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1.3 }}>
          Geo: Youssef Mohsen
        </h1>

        <div className="reveal reveal-d2 flex items-center gap-4 w-full justify-center">
          <div style={{ flex:1,maxWidth:100,height:1,background:`linear-gradient(90deg,transparent,#c9960a)` }} />
          <span style={{ color:T.accent,fontSize:"1.1rem" }}>◆</span>
          <div style={{ flex:1,maxWidth:100,height:1,background:`linear-gradient(90deg,#c9960a,transparent)` }} />
        </div>

        <p className="reveal reveal-d2"
          style={{ fontFamily:"'Cairo',sans-serif",fontSize:"clamp(1.05rem,2.5vw,1.25rem)",color:"rgba(60,40,10,.7)",lineHeight:2.2,maxWidth:440 }}>
          كل سنة وانت طيب يا خويا وعقبال سنين الدنيا ! 🎉
        </p>
      </div>
    </section>
  );
}

// ─── Message ──────────────────────────────────────────────────────────────────
function Message() {
  const { ref, visible } = useInView();
  return (
    <section className="py-24 px-6 text-center relative overflow-hidden"
      style={{ background: "#fff9ee", isolation: "isolate" }}>
      <FloatingParticles />
      <div style={{ position:"absolute",inset:0,background:"radial-gradient(circle at 30% 60%,rgba(212,66,122,.07) 0%,transparent 55%),radial-gradient(circle at 70% 30%,rgba(124,58,237,.07) 0%,transparent 50%)",pointerEvents:"none" }} />

      <div ref={ref} className="relative z-10">

        <div className="max-w-[640px] mx-auto rounded-3xl px-10 py-12 sm:px-16 sm:py-16"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0.95)", transition: "all .9s ease .1s", background:"#ffffff", border:"1px solid rgba(201,150,10,.25)", boxShadow:"0 24px 64px rgba(201,150,10,.1)" }}>
          <div style={{ fontFamily:"Georgia,serif",fontSize:"5.5rem",color:"rgba(201,150,10,.18)",lineHeight:.7,marginBottom:12,textAlign:"right" }}>"</div>
          <p style={{ fontFamily:"'Cairo',sans-serif",fontSize:"clamp(1.1rem,2.5vw,1.3rem)",color:"rgba(40,25,5,.8)",lineHeight:2.6,textAlign:"center",whiteSpace:"pre-line" }}>
            {`جيو الجيولوجيا كلها في يوم ميلادك \nبتمنالك عمر طويل وحال عالي\nتبقى دايماً بألف خير وعافية\nوعقبال ما تبقي جبل كبير او خندق عميق`}
          </p>
          <div style={{ fontFamily:"Georgia,serif",fontSize:"5.5rem",color:"rgba(201,150,10,.18)",lineHeight:.7,marginTop:12,textAlign:"left",display:"inline-block",transform:"scaleX(-1) scaleY(-1)" }}>"</div>
        </div>
      </div>
    </section>
  );
}

// ─── Wishes ───────────────────────────────────────────────────────────────────
function WishIcon({ type, color }) {
  const paths = {
    heart:  "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
    spark:  "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0zM20 3v4M22 5h-4M4 17v2M5 18H3",
    trophy: "m12 14 4-4M3.34 19a10 10 0 1 1 17.32 0M11 14h1v4h1",
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {paths[type].split("M").filter(Boolean).map((d, i) => <path key={i} d={"M" + d} />)}
    </svg>
  );
}

function WishesSec() {
  const { ref, visible } = useInView();
  return (
    <section className="py-24 px-6 text-center relative overflow-hidden" style={{ background: T.wishBg, isolation: "isolate" }}>
      <FloatingParticles />
      <h2 className="reveal font-normal mb-14"
        style={{ fontFamily:"'Cinzel Decorative','Cairo',serif",fontSize:"clamp(1.7rem,4.5vw,2.8rem)",color:T.accentDark,letterSpacing:".06em" }}>
        بتمنالك
      </h2>
      <div ref={ref} className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-[900px] mx-auto">
        {WISHES.map((w, i) => (
          <div key={w.title}
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: `all .7s ease ${i * 0.15}s`, background:"#ffffff",border:"1px solid rgba(201,150,10,.2)",boxShadow:"0 8px 32px rgba(201,150,10,.08)" }}
            className="rounded-3xl px-8 py-10 flex flex-col items-center gap-5">
            <div className="rounded-2xl p-4" style={{ background:"rgba(201,150,10,.08)",border:"1px solid rgba(201,150,10,.15)" }}>
              <WishIcon type={w.icon} color={w.color} />
            </div>
            <h3 style={{ fontFamily:"'Cairo',sans-serif",fontSize:"1.2rem",fontWeight:700,color:T.accentDark }}>{w.title}</h3>
            <p style={{ fontFamily:"'Cairo',sans-serif",fontSize:"1rem",color:"rgba(60,40,10,.6)",lineHeight:2 }}>{w.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Candle ───────────────────────────────────────────────────────────────────
function Candle({ lit, onClick }) {
  return (
    <div className="flex flex-col items-center cursor-pointer" onClick={onClick}>
      <div className="relative mb-1" style={{ width: 24, height: 40 }}>
        {lit ? (
          <>
            <div className="absolute inset-x-0 bottom-0 rounded-full animate-pulse"
              style={{ height:32,background:"linear-gradient(to top,#ea580c,#facc15,transparent)",filter:"blur(1px)" }} />
            <div className="absolute inset-x-1 bottom-0 rounded-full"
              style={{ height:20,background:"linear-gradient(to top,#fde047,#fff)" }} />
          </>
        ) : (
          <div className="absolute rounded-full opacity-40"
            style={{ bottom:0,left:8,right:8,height:12,background:"#9ca3af" }} />
        )}
      </div>
      <div className="rounded-sm transition-all duration-300"
        style={{ width:24,height:64,background: lit ? "linear-gradient(to bottom,#fef08a,#fefce8)" : "linear-gradient(to bottom,#e5e7eb,#f3f4f6)",
          boxShadow: lit ? "0 0 12px rgba(250,204,21,.5)" : "none",
          border: "1px solid rgba(0,0,0,.08)" }} />
    </div>
  );
}

function CakeSec({ onAllBlown }) {
  const { ref, visible } = useInView();
  const [candles, setCandles] = useState(Array(7).fill(true));
  const [allBlown, setAllBlown] = useState(false);

  function blow(i) {
    const next = [...candles]; next[i] = false; setCandles(next);
    if (next.every(c => !c)) {
      setAllBlown(true);
      launchConfetti();
      setTimeout(onAllBlown, 800);
    }
  }
  function reset() { setCandles(Array(7).fill(true)); setAllBlown(false); }

  return (
    <section className="py-24 px-6 relative overflow-hidden"
      style={{ background: `linear-gradient(160deg,#fff8e8 0%,#fdf0d8 100%)`, isolation: "isolate" }}>
      <FloatingParticles />
      <div ref={ref} className="max-w-2xl mx-auto text-center"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(40px)", transition: "all .8s ease" }}>
        <h2 style={{ fontFamily:"'Cinzel Decorative','Cairo',serif",fontSize:"clamp(1.6rem,5vw,2.6rem)",color:T.accentDark,marginBottom:12,letterSpacing:".06em" }}>
          كل الكيكة 🎂
        </h2>
        <p style={{ fontFamily:"'Cairo',sans-serif",color:"rgba(60,40,10,.55)",fontSize:"1.05rem",marginBottom:48 }}>
          دوس على الشمعة عشان تطفيها!
        </p>

        {/* Cake */}
        <div className="relative inline-block">
          <div className="flex justify-center gap-3 mb-2">
            {candles.map((lit, i) => <Candle key={i} lit={lit} onClick={() => blow(i)} />)}
          </div>
          <div className="rounded-t-xl mx-auto flex items-center justify-center"
            style={{ width:256,height:48,background:"linear-gradient(to bottom,#f472b6,#ec4899)" }}>
            <span style={{ fontFamily:"'Cairo',sans-serif",color:"#fff",fontWeight:700,fontSize:".875rem" }}>Happy Birthday! 🎉</span>
          </div>
          <div className="mx-auto flex items-center justify-center"
            style={{ width:288,height:56,background:"linear-gradient(to bottom,#c084fc,#a855f7)" }}>
            <span style={{ color:"rgba(255,255,255,.8)",fontSize:".75rem" }}>🌸 🌸 🌸</span>
          </div>
          <div className="rounded-b-xl mx-auto"
            style={{ width:320,height:56,background:"linear-gradient(to bottom,#facc15,#eab308)" }} />
          <div className="rounded-full mx-auto mt-1 shadow-lg"
            style={{ width:"calc(100% + 2rem)",marginLeft:"-1rem",height:16,background:"#f3f4f6",border:"1px solid rgba(0,0,0,.08)" }} />
        </div>

        {allBlown ? (
          <div className="mt-10 fade-slide">
            <p style={{ fontFamily:"'Cinzel Decorative','Cairo',serif",fontSize:"clamp(1.4rem,5vw,2rem)",color:T.accentDark,marginBottom:12 }}>
              🎉 عيد ميلاد سعيد! 🎉
            </p>
            <p style={{ fontFamily:"'Cairo',sans-serif",color:"rgba(60,40,10,.6)",fontSize:"1rem",marginBottom:20 }}>
              كل أمنياتك تتحقق يا غالي 💛
            </p>
            <button onClick={reset} style={{ background:"transparent",border:`1.5px solid rgba(201,150,10,.4)`,borderRadius:14,padding:"11px 28px",color:T.accentDark,fontFamily:"'Cairo',sans-serif",fontSize:"1rem",cursor:"pointer" }}>
              🕯️ أعد إشعال الشموع
            </button>
          </div>
        ) : (
          <p style={{ fontFamily:"'Cairo',sans-serif",color:"rgba(60,40,10,.35)",fontSize:".8rem",marginTop:24 }}>
            {candles.filter(Boolean).length} شمعة لسه شايلة... اطفيها كلها!
          </p>
        )}
      </div>
    </section>
  );
}

// ─── LuckyWheel ───────────────────────────────────────────────────────────────
function PhoneForm({ onDone }) {
  const [phone, setPhone]   = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");

async function submit() {
  if (!phone.trim()) { setError("دخل رقمك الأول 😅"); return; }
  if (!/^[0-9+\s\-]{7,15}$/.test(phone.trim())) { setError("رقم مش صح، حاول تاني"); return; }
  setError(""); setLoading(true);

  try {
    await fetch("/api/data?collection=cash", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: phone.trim(),
        submittedAt: new Date().toISOString(),
      }),
    });
  } catch (err) {
    console.error("Failed to send phone:", err);
  }

  setLoading(false);
  onDone();
}
  return (
    <div className="fade-slide flex flex-col items-center gap-5 w-full max-w-[360px] mx-auto">
      <div className="text-center px-5 py-4 rounded-2xl"
        style={{ background:"rgba(201,150,10,.08)",border:"1px solid rgba(201,150,10,.25)" }}>
        <p style={{ fontFamily:"'Cairo',sans-serif",fontSize:"1.1rem",color:T.accentDark }}>
          🎉 مبروووك! فزت بـ <strong style={{ color:T.accent }}>100 جنيه كاش</strong>
        </p>
        <p style={{ fontFamily:"'Cairo',sans-serif",fontSize:".9rem",color:"rgba(60,40,10,.55)",marginTop:4 }}>
          دخل رقمك عشان نوصلك العيدية 🎁
        </p>
      </div>
      <input type="tel" placeholder="01XXXXXXXXX" value={phone} onChange={e => { setPhone(e.target.value); setError(""); }}
        style={{ background:"#ffffff",border:`1.5px solid rgba(201,150,10,.35)`,borderRadius:14,padding:"13px 18px",color:"#3c2808",fontFamily:"'Cairo',sans-serif",fontSize:"1.1rem",outline:"none",width:"100%",textAlign:"center",direction:"ltr",boxShadow:"0 2px 8px rgba(201,150,10,.08)" }} />
      {error && <p style={{ color:"#dc2626",fontFamily:"'Cairo',sans-serif",fontSize:".85rem" }}>{error}</p>}
      <button onClick={submit} disabled={loading} className="shimmer-btn w-full py-4 rounded-2xl font-bold text-lg disabled:opacity-60"
        style={{ fontFamily:"'Cairo',sans-serif",cursor:"pointer",border:"none" }}>
        {loading ? "⏳ بيتبعت..." : "📲 ابعت رقمي"}
      </button>
    </div>
  );
}

function SuccessScreen() {
  return (
    <div className="fade-slide flex flex-col items-center gap-6 text-center px-4 py-8">
      <div style={{ fontSize:"3.8rem",animation:"popIn .6s cubic-bezier(.34,1.56,.64,1) both" }}>✅</div>
      <h2 style={{ fontFamily:"'Cinzel Decorative','Cairo',serif",fontSize:"clamp(1.3rem,5vw,2rem)",color:T.accentDark }}>
        تم استلام رقمك!
      </h2>
      <p style={{ fontFamily:"'Cairo',sans-serif",fontSize:"1.05rem",color:"rgba(60,40,10,.6)",lineHeight:1.9,maxWidth:310 }}>
        هيتواصل معاك خلال <strong style={{ color:T.accentDark }}>12 ساعة</strong> لحين حصولك على الهديه 🎁
      </p>
    </div>
  );
}

function LuckyWheel({ onPrize }) {
  const canvasRef = useRef(null);
  const [spinning, setSpinning] = useState(false);
  const [done, setDone]         = useState(false);
  const [size, setSize]         = useState(300);
  const angle = useRef(0);

  useEffect(() => { setSize(Math.min(300, window.innerWidth - 64)); }, []);

  const SEG  = SEGMENTS.length;
  const SARAD = (2 * Math.PI) / SEG;

  function draw(a) {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d");
    const cx = c.width / 2, cy = c.height / 2, r = cx - 6;
    ctx.clearRect(0, 0, c.width, c.height);
    SEGMENTS.forEach((seg, i) => {
      const s = a + i * SARAD - Math.PI / 2, e = s + SARAD;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, s, e); ctx.closePath();
      ctx.fillStyle = seg.color; ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,.25)"; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(s + SARAD / 2);
      ctx.textAlign = "right"; ctx.fillStyle = seg.textColor;
      ctx.font = `bold ${c.width < 280 ? 9 : 11}px Cairo`;
      ctx.shadowColor = "rgba(0,0,0,.2)"; ctx.shadowBlur = 2;
      ctx.fillText(seg.label, r - 10, 5); ctx.restore();
    });
    const cg = ctx.createRadialGradient(cx, cy, 3, cx, cy, 32);
    cg.addColorStop(0, "#e8c050"); cg.addColorStop(1, "#a07008");
    ctx.beginPath(); ctx.arc(cx, cy, 30, 0, 2 * Math.PI);
    ctx.shadowColor = "rgba(201,150,10,.6)"; ctx.shadowBlur = 14; ctx.fillStyle = cg; ctx.fill();
    ctx.shadowBlur = 0; ctx.fillStyle = "#3c2808"; ctx.font = "bold 16px Cairo";
    ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("🎂", cx, cy);
  }

  useEffect(() => { draw(0); }, [size]);

  function spin() {
    if (spinning || done) return;
    setSpinning(true);
    const prizeAngle = -(PRIZE_INDEX * SARAD);
    const target = prizeAngle - (6 + Math.floor(Math.random() * 4)) * 2 * Math.PI;
    const dur = 5500, start = performance.now(), from = angle.current;
    const ease = t => 1 - Math.pow(1 - t, 4);
    (function frame(now) {
      const t = Math.min((now - start) / dur, 1);
      const a = from + (target - from) * ease(t);
      angle.current = a; draw(a);
      if (t < 1) { requestAnimationFrame(frame); }
      else { setSpinning(false); setDone(true); launchConfetti(); setTimeout(() => onPrize(), 800); }
    })(performance.now());
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="wheel-pointer" />
      <canvas ref={canvasRef} width={size} height={size}
        style={{ borderRadius:"50%",boxShadow:"0 0 45px rgba(201,150,10,.2),0 0 90px rgba(124,58,237,.1)",display:"block",border:"3px solid rgba(201,150,10,.2)" }} />
      {!done && (
        <button onClick={spin} disabled={spinning} className="shimmer-btn px-10 py-4 rounded-full font-bold text-xl shadow-lg disabled:opacity-60 disabled:cursor-not-allowed transition-transform active:scale-95"
          style={{ fontFamily:"'Cairo',sans-serif",cursor:"pointer",border:"none" }}>
          {spinning ? "🎡 بتتلف اهي..." : "🎯  لف العجله واستلم عديتك يامعلم! "}
        </button>
      )}
    </div>
  );
}

function WheelSec() {
  const [wheelDone, setWheelDone] = useState(false);
  const [formDone,  setFormDone]  = useState(false);
  const { ref, visible } = useInView();

  return (
    <section className="py-24 px-6 flex flex-col items-center gap-12 text-center relative overflow-hidden"
      style={{ background: T.wheelBg, isolation: "isolate" }}>
      <FloatingParticles />
      <div style={{ position:"absolute",inset:0,background:"radial-gradient(circle at 50% 50%,rgba(201,150,10,.05) 0%,transparent 60%)",pointerEvents:"none" }} />

      <div className="reveal relative z-10 flex flex-col items-center gap-3">
        <h2 style={{ fontFamily:"'Cinzel Decorative','Cairo',serif",fontSize:"clamp(1.6rem,5vw,2.6rem)",color:T.accentDark,letterSpacing:".06em" }}>
          عجلة الحظ
        </h2>
        <p style={{ fontFamily:"'Cairo',sans-serif",color:"rgba(60,40,10,.55)",fontSize:"1.05rem" }}>
          لفها مرة واحدة بس وشوف هديتك! 🎁
        </p>
      </div>

      <div ref={ref} className="relative z-10 w-full flex justify-center"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(40px)", transition: "all .8s ease .1s" }}>
        {!wheelDone && !formDone && <LuckyWheel onPrize={() => setWheelDone(true)} />}
        {wheelDone  && !formDone  && <PhoneForm  onDone={() => setFormDone(true)} />}
        {formDone   && <SuccessScreen />}
      </div>
    </section>
  );
}

// ─── Closing ──────────────────────────────────────────────────────────────────
function Closing() {
  return (
    <section className="py-20 px-6 text-center relative overflow-hidden"
      style={{ background: `linear-gradient(160deg,#fff8e8 0%,#fdf8f0 100%)`, isolation: "isolate" }}>
      <FloatingParticles />
      <div className="reveal flex flex-col items-center gap-5 max-w-[520px] mx-auto">
        <span style={{ fontFamily:"'Great Vibes',cursive",fontSize:"clamp(2.2rem,6vw,3.6rem)",color:T.accentDark,textShadow:"0 2px 16px rgba(201,150,10,.2)" }}>
          By: Hany Younan <p>عمك واحسن مبرمج في الدنيا كلها</p>
        </span>
        <div className="flex items-center gap-4 w-full justify-center">
          <div style={{ flex:1,maxWidth:100,height:1,background:`linear-gradient(90deg,transparent,#c9960a)` }} />
          <span style={{ color:T.accent,fontSize:"1.2rem" }}>✦</span>
          <div style={{ flex:1,maxWidth:100,height:1,background:`linear-gradient(90deg,#c9960a,transparent)` }} />
        </div>
        <p style={{ fontFamily:"'Cairo',sans-serif",fontSize:"clamp(.75rem,1vw,.9rem)",letterSpacing:".55em",textTransform:"uppercase",color:"rgba(60,40,10,.3)" }}>
          with love
        </p>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BirthdayPage() {
  const [showCard,  setShowCard]  = useState(false);
  const [showWheel, setShowWheel] = useState(false);

  useEffect(() => {
    const id = "bday-css";
    if (document.getElementById(id)) return;
    const s = document.createElement("style"); s.id = id; s.textContent = CSS;
    document.head.appendChild(s);
    return () => document.getElementById(id)?.remove();
  }, []);

  const wheelRef = useRef(null);
  function onAllBlown() {
    setShowWheel(true);
    setTimeout(() => { wheelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }, 300);
  }

  return (
    <>
      <style>{`@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.07)}} @keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}} @keyframes popIn{0%{transform:scale(.5) rotate(-10deg);opacity:0}70%{transform:scale(1.1) rotate(3deg)}100%{transform:scale(1) rotate(0);opacity:1}}`}</style>

      <Confetti />

      {!showCard && <Envelope onOpen={() => setShowCard(true)} />}

      {showCard && (
        <div className="transition-all duration-700 opacity-100">
          <Hero />
          <Message />
          <WishesSec />
          <CakeSec onAllBlown={onAllBlown} />

          <div ref={wheelRef}>
            {showWheel && <WheelSec />}
          </div>

          <Closing />
        </div>
      )}
    </>
  );
}