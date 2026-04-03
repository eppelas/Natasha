import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  ArrowRight,
  Activity,
  Camera,
  Disc,
  Gift,
  Headphones,
  Music,
  Pause,
  Play,
  Quote,
  RotateCw,
  Sparkles,
  Star,
  Users,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';

type StickerItem = {
  id: string;
  frames: string[];
  caption: string;
  className: string;
  cycleMs?: number;
  glow: string;
  hoverCycle?: boolean;
};

type QuizCard = {
  round: string;
  question: string;
  answer: string;
  tone: string;
};

type StatCard = {
  label: string;
  value: string;
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
};

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

const IMAGE_FACE = asset('images/natasha-loading-face.png');
const IMAGE_HERO = asset('images/natasha-second-big.jpg');
const IMAGE_CAKE = asset('images/birthday-guests/transparent_output_5.png');
const IMAGE_MORNING_POSTER = asset('images/moments/morning-photo.jpg');
const IMAGE_DANCE_POSTER = asset('images/moments/dance-poster.jpg');
const IMAGE_DANCE_WITH_NATASHA_POSTER = asset('images/moments/dance-with-natasha-poster.jpg');
const IMAGE_EXTRA_CIRCLE_POSTER = asset('images/moments/extra-circle-poster.jpg');
const VIDEO_MORNING = asset('videos/morning-prelude.mp4');
const VIDEO_DANCE = asset('videos/dance-floor.mp4');
const VIDEO_DANCE_WITH_NATASHA = asset('videos/dance-with-natasha.mp4');
const VIDEO_EXTRA_CIRCLE = asset('videos/extra-circle.mp4');

const guestStickers: StickerItem[] = [
  {
    id: 'guest-1',
    frames: [asset('images/birthday-guests/1-1.png'), asset('images/birthday-guests/1-2.png')],
    caption: 'один из тех, кто сначала тихий, а потом уже в центре танца',
    className: 'relative md:absolute left-0 top-0 w-full md:w-44 rotate-[-5deg]',
    cycleMs: 2600,
    glow: 'rgba(255, 137, 198, 0.32)',
    hoverCycle: true,
  },
  {
    id: 'guest-2',
    frames: [asset('images/birthday-guests/2-1.png'), asset('images/birthday-guests/2-2.png')],
    caption: 'тот, кто всегда уверенно кивает',
    className: 'relative md:absolute left-0 top-0 w-full md:w-44 rotate-[4deg]',
    cycleMs: 2400,
    glow: 'rgba(84, 122, 255, 0.28)',
    hoverCycle: true,
  },
  {
    id: 'guest-3',
    frames: [asset('images/birthday-guests/3-1.png'), asset('images/birthday-guests/3-2.png')],
    caption: 'спокойствие, собака и философия',
    className: 'relative md:absolute left-0 top-0 w-full md:w-44 rotate-[-2deg]',
    cycleMs: 3000,
    glow: 'rgba(255, 194, 132, 0.28)',
    hoverCycle: true,
  },
  {
    id: 'guest-4',
    frames: [asset('images/birthday-guests/transparent_output_7.png')],
    caption: 'блестящее платье: да. внутренний свет: тоже да',
    className: 'relative md:absolute left-0 top-0 w-full md:w-44 rotate-[3deg]',
    cycleMs: 1800,
    glow: 'rgba(255, 90, 183, 0.28)',
  },
  {
    id: 'guest-5',
    frames: [asset('images/birthday-guests/transparent_output_3.png')],
    caption: 'режим наблюдателя, который первым слышит хороший трек',
    className: 'relative md:absolute left-0 top-0 w-full md:w-44 rotate-[-7deg]',
    cycleMs: 3600,
    glow: 'rgba(113, 124, 255, 0.28)',
  },
  {
    id: 'guest-6',
    frames: [asset('images/birthday-guests/final_precise.png')],
    caption: 'абсолютно серьёзный человек до первого тоста',
    className: 'relative md:absolute left-0 top-0 w-full md:w-44 rotate-[5deg]',
    cycleMs: 2400,
    glow: 'rgba(255, 166, 77, 0.26)',
  },
  {
    id: 'guest-7',
    frames: [asset('images/birthday-guests/final_person4.png')],
    caption: 'Наташа',
    className: 'relative md:absolute left-0 top-0 w-full md:w-44 rotate-[-4deg]',
    cycleMs: 3600,
    glow: 'rgba(80, 214, 232, 0.24)',
  },
  {
    id: 'guest-8',
    frames: [asset('images/birthday-guests/kid_fixed_v2.png')],
    caption: 'маленький герой, большой вайб',
    className: 'relative md:absolute left-0 top-0 w-full md:w-40 rotate-[3deg]',
    cycleMs: 3600,
    glow: 'rgba(255, 214, 106, 0.3)',
  },
  {
    id: 'guest-9',
    frames: [asset('images/birthday-guests/transparent_output_6.png')],
    caption: 'ответил как есть, набрал 3 балла, остался легендой',
    className: 'relative md:absolute left-0 top-0 w-full md:w-44 rotate-[1deg]',
    cycleMs: 3600,
    glow: 'rgba(151, 98, 255, 0.24)',
  },
  {
    id: 'guest-10',
    frames: [asset('images/birthday-guests/transparent.png')],
    caption: 'выглядел спокойно, но уже явно всё понимал',
    className: 'relative md:absolute left-0 top-0 w-full md:w-44 rotate-[-3deg]',
    cycleMs: 3600,
    glow: 'rgba(92, 185, 255, 0.22)',
  },
  {
    id: 'guest-11',
    frames: [asset('images/birthday-guests/bg_removed_next.png')],
    caption: 'человек с лицом «я пришёл и это уже красиво»',
    className: 'relative md:absolute left-0 top-0 w-full md:w-44 rotate-[4deg]',
    cycleMs: 3600,
    glow: 'rgba(255, 135, 185, 0.22)',
  },
  {
    id: 'guest-12',
    frames: [asset('images/birthday-guests/final_fixed_real.png')],
    caption: 'тот самый взгляд, после которого спорить уже не хочется',
    className: 'relative md:absolute left-0 top-0 w-full md:w-44 rotate-[-1deg]',
    cycleMs: 3600,
    glow: 'rgba(255, 183, 95, 0.22)',
  },
  {
    id: 'guest-13',
    frames: [asset('images/birthday-guests/bg_removed_final.png')],
    caption: 'будто весь дресс-код вечера заранее знал, под кого подстраиваться',
    className: 'relative md:absolute left-0 top-0 w-full md:w-44 rotate-[5deg]',
    cycleMs: 3600,
    glow: 'rgba(255, 149, 206, 0.24)',
  },
  {
    id: 'guest-cake',
    frames: [IMAGE_CAKE],
    caption: 'финал со свечами, который прожил красиво и недолго',
    className: 'relative md:absolute left-0 top-0 w-full md:w-56 rotate-[-2deg]',
    cycleMs: 3600,
    glow: 'rgba(146, 93, 40, 0.18)',
  },
  {
    id: 'guest-cake-2',
    frames: [IMAGE_CAKE],
    caption: 'ещё один круг свечей и сразу в легенды вечера',
    className: 'relative md:absolute left-0 top-0 w-full md:w-48 rotate-[6deg]',
    cycleMs: 3600,
    glow: 'rgba(146, 93, 40, 0.16)',
  },
];

const recapStats: StatCard[] = [
  {
    label: 'гостей',
    value: '12',
    detail: 'двенадцать лиц, двенадцать способов сделать этот вечер живым',
    icon: Users,
  },
  {
    label: 'вопросов',
    value: '10',
    detail: 'десять поводов вспомнить про тебя чуть больше, чем обычно',
    icon: Activity,
  },
  {
    label: 'подарок',
    value: '1',
    detail: 'один подарок, задержавшийся на месяц, но всё-таки добравшийся',
    icon: Gift,
  },
];

const quizCards: QuizCard[] = [
  {
    round: '01',
    question: 'Что в детстве Наташа делала чаще всего?',
    answer: 'Ставила концерты для родственников.',
    tone: 'from-[#FFF0F7] to-[#FFE6CF]',
  },
  {
    round: '02',
    question: 'Если в комнате беспорядок?',
    answer: 'Она не успокоится, пока не наведёт порядок.',
    tone: 'from-[#F1E9FF] to-[#E8F8FF]',
  },
  {
    round: '03',
    question: 'Где она заработала на школьную мечту?',
    answer: 'В Южной Корее.',
    tone: 'from-[#FFEFD9] to-[#F9E7FF]',
  },
  {
    round: '04',
    question: 'Чего она больше всего боится?',
    answer: 'Потерять способность двигаться.',
    tone: 'from-[#E8F7FF] to-[#FFF3E9]',
  },
  {
    round: '05',
    question: 'Чаще всего на встречу Наташа приходит...',
    answer: 'Заранее.',
    tone: 'from-[#FFF7D7] to-[#FFE4F0]',
  },
  {
    round: '06',
    question: 'Что она делает, если очень сильно злится?',
    answer: 'Убирается.',
    tone: 'from-[#F2ECFF] to-[#E9FFF7]',
  },
];

const galleryImages = [
  'DSC04651.jpg',
  'DSC04664.jpg',
  'DSC04668.jpg',
  'DSC04671.jpg',
  'DSC04679.jpg',
  'DSC04686.jpg',
  'DSC04691.jpg',
  'DSC04696.jpg',
  'DSC04700.jpg',
  'DSC04705.jpg',
  'DSC04712.jpg',
  'DSC04719.jpg',
  'DSC04733.jpg',
  'DSC04740.jpg',
  'DSC04751.jpg',
  'DSC04756.jpg',
  'DSC04765.jpg',
  'DSC04768.jpg',
  'DSC04786.jpg',
  'DSC04813.jpg',
  'DSC04842.jpg',
].map((fileName) => asset(`images/photo-gallery/${fileName}`));

const guestPilePlacements = [
  { index: 13, left: '47%', top: '28%', zIndex: 1 },
  { index: 0, left: '44%', top: '18%', zIndex: 11 },
  { index: 1, left: '48%', top: '16%', zIndex: 12 },
  { index: 2, left: '52%', top: '17%', zIndex: 13 },
  { index: 3, left: '42%', top: '24%', zIndex: 14 },
  { index: 4, left: '46%', top: '23%', zIndex: 15 },
  { index: 5, left: '50%', top: '24%', zIndex: 16 },
  { index: 6, left: '54%', top: '23%', zIndex: 17 },
  { index: 7, left: '44%', top: '30%', zIndex: 18 },
  { index: 8, left: '48%', top: '31%', zIndex: 19 },
  { index: 9, left: '52%', top: '30%', zIndex: 20 },
  { index: 10, left: '56%', top: '31%', zIndex: 21 },
  { index: 11, left: '46%', top: '38%', zIndex: 22 },
  { index: 12, left: '50%', top: '38%', zIndex: 23 },
] as const;

const guestStackWidths: Record<string, string> = {
  'guest-1': 'w-[7.2rem] md:w-[9rem] lg:w-[10.6rem]',
  'guest-2': 'w-[7.2rem] md:w-[9rem] lg:w-[10.6rem]',
  'guest-3': 'w-[7.2rem] md:w-[9rem] lg:w-[10.6rem]',
  'guest-4': 'w-[7.2rem] md:w-[9rem] lg:w-[10.6rem]',
  'guest-5': 'w-[7.2rem] md:w-[9rem] lg:w-[10.6rem]',
  'guest-6': 'w-[7.2rem] md:w-[9rem] lg:w-[10.6rem]',
  'guest-7': 'w-[7.2rem] md:w-[9rem] lg:w-[10.6rem]',
  'guest-8': 'w-[6.2rem] md:w-[8rem] lg:w-[9rem]',
  'guest-9': 'w-[7.2rem] md:w-[9rem] lg:w-[10.6rem]',
  'guest-10': 'w-[7.2rem] md:w-[9rem] lg:w-[10.6rem]',
  'guest-11': 'w-[7.2rem] md:w-[9rem] lg:w-[10.6rem]',
  'guest-12': 'w-[7.2rem] md:w-[9rem] lg:w-[10.6rem]',
  'guest-13': 'w-[7.2rem] md:w-[9rem] lg:w-[10.6rem]',
  'guest-cake': 'w-[6.8rem] md:w-[8.6rem] lg:w-[9.4rem]',
  'guest-cake-2': 'w-[6.5rem] md:w-[8rem] lg:w-[8.8rem]',
};

const guestStackRotations: Record<string, string> = {
  'guest-1': 'rotate-[-7deg]',
  'guest-2': 'rotate-[4deg]',
  'guest-3': 'rotate-[-2deg]',
  'guest-4': 'rotate-[3deg]',
  'guest-5': 'rotate-[-7deg]',
  'guest-6': 'rotate-[5deg]',
  'guest-7': 'rotate-[-4deg]',
  'guest-8': 'rotate-[3deg]',
  'guest-9': 'rotate-[1deg]',
  'guest-10': 'rotate-[-5deg]',
  'guest-11': 'rotate-[4deg]',
  'guest-12': 'rotate-[-2deg]',
  'guest-13': 'rotate-[5deg]',
  'guest-cake': 'rotate-[-2deg]',
  'guest-cake-2': 'rotate-[6deg]',
};

function playGiftSound() {
  const AudioContextClass =
    window.AudioContext || (window as Window & { webkitAudioContext?: typeof window.AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;
  const ctx = new AudioContextClass();

  const playNote = (frequency: number, startTime: number, duration: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = frequency;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(startTime);
    gain.gain.setValueAtTime(0.18, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    osc.stop(startTime + duration);
  };

  const notes = [523.25, 659.25, 783.99, 1046.5];
  let time = ctx.currentTime;
  notes.forEach((frequency, index) => {
    playNote(frequency, time + index * 0.11, 0.46);
  });
}

function safePlay(video: HTMLVideoElement | null) {
  if (!video) return;
  video.playsInline = true;
  video.defaultMuted = video.muted;
  void video.play().catch(() => {});
}

type FloatingStickerProps = {
  item: StickerItem;
  drag?: boolean;
  dragConstraints?: React.RefObject<HTMLDivElement>;
  style?: React.CSSProperties;
  showCaption?: boolean;
};

const FloatingSticker: React.FC<FloatingStickerProps> = ({
  item,
  drag = false,
  dragConstraints,
  style,
  showCaption = true,
}) => {
  const [frameIndex, setFrameIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (!hovered || item.frames.length < 2 || !item.hoverCycle) return;
    const interval = window.setInterval(() => {
      setFrameIndex((current) => (current + 1) % item.frames.length);
    }, 320);

    return () => window.clearInterval(interval);
  }, [hovered, item.frames.length, item.hoverCycle]);

  return (
    <motion.div
      className={`${item.className} ${drag ? 'touch-none select-none cursor-grab active:cursor-grabbing' : ''}`}
      style={{
        ...style,
        zIndex:
          hovered || dragging
            ? Number(style?.zIndex ?? 1) + 40
            : style?.zIndex,
      }}
      drag={drag}
      dragConstraints={dragConstraints}
      dragElastic={0.1}
      dragMomentum={false}
      dragSnapToOrigin={false}
      initial={false}
      animate={drag ? undefined : { y: [0, -8, 0] }}
      transition={drag ? { duration: 0.2 } : { duration: 5.3, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={drag ? { scale: 1.02 } : { scale: 1.03, y: -4 }}
      whileDrag={{ scale: 1.04 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
    >
      <div className="relative">
        <div
          className="absolute -inset-5 rounded-full blur-2xl opacity-75"
          style={{
            background: `radial-gradient(circle, ${item.glow} 0%, rgba(255,255,255,0) 72%)`,
          }}
        />
        <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-full border border-white/65 bg-[linear-gradient(135deg,rgba(255,218,235,0.45),rgba(235,246,255,0.5),rgba(249,239,255,0.42))] p-2 shadow-[0_18px_30px_rgba(0,0,0,0.14)] md:p-3">
          <img
            src={item.frames[frameIndex]}
            alt={item.caption}
            draggable={false}
            className={`pointer-events-none relative z-10 block h-full w-full origin-center object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.12)] ${
              item.id.includes('cake') ? 'scale-[1.05] md:scale-[1.08]' : 'scale-[1.18] md:scale-[1.24]'
            }`}
          />
        </div>
        <div
          className={`pointer-events-none relative mt-3 max-w-[17rem] transition-all duration-200 ${
            showCaption ? 'opacity-100' : 'opacity-0'
          } ${showCaption && drag && !hovered && !dragging ? 'translate-y-1 opacity-70' : 'translate-y-0'}`}
        >
          <div className="relative rounded-[1.6rem] border border-white/70 bg-[linear-gradient(135deg,rgba(255,233,241,0.82),rgba(240,244,255,0.8))] px-4 py-3 text-center shadow-[0_14px_34px_rgba(91,72,201,0.14)] backdrop-blur-sm">
            <div className="absolute left-6 -top-2 h-4 w-4 rotate-45 border-l border-t border-white/75 bg-[linear-gradient(135deg,rgba(255,233,241,0.84),rgba(233,244,255,0.82))]" />
            <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.24em] leading-snug text-[#1E1A33]">
              {item.caption}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatTile({ stat }: { stat: StatCard }) {
  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      whileHover={{ y: -4 }}
      className="rounded-[1.8rem] border border-white/80 bg-white/75 p-5 shadow-[0_18px_50px_rgba(91,72,201,0.12)] backdrop-blur-md"
    >
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1E1A33] text-white shadow-lg">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex items-end gap-2">
        <span className="font-display text-5xl leading-none text-[#19182C]">{stat.value}</span>
        <span className="pb-1 font-mono text-[10px] uppercase tracking-[0.28em] text-[#6E6798]">
          {stat.label}
        </span>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-[#4A436C]">{stat.detail}</p>
    </motion.div>
  );
}

function QuizTile({ card }: { card: QuizCard }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={() => setFlipped((current) => !current)}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      whileHover={{ y: -5 }}
      className="block h-[18rem] w-full text-left [perspective:1400px] focus:outline-none md:h-[19rem]"
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-full w-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className={`absolute inset-0 rounded-[1.8rem] border border-white/85 bg-gradient-to-br ${card.tone} p-5 shadow-[0_20px_60px_rgba(91,72,201,0.12)]`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-white/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-[#1F1A35]">
              {card.round}
            </span>
            <Quote className="h-5 w-5 text-[#5D4ED4]" />
          </div>
          <h3 className="mt-5 text-lg font-semibold leading-snug text-[#161426]">{card.question}</h3>
          <div className="absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/82 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[#655e88] shadow-sm">
            <RotateCw className="h-3.5 w-3.5" />
            ответ
          </div>
        </div>

        <div
          className={`absolute inset-0 rounded-[1.8rem] border border-white/85 bg-gradient-to-br ${card.tone} p-5 shadow-[0_20px_60px_rgba(91,72,201,0.12)]`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-white/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-[#1F1A35]">
              answer
            </span>
            <Sparkles className="h-5 w-5 text-[#FF4D8D]" />
          </div>
          <p className="mt-8 text-2xl font-semibold leading-snug text-[#161426]">{card.answer}</p>
          <div className="absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/82 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[#655e88] shadow-sm">
            <RotateCw className="h-3.5 w-3.5" />
            вопрос
          </div>
        </div>
      </motion.div>
    </motion.button>
  );
}

export default function App() {
  const [phase, setPhase] = useState<'loading' | 'content' | 'gift'>('loading');
  const [progress, setProgress] = useState(0);
  const stackRef = useRef<HTMLDivElement>(null);
  const contentScrollRef = useRef<HTMLDivElement>(null);
  const danceSectionRef = useRef<HTMLElement>(null);
  const morningVideoRef = useRef<HTMLVideoElement>(null);
  const danceVideoRef = useRef<HTMLVideoElement>(null);
  const extraCircleVideoRef = useRef<HTMLVideoElement>(null);
  const bridgeVideoRef = useRef<HTMLVideoElement>(null);
  const [stackPointer, setStackPointer] = useState({ x: 50, y: 50 });
  const [quizPointer, setQuizPointer] = useState({ x: 50, y: 50 });
  const [galleryPointer, setGalleryPointer] = useState({ x: 50, y: 50 });
  const [bridgePointer, setBridgePointer] = useState({ x: 50, y: 50 });
  const [savedScrollTop, setSavedScrollTop] = useState(0);
  const [dancePlaying, setDancePlaying] = useState(false);
  const [danceHovered, setDanceHovered] = useState(false);
  const [danceMuted, setDanceMuted] = useState(true);
  const [danceInView, setDanceInView] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);
  const [bridgeMuted, setBridgeMuted] = useState(true);

  useEffect(() => {
    if (phase !== 'loading') return;
    const totalMs = 3000;
    const startTime = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const next = Math.min(100, Math.round((elapsed / totalMs) * 100));
      setProgress(next);
      if (elapsed >= totalMs) {
        setPhase('content');
        return;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [phase]);

  const handleGiftClick = () => {
    setSavedScrollTop(contentScrollRef.current?.scrollTop ?? 0);
    playGiftSound();
    confetti({
      particleCount: 260,
      spread: 120,
      origin: { y: 0.64 },
      colors: ['#FF4D8D', '#F4E96A', '#8AE7FF', '#B8A2FF', '#FFFFFF', '#FF8C4A'],
    });
    setPhase('gift');
  };

  const handleGiftClose = () => {
    setPhase('content');
  };

  const handleGalleryOpen = (index: number) => setActiveGalleryIndex(index);
  const handleGalleryClose = () => setActiveGalleryIndex(null);
  const handleGalleryNext = () => {
    if (activeGalleryIndex === null) return;
    setActiveGalleryIndex((activeGalleryIndex + 1) % galleryImages.length);
  };
  const handleGalleryPrev = () => {
    if (activeGalleryIndex === null) return;
    setActiveGalleryIndex((activeGalleryIndex - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleDanceToggle = async () => {
    const video = danceVideoRef.current;
    if (!video) return;

    if (dancePlaying) {
      video.pause();
      setDancePlaying(false);
      return;
    }

    video.muted = danceMuted;
    video.defaultMuted = danceMuted;
    video.playsInline = true;
    if (video.currentTime >= 40) {
      video.currentTime = 0;
    }

    try {
      await video.play();
      setDancePlaying(true);
    } catch {
      setDancePlaying(false);
    }
  };

  const handleDanceSoundToggle = async () => {
    const video = danceVideoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    video.defaultMuted = nextMuted;
    video.volume = 1;
    video.playsInline = true;
    setDanceMuted(nextMuted);

    try {
      await video.play();
      setDancePlaying(true);
    } catch {
      setDancePlaying(!video.paused);
    }
  };

  const muteDanceVideo = (pause = false) => {
    const video = danceVideoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    setDanceMuted(true);
    if (pause && !video.paused) {
      video.pause();
      setDancePlaying(false);
    }
  };

  const tryEnableDanceAudio = async () => {
    const video = danceVideoRef.current;
    if (!video) return false;

    video.muted = false;
    video.defaultMuted = false;
    video.volume = 1;
    video.playsInline = true;
    setDanceMuted(false);

    try {
      await video.play();
      setDancePlaying(true);
      return true;
    } catch {
      muteDanceVideo(false);
      void safePlay(video);
      return false;
    }
  };

  const handleBridgeSoundToggle = () => {
    const video = bridgeVideoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    video.defaultMuted = nextMuted;
    video.playsInline = true;
    setBridgeMuted(nextMuted);
    if (video.paused) {
      safePlay(video);
    }
  };

  const handleBridgeVideoToggle = async () => {
    const video = bridgeVideoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        video.playsInline = true;
        await video.play();
      } catch {
        // ignore autoplay/playback failures
      }
      return;
    }

    video.pause();
  };

  useEffect(() => {
    if (phase !== 'content') return;
    const restoreScroll = () => {
      if (!contentScrollRef.current) return;
      contentScrollRef.current.scrollTop = savedScrollTop;
    };

    restoreScroll();
    const frameId = window.requestAnimationFrame(() => {
      restoreScroll();
      window.requestAnimationFrame(restoreScroll);
    });
    const timeoutId = window.setTimeout(restoreScroll, 140);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
    };
  }, [phase, savedScrollTop]);

  useEffect(() => {
    if (activeGalleryIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setActiveGalleryIndex((current) => (current === null ? 0 : (current + 1) % galleryImages.length));
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setActiveGalleryIndex((current) =>
          current === null ? galleryImages.length - 1 : (current - 1 + galleryImages.length) % galleryImages.length,
        );
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        setActiveGalleryIndex(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeGalleryIndex]);

  useEffect(() => {
    if (phase !== 'content' || !danceSectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setDanceInView(entry.isIntersecting && entry.intersectionRatio > 0.55);
      },
      { threshold: [0.25, 0.55, 0.8] },
    );

    observer.observe(danceSectionRef.current);
    return () => observer.disconnect();
  }, [phase]);

  useEffect(() => {
    if (phase !== 'content') return;

    const unlockAudio = () => {
      setAudioUnlocked(true);
      if (danceInView) {
        void tryEnableDanceAudio();
      }
    };

    window.addEventListener('pointerdown', unlockAudio, { passive: true });
    window.addEventListener('touchstart', unlockAudio, { passive: true });
    window.addEventListener('keydown', unlockAudio);

    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, [phase, danceInView]);

  useEffect(() => {
    if (phase !== 'content') return;

    const autoplayCandidates = [
      morningVideoRef.current,
      extraCircleVideoRef.current,
      bridgeVideoRef.current,
    ].filter(Boolean) as HTMLVideoElement[];

    autoplayCandidates.forEach((video) => {
      video.defaultMuted = video.muted;
      const tryPlay = () => {
        void video.play().catch(() => {});
      };

      tryPlay();
      video.addEventListener('loadeddata', tryPlay, { once: true });
      video.addEventListener('canplay', tryPlay, { once: true });
    });
  }, [phase]);

  useEffect(() => {
    if (phase !== 'content') return;

    const video = danceVideoRef.current;
    if (!video) return;

    if (danceInView) {
      video.playsInline = true;
      if (video.currentTime >= 40) {
        video.currentTime = 0;
      }

      if (audioUnlocked) {
        void tryEnableDanceAudio();
        return;
      }

      muteDanceVideo(false);
      void safePlay(video);
      return;
    }

    muteDanceVideo(true);
  }, [phase, danceInView, audioUnlocked]);

  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#FFF9F2_0%,#FFE6F1_28%,#EAF7FF_58%,#FFFDF9_100%)] text-[#19182C] selection:bg-[#FF4D8D] selection:text-white">
      <AnimatePresence mode="wait">
        {phase === 'loading' && (
          <motion.div
            key="loading"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-white"
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                className="mb-8 h-32 w-32 md:h-44 md:w-44"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <img
                  src={IMAGE_FACE}
                  alt="Natasha loading"
                  className="h-full w-full object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.18)]"
                />
              </motion.div>
              <motion.h1 className="font-sans text-5xl font-medium tracking-tight text-[#222] md:text-7xl">
                Loading...
              </motion.h1>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.35em] text-gray-500 md:text-sm">
                {progress}%
              </p>
            </div>
          </motion.div>
        )}

        {phase !== 'loading' && (
          <motion.div
            key="content"
            ref={contentScrollRef}
            className="relative h-screen w-full overflow-y-auto overflow-x-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="pointer-events-none fixed inset-0 z-0 noise-bg opacity-30" />
            <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.32)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.28)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30" />

              <div className="fixed left-0 top-0 z-50 w-full p-3 sm:p-5">
                <div className="mx-auto flex max-w-6xl items-center rounded-full border border-white/80 bg-white/70 px-4 py-3 shadow-[0_16px_40px_rgba(91,72,201,0.14)] backdrop-blur-xl">
                  <div className="font-display text-sm uppercase tracking-[0.22em] text-[#1B1830] md:text-lg">
                    NATASHA <span className="font-sans text-[10px] font-semibold tracking-[0.34em] text-[#6B6199] md:text-sm">/ BIRTHDAY MEMO</span>
                  </div>
                </div>
              </div>

            <section className="relative min-h-screen overflow-visible">
              <div className="pointer-events-none absolute left-6 top-24 z-30 hidden translate-y-24 md:block">
                <FloatingSticker
                  item={{
                    ...guestStickers[0],
                    caption: 'вечер уже тут где-то начался',
                    className: 'relative w-40 rotate-[-7deg]',
                  }}
                />
              </div>
              <div className="pointer-events-none absolute right-8 top-28 z-30 hidden translate-y-24 md:block">
                <FloatingSticker
                  item={{
                    ...guestStickers[4],
                    caption: 'режим: не танцую. двенадцать секунд.',
                    className: 'relative w-40 rotate-[6deg]',
                  }}
                />
              </div>
              <div className="pointer-events-none absolute bottom-16 left-10 z-40 hidden translate-y-28 md:block">
                <FloatingSticker
                  item={{
                    ...guestStickers[7],
                    caption: 'главный по вайб-чеку',
                    className: 'relative w-32 rotate-[-4deg]',
                  }}
                />
              </div>
              <div className="pointer-events-none absolute bottom-20 right-10 z-40 hidden translate-y-28 md:block">
                <FloatingSticker
                  item={{
                    ...guestStickers[8],
                    caption: 'спокойный кадр перед новой волной смеха',
                    className: 'relative w-52 rotate-[4deg]',
                  }}
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 pb-24 pt-28 text-center"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/75 px-4 py-2 shadow-[0_14px_34px_rgba(91,72,201,0.14)] backdrop-blur-md">
                  <Sparkles className="h-4 w-4 text-[#FF4D8D]" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#5C5582] md:text-xs">
                    12 гостей / 10 вопросов / 1 подарок спустя месяц
                  </span>
                </div>

                <h1 className="mt-8 max-w-5xl font-display text-[16vw] leading-[0.78] tracking-tighter text-[#17172A] md:text-[10vw]">
                  НАТАША
                </h1>

                <div className="mt-4 flex flex-col items-center gap-4 md:flex-row md:gap-6">
                  <span className="font-display text-[10vw] uppercase tracking-tight text-[#17172A] md:text-[7vw]">
                    birthday memo
                  </span>
                  <span className="rotate-[-5deg] rounded-full bg-[#FF4D8D] px-4 py-2 text-2xl font-bold uppercase text-white shadow-[0_16px_30px_rgba(255,77,141,0.25)] md:text-4xl">
                    (part I)
                  </span>
                </div>

                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#4F486F] md:text-2xl">
                  Тут мы собрали твой вечер так, как он и ощущался: с людьми, музыкой, шутками, вопросами и очень узнаваемым ощущением тебя.
                </p>

                <div className="mt-12 grid w-full gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-stretch">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="rounded-[2rem] border border-white/80 bg-white/75 p-4 shadow-[0_28px_80px_rgba(91,72,201,0.16)] backdrop-blur-md md:p-6"
                  >
                    <div className="relative overflow-hidden rounded-[1.5rem] border border-white/70 bg-white">
                      <img
                        src={IMAGE_HERO}
                        alt="Natasha portrait"
                        className="h-[22rem] w-full object-cover object-top md:h-[34rem]"
                      />
                      <div className="absolute left-4 top-4 rounded-full border border-white/80 bg-white/80 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#1F1A35] backdrop-blur-sm">
                        for you
                      </div>
                      <div className="absolute bottom-4 left-4 rounded-full bg-[#19182C] px-3 py-2 font-display text-lg uppercase tracking-[0.18em] text-white shadow-lg">
                        memo mode
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#6D6690] md:text-xs">
                        birthday girl
                      </span>
                    </div>
                  </motion.div>

                  <div
                    onPointerMove={(event) => {
                      const rect = event.currentTarget.getBoundingClientRect();
                      setQuizPointer({
                        x: ((event.clientX - rect.left) / rect.width) * 100,
                        y: ((event.clientY - rect.top) / rect.height) * 100,
                      });
                    }}
                    onPointerLeave={() => setQuizPointer({ x: 50, y: 50 })}
                    className="relative overflow-hidden rounded-[2rem] border border-white/85 bg-white/72 p-6 text-left shadow-[0_24px_60px_rgba(91,72,201,0.14)] backdrop-blur-md"
                  >
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background: `radial-gradient(circle at ${quizPointer.x}% ${quizPointer.y}%, rgba(255,92,170,0.18) 0%, rgba(118,124,255,0.14) 22%, rgba(255,255,255,0) 58%)`,
                      }}
                    />
                    <div className="pointer-events-none absolute -right-8 top-10 h-24 w-24 rounded-[1.6rem] bg-[#9CCBFF]/35 blur-sm" />
                    <div className="pointer-events-none absolute bottom-8 left-8 h-14 w-14 rounded-full bg-[#FF79B8]/30 blur-sm" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3">
                        <Camera className="h-6 w-6 text-[#FF4D8D]" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#6B6199] md:text-xs">
                          lore drop
                        </span>
                      </div>
                      <h3 className="mt-4 max-w-xl font-display text-4xl uppercase leading-[0.94] tracking-tight text-[#17172A] md:text-5xl">
                        тебя всё равно ни с кем не перепутаешь
                      </h3>
                      <div className="mt-6 space-y-4 text-[#463F67]">
                        <p>за столько прекрасных лет получился человек, который в детстве ставил концерты для родственников, а теперь просто держит реальность в чуть более красивой композиции.</p>
                        <p>если вокруг беспорядок, ты не драматизируешь, ты просто возвращаешь миру структуру. очень тихая, очень опасная суперсила.</p>
                        <p>ты приходишь заранее, злишься через уборку и умеешь превращать напряжение в движение. в этом есть очень узнаваемая твоя точность и свобода одновременно.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            <section className="relative overflow-hidden py-20 md:py-24">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#FFF8F0_0%,#FFEAF5_34%,#EAF7FF_72%,#FFFFFF_100%)]" />
              <div className="absolute inset-0 noise-bg opacity-15" />

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-120px' }}
                className="relative z-10 mx-auto max-w-6xl px-4"
              >
                <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-4 md:min-h-[38rem]">
                  <div className="relative z-10 w-full max-w-xl rotate-[-3deg] rounded-[2rem] border border-white/85 bg-white/78 p-4 shadow-[0_24px_60px_rgba(91,72,201,0.14)] backdrop-blur-md md:absolute md:left-[7%] md:top-8 md:max-w-[28rem] md:p-5">
                    <img
                      src={IMAGE_MORNING_POSTER}
                      alt="Утро перед праздником"
                      className="h-[22rem] w-full rounded-[1.5rem] object-cover md:h-[30rem]"
                    />
                  </div>

                  <div className="relative z-20 w-full max-w-sm rotate-[3deg] overflow-hidden rounded-[2rem] border border-white/85 bg-white/78 p-4 shadow-[0_24px_60px_rgba(91,72,201,0.14)] backdrop-blur-md md:absolute md:right-[9%] md:top-20 md:max-w-[18rem]">
                    <video
                      ref={morningVideoRef}
                      src={VIDEO_MORNING}
                      poster={IMAGE_MORNING_POSTER}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="h-[17rem] w-full rounded-[1.5rem] object-cover md:h-[20rem]"
                    />
                  </div>

                  <div className="relative z-30 w-full max-w-md rotate-[-4deg] rounded-[1.7rem] border border-white/80 bg-[linear-gradient(135deg,rgba(255,236,242,0.9),rgba(240,245,255,0.86))] px-5 py-4 shadow-[0_14px_34px_rgba(91,72,201,0.12)] md:absolute md:left-[12%] md:bottom-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#6B6199]">до первого гостя</p>
                    <p className="mt-3 text-base leading-relaxed text-[#433C64]">
                      утро именинницы в халатике. вид человека, который ещё не в курсе, сколько танцев сегодня придётся выдержать.
                    </p>
                  </div>
                </div>
              </motion.div>
            </section>

            <section ref={danceSectionRef} className="relative overflow-hidden py-10 md:py-16">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,236,246,0.84)_0%,rgba(235,245,255,0.86)_46%,rgba(255,255,255,0)_100%)]" />

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-120px' }}
                className="relative z-10 mx-auto flex max-w-6xl justify-center px-4"
              >
                <div className="relative flex flex-col items-center">
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/72 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#5C5582] shadow-[0_14px_34px_rgba(91,72,201,0.12)] backdrop-blur-md">
                    <Music className="h-4 w-4 text-[#8A6BFF]" />
                    А потом начались... THE ТАНЦЫ!
                  </div>
                  <button
                    type="button"
                    onClick={handleDanceToggle}
                    onMouseEnter={() => setDanceHovered(true)}
                    onMouseLeave={() => setDanceHovered(false)}
                    className="group relative h-72 w-72 overflow-hidden rounded-full border border-white/85 shadow-[0_28px_80px_rgba(91,72,201,0.18)] focus:outline-none md:h-[22rem] md:w-[22rem]"
                  >
                    <video
                      ref={danceVideoRef}
                      src={VIDEO_DANCE}
                      poster={IMAGE_DANCE_POSTER}
                      muted={danceMuted}
                      playsInline
                      preload="auto"
                      className="h-full w-full object-cover"
                      onPause={() => setDancePlaying(false)}
                      onLoadedData={() => safePlay(danceVideoRef.current)}
                      onCanPlay={() => safePlay(danceVideoRef.current)}
                      onPlay={() => setDancePlaying(true)}
                      onEnded={() => {
                        const video = danceVideoRef.current;
                        if (!video) return;
                        video.currentTime = 0;
                        setDancePlaying(false);
                      }}
                      onTimeUpdate={() => {
                        const video = danceVideoRef.current;
                        if (!video) return;
                        if (video.currentTime >= 40) {
                          video.pause();
                          video.currentTime = 0;
                          setDancePlaying(false);
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,14,45,0.04),rgba(20,14,45,0.32))]" />
                    {danceHovered && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/80 bg-white/86 shadow-[0_16px_40px_rgba(91,72,201,0.18)] transition-transform duration-200 group-hover:scale-105">
                          {dancePlaying ? (
                            <Pause className="h-8 w-8 text-[#1F1A35]" />
                          ) : (
                            <Play className="ml-1 h-8 w-8 text-[#1F1A35]" />
                          )}
                        </div>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        void handleDanceSoundToggle();
                      }}
                      className="absolute bottom-4 right-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/88 text-[#1F1A35] shadow-[0_12px_24px_rgba(91,72,201,0.16)] backdrop-blur-md transition-transform duration-200 hover:scale-105"
                      aria-label={danceMuted ? 'Включить звук' : 'Выключить звук'}
                    >
                      {danceMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </button>
                  </button>
                  <div className="mt-5 max-w-xl rounded-[1.8rem] border border-white/80 bg-white/76 px-5 py-4 text-center shadow-[0_18px_40px_rgba(91,72,201,0.12)] backdrop-blur-md">
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#6B6199]">play 40 seconds</p>
                    <p className="mt-2 text-base leading-relaxed text-[#433C64]">
                      Тут уже стало ясно: никто не собирался танцевать так много, но у музыки на этот счёт был свой план.
                    </p>
                  </div>
                </div>
              </motion.div>
            </section>

            <section className="relative overflow-hidden py-20 md:py-28">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#FFFDF8_0%,#FFF0E4_28%,#EAF7FF_72%,#FFFFFF_100%)]" />
              <div className="absolute inset-0 noise-bg opacity-20" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-120px' }}
                className="relative z-10 mx-auto max-w-6xl px-4"
              >
                <div className="pointer-events-none absolute right-4 top-36 hidden h-36 w-36 overflow-hidden rounded-full border border-white/85 shadow-[0_18px_60px_rgba(91,72,201,0.18)] md:block lg:right-8 lg:top-24 lg:h-44 lg:w-44">
                  <video
                    ref={extraCircleVideoRef}
                    src={VIDEO_EXTRA_CIRCLE}
                    poster={IMAGE_EXTRA_CIRCLE_POSTER}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="mx-auto max-w-3xl text-center">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#5C5582] shadow-[0_16px_34px_rgba(91,72,201,0.12)] backdrop-blur-md md:text-xs">
                    <Activity className="h-4 w-4 text-[#FF4D8D]" />
                    квиз и ритм вечера
                  </span>
                  <h2 className="mt-6 font-display text-5xl uppercase tracking-tight text-[#17172A] md:text-7xl">
                    КВИЗ И ВАЙБ
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-[#4F486F] md:text-2xl">
                    Вопросы были просто поводом ещё раз увидеть, как по-разному, смешно и точно люди знают тебя.
                  </p>
                </div>

                <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3">
                  {recapStats.map((stat) => (
                    <div key={stat.label}>
                      <StatTile stat={stat} />
                    </div>
                  ))}
                </div>

                <div
                  onPointerMove={(event) => {
                    const rect = event.currentTarget.getBoundingClientRect();
                    setQuizPointer({
                      x: ((event.clientX - rect.left) / rect.width) * 100,
                      y: ((event.clientY - rect.top) / rect.height) * 100,
                    });
                  }}
                  onPointerLeave={() => setQuizPointer({ x: 50, y: 50 })}
                  className="relative mt-10 overflow-hidden rounded-[2.4rem] border border-white/80 bg-[linear-gradient(135deg,#FFF3DF_0%,#F5E6FF_42%,#DDF7FF_100%)] p-6 shadow-[0_20px_60px_rgba(91,72,201,0.12)] md:p-10"
                >
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at ${quizPointer.x}% ${quizPointer.y}%, rgba(255,92,170,0.2) 0%, rgba(117,124,255,0.16) 18%, rgba(255,255,255,0) 52%)`,
                    }}
                  />
                  <div className="pointer-events-none absolute -left-6 top-10 h-20 w-20 rounded-[1.4rem] bg-[#9CCBFF]/35 blur-[2px]" />
                  <div className="pointer-events-none absolute bottom-10 right-10 h-16 w-16 rounded-full bg-[#FF79B8]/30 blur-[2px]" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3">
                      <Quote className="h-6 w-6 text-[#5D4ED4]" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#6B6199] md:text-xs">
                        ответы без паузы
                      </span>
                    </div>
                    <h3 className="mt-5 max-w-3xl font-display text-4xl uppercase leading-[0.94] tracking-tight text-[#17172A] md:text-6xl">
                      что про тебя вспоминали без паузы
                    </h3>
                    <div className="mt-8 grid gap-4 md:grid-cols-3">
                      <div className="rounded-[1.6rem] border border-white/70 bg-white/58 p-4 backdrop-blur-sm">
                        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#6B6199]">корея</p>
                        <p className="mt-3 text-sm leading-relaxed text-[#433C64]">Где ты заработала на школьную мечту — это угадывали быстрее всего.</p>
                      </div>
                      <div className="rounded-[1.6rem] border border-white/70 bg-white/58 p-4 backdrop-blur-sm">
                        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#6B6199]">порядок</p>
                        <p className="mt-3 text-sm leading-relaxed text-[#433C64]">Если в комнате беспорядок, ты не уходишь — ты превращаешь хаос в систему.</p>
                      </div>
                      <div className="rounded-[1.6rem] border border-white/70 bg-white/58 p-4 backdrop-blur-sm">
                        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#6B6199]">реакция</p>
                        <p className="mt-3 text-sm leading-relaxed text-[#433C64]">Когда ты злишься — ты убираешься. Вот и вся магия.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            <section className="relative overflow-hidden py-20 md:py-28">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#FFF0F6_0%,#F2E9FF_30%,#E8F7FF_72%,#FFFFFF_100%)]" />
              <div className="absolute inset-0 noise-bg opacity-20" />

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-120px' }}
                className="relative z-10 mx-auto max-w-6xl px-4"
              >
                <div className="max-w-3xl">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#5C5582] shadow-[0_16px_34px_rgba(91,72,201,0.12)] backdrop-blur-md md:text-xs">
                    <Users className="h-4 w-4 text-[#8A6BFF]" />
                    расставь гостей на танцполе
                  </span>
                  <h2 className="mt-6 font-display text-5xl uppercase tracking-tight text-[#17172A] md:text-7xl">
                    ЛИЦА ПРАЗДНИКА
                  </h2>
                  <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.28em] text-[#5C5582] md:text-xs">
                    потяни стикеры и расставь гостей на танцполе
                  </p>
                </div>

                <div
                  ref={stackRef}
                  onPointerMove={(event) => {
                    const rect = event.currentTarget.getBoundingClientRect();
                    if (!rect.width || !rect.height) return;
                    setStackPointer({
                      x: ((event.clientX - rect.left) / rect.width) * 100,
                      y: ((event.clientY - rect.top) / rect.height) * 100,
                    });
                  }}
                  onPointerLeave={() => setStackPointer({ x: 50, y: 50 })}
                  className="relative mt-12 min-h-[1200px] overflow-hidden rounded-[3rem] border border-white/70 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.58),rgba(255,255,255,0.22)_44%,rgba(255,255,255,0.08)_100%)] p-4 shadow-[0_24px_80px_rgba(91,72,201,0.08)] md:min-h-[1380px] md:p-8"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-40 bg-[linear-gradient(rgba(255,255,255,0.28)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] bg-[size:48px_48px]" />
                  <div
                    className="pointer-events-none absolute inset-0 rounded-[3rem] transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at ${stackPointer.x}% ${stackPointer.y}%, rgba(255,77,141,0.22) 0%, rgba(120,123,255,0.16) 24%, rgba(255,255,255,0) 60%)`,
                    }}
                  />
                  {guestPilePlacements.map((placement) => {
                    const item = guestStickers[placement.index];

                    return (
                      <FloatingSticker
                        key={item.id}
                        item={{
                          ...item,
                          className: `absolute ${guestStackWidths[item.id]} ${guestStackRotations[item.id]}`,
                        }}
                        drag
                        dragConstraints={stackRef}
                        style={{ left: placement.left, top: placement.top, zIndex: placement.zIndex }}
                      />
                    );
                  })}
                </div>
              </motion.div>
            </section>

            <section className="relative overflow-hidden py-20 md:py-28">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#FFF9E5_0%,#FFE9F4_34%,#E8F8FF_70%,#FFFFFF_100%)]" />
              <div className="absolute inset-0 noise-bg opacity-18" />

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-120px' }}
                className="relative z-10 mx-auto max-w-6xl px-4"
              >
                <div className="mx-auto max-w-3xl text-center">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#5C5582] shadow-[0_16px_34px_rgba(91,72,201,0.12)] backdrop-blur-md md:text-xs">
                    <Activity className="h-4 w-4 text-[#FF4D8D]" />
                    квиз как повод вспомнить
                  </span>
                  <h2 className="mt-6 font-display text-5xl uppercase tracking-tight text-[#17172A] md:text-7xl">
                    ЧТО МЫ ПРО ТЕБЯ УЗНАЛИ
                  </h2>
                </div>

                <div className="mt-12 grid gap-4 md:grid-cols-3">
                  {quizCards.map((card) => (
                    <div key={card.round}>
                      <QuizTile card={card} />
                    </div>
                  ))}
                </div>

              </motion.div>
            </section>

            <section className="relative overflow-hidden py-20 md:py-28">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,#FFF3E8_0%,#F3E8FF_34%,#E5F6FF_70%,#FFFFFF_100%)]" />
              <div className="absolute inset-0 noise-bg opacity-15" />

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-120px' }}
                className="relative z-10 mx-auto max-w-6xl px-4"
              >
                <div className="mx-auto max-w-3xl text-center">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#5C5582] shadow-[0_16px_34px_rgba(91,72,201,0.12)] backdrop-blur-md md:text-xs">
                    <Camera className="h-4 w-4 text-[#FF4D8D]" />
                    фотоплёнка вечера
                  </span>
                  <h2 className="mt-6 font-display text-5xl uppercase tracking-tight text-[#17172A] md:text-7xl">
                    ГАЛЕРЕЯ
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-[#4F486F] md:text-2xl">
                    Свет, люди, движение, паузы и вся красота, которая после вечера никуда не делась.
                  </p>
                </div>

                <div className="mt-10 columns-1 gap-3 sm:mt-12 sm:columns-2 sm:gap-4 md:columns-3 lg:columns-4">
                  {galleryImages.map((imageSrc, index) => (
                    <motion.button
                      type="button"
                      onClick={() => handleGalleryOpen(index)}
                      key={imageSrc}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ delay: (index % 8) * 0.03 }}
                      whileHover={{ y: -4, rotate: index % 2 === 0 ? -1.2 : 1.2 }}
                      className="mb-3 break-inside-avoid overflow-hidden rounded-[1.55rem] border border-white/80 bg-white/70 p-1.5 text-left shadow-[0_18px_50px_rgba(91,72,201,0.12)] backdrop-blur-md sm:mb-4 sm:rounded-[1.8rem] sm:p-2"
                    >
                      <img
                        src={imageSrc}
                        alt={`Галерея ${index + 1}`}
                        loading="lazy"
                        className="h-auto w-full rounded-[1.15rem] object-cover sm:rounded-[1.2rem]"
                      />
                    </motion.button>
                  ))}
                </div>

                <div className="mt-10 flex justify-center">
                  <a
                    href="https://drive.google.com/drive/folders/176fbxubeOQODuNUCL4Dm7Z_S4aVEJEHo?usp=drive_link"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 rounded-full border border-white/80 bg-white/82 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[#3F3961] shadow-[0_14px_34px_rgba(91,72,201,0.14)] backdrop-blur-md transition-transform duration-200 hover:-translate-y-1"
                  >
                    <ArrowRight className="h-4 w-4" />
                    скачать все фотографии в облаке
                  </a>
                </div>
              </motion.div>
            </section>

            <section className="relative overflow-hidden py-20 md:py-28">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,#FFF3E0_0%,#F6E8FF_34%,#EAF8FF_72%,#FFFDF9_100%)]" />
              <div className="absolute inset-0 noise-bg opacity-18" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-120px' }}
                onPointerMove={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect();
                  setBridgePointer({
                    x: ((event.clientX - rect.left) / rect.width) * 100,
                    y: ((event.clientY - rect.top) / rect.height) * 100,
                  });
                }}
                onPointerLeave={() => setBridgePointer({ x: 50, y: 50 })}
                className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center"
              >
                <div
                  className="relative w-full overflow-hidden rounded-[2rem] border border-white/80 bg-white/76 p-5 shadow-[0_18px_60px_rgba(91,72,201,0.14)] backdrop-blur-md"
                >
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at ${bridgePointer.x}% ${bridgePointer.y}%, rgba(255,92,170,0.16) 0%, rgba(118,124,255,0.14) 18%, rgba(255,255,255,0) 55%)`,
                    }}
                  />
                  <div className="relative z-10">
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#6B6199]">bridge</p>
                    <h3 className="mt-3 font-display text-4xl uppercase leading-[0.9] tracking-tight text-[#17172A] md:text-5xl">
                      моя лучшая часть праздника —
                      <span className="block text-[#FF4D8D]">танец с тобой</span>
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-[#433C64] md:text-lg">
                      Спасибо тебе за такой подарок!
                      <br />
                      И у меня для тебя подарок тоже есть!
                    </p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="relative h-64 w-64 overflow-hidden rounded-[1.8rem] border border-white/80 bg-white/80 shadow-[0_18px_60px_rgba(91,72,201,0.16)]">
                    <video
                      ref={bridgeVideoRef}
                      src={VIDEO_DANCE_WITH_NATASHA}
                      poster={IMAGE_DANCE_WITH_NATASHA_POSTER}
                      autoPlay
                      muted={bridgeMuted}
                      loop
                      playsInline
                      preload="auto"
                      className="h-full w-full object-cover"
                      onLoadedData={() => {
                        safePlay(bridgeVideoRef.current);
                      }}
                      onCanPlay={() => safePlay(bridgeVideoRef.current)}
                    />
                    <button
                      type="button"
                      onClick={handleBridgeVideoToggle}
                      className="absolute inset-0 z-10"
                      aria-label="Переключить видео"
                    />
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleBridgeSoundToggle();
                      }}
                      className="absolute bottom-3 right-3 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/88 text-[#1F1A35] shadow-[0_12px_24px_rgba(91,72,201,0.16)] backdrop-blur-md transition-transform duration-200 hover:scale-105"
                      aria-label={bridgeMuted ? 'Включить звук' : 'Выключить звук'}
                    >
                      {bridgeMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            </section>

            <section className="relative overflow-hidden py-20 md:py-28">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,#FFF3E0_0%,#F6E8FF_34%,#EAF8FF_72%,#FFFDF9_100%)]" />
              <div className="absolute inset-0 noise-bg opacity-18" />

              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-120px' }}
                className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 text-center"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/75 px-4 py-2 shadow-[0_14px_34px_rgba(91,72,201,0.14)] backdrop-blur-md">
                  <Gift className="h-4 w-4 text-[#FF4D8D]" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#5C5582] md:text-xs">
                    подарок доехал позже
                  </span>
                </div>

                <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#4F486F] md:text-2xl">
                  Нажми на коробку.
                </p>

                <motion.button
                  onClick={handleGiftClick}
                  whileHover={{ scale: 1.04, y: -6 }}
                  whileTap={{ scale: 0.96 }}
                  aria-label="Открыть подарок"
                  className="group relative mt-12 flex flex-col items-center gap-4 focus:outline-none"
                >
                  <motion.div
                    className="relative h-56 w-60 md:h-64 md:w-72"
                    whileHover={{ rotate: [-1.5, 1.5, -1, 1, 0] }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                  >
                    <div className="absolute -inset-6 rounded-[2.3rem] bg-[radial-gradient(circle,rgba(255,77,141,0.38)_0%,rgba(120,123,255,0.22)_42%,rgba(255,255,255,0)_72%)] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute left-2 right-2 top-3 h-16 rounded-t-[1.6rem] rounded-b-[1rem] border-2 border-white/85 bg-gradient-to-r from-[#FF8DC0] via-[#C3B8FF] to-[#9DE6FF] shadow-[0_12px_24px_rgba(90,72,201,0.22)]" />
                    <div className="absolute left-4 right-4 top-14 bottom-3 rounded-[1.5rem] border-2 border-white/85 bg-gradient-to-b from-[#FFE0F0] via-[#ECE9FF] to-[#DFF5FF] shadow-[0_22px_42px_rgba(61,38,170,0.24)]" />
                    <div className="absolute left-1/2 top-3 bottom-3 w-8 -translate-x-1/2 rounded-full border border-white/85 bg-[#F4FE6A]/90 shadow-[0_0_28px_rgba(244,254,106,0.5)] md:w-10" />
                    <div className="absolute left-4 right-4 top-1/2 h-8 -translate-y-1/2 rounded-full border border-white/85 bg-[#F4FE6A]/90 shadow-[0_0_28px_rgba(244,254,106,0.46)] md:h-9" />
                    <Sparkles className="absolute -right-4 -top-3 h-8 w-8 text-[#FF4D8D] drop-shadow-[0_0_8px_rgba(255,77,141,0.45)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                    <Star className="absolute -bottom-3 -left-4 h-7 w-7 text-[#5D66F0] drop-shadow-[0_0_8px_rgba(93,102,240,0.45)] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12" />
                    <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rotate-[-16deg] rounded-full border border-white/85 bg-white/86 px-6 py-3 font-display text-xl uppercase tracking-[0.18em] text-[#17172A] shadow-[0_12px_34px_rgba(91,72,201,0.16)] backdrop-blur-md md:px-8 md:py-4 md:text-2xl">
                      ОТКРЫТЬ
                    </div>
                  </motion.div>
                </motion.button>
              </motion.div>
            </section>

            <AnimatePresence>
              {activeGalleryIndex !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(18,16,38,0.38)] p-4 backdrop-blur-xl"
                  onClick={handleGalleryClose}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 18, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.98 }}
                    transition={{ duration: 0.24 }}
                    onClick={(event) => event.stopPropagation()}
                    onPointerMove={(event) => {
                      const rect = event.currentTarget.getBoundingClientRect();
                      setGalleryPointer({
                        x: ((event.clientX - rect.left) / rect.width) * 100,
                        y: ((event.clientY - rect.top) / rect.height) * 100,
                      });
                    }}
                    onPointerLeave={() => setGalleryPointer({ x: 50, y: 50 })}
                    className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/70 bg-[linear-gradient(135deg,rgba(255,245,235,0.92),rgba(244,233,255,0.9),rgba(228,248,255,0.92))] p-4 shadow-[0_30px_100px_rgba(18,16,38,0.24)] md:p-6"
                  >
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background: `radial-gradient(circle at ${galleryPointer.x}% ${galleryPointer.y}%, rgba(255,92,170,0.18) 0%, rgba(118,124,255,0.16) 18%, rgba(255,255,255,0) 56%)`,
                      }}
                    />
                    <div className="relative z-10 flex items-center justify-between gap-3">
                      <div className="rounded-full border border-white/80 bg-white/78 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#5C5582] shadow-[0_14px_28px_rgba(91,72,201,0.1)]">
                        кадр {activeGalleryIndex + 1} / {galleryImages.length}
                      </div>
                      <button
                        type="button"
                        onClick={handleGalleryClose}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/82 text-[#1F1A35] shadow-[0_12px_24px_rgba(91,72,201,0.12)]"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="relative z-10 mt-4 grid gap-4 md:grid-cols-[64px_1fr_64px] md:items-center">
                      <button
                        type="button"
                        onClick={handleGalleryPrev}
                        className="hidden h-14 w-14 items-center justify-center rounded-full border border-white/80 bg-white/82 text-[#1F1A35] shadow-[0_12px_24px_rgba(91,72,201,0.12)] md:inline-flex"
                      >
                        <ArrowRight className="h-5 w-5 rotate-180" />
                      </button>

                      <div className="overflow-hidden rounded-[1.6rem] border border-white/80 bg-white/70 p-2 shadow-[0_18px_40px_rgba(91,72,201,0.12)]">
                        <img
                          src={galleryImages[activeGalleryIndex]}
                          alt={`Галерея ${activeGalleryIndex + 1}`}
                          className="max-h-[72vh] w-full rounded-[1.2rem] object-contain"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleGalleryNext}
                        className="hidden h-14 w-14 items-center justify-center rounded-full border border-white/80 bg-white/82 text-[#1F1A35] shadow-[0_12px_24px_rgba(91,72,201,0.12)] md:inline-flex"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="relative z-10 mt-4 flex items-center justify-center gap-3 md:hidden">
                      <button
                        type="button"
                        onClick={handleGalleryPrev}
                        className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/82 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#1F1A35] shadow-[0_12px_24px_rgba(91,72,201,0.12)]"
                      >
                        <ArrowRight className="h-4 w-4 rotate-180" />
                        назад
                      </button>
                      <button
                        type="button"
                        onClick={handleGalleryNext}
                        className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/82 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#1F1A35] shadow-[0_12px_24px_rgba(91,72,201,0.12)]"
                      >
                        дальше
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {phase === 'gift' && (
          <motion.div
            key="gift"
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_18%_15%,#FFE2F3_0%,#E7E5FF_34%,#D8F5FF_62%,#FFF3D9_100%)] p-4 text-[#19182C]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="pointer-events-none absolute inset-0 noise-bg opacity-15" />
            <motion.div
              className="absolute left-8 top-10 h-16 w-16 rounded-full bg-[#FF5AB7]/35 blur-[2px]"
              animate={{ y: [0, -14, 0], x: [0, 10, 0] }}
              transition={{ duration: 4.2, repeat: Infinity }}
            />
            <motion.div
              className="absolute right-10 top-24 h-10 w-10 rounded-[0.8rem] bg-[#5A7DFF]/35 rotate-12"
              animate={{ y: [0, 10, 0], rotate: [12, 0, 12] }}
              transition={{ duration: 3.8, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-20 left-1/4 h-12 w-12 rounded-full bg-[#33D3FF]/35"
              animate={{ y: [0, -12, 0], x: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-16 right-8 h-14 w-14 rounded-[1.2rem] bg-[#FFE95E]/50 rotate-[-16deg] md:right-24"
              animate={{ y: [0, 12, 0], rotate: [-16, -6, -16] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            <div className="relative z-10 w-full max-w-4xl pt-16">
              <div className="pointer-events-none absolute left-1/2 top-0 h-24 w-[82%] -translate-x-1/2 rounded-[2.2rem] border-2 border-white/90 bg-[linear-gradient(135deg,#FFD5EC_0%,#DCD8FF_45%,#D8F3FF_100%)] shadow-[0_24px_60px_rgba(95,74,201,0.22)]" />
              <div className="pointer-events-none absolute left-1/2 top-6 h-28 w-10 -translate-x-1/2 rounded-full border border-white/90 bg-[#F4FE6A]/90 shadow-[0_0_28px_rgba(244,254,106,0.45)]" />
              <div className="pointer-events-none absolute left-1/2 top-14 h-9 w-[86%] -translate-x-1/2 rounded-full border border-white/90 bg-[#F4FE6A]/85 shadow-[0_0_28px_rgba(244,254,106,0.3)]" />

              <div className="relative flex w-full flex-col items-center rounded-[2rem] border-2 border-white/90 bg-white/78 p-8 text-center shadow-[0_35px_80px_rgba(95,74,201,0.24)] backdrop-blur-xl md:p-16">
                <button
                  type="button"
                  onClick={handleGiftClose}
                  aria-label="Закрыть подарок"
                  className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/90 bg-white/90 text-[#2B2548] shadow-[0_10px_24px_rgba(95,74,201,0.16)] transition-transform duration-200 hover:scale-105"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-white bg-white/90 shadow-[0_10px_35px_rgba(255,90,183,0.25)]">
                <Gift className="h-11 w-11 text-[#FF4AB9]" />
                </div>

                <h2 className="font-display text-5xl uppercase leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FF5BBE] via-[#6B6DFF] to-[#0FB6FF] md:text-8xl">
                  СТВАРЭННЕ 2-х REELS
                </h2>

                <p className="mt-6 text-2xl italic text-[#3B325E] md:text-4xl">
                  reels для тваёй embodiment-практыкі
                </p>

                <div className="my-8 h-[2px] w-full bg-gradient-to-r from-transparent via-[#8A73FF] to-transparent" />

                <p className="text-sm uppercase tracking-[0.24em] text-[#4D3ED8] md:text-lg">
                  Сцэнар · здымка · мантаж
                </p>
                <p className="mt-4 max-w-2xl text-base text-[#2B2548] md:text-xl">
                  Гэта маленькі старт для тваёй дзейнасці: праз рух, прысутнасць, цела і той тып увагі, які ты ўмееш ствараць вакол сябе.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <span className="rounded-full bg-[#FF4D8D]/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[#B42863]">
                    reel 01
                  </span>
                  <span className="rounded-full bg-[#5A7DFF]/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[#3551C8]">
                    reel 02
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
