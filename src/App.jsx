import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'
import Lottie from 'lottie-react'

/* ─── Theme Toggle Icon ─── */
const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
)
const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)
const ChevronDown = ({ open }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
    style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
)
const ExternalLink = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)
const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)
const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)
const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)
const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

/* ─── Architecture Diagram components ─── */

/* Option B: Draggable Framework Primitives */
const DraggableArchNode = ({ x, y, delay = 0, children }) => {
  return (
    <motion.g
      drag
      dragMomentum={false}
      style={{ x, y, cursor: 'grab' }}
      whileTap={{ cursor: 'grabbing' }}
      whileDrag={{ scale: 1.05, filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.3))' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {children}
    </motion.g>
  )
}

const DynamicEdgeLabelPos = ({ fromX, fromY, toX, toY, children }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const update = () => {
      const fx = typeof fromX === 'object' && fromX.get ? fromX.get() : fromX
      const fy = typeof fromY === 'object' && fromY.get ? fromY.get() : fromY
      const tx = typeof toX === 'object' && toX.get ? toX.get() : toX
      const ty = typeof toY === 'object' && toY.get ? toY.get() : toY
      setPos({ x: (fx + tx) / 2, y: (fy + ty) / 2 })
    }
    update()
    const unsubs = []
    if (fromX && fromX.on) unsubs.push(fromX.on('change', update))
    if (fromY && fromY.on) unsubs.push(fromY.on('change', update))
    if (toX && toX.on) unsubs.push(toX.on('change', update))
    if (toY && toY.on) unsubs.push(toY.on('change', update))
    return () => unsubs.forEach(u => u && u())
  }, [fromX, fromY, toX, toY])
  return <text x={pos.x} y={pos.y - 6} textAnchor="middle" fontSize="7.5" fill="#D28D77" fontFamily="Manrope,sans-serif" fontWeight="600" opacity="0.9">{children}</text>
}

const DynamicEdge = ({ fromX, fromY, toX, toY, delay = 0, label }) => (
  <g>
    <motion.line
      x1={fromX} y1={fromY} x2={toX} y2={toY}
      stroke="#D28D77" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.62"
      markerEnd="url(#archArrowEndScribeDrag)"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay, duration: 0.8 }}
    />
    <motion.line
      x1={fromX} y1={fromY} x2={toX} y2={toY} stroke="var(--primary-light)" strokeWidth="2.5" strokeDasharray="4 24"
      className="arch-flow-animated" initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: delay + 0.8 }}
    />
    {label && <DynamicEdgeLabelPos fromX={fromX} fromY={fromY} toX={toX} toY={toY}>{label}</DynamicEdgeLabelPos>}
  </g>
)

const LottieNode = ({ x, y, url, w = 60, h = 60 }) => {
  const [data, setData] = useState(null)
  useEffect(() => {
    fetch(url).then(r => r.json()).then(setData).catch(e => console.error(e))
  }, [url])
  return (
    <foreignObject x={x - w / 2} y={y - h / 2} width={w} height={h}>
      {data && <Lottie animationData={data} loop={true} style={{ width: w, height: h }} />}
    </foreignObject>
  )
}

const ArchNode = ({ x, y, w = 130, h = 44, color = '#D28D77', label, sub, delay = 0, dark }) => {
  const bg = color === 'primary' ? '#D28D77' : color === 'secondary' ? '#3D4A3E' : color === 'tertiary' ? '#6A7A6B' : color
  const textCol = (color === 'secondary' || bg === '#3D4A3E') ? '#E8DDD0' : '#fff'
  return (
    <motion.g
      className="arch-node"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.08 }}
      transition={{ delay, type: "spring", stiffness: 350, damping: 20 }}
    >
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx="10" fill={bg} opacity="0.92" />
      <text x={x} y={sub ? y - 6 : y + 4} textAnchor="middle" fill={textCol} fontSize="11" fontFamily="Manrope,sans-serif" fontWeight="600">{label}</text>
      {sub && <text x={x} y={y + 9} textAnchor="middle" fill={textCol} fontSize="9" fontFamily="Manrope,sans-serif" opacity="0.75">{sub}</text>}
    </motion.g>
  )
}

const ArchArrow = ({ x1, y1, x2, y2, delay = 0, label }) => (
  <g>
    <motion.line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D28D77" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.6"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay, duration: 0.8, ease: "easeOut" }} />
    <motion.line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--primary-light)" strokeWidth="2.5" strokeDasharray="4 24"
      className="arch-flow-animated" initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: delay + 0.8 }} />
    <motion.polygon points={`${x2},${y2} ${x2 - 5},${y2 - 8} ${x2 + 5},${y2 - 8}`} fill="#D28D77" opacity="0.6"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + 0.8, duration: 0.3 }} />
    {label && <text x={(x1 + x2) / 2 + 6} y={(y1 + y2) / 2} fontSize="9" fill="#6A7A6B" fontFamily="Manrope,sans-serif">{label}</text>}
  </g>
)
const ArchArrowH = ({ x1, y1, x2, y2, delay = 0 }) => (
  <g>
    <motion.line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D28D77" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.6"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay, duration: 0.8, ease: "easeOut" }} />
    <motion.line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--primary-light)" strokeWidth="2.5" strokeDasharray="4 24"
      className="arch-flow-animated" initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: delay + 0.8 }} />
    <motion.polygon points={`${x2},${y2} ${x2 - 8},${y2 - 5} ${x2 - 8},${y2 + 5}`} fill="#D28D77" opacity="0.6"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + 0.8, duration: 0.3 }} />
  </g>
)

/* Horizontal connector only — arrowhead at the right endpoint (x2, y2) */
const ArchArrowHRight = ({ x1, y1, x2, delay = 0 }) => (
  <g>
    <motion.line x1={x1} y1={y1} x2={x2} y2={y1} stroke="#D28D77" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.6"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay, duration: 0.8, ease: "easeOut" }} />
    <motion.line x1={x1} y1={y1} x2={x2} y2={y1} stroke="var(--primary-light)" strokeWidth="2.5" strokeDasharray="4 24"
      className="arch-flow-animated" initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: delay + 0.8 }} />
    <motion.polygon points={`${x2},${y1} ${x2 - 8},${y1 - 5} ${x2 - 8},${y1 + 5}`} fill="#D28D77" opacity="0.6"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + 0.8, duration: 0.3 }} />
  </g>
)

/* Any straight segment — uses SVG marker for correct direction on diagonals */
const ArchSegment = ({ x1, y1, x2, y2, delay = 0, markerId = 'archArrowEndMultimodal' }) => (
  <g>
    <motion.line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D28D77" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.62" markerEnd={`url(#${markerId})`}
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay, duration: 0.85, ease: "easeOut" }} />
    <motion.line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--primary-light)" strokeWidth="2.5" strokeDasharray="4 24"
      className="arch-flow-animated" initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: delay + 0.85 }} />
  </g>
)

/* Compact step for Shiksha validation journey */
const ArchStage = ({ x, y, num, label, sub, delay = 0, dark }) => {
  const w = 112
  const h = 44
  const fill = dark ? 'rgba(61,74,62,0.35)' : 'rgba(61,74,62,0.1)'
  const stroke = dark ? 'rgba(210,141,119,0.35)' : 'rgba(210,141,119,0.45)'
  const tc = dark ? '#DDD8CD' : '#2C3A2D'
  const ts = dark ? '#9AAA9B' : '#6A7A6B'
  return (
    <motion.g
      className="arch-node"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.08 }}
      transition={{ delay, type: "spring", stiffness: 350, damping: 20 }}
    >
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx="10" fill={fill} stroke={stroke} strokeWidth="1" />
      <text x={x} y={sub ? y - 7 : y + 3} textAnchor="middle" fill={tc} fontSize="10" fontFamily="Manrope,sans-serif" fontWeight="700">{num} {label}</text>
      {sub && <text x={x} y={y + 9} textAnchor="middle" fill={ts} fontSize="8" fontFamily="Manrope,sans-serif">{sub}</text>}
    </motion.g>
  )
}

const ArchStageArrow = ({ x1, x2, y, delay = 0 }) => (
  <g>
    <motion.line x1={x1} y1={y} x2={x2} y2={y} stroke="#D28D77" strokeWidth="1.25" strokeDasharray="5 3" opacity="0.55"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay, duration: 0.7, ease: "easeOut" }} />
    <motion.line x1={x1} y1={y} x2={x2} y2={y} stroke="var(--primary-light)" strokeWidth="2.5" strokeDasharray="4 24"
      className="arch-flow-animated" initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: delay + 0.7 }} />
  </g>
)

/* Diagram 1 — Multimodal validation + Shiksha journey + ingress (wide canvas) */
const DiagramMultimodal = ({ dark }) => {
  /* ── Row 1: Ingress nodes ── */
  const ingress = [
    { cx: 175, w: 150, y: 88 },
    { cx: 395, w: 156, y: 88 },
    { cx: 615, w: 150, y: 88 },
  ]
  const rOut = (i) => ingress[i].cx + ingress[i].w / 2
  const rIn = (i) => ingress[i].cx - ingress[i].w / 2
  const ry = ingress[0].y

  /* ── Row 3: Processing pipeline geometry ── */
  const routeCx = 110         // Routing Agent center-x
  const routeW = 128
  const routeY = 390          // Routing Agent center-y
  const routeRight = routeCx + routeW / 2  // 174

  const workerCx = 310        // Worker column center-x
  const workerW = 108
  const workerL = workerCx - workerW / 2   // 256
  const workerR = workerCx + workerW / 2   // 364

  const supCx = 530           // Supervisor center-x
  const supW = 130
  const supL = supCx - supW / 2            // 465

  const dashCx = 700          // Dashboard center-x

  return (
    <svg viewBox="0 0 1020 800" width={1020} height={800} style={{ display: 'block', maxWidth: 'none' }}>
      <defs>
        <marker id="archArrowEndMultimodal" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#D28D77" opacity="0.72" />
        </marker>
      </defs>

      {/* ═══ ROW 1: Scale & Ingress ═══ */}
      <text x={510} y={22} textAnchor="middle" fontSize="9" fill="#6A7A6B" fontFamily="Manrope,sans-serif" fontWeight="700" letterSpacing="0.28em" style={{ textTransform: 'uppercase' }}>
        Scale &amp; ingress
      </text>
      <text x={510} y={40} textAnchor="middle" fontSize="10.5" fill="#D28D77" fontFamily="Manrope,sans-serif" fontWeight="600">
        10,000+ government & private schools · up to 100k concurrent active submissions (design target)
      </text>

      <ArchNode x={ingress[0].cx} y={ry} w={ingress[0].w} h={44} color="#6A7A6B" label="WhatsApp · Glific" sub="Student/teacher channel" delay={0} />
      <ArchArrowHRight x1={rOut(0)} y1={ry} x2={rIn(1)} delay={0.12} />
      <ArchNode x={ingress[1].cx} y={ry} w={ingress[1].w} h={44} color="secondary" label="GCP Cloud Functions" sub="Webhooks · normalise" delay={0.15} />
      <ArchArrowHRight x1={rOut(1)} y1={ry} x2={rIn(2)} delay={0.28} />
      <ArchNode x={ingress[2].cx} y={ry} w={ingress[2].w} h={44} color="#6B8E7A" label="Ingestion layer" sub="GCS · signed URLs · API" delay={0.32} />

      {/* ═══ ROW 2: Shiksha Stages ═══ */}
      <text x={410} y={138} textAnchor="middle" fontSize="9" fill="#6A7A6B" fontFamily="Manrope,sans-serif" fontWeight="700" letterSpacing="0.22em" style={{ textTransform: 'uppercase' }}>
        Shiksha — entrepreneurial curriculum (artefacts per team)
      </text>
      <text x={410} y={154} textAnchor="middle" fontSize="8.5" fill={dark ? '#9AAA9B' : '#6A7A6B'} fontFamily="Manrope,sans-serif" style={{ opacity: 0.92 }}>
        Real-world projects · validate the business idea, then media, then proof — each gate before the next
      </text>

      <ArchStage x={140} y={200} num="①" label="Idea" sub="Business case (text)" delay={0.35} dark={dark} />
      <ArchStageArrow x1={196} x2={264} y={200} delay={0.4} />
      <ArchStage x={320} y={200} num="②" label="Image" sub="Venture / pitch photo" delay={0.42} dark={dark} />
      <ArchStageArrow x1={376} x2={444} y={200} delay={0.46} />
      <ArchStage x={500} y={200} num="③" label="Video" sub="business video submission" delay={0.48} dark={dark} />
      <ArchStageArrow x1={556} x2={624} y={200} delay={0.52} />
      <ArchStage x={680} y={200} num="④" label="Proof" sub="Ops · evidence" delay={0.54} dark={dark} />

      {/* Stage → pipeline dashed guide lines */}
      <line x1={140} y1={224} x2={routeCx} y2={360} stroke="#6A7A6B" strokeWidth="1" strokeDasharray="4 4" opacity="0.35" />
      <line x1={320} y1={224} x2={workerCx} y2={320} stroke="#6A7A6B" strokeWidth="1" strokeDasharray="4 4" opacity="0.35" />
      <line x1={500} y1={224} x2={supCx} y2={345} stroke="#6A7A6B" strokeWidth="1" strokeDasharray="4 4" opacity="0.35" />
      <line x1={680} y1={224} x2={dashCx} y2={355} stroke="#6A7A6B" strokeWidth="1" strokeDasharray="4 4" opacity="0.35" />
      <text x={748} y={238} textAnchor="end" fontSize="8" fill="#6A7A6B" fontFamily="Manrope,sans-serif" fontStyle="italic">Stage → modality routing</text>

      {/* ═══ ROW 3: Processing Pipeline ═══ */}

      {/* Ingestion → Routing Agent: wrap-around polyline */}
      <g>
        <motion.polyline
          points={`${ingress[2].cx},110 ${ingress[2].cx},124 35,124 35,${routeY} ${routeCx - routeW / 2},${routeY}`}
          fill="none"
          stroke="#D28D77"
          strokeWidth="1.5"
          strokeDasharray="6 3"
          opacity="0.58"
          strokeLinejoin="round"
          strokeLinecap="round"
          markerEnd="url(#archArrowEndMultimodal)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.45, duration: 1.5, ease: "easeOut" }}
        />
        <motion.polyline
          points={`${ingress[2].cx},110 ${ingress[2].cx},124 35,124 35,${routeY} ${routeCx - routeW / 2},${routeY}`}
          fill="none"
          stroke="var(--primary-light)"
          strokeWidth="2.5"
          strokeDasharray="4 24"
          strokeLinejoin="round"
          strokeLinecap="round"
          className="arch-flow-animated"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.5 }}
        />
      </g>

      {/* Routing Agent */}
      <ArchNode x={routeCx} y={routeY} w={routeW} h={44} color="primary" label="Routing Agent" sub="LangGraph state machine" delay={0.58} />

      {/* Redis Cache below Routing Agent */}
      <ArchNode x={routeCx} y={500} w={routeW} h={38} color="#B83030" label="Redis Cache" sub="Dedup · idempotency" delay={0.6} />
      <ArchArrow x1={routeCx} y1={412} x2={routeCx} y2={481} delay={0.61} />

      {/* Routing → Workers (diagonal lines to each worker node edge) */}
      <ArchSegment x1={routeRight} y1={375} x2={workerL} y2={350} delay={0.65} />
      <ArchSegment x1={routeRight} y1={routeY} x2={workerL} y2={400} delay={0.66} />
      <ArchSegment x1={routeRight} y1={405} x2={workerL} y2={450} delay={0.67} />

      {/* WORKER AGENTS group box + nodes */}
      <rect x={workerCx - 75} y={310} width={150} height={168} rx="14" fill={dark ? 'rgba(61,74,62,0.22)' : 'rgba(61,74,62,0.07)'} stroke="rgba(61,74,62,0.18)" strokeWidth="1" />
      <text x={workerCx} y={304} textAnchor="middle" fontSize="9" fill="#6A7A6B" fontFamily="Manrope" fontWeight="700" letterSpacing="0.12em">WORKER AGENTS</text>
      
      {/* External Sub-services for Video Agent */}
      <ArchNode x={235} y={270} w={125} h={40} color="#7A6B8E" label="Transcription API" sub="Cloud Run service" delay={0.68} />
      <ArchNode x={385} y={270} w={125} h={40} color="#6B8E7A" label="Vision LLM" sub="NSFW / safety check" delay={0.69} />
      
      {/* Connections from Video Agent to Sub-services */}
      <ArchSegment x1={300} y1={331} x2={245} y2={290} delay={0.71} />
      <ArchSegment x1={320} y1={331} x2={375} y2={290} delay={0.71} />

      <ArchNode x={workerCx} y={350} w={workerW} h={38} color="#8B6F5E" label="🎥 Video Agent" delay={0.7} />
      <ArchNode x={workerCx} y={400} w={workerW} h={38} color="#6B8E6B" label="🖼️ Image Agent" delay={0.72} />
      <ArchNode x={workerCx} y={450} w={workerW} h={38} color="#7A7A8E" label="📄 Text Agent" delay={0.74} />

      {/* Workers → Supervisor */}
      <ArchSegment x1={workerR} y1={350} x2={supL} y2={375} delay={0.78} />
      <ArchSegment x1={workerR} y1={400} x2={supL} y2={395} delay={0.8} />
      <ArchSegment x1={workerR} y1={450} x2={supL} y2={415} delay={0.82} />

      {/* Supervisor Agent */}
      <ArchNode x={supCx} y={395} w={supW} h={50} color="secondary" label="Supervisor Agent" sub="CoT + ToT reconcile" delay={0.85} />

      {/* Supervisor → Validation Store */}
      <ArchArrow x1={supCx} y1={420} x2={supCx} y2={468} delay={0.92} />

      {/* Validation Store */}
      <ArchNode x={supCx} y={490} w={130} h={40} color="primary" label="Validation store" sub="MySQL + MongoDB" delay={0.94} />

      {/* Validation Store → Dashboard */}
      <ArchSegment x1={supCx + supW / 2} y1={485} x2={dashCx - 52} y2={385} delay={0.98} />

      {/* Dashboard */}
      <ArchNode x={dashCx} y={375} w={110} h={40} color="#4A7A6B" label="📊 Dashboard" sub="Looker Studio" delay={1} />

      {/* Annotations */}
      <text x={810} y={365} textAnchor="start" fontSize="9" fill="#6A7A6B" fontFamily="Manrope,sans-serif" fontWeight="600">Per-stage scores</text>
      <text x={810} y={381} textAnchor="start" fontSize="8" fill={dark ? '#9AAA9B' : '#6A7A6B'} fontFamily="Manrope,sans-serif">Audit trail · appeals · exports</text>

      {/* "What students ship" context box */}
      <rect x={750} y={410} width={270} height={180} rx="16" fill={dark ? 'rgba(210,141,119,0.06)' : 'rgba(210,141,119,0.1)'} stroke="rgba(210,141,119,0.25)" strokeWidth="1" />
      <text x={870} y={434} textAnchor="middle" fontSize="9" fill="#D28D77" fontFamily="Manrope,sans-serif" fontWeight="700" letterSpacing="0.14em" style={{ textTransform: 'uppercase' }}>What students ship</text>
      <text x={765} y={456} fontSize="8.5" fill={dark ? '#C8D0C8' : '#3D4A3E'} fontFamily="Manrope,sans-serif">
        Teams pick community projects (Y1–Y4), interview locals,
      </text>
      <text x={765} y={472} fontSize="8.5" fill={dark ? '#C8D0C8' : '#3D4A3E'} fontFamily="Manrope,sans-serif">
        iterate lean models, reflect together — low resource footprint.
      </text>
      <text x={765} y={500} fontSize="8.5" fill={dark ? '#C8D0C8' : '#3D4A3E'} fontFamily="Manrope,sans-serif">
        We validate idea quality, visual evidence, spoken pitch, and
      </text>
      <text x={765} y={516} fontSize="8.5" fill={dark ? '#C8D0C8' : '#3D4A3E'} fontFamily="Manrope,sans-serif">
        proof-of-execution so each step unlocks the next in the graph.
      </text>
      <text x={765} y={550} fontSize="8" fill="#6A7A6B" fontFamily="Manrope,sans-serif" fontStyle="italic">
        Shiksha — government schools · teacher-led · real-world learning
      </text>

      {/* ═══ MAPPING: Logic to Infrastructure ═══ */}
      {/* 1. Ingestion drops to RabbitMQ down the interstitial gap at x=615 */}
      <path d="M 615 110 L 615 580 C 615 630, 240 610, 240 648" fill="none" stroke="#6B8E7A" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#archArrowEndMultimodal)" opacity="0.75" />
      <text x={605} y={300} textAnchor="end" fontSize="8" fill="#6B8E7A" fontFamily="Manrope,sans-serif" fontWeight="600" opacity="0.9">Buffers webhooks into →</text>

      {/* 2. Worker Agents drop to Cloud Run */}
      <path d="M 310 478 L 310 520 C 310 610, 510 580, 510 648" fill="none" stroke="#6B8E7A" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#archArrowEndMultimodal)" opacity="0.75" />
      <text x={315} y={535} textAnchor="start" fontSize="8" fill="#6B8E7A" fontFamily="Manrope,sans-serif" fontWeight="600" opacity="0.9">Deploys compute onto →</text>

      {/* 3. Validation Store drops to DB Poolers */}
      <path d="M 530 510 L 530 550 C 530 610, 780 580, 780 648" fill="none" stroke="#6B8E7A" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#archArrowEndMultimodal)" opacity="0.75" />
      <text x={535} y={560} textAnchor="start" fontSize="8" fill="#6B8E7A" fontFamily="Manrope,sans-serif" fontWeight="600" opacity="0.9">Connects through →</text>

      {/* ═══ ROW 4: Backend Infrastructure ═══ */}
      <rect x={80} y={595} width={860} height={165} rx="14" fill={dark ? 'rgba(210,141,119,0.03)' : 'rgba(210,141,119,0.08)'} stroke="var(--primary)" strokeDasharray="6 4" strokeWidth="1" opacity="0.4" />
      <text x={510} y={620} textAnchor="middle" fontSize="9" fill="var(--primary)" fontFamily="Manrope,sans-serif" fontWeight="700" letterSpacing="0.22em" style={{ textTransform: 'uppercase' }}>
        Distributed Backend Infrastructure (Scaling to 100k+ Concurrent)
      </text>

      {/* RabbitMQ */}
      <ArchNode x={240} y={670} w={150} h={44} color="#D28D77" label="RabbitMQ Broker" sub="Message Queues & Fanout" delay={1.1} />
      
      {/* Cloud Run */}
      <ArchNode x={510} y={670} w={200} h={44} color="secondary" label="Cloud Run Services & Jobs" sub="Auto-scaling elastic compute" delay={1.2} />

      <ArchArrowHRight x1={315} y1={670} x2={410} delay={1.3} />

      {/* DB Scale */}
      <ArchNode x={780} y={670} w={150} h={44} color="primary" label="Database Poolers" sub="Connection Multiplexing" delay={1.4} />

      <ArchArrowHRight x1={610} y1={670} x2={705} delay={1.5} />
      
      {/* Scale Annotations */}
      <text x={240} y={715} textAnchor="middle" fontSize="8.5" fill={dark ? '#9AAA9B' : '#6A7A6B'} fontFamily="Manrope,sans-serif">Absorbs massive bursts of 100k+</text>
      <text x={240} y={729} textAnchor="middle" fontSize="8.5" fill={dark ? '#9AAA9B' : '#6A7A6B'} fontFamily="Manrope,sans-serif">webhooks to prevent data loss.</text>

      <text x={510} y={715} textAnchor="middle" fontSize="8.5" fill={dark ? '#9AAA9B' : '#6A7A6B'} fontFamily="Manrope,sans-serif">Worker agents & LangGraph state machines spin</text>
      <text x={510} y={729} textAnchor="middle" fontSize="8.5" fill={dark ? '#9AAA9B' : '#6A7A6B'} fontFamily="Manrope,sans-serif">from 0 to N container instances on demand.</text>

      <text x={780} y={715} textAnchor="middle" fontSize="8.5" fill={dark ? '#9AAA9B' : '#6A7A6B'} fontFamily="Manrope,sans-serif">Maintains low connection counts to</text>
      <text x={780} y={729} textAnchor="middle" fontSize="8.5" fill={dark ? '#9AAA9B' : '#6A7A6B'} fontFamily="Manrope,sans-serif">safeguard downstream storage tiers.</text>

    </svg>
  )
}

/* Pannable / scrollable diagram surface (grab to pan) */
const ArchDiagramCanvas = ({ dark, children }) => {
  const scrollRef = useRef(null)
  const drag = useRef({ active: false, x: 0, y: 0, sl: 0, st: 0 })

  const onPointerDown = e => {
    if (e.button !== 0) return
    const el = scrollRef.current
    if (!el) return
    drag.current = { active: true, x: e.clientX, y: e.clientY, sl: el.scrollLeft, st: el.scrollTop }
    el.style.cursor = 'grabbing'
    el.setPointerCapture(e.pointerId)
  }

  const onPointerMove = e => {
    if (!drag.current.active) return
    const el = scrollRef.current
    if (!el) return
    el.scrollLeft = drag.current.sl - (e.clientX - drag.current.x)
    el.scrollTop = drag.current.st - (e.clientY - drag.current.y)
  }

  const onPointerUp = e => {
    const el = scrollRef.current
    if (el) {
      el.style.cursor = 'grab'
      try { el.releasePointerCapture(e.pointerId) } catch { /* noop */ }
    }
    drag.current.active = false
  }

  const grid = dark
    ? 'radial-gradient(rgba(210,141,119,0.06) 1px, transparent 1px)'
    : 'radial-gradient(rgba(61,74,62,0.07) 1px, transparent 1px)'

  return (
    <div style={{
      position: 'relative',
      borderRadius: '1.2rem',
      overflow: 'hidden',
      marginBottom: '1.5rem',
      background: dark ? 'rgba(0,0,0,0.18)' : 'rgba(242,240,233,0.75)',
      boxShadow: 'var(--shadow-sm)',
    }}>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: grid,
          backgroundSize: '14px 14px',
          opacity: 0.55,
          pointerEvents: 'none',
        }}
      />
      <div style={{
        position: 'absolute',
        top: 10,
        right: 14,
        zIndex: 2,
        fontSize: '0.65rem',
        fontFamily: 'var(--font-body)',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'var(--on-surface-muted)',
        pointerEvents: 'none',
      }}>
        Drag to pan · scroll
      </div>
      <div
        ref={scrollRef}
        role="img"
        aria-label="System architecture diagram. Drag or scroll to explore."
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{
          position: 'relative',
          zIndex: 1,
          height: 'min(72vh, 520px)',
          overflow: 'auto',
          cursor: 'grab',
          overscrollBehavior: 'contain',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div style={{ minWidth: 1040, minHeight: 650, padding: '1rem 1rem 1.25rem' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

/* Diagram 2 — Data Engineering Pipeline */
const DiagramData = ({ dark }) => (
  <svg viewBox="0 0 720 270" style={{ width: '100%', maxWidth: 720, height: 'auto' }}>
    <defs>
      <marker id="archArrowEndData" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L7,3.5 L0,7 Z" fill="#D28D77" opacity="0.72" />
      </marker>
    </defs>
    {/* Sources */}
    <text x={90} y={30} textAnchor="middle" fontSize="9" fill="#6A7A6B" fontFamily="Manrope" fontWeight="700" letterSpacing="1">DATA SOURCES</text>
    <ArchNode x={90} y={65} w={110} h={38} color="secondary" label="MySQL" sub="Structured Data" delay={0} />
    <ArchNode x={90} y={120} w={110} h={38} color="#6B8E7A" label="MongoDB" sub="Unstructured Data" delay={0.1} />
    <ArchNode x={90} y={175} w={110} h={38} color="#8E7A6B" label="GCS Buckets" sub="Media / Files" delay={0.2} />

    {/* Sources → ETL — ArchSegment with auto-orient markers for correct diagonal arrows */}
    <ArchSegment x1={145} y1={65} x2={198} y2={102} delay={0.4} markerId="archArrowEndData" />
    <ArchSegment x1={145} y1={120} x2={198} y2={120} delay={0.5} markerId="archArrowEndData" />
    <ArchSegment x1={145} y1={175} x2={198} y2={138} delay={0.6} markerId="archArrowEndData" />

    {/* ETL */}
    <ArchNode x={248} y={120} w={100} h={50} color="primary" label="ETL Pipelines" sub="Python + Dataflow" delay={0.7} />
    <ArchSegment x1={298} y1={120} x2={348} y2={120} delay={1.0} markerId="archArrowEndData" />

    {/* BigQuery */}
    <ArchNode x={405} y={120} w={110} h={50} color="secondary" label="GCP BigQuery" sub="Data Warehouse" delay={1.1} />

    {/* BigQuery → Looker (vertical) */}
    <ArchArrow x1={405} y1={147} x2={405} y2={198} delay={1.4} />

    {/* BigQuery → Redis Cache (horizontal) */}
    <ArchSegment x1={460} y1={120} x2={510} y2={120} delay={1.3} markerId="archArrowEndData" />

    {/* Redis Cache — query result caching */}
    <ArchNode x={555} y={120} w={90} h={44} color="#B83030" label="Redis Cache" sub="Query results" delay={1.35} />

    {/* Cache → Govt Portal (diagonal up-right) */}
    <ArchSegment x1={600} y1={106} x2={618} y2={78} delay={1.5} markerId="archArrowEndData" />
    {/* Cache → Ops Team (diagonal down-right) */}
    <ArchSegment x1={600} y1={134} x2={618} y2={162} delay={1.55} markerId="archArrowEndData" />

    <ArchNode x={405} y={220} w={110} h={38} color="primary" label="Looker Studio" sub="Dashboards" delay={1.6} />
    <ArchNode x={665} y={65} w={90} h={38} color="#4A7A6B" label="Govt. Portal" sub="Stakeholders" delay={1.7} />
    <ArchNode x={665} y={175} w={90} h={38} color="#7A6B4A" label="Ops Team" sub="Internal Metrics" delay={1.8} />

    <ArchArrow x1={405} y1={240} x2={405} y2={258} delay={1.9} />
    <text x={405} y={267} textAnchor="middle" fontSize="9" fill="#6A7A6B" fontFamily="Manrope" style={{ opacity: 0, animation: 'fadeIn 0.4s 2.1s both' }}>Real-time monitoring</text>
  </svg>
)

/* Diagram 3 — Cloud Infrastructure */
const DiagramCloud = ({ dark }) => (
  <svg viewBox="0 0 660 290" style={{ width: '100%', maxWidth: 660, height: 'auto' }}>
    <defs>
      <marker id="archArrowEndCloud" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L7,3.5 L0,7 Z" fill="#D28D77" opacity="0.72" />
      </marker>
    </defs>
    <ArchNode x={80} y={60} w={110} h={40} color="secondary" label="FastAPI Services" sub="Python Microservices" delay={0} />
    <ArchNode x={80} y={130} w={110} h={40} color="#6B8E7A" label="Auth & Gateway" sub="JWT + Rate Limiting" delay={0.1} />
    <ArchNode x={80} y={200} w={110} h={40} color="#8E6B7A" label="Celery Workers" sub="Async Task Queue" delay={0.2} />

    {/* Services → Docker — ArchSegment for proper diagonal arrowheads */}
    <ArchSegment x1={135} y1={60} x2={195} y2={108} delay={0.4} markerId="archArrowEndCloud" />
    <ArchSegment x1={135} y1={130} x2={195} y2={130} delay={0.5} markerId="archArrowEndCloud" />
    <ArchSegment x1={135} y1={200} x2={195} y2={152} delay={0.6} markerId="archArrowEndCloud" />

    {/* Docker */}
    <ArchNode x={245} y={130} w={100} h={50} color="primary" label="🐳 Docker" sub="Containerised" delay={0.7} />

    {/* Docker → Cloud Run / GCP VMs */}
    <ArchSegment x1={295} y1={115} x2={355} y2={78} delay={1.0} markerId="archArrowEndCloud" />
    <ArchSegment x1={295} y1={145} x2={355} y2={178} delay={1.1} markerId="archArrowEndCloud" />

    {/* GCP */}
    <ArchNode x={415} y={70} w={115} h={44} color="secondary" label="GCP Cloud Run" sub="Auto-scale · Serverless" delay={1.2} />
    <ArchNode x={415} y={190} w={115} h={44} color="#5E7A6B" label="GCP Compute VMs" sub="Long-running Jobs" delay={1.3} />

    {/* Cloud Run / VMs → Load Balancer */}
    <ArchSegment x1={472} y1={78} x2={518} y2={112} delay={1.6} markerId="archArrowEndCloud" />
    <ArchSegment x1={472} y1={182} x2={518} y2={148} delay={1.7} markerId="archArrowEndCloud" />

    <ArchNode x={570} y={130} w={95} h={50} color="primary" label="Load Balancer" sub="< 1s Latency" delay={1.8} />

    {/* Managed Redis — backing cache service */}
    <ArchNode x={570} y={240} w={110} h={40} color="#B83030" label="Managed Redis" sub="Session · Cache" delay={1.9} />
    <ArchSegment x1={472} y1={198} x2={515} y2={228} delay={2.0} markerId="archArrowEndCloud" />

    <text x={570} y={168} textAnchor="middle" fontSize="9" fill="#D28D77" fontFamily="Manrope" fontWeight="700"
      style={{ opacity: 0, animation: 'fadeIn 0.5s 2.2s both' }}>99.9% Uptime</text>
  </svg>
)

/* Diagram 4 — Voice AI Pipeline */
const DiagramVoice = ({ dark }) => (
  <svg viewBox="0 0 640 280" style={{ width: '100%', maxWidth: 640, height: 'auto' }}>
    <defs>
      <marker id="archArrowEndVoice" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L7,3.5 L0,7 Z" fill="#D28D77" opacity="0.72" />
      </marker>
    </defs>
    <ArchNode x={70} y={80} w={110} h={44} color="secondary" label="🎙️ Audio Input" sub="Multi-lingual · Noisy" delay={0} />
    <ArchArrowHRight x1={125} y1={80} x2={175} delay={0.3} />

    <ArchNode x={240} y={80} w={110} h={44} color="#8E7A6B" label="FFmpeg Preproc." sub="Normalise · Denoise" delay={0.4} />
    <ArchArrowHRight x1={295} y1={80} x2={345} delay={0.7} />

    <ArchNode x={410} y={80} w={120} h={44} color="primary" label="Pyannote-Audio" sub="Speaker Diarization" delay={0.8} />
    <ArchArrow x1={410} y1={104} x2={410} y2={144} delay={1.1} />

    <ArchNode x={410} y={170} w={120} h={44} color="secondary" label="Segment Mapper" sub="Speaker A · B · C..." delay={1.2} />

    {/* Segment Mapper → Transcript Cache (leftward — check cache first) */}
    <ArchSegment x1={350} y1={178} x2={298} y2={200} delay={1.35} markerId="archArrowEndVoice" />

    {/* Transcript Cache — stores already-transcribed segments */}
    <ArchNode x={240} y={220} w={116} h={40} color="#B83030" label="Transcript Cache" sub="Redis · dedup" delay={1.38} />

    {/* Segment Mapper → Transcription API (diagonal — auto-orient arrowhead) */}
    <ArchSegment x1={470} y1={158} x2={530} y2={118} delay={1.5} markerId="archArrowEndVoice" />
    {/* Segment Mapper → Cost Savings (diagonal — auto-orient arrowhead) */}
    <ArchSegment x1={470} y1={182} x2={530} y2={210} delay={1.6} markerId="archArrowEndVoice" />

    <ArchNode x={575} y={105} w={100} h={40} color="#6B8E6B" label="Transcription API" sub="Gemini · Whisper" delay={1.7} />
    <ArchNode x={575} y={225} w={100} h={38} color="primary" label="Cost Savings" sub="↓ API Calls" delay={1.8} />

    {/* Transcription API → Cache (store results) */}
    <ArchSegment x1={525} y1={118} x2={298} y2={210} delay={1.85} markerId="archArrowEndVoice" />
    <text x={(525 + 298) / 2 + 20} y={(118 + 210) / 2 - 8} fontSize="7.5" fill="#6A7A6B" fontFamily="Manrope,sans-serif" fontStyle="italic" opacity="0.85">cache result</text>

    <text x={320} y={20} textAnchor="middle" fontSize="10" fill="#6A7A6B" fontFamily="Manrope" fontWeight="600"
      style={{ opacity: 0, animation: 'fadeIn 0.5s 2s both' }}>
      Diarization before transcription → only unique segments sent to API
    </text>
    <text x={320} y={34} textAnchor="middle" fontSize="9" fill="#D28D77" fontFamily="Manrope" fontWeight="500"
      style={{ opacity: 0, animation: 'fadeIn 0.5s 2.2s both' }}>
      Cache + dedup dramatically reduces inference cost for real-world audio data
    </text>
  </svg>
)

/* Scribe — system architecture (from Mermaid flowchart TB) */
const ScribeSubgraph = ({ x, y, w, h, title, dark }) => (
  <g>
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx="14"
      fill={dark ? 'rgba(61,74,62,0.12)' : 'rgba(61,74,62,0.05)'}
      stroke="rgba(210,141,119,0.22)"
      strokeWidth="1"
    />
    <text
      x={x + w / 2}
      y={y + 15}
      textAnchor="middle"
      fontSize="7.5"
      fill="#6A7A6B"
      fontFamily="Manrope,sans-serif"
      fontWeight="700"
      letterSpacing="0.14em"
      style={{ textTransform: 'uppercase' }}
    >
      {title}
    </text>
  </g>
)

const ScribeEdgeLbl = ({ x, y, children }) => (
  <text x={x} y={y} fontSize="7" fill="#6A7A6B" fontFamily="Manrope,sans-serif" fontStyle="italic" opacity="0.9">
    {children}
  </text>
)

const DiagramScribe = ({ dark }) => (
  <svg viewBox="0 0 900 530" width={900} height={530} style={{ display: 'block', maxWidth: '100%' }}>
    <defs>
      <marker id="archArrowEndScribe" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L7,3.5 L0,7 Z" fill="#D28D77" opacity="0.72" />
      </marker>
    </defs>

    <text x={450} y={22} textAnchor="middle" fontSize="11" fill="#D28D77" fontFamily="Manrope,sans-serif" fontWeight="700">
      Scribe — system architecture
    </text>

    <ScribeSubgraph x={28} y={38} w={216} h={418} title="Frontend · Vite + React SPA" dark={dark} />
    <ScribeSubgraph x={262} y={38} w={278} h={438} title="Supabase" dark={dark} />
    <ScribeSubgraph x={558} y={38} w={232} h={328} title="Python · FastAPI" dark={dark} />

    {/* Frontend nodes */}
    <ArchNode x={136} y={92} w={124} h={44} color="#6A7A6B" label="FileUpload" sub="TUS · resumable" delay={0} />
    <ArchNode x={136} y={218} w={124} h={40} color="#7A6B8E" label="Realtime Sub" sub="Supabase channel" delay={0.08} />
    <ArchNode x={136} y={308} w={124} h={40} color="#6B8E7A" label="TranscriptionList" delay={0.1} />
    <ArchNode x={136} y={408} w={124} h={44} color="#8B7A6E" label="TranscriptViewer" sub="read + actions" delay={0.12} />

    {/* Supabase */}
    <ArchNode x={410} y={92} w={128} h={44} color="secondary" label="Storage" sub="audio-files bucket" delay={0.05} />
    <ArchNode x={410} y={188} w={128} h={44} color="#3D6B4F" label="Postgres" sub="transcriptions DB" delay={0.06} />
    <ArchNode x={410} y={298} w={136} h={40} color="#6B8E6B" label="PG Realtime" sub="postgres_changes" delay={0.07} />
    <ArchNode x={410} y={372} w={120} h={38} color="#6A7A6B" label="Auth" sub="email / password" delay={0.09} />
    <ArchNode x={340} y={448} w={118} h={38} color="primary" label="Edge: translate" delay={0.11} />
    <ArchNode x={480} y={448} w={118} h={38} color="primary" label="Edge: export" sub="Google" delay={0.11} />

    {/* Backend */}
    <ArchNode x={670} y={92} w={132} h={44} color="primary" label="POST /transcribe" delay={0.04} />
    <ArchNode x={670} y={154} w={132} h={40} color="#8E7A6B" label="Audio chunker" sub="FFmpeg · silence" delay={0.13} />
    <ArchNode x={670} y={212} w={132} h={40} color="#8B6F5E" label="Diarization" sub="pyannote-audio" delay={0.135} />
    <ArchNode x={670} y={270} w={132} h={40} color="#6B8E7A" label="Transcriber" sub="Gemini + speaker ctx" delay={0.14} />
    <ArchNode x={670} y={328} w={132} h={40} color="secondary" label="Reconciler" sub="chunk boundaries" delay={0.15} />

    {/* FU → Storage (1) — from node right edge */}
    <ArchArrowHRight x1={198} y1={92} x2={346} delay={0.02} />
    <ScribeEdgeLbl x={252} y={82}>① TUS upload</ScribeEdgeLbl>

    {/* FU → Postgres pending (2) */}
    <ArchSegment x1={198} y1={100} x2={346} y2={178} delay={0.03} markerId="archArrowEndScribe" />
    <ScribeEdgeLbl x={228} y={128}>② insert pending</ScribeEdgeLbl>

    {/* FU → POST /transcribe (3) — exits FileUpload right-center, elbows above Storage row */}
    <path
      d="M 198 92 L 198 62 L 604 62 L 604 70"
      fill="none"
      stroke="#D28D77"
      strokeWidth="1.5"
      strokeDasharray="6 3"
      opacity="0.62"
      strokeLinejoin="round"
      strokeLinecap="round"
      markerEnd="url(#archArrowEndScribe)"
    />
    <ScribeEdgeLbl x={470} y={58}>③ POST /transcribe</ScribeEdgeLbl>

    {/* Storage → API download (4) — audio flows from Storage to API */}
    <ArchSegment x1={474} y1={92} x2={604} y2={92} delay={0.16} markerId="archArrowEndScribe" />
    <ScribeEdgeLbl x={498} y={82}>④ download audio</ScribeEdgeLbl>

    {/* API → Chunker → Diarization → Transcriber → Reconciler (vertical pipeline) */}
    <ArchArrow x1={670} y1={114} x2={670} y2={134} delay={0.17} />
    <ArchArrow x1={670} y1={174} x2={670} y2={192} delay={0.175} />
    <ArchArrow x1={670} y1={232} x2={670} y2={250} delay={0.18} />
    <ArchArrow x1={670} y1={290} x2={670} y2={308} delay={0.19} />

    {/* Transcriber → Postgres (5) chunk progress — branch */}
    <ArchSegment x1={604} y1={270} x2={474} y2={195} delay={0.2} markerId="archArrowEndScribe" />
    <ScribeEdgeLbl x={530} y={188}>⑤ chunk progress</ScribeEdgeLbl>

    {/* Reconciler → Postgres (6) final */}
    <ArchSegment x1={604} y1={328} x2={474} y2={205} delay={0.21} markerId="archArrowEndScribe" />
    <ScribeEdgeLbl x={538} y={242}>⑥ completed</ScribeEdgeLbl>

    {/* Postgres → PG Realtime (DB feeds realtime) — single downward arrow */}
    <line
      x1={410}
      y1={210}
      x2={410}
      y2={278}
      stroke="#D28D77"
      strokeWidth="1.5"
      strokeDasharray="6 3"
      opacity="0.65"
      markerEnd="url(#archArrowEndScribe)"
    />

    {/* PG Realtime → Realtime Sub — orthogonal to avoid long diagonal */}
    <path
      d="M 342 298 L 280 298 L 280 218 L 198 218"
      fill="none"
      stroke="#D28D77"
      strokeWidth="1.5"
      strokeDasharray="6 3"
      opacity="0.62"
      strokeLinejoin="round"
      markerEnd="url(#archArrowEndScribe)"
    />

    {/* Realtime Sub → TranscriptionList */}
    <ArchArrow x1={136} y1={238} x2={136} y2={288} delay={0.24} />

    {/* TranscriptViewer → Postgres — wide route, label offset */}
    <path
      d="M 198 400 L 540 400 L 540 188 L 474 188"
      fill="none"
      stroke="#D28D77"
      strokeWidth="1.5"
      strokeDasharray="6 3"
      opacity="0.62"
      strokeLinejoin="round"
      markerEnd="url(#archArrowEndScribe)"
    />
    <ScribeEdgeLbl x={560} y={392}>read · signed URL</ScribeEdgeLbl>

    {/* TranscriptViewer → Edge fns — exit bottom, into node undersides */}
    <path
      d="M 198 424 L 340 424 L 340 467"
      fill="none"
      stroke="#D28D77"
      strokeWidth="1.5"
      strokeDasharray="6 3"
      opacity="0.62"
      strokeLinejoin="round"
      markerEnd="url(#archArrowEndScribe)"
    />
    <ScribeEdgeLbl x={228} y={416}>translate</ScribeEdgeLbl>

    <path
      d="M 198 436 L 480 436 L 480 467"
      fill="none"
      stroke="#D28D77"
      strokeWidth="1.5"
      strokeDasharray="6 3"
      opacity="0.62"
      strokeLinejoin="round"
      markerEnd="url(#archArrowEndScribe)"
    />
    <ScribeEdgeLbl x={300} y={428}>Google export</ScribeEdgeLbl>

    {/* Redis Cache — caching frequently accessed transcriptions */}
    <ArchNode x={136} y={500} w={130} h={38} color="#B83030" label="Redis Cache" sub="Transcript read cache" delay={0.28} />
    <ArchSegment x1={136} y1={430} x2={136} y2={481} delay={0.29} markerId="archArrowEndScribe" />
  </svg>
)

const DiagramScribeDraggable = ({ dark }) => {
  const fuX = useMotionValue(136); const fuY = useMotionValue(92);
  const rsX = useMotionValue(136); const rsY = useMotionValue(218);
  const tlX = useMotionValue(136); const tlY = useMotionValue(308);
  const tvX = useMotionValue(136); const tvY = useMotionValue(408);
  const redisX = useMotionValue(136); const redisY = useMotionValue(500);
  const storageX = useMotionValue(410); const storageY = useMotionValue(92);
  const pgX = useMotionValue(410); const pgY = useMotionValue(188);
  const realX = useMotionValue(410); const realY = useMotionValue(298);
  const authX = useMotionValue(410); const authY = useMotionValue(372);
  const edge1X = useMotionValue(340); const edge1Y = useMotionValue(448);
  const edge2X = useMotionValue(480); const edge2Y = useMotionValue(448);
  const postX = useMotionValue(670); const postY = useMotionValue(92);
  const chunkX = useMotionValue(670); const chunkY = useMotionValue(154);
  const diarX = useMotionValue(670); const diarY = useMotionValue(212);
  const transX = useMotionValue(670); const transY = useMotionValue(270);
  const recX = useMotionValue(670); const recY = useMotionValue(328);

  const m = {
    fu: { x: fuX, y: fuY },
    rs: { x: rsX, y: rsY },
    tl: { x: tlX, y: tlY },
    tv: { x: tvX, y: tvY },
    redis: { x: redisX, y: redisY },
    storage: { x: storageX, y: storageY },
    pg: { x: pgX, y: pgY },
    real: { x: realX, y: realY },
    auth: { x: authX, y: authY },
    edge1: { x: edge1X, y: edge1Y },
    edge2: { x: edge2X, y: edge2Y },
    post: { x: postX, y: postY },
    chunk: { x: chunkX, y: chunkY },
    diar: { x: diarX, y: diarY },
    trans: { x: transX, y: transY },
    rec: { x: recX, y: recY }
  };

  return (
    <svg viewBox="0 0 820 560" width={820} height={560} style={{ display: 'block', maxWidth: '100%', overflow: 'visible' }}>
      <defs>
        <marker id="archArrowEndScribeDrag" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#D28D77" opacity="0.72" />
        </marker>
      </defs>

      {/* ── Static Subgroup backgrounds ── */}
      <ScribeSubgraph x={28} y={38} w={216} h={500} title="Frontend · Vite + React SPA" dark={dark} />
      <ScribeSubgraph x={262} y={38} w={278} h={448} title="Supabase" dark={dark} />
      <ScribeSubgraph x={558} y={38} w={232} h={328} title="Python · FastAPI" dark={dark} />

      {/* ── Title ── */}
      <text x={410} y={24} textAnchor="middle" fill="#D28D77" fontSize="13" fontFamily="Manrope,sans-serif" fontWeight="700" opacity="0.85">
        Scribe — system architecture
      </text>

      {/* ── Dynamic Edges ── */}
      <DynamicEdge fromX={m.fu.x} fromY={m.fu.y} toX={m.storage.x} toY={m.storage.y} delay={0.02} label="① TUS upload" />
      <DynamicEdge fromX={m.fu.x} fromY={m.fu.y} toX={m.pg.x} toY={m.pg.y} delay={0.03} label="② insert pending" />
      <DynamicEdge fromX={m.fu.x} fromY={m.fu.y} toX={m.post.x} toY={m.post.y} delay={0.04} label="③ POST /transcribe" />
      <DynamicEdge fromX={m.storage.x} fromY={m.storage.y} toX={m.post.x} toY={m.post.y} delay={0.16} label="④ download audio" />

      <DynamicEdge fromX={m.post.x} fromY={m.post.y} toX={m.chunk.x} toY={m.chunk.y} delay={0.17} />
      <DynamicEdge fromX={m.chunk.x} fromY={m.chunk.y} toX={m.diar.x} toY={m.diar.y} delay={0.18} />
      <DynamicEdge fromX={m.diar.x} fromY={m.diar.y} toX={m.trans.x} toY={m.trans.y} delay={0.19} />
      <DynamicEdge fromX={m.trans.x} fromY={m.trans.y} toX={m.rec.x} toY={m.rec.y} delay={0.20} />

      <DynamicEdge fromX={m.trans.x} fromY={m.trans.y} toX={m.pg.x} toY={m.pg.y} delay={0.21} label="⑤ chunk progress" />
      <DynamicEdge fromX={m.rec.x} fromY={m.rec.y} toX={m.pg.x} toY={m.pg.y} delay={0.22} label="⑥ completed" />

      <DynamicEdge fromX={m.pg.x} fromY={m.pg.y} toX={m.real.x} toY={m.real.y} delay={0.23} />
      <DynamicEdge fromX={m.real.x} fromY={m.real.y} toX={m.rs.x} toY={m.rs.y} delay={0.24} />
      <DynamicEdge fromX={m.rs.x} fromY={m.rs.y} toX={m.tl.x} toY={m.tl.y} delay={0.25} />

      <DynamicEdge fromX={m.tv.x} fromY={m.tv.y} toX={m.pg.x} toY={m.pg.y} delay={0.26} label="read · signed URL" />
      <DynamicEdge fromX={m.tv.x} fromY={m.tv.y} toX={m.edge1.x} toY={m.edge1.y} delay={0.27} label="translate" />
      <DynamicEdge fromX={m.tv.x} fromY={m.tv.y} toX={m.edge2.x} toY={m.edge2.y} delay={0.28} label="Google export" />
      <DynamicEdge fromX={m.tv.x} fromY={m.tv.y} toX={m.redis.x} toY={m.redis.y} delay={0.29} />

      {/* ── Frontend Nodes ── */}
      <DraggableArchNode x={m.fu.x} y={m.fu.y} delay={0.01}><ArchNode x={0} y={0} w={124} h={44} color="#6A7A6B" label="FileUpload" sub="TUS · resumable" /></DraggableArchNode>
      <DraggableArchNode x={m.rs.x} y={m.rs.y} delay={0.08}><ArchNode x={0} y={0} w={124} h={40} color="#7A6B8E" label="Realtime Sub" sub="Supabase channel" /></DraggableArchNode>
      <DraggableArchNode x={m.tl.x} y={m.tl.y} delay={0.10}><ArchNode x={0} y={0} w={124} h={40} color="#6B8E7A" label="TranscriptionList" /></DraggableArchNode>
      <DraggableArchNode x={m.tv.x} y={m.tv.y} delay={0.12}><ArchNode x={0} y={0} w={124} h={44} color="#8B7A6E" label="TranscriptViewer" sub="read + actions" /></DraggableArchNode>
      <DraggableArchNode x={m.redis.x} y={m.redis.y} delay={0.28}><ArchNode x={0} y={0} w={130} h={38} color="#B83030" label="Redis Cache" sub="Transcript read cache" /></DraggableArchNode>

      {/* ── Supabase Nodes ── */}
      <DraggableArchNode x={m.storage.x} y={m.storage.y} delay={0.05}><ArchNode x={0} y={0} w={128} h={44} color="secondary" label="Storage" sub="audio-files bucket" /></DraggableArchNode>
      <DraggableArchNode x={m.pg.x} y={m.pg.y} delay={0.06}><ArchNode x={0} y={0} w={128} h={44} color="#3D6B4F" label="Postgres" sub="transcriptions DB" /></DraggableArchNode>
      <DraggableArchNode x={m.real.x} y={m.real.y} delay={0.07}><ArchNode x={0} y={0} w={136} h={40} color="#6B8E6B" label="PG Realtime" sub="postgres_changes" /></DraggableArchNode>
      <DraggableArchNode x={m.auth.x} y={m.auth.y} delay={0.09}><ArchNode x={0} y={0} w={120} h={38} color="#6A7A6B" label="Auth" sub="email / password" /></DraggableArchNode>
      <DraggableArchNode x={m.edge1.x} y={m.edge1.y} delay={0.11}><ArchNode x={0} y={0} w={118} h={38} color="primary" label="Edge: translate" /></DraggableArchNode>
      <DraggableArchNode x={m.edge2.x} y={m.edge2.y} delay={0.11}><ArchNode x={0} y={0} w={118} h={38} color="primary" label="Edge: export" sub="Google" /></DraggableArchNode>

      {/* ── Backend Nodes ── */}
      <DraggableArchNode x={m.post.x} y={m.post.y} delay={0.04}><ArchNode x={0} y={0} w={132} h={44} color="primary" label="POST /transcribe" /></DraggableArchNode>
      <DraggableArchNode x={m.chunk.x} y={m.chunk.y} delay={0.13}><ArchNode x={0} y={0} w={132} h={40} color="#8E7A6B" label="Audio chunker" sub="FFmpeg · silence" /></DraggableArchNode>
      <DraggableArchNode x={m.diar.x} y={m.diar.y} delay={0.135}><ArchNode x={0} y={0} w={132} h={40} color="#8B6F5E" label="Diarization" sub="pyannote-audio" /></DraggableArchNode>
      <DraggableArchNode x={m.trans.x} y={m.trans.y} delay={0.14}><ArchNode x={0} y={0} w={132} h={40} color="#6B8E7A" label="Transcriber" sub="Gemini + speaker ctx" /></DraggableArchNode>
      <DraggableArchNode x={m.rec.x} y={m.rec.y} delay={0.15}><ArchNode x={0} y={0} w={132} h={40} color="secondary" label="Reconciler" sub="chunk boundaries" /></DraggableArchNode>
    </svg>
  )
}

/* ─── Architecture panels data ─── */
const archPanels = [
  {
    id: 'multimodal',
    icon: '🧠',
    title: 'Agentic AI & Reasoning',
    subtitle: 'Multimodal validation at scale',
    chips: ['LangGraph', 'LangChain', 'Glific', 'Cloud Functions', 'Redis', 'CoT', 'ToT'],
    programContext: 'Shiksha is a four-year entrepreneurial curriculum in government schools: students form teams, choose real community problems, and ship lean projects with minimal tech. Submissions arrive from the field via WhatsApp (Glific), fan into GCP Cloud Functions for normalisation and idempotency, then through a LangGraph routing layer. The platform is engineered for national scale — 10,000+ schools and burst traffic toward 100k concurrent active submissions — while validating each artefact type (idea, image, video, proof) before unlocking the next stage.',
    summary: 'Architected a multimodal pipeline for daily national submissions: WhatsApp/Glific → Cloud Functions → GCS/API ingestion → Redis dedup cache, then parallel Video, Image, and Text worker agents under a Supervisor (CoT + ToT) with per-stage validation aligned to how students actually progress through their ventures.',
    diagram: DiagramMultimodal,
    diagramCanvas: true,
    why: 'Traditional rule-based validators couldn\'t handle the diversity of unstructured student data across rural and urban India — or the reality that evidence arrives as chat media, not neat forms. Agent specialization plus stage gates (idea → visual → spoken pitch → proof) was the only path to trustworthy validation at this concurrency.',
    how: [
      { label: 'Glific + WhatsApp', reason: 'Students and teachers already operate in chat; Glific turns threads into reliable webhooks so images, voice notes, and captions enter the pipeline without a separate app rollout.' },
      { label: 'Cloud Functions', reason: 'Serverless ingress for validation, idempotency keys, and fan-out under spikes — so bursts toward six-figure concurrent submissions do not starve the LangGraph tier.' },
      { label: 'LangGraph', reason: 'Deterministic state machine for orchestrating multi-step agent workflows and stage gates (idea → media → proof) without hallucinating transitions.' },
      { label: 'Redis Cache', reason: 'Idempotency and deduplication layer at the routing agent — prevents reprocessing of duplicate student submissions during burst windows and caches routing decisions for repeated content types.' },
      { label: 'Chain of Thought', reason: 'Forces the model to reason step-by-step before classifying, reducing false positives on ambiguous rural submissions.' },
      { label: 'Tree of Thoughts', reason: 'Explores multiple reasoning branches for edge cases (e.g. noisy video + strong written idea) before a final validation decision.' },
      { label: 'Worker + Supervisor', reason: 'Video / Image / Text agents run in parallel; the Supervisor reconciles contradictions and writes audit-ready scores for dashboards.' },
    ],
    impact: 'Autonomous processing of daily national-scale submissions with stage-wise traceability — replacing manual review with a system that matches how Shiksha teams actually ship evidence from the field.',
  },
  {
    id: 'data',
    icon: '📊',
    title: 'Data Engineering & Visibility',
    subtitle: 'End-to-end analytics pipeline',
    chips: ['BigQuery', 'Looker Studio', 'MySQL', 'MongoDB', 'Redis'],
    summary: 'Engineered the data backbone that turned raw submission events into real-time dashboards consumed by government stakeholders monitoring a national programme, with Redis query-result caching for sub-second stakeholder access.',
    diagram: DiagramData,
    why: 'Raw data lived across heterogeneous stores (MySQL for relational, MongoDB for documents, GCS for media). Without a unified analytics layer, leadership had zero visibility into programme health.',
    how: [
      { label: 'GCP BigQuery', reason: 'Column-store OLAP handles billion-row aggregations at sub-second speed. Ideal for time-series programme metrics without straining the transactional DB.' },
      { label: 'Redis Cache', reason: 'Query-result caching layer between BigQuery and downstream consumers — eliminates redundant warehouse scans for frequently accessed dashboards and APIs.' },
      { label: 'Looker Studio', reason: 'No-code dashboard layer that lets non-technical government officials self-serve insights without engineering support.' },
      { label: 'Dual-DB (MySQL + Mongo)', reason: 'MySQL stores structured relational records (schools, teachers, programs); MongoDB handles schemaless student submissions that vary in structure.' },
      { label: 'ETL Pipelines', reason: 'Nightly + streaming ETL jobs normalise, deduplicate, and enrich raw events before landing in BigQuery — ensuring dashboard data is always trustworthy.' },
    ],
    impact: 'Programme directors went from weekly manual reports to live dashboards, enabling same-day interventions when regional submission rates dropped.',
  },
  {
    id: 'cloud',
    icon: '☁️',
    title: 'Cloud Infrastructure & Backend',
    subtitle: 'High-availability microservices on GCP',
    chips: ['FastAPI', 'Docker', 'Cloud Run', 'GCP VMs', 'Redis'],
    summary: 'Built scalable backend microservices with managed Redis caching, capable of handling thousands of concurrent school submissions with sub-second API response times and zero-downtime deployments.',
    diagram: DiagramCloud,
    why: 'A monolith couldn\'t independently scale the ingestion service during morning submission peaks (all 10k schools submit on a schedule) while keeping the ML inference service at a steady baseline.',
    how: [
      { label: 'FastAPI', reason: 'Async-native Python framework — handles I/O-bound workloads (DB reads, GCS uploads) with dramatically higher concurrency than Flask/Django for the same hardware.' },
      { label: 'Docker', reason: 'Reproducible environments eliminate "works on my machine" failures. Enables blue-green deployments with instant rollback.' },
      { label: 'Cloud Run', reason: 'Serverless containers that auto-scale to zero — handles bursty submission windows without paying for idle compute.' },
      { label: 'GCP VMs', reason: 'Long-running ML inference jobs (Pyannote, LLMs) need persistent GPU/CPU with full control — better cost and latency profile than Cloud Run for heavy compute.' },
      { label: 'Managed Redis', reason: 'GCP Memorystore for session caching, rate-limit counters, and hot-path query results — offloads repetitive reads from Postgres and ensures sub-10ms cache hits.' },
    ],
    impact: 'Achieved < 1 second API latency under peak load. Zero-downtime deployments enabled daily model updates without disrupting live submission windows.',
  },
  {
    id: 'voice',
    icon: '🎙️',
    title: 'Voice AI & Cost Optimization',
    subtitle: 'Speaker diarization pipeline',
    chips: ['Pyannote', 'Gemini API', 'Whisper API', 'FFmpeg', 'Redis', 'Speaker Diarization'],
    summary: 'Led a Voice AI initiative that reduced transcription API costs drastically by performing speaker diarization and transcript caching before sending audio to expensive LLM transcription APIs.',
    diagram: DiagramVoice,
    why: 'The naive approach — sending every second of audio to Gemini/Whisper API — resulted in astronomical costs at scale. Real-world audio from schools contained long silences, background noise, and repeated speaker content.',
    how: [
      { label: 'Pyannote-audio', reason: 'State-of-the-art open-source diarization model that identifies and segments unique speakers locally — before any paid API call is made.' },
      { label: 'FFmpeg Preprocessing', reason: 'Noise reduction, silence trimming, and normalisation removes non-speech segments that would otherwise burn API tokens on empty audio.' },
      { label: 'Transcript Cache', reason: 'Redis-backed cache that stores segment transcription results keyed by audio fingerprint — repeated or similar segments return cached results, bypassing the API entirely.' },
      { label: 'Segment Deduplication', reason: 'After diarization, only unique speaker segments are transcribed. Repeated phrases (e.g. a teacher repeating instructions) are matched without a redundant API call.' },
      { label: 'Multi-lingual Strategy', reason: 'Language detection routes segments to the optimal model (Whisper for regional languages vs Gemini for mixed-code), balancing accuracy and cost per segment.' },
    ],
    impact: 'Significant reduction in inference API spend for complex multi-speaker recordings, while maintaining or improving transcription accuracy on real-world school audio.',
  },
]

/* ─── ArchPanel component ─── */
const ArchPanel = ({ panel, dark }) => {
  const [open, setOpen] = useState(false)
  const Diagram = panel.diagram
  return (
    <div style={{
      background: open
        ? (dark ? 'var(--surface-container-lowest)' : 'var(--surface-container-lowest)')
        : 'transparent',
      border: `1px solid ${open ? 'rgba(210,141,119,0.3)' : 'var(--border)'}`,
      borderRadius: '1.5rem',
      overflow: 'hidden',
      transition: 'all 0.35s ease',
      marginBottom: '0.75rem',
    }}>
      {/* Header — always visible */}
      <button onClick={() => setOpen(v => !v)} style={{
        width: '100%', background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: '1rem',
        padding: '1.1rem 1.4rem', textAlign: 'left',
      }}>
        <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{panel.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--on-surface)' }}>{panel.title}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--on-surface-variant)', marginTop: 2 }}>{panel.subtitle}</div>
        </div>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: 240 }}>
          {panel.chips.map(c => <span key={c} className="chip">{c}</span>)}
        </div>
        <span style={{ color: 'var(--primary)', marginLeft: '0.5rem', flexShrink: 0 }}><ChevronDown open={open} /></span>
      </button>

      {/* Expanded content */}
      {open && (
        <div style={{ padding: '0 1.4rem 1.6rem', animation: 'fadeUp 0.4s ease both' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--on-surface-variant)', marginBottom: '1.5rem', lineHeight: 1.7 }}>{panel.summary}</p>

          {panel.programContext && (
            <div style={{
              marginBottom: '1.35rem',
              padding: '1rem 1.15rem',
              borderRadius: '1rem',
              background: dark ? 'rgba(210,141,119,0.07)' : 'rgba(210,141,119,0.11)',
              borderLeft: '3px solid var(--primary)',
            }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '0.45rem' }}>Program context</div>
              <p style={{ fontSize: '0.86rem', color: 'var(--on-surface-variant)', lineHeight: 1.75, margin: 0 }}>{panel.programContext}</p>
            </div>
          )}

          {/* Diagram — wide multimodal board uses pannable canvas */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.6rem' }}>
            <a href={`#/diagram/${panel.id}`} target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', textDecoration: 'none', color: 'var(--primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}><ExternalLink /> Full Screen View</a>
          </div>
          {panel.diagramCanvas ? (
            <ArchDiagramCanvas dark={dark}>
              <Diagram dark={dark} />
            </ArchDiagramCanvas>
          ) : (
            <div style={{
              background: dark ? 'rgba(0,0,0,0.2)' : 'rgba(242,240,233,0.7)',
              borderRadius: '1.2rem', padding: '1.2rem', marginBottom: '1.5rem', overflowX: 'auto',
            }}>
              <Diagram dark={dark} />
            </div>
          )}

          {/* Why */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '0.5rem' }}>WHY THIS APPROACH</div>
            <p style={{ fontSize: '0.875rem', color: 'var(--on-surface-variant)', lineHeight: 1.7 }}>{panel.why}</p>
          </div>

          {/* How each tech choice */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '0.75rem' }}>TECHNOLOGY DECISIONS</div>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {panel.how.map(item => (
                <div key={item.label} style={{
                  background: dark ? 'rgba(61,74,62,0.15)' : 'rgba(61,74,62,0.05)',
                  borderRadius: '0.85rem', padding: '0.75rem 1rem',
                  display: 'flex', gap: '0.85rem', alignItems: 'flex-start',
                }}>
                  <span className="chip" style={{ flexShrink: 0, marginTop: 1 }}>{item.label}</span>
                  <span style={{ fontSize: '0.84rem', color: 'var(--on-surface-variant)', lineHeight: 1.65 }}>{item.reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Impact */}
          <div style={{
            background: 'rgba(210,141,119,0.1)', borderRadius: '1rem',
            padding: '0.85rem 1.1rem', borderLeft: '3px solid var(--primary)',
          }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '0.35rem' }}>IMPACT & OUTCOME</div>
            <p style={{ fontSize: '0.875rem', color: 'var(--on-surface)', lineHeight: 1.65, margin: 0 }}>{panel.impact}</p>
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Navigation ─── */
const Nav = ({ dark, toggleDark, scrolled }) => {
  const links = ['Experience', 'Projects', 'Skills']
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '0.85rem 2rem',
      background: scrolled ? 'var(--glass)' : 'transparent',
      backdropFilter: scrolled ? 'var(--glass-blur)' : 'none',
      WebkitBackdropFilter: scrolled ? 'var(--glass-blur)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      transition: 'all 0.4s ease',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--on-surface)', letterSpacing: '-0.02em' }}>
        <span style={{ color: 'var(--primary)' }}>S</span>omeet
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{
            fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 600,
            color: 'var(--on-surface-variant)', textDecoration: 'none', letterSpacing: '0.02em',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.target.style.color = 'var(--primary)'}
            onMouseLeave={e => e.target.style.color = 'var(--on-surface-variant)'}
          >{l}</a>
        ))}
        <button onClick={toggleDark} style={{
          background: 'var(--surface-container)', border: 'none', cursor: 'pointer',
          borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--on-surface-variant)', transition: 'all 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--on-surface-variant)'}
        >{dark ? <SunIcon /> : <MoonIcon />}</button>
      </div>
    </nav>
  )
}

/* ─── Hero ─── */
const Hero = ({ dark }) => (
  <section style={{
    position: 'relative',
    overflow: 'hidden',
    padding: 'clamp(7rem, 14vh, 10rem) clamp(1.5rem, 4vw, 2.5rem) clamp(4.5rem, 10vh, 6.5rem)',
  }}>
    {/* Radial gradient bg */}
    <div style={{
      position: 'absolute', inset: 0, zIndex: 0,
      background: dark
        ? 'radial-gradient(ellipse 75% 55% at 45% 25%, rgba(210,141,119,0.08) 0%, transparent 65%)'
        : 'radial-gradient(ellipse 75% 55% at 45% 25%, rgba(210,141,119,0.14) 0%, transparent 65%)',
      pointerEvents: 'none',
    }} />
    <div className="animate-drift" style={{
      position: 'absolute', right: '5%', top: '12%', zIndex: 0,
      width: 320, height: 320,
      background: dark
        ? 'radial-gradient(circle, rgba(210,141,119,0.09) 0%, transparent 72%)'
        : 'radial-gradient(circle, rgba(210,141,119,0.16) 0%, transparent 72%)',
      borderRadius: '50%', filter: 'blur(44px)',
      pointerEvents: 'none',
    }} />

    <div style={{
      position: 'relative',
      zIndex: 1,
      maxWidth: 720,
      width: '100%',
      margin: '0 auto',
    }}>
      <div className="animate-fade-up" style={{ animationDelay: '0.1s', marginBottom: '1.2rem' }}>
        <span className="chip green">Available for opportunities</span>
      </div>

      <h1 className="animate-fade-up" style={{
        fontFamily: 'var(--font-display)', fontWeight: 700,
        fontSize: 'clamp(3rem, 8vw, 6.5rem)', lineHeight: 0.95,
        color: 'var(--on-surface)', letterSpacing: '-0.03em',
        animationDelay: '0.2s', marginBottom: '1.5rem',
      }}>
        Someet<br />
        <span style={{ color: 'var(--primary)', fontStyle: 'italic' }}>Sahoo.</span>
      </h1>

      <p className="animate-fade-up" style={{
        fontFamily: 'var(--font-body)', fontSize: 'clamp(1.05rem, 2.1vw, 1.2rem)',
        color: 'var(--on-surface-variant)', maxWidth: 560, lineHeight: 1.75,
        animationDelay: '0.35s', marginBottom: '2.25rem',
      }}>
        Forward Deployed Engineer — specialising in <strong style={{ color: 'var(--on-surface)', fontWeight: 600 }}>Agentic AI</strong>, <strong style={{ color: 'var(--on-surface)', fontWeight: 600 }}>RAG pipelines</strong>, and <strong style={{ color: 'var(--on-surface)', fontWeight: 600 }}>Voice AI systems</strong>.
        I own the end-to-end ML lifecycle, from scoping with enterprise customers to deploying low-latency agents in production.
      </p>

      <div className="animate-fade-up" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', animationDelay: '0.5s' }}>
        <a href="mailto:someetsahoo654@gmail.com" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'var(--primary)', color: '#fff',
          padding: '0.75rem 1.75rem', borderRadius: 'var(--radius-pill)',
          fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.88rem',
          textDecoration: 'none', boxShadow: 'var(--shadow-primary)',
          transition: 'all 0.2s', letterSpacing: '0.02em',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(210,141,119,0.4)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-primary)' }}
        ><MailIcon /> Get in touch</a>
        <a href="https://www.linkedin.com/in/someet-sahoo/" target="_blank" rel="noreferrer" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'var(--surface-container-lowest)', color: 'var(--on-surface)',
          padding: '0.75rem 1.75rem', borderRadius: 'var(--radius-pill)',
          fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.88rem',
          textDecoration: 'none', boxShadow: 'var(--shadow-md)',
          transition: 'all 0.2s', border: '1px solid var(--border)',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = 'var(--primary)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border)' }}
        ><LinkedinIcon /> LinkedIn</a>
        <a href="https://github.com/Someet-git" target="_blank" rel="noreferrer" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'var(--surface-container-lowest)', color: 'var(--on-surface)',
          padding: '0.75rem 1.75rem', borderRadius: 'var(--radius-pill)',
          fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.88rem',
          textDecoration: 'none', boxShadow: 'var(--shadow-md)',
          transition: 'all 0.2s', border: '1px solid var(--border)',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = 'var(--primary)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border)' }}
        ><GithubIcon /> GitHub</a>
      </div>
    </div>
  </section>
)

/* ─── Experience Section ─── */
const Experience = ({ dark }) => (
  <section id="experience" style={{ padding: '6rem 2rem', background: 'var(--surface-container-low)' }}>
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <div className="section-label" style={{ marginBottom: '0.5rem' }}>Career</div>
      <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '3rem' }}>Experience</h2>

      {/* Consuma.ai */}
      <div style={{
        background: 'var(--surface-container-lowest)', borderRadius: 'var(--radius-card)',
        padding: '2rem', boxShadow: 'var(--shadow-md)', marginBottom: '2rem',
        border: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--on-surface)' }}>Consuma.ai</h3>
            <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.88rem' }}>Forward Deployed Engineer</div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span className="chip green">Dec 2024 – Present</span>
            <span className="chip green">Bengaluru</span>
          </div>
        </div>
        <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          Building AI infrastructure that powers a national-scale programme serving over 10,000 schools daily. Responsible for the full ML lifecycle — from architectural decisions to production deployment.
        </p>

        {/* Architecture panels */}
        <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '0.85rem' }}>
          ↓ SYSTEM ARCHITECTURE — click any module to expand
        </div>
        {archPanels.map(p => <ArchPanel key={p.id} panel={p} dark={dark} />)}
      </div>

      {/* IIT Goa */}
      <div style={{
        background: 'var(--surface-container-lowest)', borderRadius: 'var(--radius-card)',
        padding: '2rem', boxShadow: 'var(--shadow-sm)', marginBottom: '2rem',
        border: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--on-surface)' }}>Indian Institute of Technology, Goa</h3>
            <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.88rem' }}>Research Intern · Deep Learning</div>
          </div>
          <span className="chip green">Jul – Nov 2023 · Goa</span>
        </div>
        <ul style={{ color: 'var(--on-surface-variant)', fontSize: '0.875rem', lineHeight: 1.8, paddingLeft: '1.2rem', margin: 0 }}>
          <li>Developed custom <strong>Physics-Informed Neural Networks (PINNs)</strong> from scratch using PyTorch to solve non-linear PDEs, manually optimising complex loss landscapes and gradient flows.</li>
          <li>Benchmarked novel architectures against traditional numerical solvers, reducing computational overhead while maintaining high-fidelity accuracy.</li>
        </ul>
      </div>

      {/* IOCL */}
      <div style={{
        background: 'var(--surface-container-lowest)', borderRadius: 'var(--radius-card)',
        padding: '2rem', boxShadow: 'var(--shadow-sm)',
        border: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--on-surface)' }}>Indian Oil Corporation Ltd.</h3>
            <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.88rem' }}>Data Analyst Intern</div>
          </div>
          <span className="chip green">Dec 2022 – Feb 2023 · Odisha</span>
        </div>
        <ul style={{ color: 'var(--on-surface-variant)', fontSize: '0.875rem', lineHeight: 1.8, paddingLeft: '1.2rem', margin: 0 }}>
          <li>Built <strong>ETL pipelines</strong> using Python and SQL to process high-frequency sensor data, establishing the structured data layer for downstream predictive analytics.</li>
          <li>Developed predictive equipment-monitoring models achieving <strong>&gt;93% accuracy</strong> by engineering robust features to handle noise and outliers in raw industrial sensor telemetry.</li>
        </ul>
      </div>
    </div>
  </section>
)

/* ─── Projects ─── */
const projects = [
  {
    id: 'scribe',
    icon: '🎙️',
    title: 'Scribe',
    full: 'Multi-Agent Audio Transcription Platform',
    tags: ['Voice AI', 'Full-Stack', 'Multi-Agent'],
    url: 'https://crewscribe-ai.vercel.app/',
    github: null,
    description: 'Architected a full-stack platform using FastAPI, React, and Supabase, orchestrating a multi-agent system to process and transcribe large media files via Google Gemini, incorporating local speaker diarization to track speaker context across boundaries.',
    bullets: [
      '"Worker Agents" transcribed audio chunks concurrently; a "Supervisor Agent" reconciled speaker diarization (powered by pyannote-audio) across chunk boundaries using rolling context windows.',
      'Client-side media compression via FFmpeg WASM + async FastAPI backend with WebSockets for real-time transcription progress streaming.',
    ],
    stack: ['FastAPI', 'React', 'Supabase', 'Gemini', 'Pyannote', 'Speaker Diarization', 'FFmpeg WASM', 'Redis', 'WebSockets'],
    diagram: DiagramScribe,
  },
  {
    icon: '🔍',
    title: 'Enterprise RAG',
    full: 'Workflow Automation Agent',
    tags: ['LLM Orchestration', 'RAG', 'Enterprise'],
    url: null,
    github: null,
    description: 'Built an end-to-end Retrieval-Augmented Generation pipeline using LangChain and Pinecone to ingest and query unstructured technical and business documents.',
    bullets: [
      'Advanced context engineering and dynamic document chunking strategies to minimise hallucinations and ensure grounded responses for enterprise users.',
      'Automated multi-step business workflows by chaining retrieval, reasoning, and action execution via LangGraph agents.',
    ],
    stack: ['LangChain', 'Pinecone', 'LangGraph', 'Python', 'Vector DB'],
  },
  {
    icon: '⚡',
    title: 'Edge Inference',
    full: 'Optimised Detection Engine',
    tags: ['Latency Tuning', 'Computer Vision', 'Edge AI'],
    url: null,
    github: 'https://github.com/Someet-Git/Small-drone-detection-Webapp',
    description: 'Designed a custom computer vision CNN, applying Quantization (INT8) and Pruning to compress the model and reduce inference latency by 70%.',
    bullets: [
      'Deployed compressed models onto resource-constrained edge hardware, maintaining >92% precision at real-time execution speeds.',
      'Webapp for live drone detection with the optimised model served via a lightweight Python backend.',
    ],
    stack: ['PyTorch', 'INT8 Quantization', 'Pruning', 'Edge Hardware', 'Python'],
  },
]

const ProjectCard = ({ project, dark }) => {
  const [expanded, setExpanded] = useState(false)
  const Diagram = project.diagram
  return (
    <div style={{
      background: 'var(--surface-container-lowest)', borderRadius: 'var(--radius-card)',
      padding: '1.75rem', border: `1px solid ${expanded ? 'rgba(210,141,119,0.35)' : 'var(--border)'}`,
      boxShadow: expanded ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
      transition: 'all 0.35s ease', cursor: 'pointer',
      display: 'flex', flexDirection: 'column',
    }}
      onClick={() => setExpanded(v => !v)}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.6rem' }}>{project.icon}</span>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--on-surface)', lineHeight: 1.1 }}>{project.title}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--on-surface-variant)' }}>{project.full}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
            {project.tags.map(t => <span key={t} className="chip">{t}</span>)}
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--on-surface-variant)', lineHeight: 1.7, margin: 0 }}>{project.description}</p>
        </div>
        <span style={{ color: 'var(--primary)', flexShrink: 0 }}><ChevronDown open={expanded} /></span>
      </div>

      {expanded && (
        <div style={{ marginTop: '1.25rem', animation: 'fadeUp 0.35s ease both' }} onClick={e => e.stopPropagation()}>
          <ul style={{ color: 'var(--on-surface-variant)', fontSize: '0.875rem', lineHeight: 1.8, paddingLeft: '1.2rem', marginBottom: '1.25rem' }}>
            {project.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
          {Diagram && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--primary)' }}>System architecture</div>
                {project.id && <a href={`#/diagram/${project.id}`} target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', textDecoration: 'none', color: 'var(--primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}><ExternalLink /> Full Screen</a>}
              </div>
              <div style={{
                overflowX: 'auto',
                borderRadius: '1rem',
                marginBottom: '1.25rem',
                background: dark ? 'rgba(0,0,0,0.14)' : 'rgba(242,240,233,0.75)',
                boxShadow: 'var(--shadow-sm)',
                padding: '1rem 0.75rem',
              }}>
                <Diagram dark={dark} />
              </div>
            </>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
            {project.stack.map(s => <span key={s} className="chip green">{s}</span>)}
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {project.url && (
              <a href={project.url} target="_blank" rel="noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                background: 'var(--primary)', color: '#fff', padding: '0.5rem 1.2rem',
                borderRadius: 'var(--radius-pill)', fontSize: '0.82rem', fontWeight: 600,
                textDecoration: 'none', transition: 'all 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >Live Demo <ExternalLink /></a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                background: 'var(--surface-container)', color: 'var(--on-surface)',
                padding: '0.5rem 1.2rem', borderRadius: 'var(--radius-pill)',
                fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none',
                border: '1px solid var(--border)', transition: 'all 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              ><GithubIcon /> GitHub</a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const Projects = ({ dark }) => (
  <section id="projects" style={{ padding: '6rem 2rem' }}>
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <div className="section-label" style={{ marginBottom: '0.5rem' }}>Work</div>
      <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '0.75rem' }}>Projects</h2>
      <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.95rem', marginBottom: '2.5rem', lineHeight: 1.7 }}>
        Selected builds — click any card to see technical details and stack breakdown.
      </p>
      <div style={{ display: 'grid', gap: '1.25rem' }}>
        {projects.map(p => <ProjectCard key={p.title} project={p} dark={dark} />)}
      </div>
    </div>
  </section>
)

/* ─── Skills ─── */
const skillGroups = [
  { label: 'AI & Frameworks', icon: '🧠', items: ['LangGraph', 'LangChain', 'RAG', 'Voice AI', 'Gemini', 'Whisper', 'Pyannote', 'Multi-Agent', 'Prompt Engineering', 'CoT / ToT', 'LLM Evaluation'] },
  { label: 'Backend & Cloud', icon: '☁️', items: ['Python', 'FastAPI', 'Docker', 'GCP Cloud Run', 'GCP VMs', 'BigQuery', 'AWS', 'Supabase', 'WebSockets'] },
  { label: 'Databases & Viz', icon: '🗄️', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Pinecone', 'Chroma', 'Looker Studio'] },
  { label: 'Domain & Ops', icon: '🎯', items: ['End-to-End ML Lifecycle', 'Customer-Facing Engineering', 'Latency Optimisation', 'ETL Pipelines', 'ML Evaluation'] },
]

const Skills = ({ dark }) => (
  <section id="skills" style={{ padding: '6rem 2rem', background: 'var(--surface-container-low)' }}>
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <div className="section-label" style={{ marginBottom: '0.5rem' }}>Stack</div>
      <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '2.5rem' }}>Skills</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {skillGroups.map(g => (
          <div key={g.label} style={{
            background: 'var(--surface-container-lowest)', borderRadius: 'var(--radius-card)',
            padding: '1.5rem', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.3rem' }}>{g.icon}</span>
              <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--on-surface)', letterSpacing: '0.01em' }}>{g.label}</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {g.items.map(i => <span key={i} className="chip">{i}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

/* ─── Education & Footer ─── */
const Footer = () => (
  <footer style={{ padding: '5rem 2rem 3rem', textAlign: 'center' }}>
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <div style={{
        background: 'var(--surface-container)', borderRadius: 'var(--radius-card)',
        padding: '2.5rem', marginBottom: '3rem', border: '1px solid var(--border)',
      }}>
        <div className="section-label" style={{ marginBottom: '0.5rem' }}>Education</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.4rem', color: 'var(--on-surface)', marginBottom: '0.4rem' }}>
          Institute of Chemical Technology, Mumbai
        </h3>
        <div style={{ color: 'var(--on-surface-variant)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Int MTech · Chemical Engineering</div>
        <span className="chip">CGPA 8.73</span>
      </div>

      <h2 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--on-surface)', marginBottom: '1rem', lineHeight: 1.2 }}>
        Let's build something <span style={{ color: 'var(--primary)' }}>extraordinary.</span>
      </h2>
      {/* <p style={{ color: 'var(--on-surface-variant)', marginBottom: '2rem', fontSize: '0.95rem' }}></p> */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <a href="https://cal.com/someet" target="_blank" rel="noreferrer" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'var(--primary)', color: '#fff',
          padding: '0.7rem 1.5rem', borderRadius: 'var(--radius-pill)',
          fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none',
          boxShadow: 'var(--shadow-primary)',
        }}><CalendarIcon /> Book a call</a>
        <a href="mailto:someetsahoo654@gmail.com" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'var(--surface-container)', color: 'var(--on-surface)',
          padding: '0.7rem 1.5rem', borderRadius: 'var(--radius-pill)',
          fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none',
          border: '1px solid var(--border)',
        }}><MailIcon /> Email me</a>
        <a href="https://www.linkedin.com/in/someet-sahoo/" target="_blank" rel="noreferrer" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'var(--surface-container)', color: 'var(--on-surface)',
          padding: '0.7rem 1.5rem', borderRadius: 'var(--radius-pill)',
          fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none',
          border: '1px solid var(--border)',
        }}><LinkedinIcon /> LinkedIn</a>
        <a href="https://github.com/Someet-git" target="_blank" rel="noreferrer" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'var(--surface-container)', color: 'var(--on-surface)',
          padding: '0.7rem 1.5rem', borderRadius: 'var(--radius-pill)',
          fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none',
          border: '1px solid var(--border)',
        }}><GithubIcon /> GitHub</a>
      </div>

      <div style={{ marginTop: '3rem', color: 'var(--on-surface-muted)', fontSize: '0.78rem' }}>
        Designed with <em>Lexis Antique</em> · Built with React + Vite · 2025
      </div>
    </div>
  </footer>
)

/* ─── App Root ─── */
export default function App() {
  const [dark, setDark] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [hash, setHash] = useState(window.location.hash)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const handleHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  /* Full screen diagram view route check */
  const match = hash.match(/^#\/diagram\/(.+)$/)
  if (match) {
    const diagId = match[1]
    const panel = archPanels.find(p => p.id === diagId)
    const isScribe = diagId === 'scribe'
    const DiagramRef = panel ? panel.diagram : (isScribe ? DiagramScribeDraggable : null)

    if (DiagramRef) {
      return (
        <div style={{ padding: '2rem 1rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
              background: { color: { value: 'transparent' } },
              particles: {
                number: { value: 70 },
                color: { value: '#D28D77' },
                opacity: { value: 0.2, animation: { enable: true, speed: 0.5, minimumValue: 0.1 } },
                size: { value: 2 },
                links: { enable: true, color: '#D28D77', opacity: 0.1, distance: 150 },
                move: { enable: true, speed: 0.6, direction: "top" }
              }
            }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
          />
          <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', zIndex: 10 }}>
            <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>← Back to Portfolio</a>
            <button
              onClick={() => setDark(v => !v)}
              title="Toggle Theme"
              style={{
                background: 'var(--surface-container-low)', color: 'var(--on-surface)', border: '1px solid var(--border)',
                width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s ease',
                boxShadow: 'var(--shadow-sm)'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
          <div style={{ width: '100%', maxWidth: '1200px', overflowX: 'auto', paddingBottom: '2rem' }}>
            <div style={{
              background: dark ? 'rgba(0,0,0,0.2)' : 'rgba(242,240,233,0.7)',
              padding: '2rem 1rem', borderRadius: '1rem', border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <DiagramRef dark={dark} />
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <>
      <Nav dark={dark} toggleDark={() => setDark(v => !v)} scrolled={scrolled} />
      <main>
        <Hero dark={dark} />
        <Experience dark={dark} />
        <Projects dark={dark} />
        <Skills dark={dark} />
        <Footer />
      </main>
    </>
  )
}
