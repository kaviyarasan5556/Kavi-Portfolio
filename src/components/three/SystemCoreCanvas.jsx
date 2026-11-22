import { Edges, Line } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AdditiveBlending, CanvasTexture, MathUtils, SRGBColorSpace, Vector3 } from 'three';
import { coreOrbitSkills } from '@/data/coreScene';
import { useTheme } from '@/lib/stores';

/* ------------------------------------------------------------------ */
/* Scene constants (module scope: built once, never during render)      */
/* ------------------------------------------------------------------ */

const UI_POSITION = new Vector3(-2.05, 0.95, 0.5);
const API_POSITION = new Vector3(0, 0, 0);
const DB_POSITION = new Vector3(2.05, -0.95, -0.3);

const HUB_LABELS = [
  { text: 'Frontend', position: [-2.05, 1.72, 0.5] },
  { text: 'Backend', position: [0, -1.05, 0.15] },
  { text: 'Data', position: [2.05, -1.72, -0.3] },
];

const SATELLITES = [
  [-0.9, -1.75, 0.9],
  [1.2, 1.8, -0.8],
  [0.3, 1.25, 1.55],
  [-1.55, -0.4, -1.6],
  [1.75, 0.6, 1.3],
  [-0.2, -1.5, -1.45],
];

const UI_TILES = [
  [-0.44, 0.26],
  [0, 0.26],
  [0.44, 0.26],
  [-0.44, -0.26],
  [0, -0.26],
  [0.44, -0.26],
];

/** The two primary links: interface to API, API to database. */
const MAIN_LINKS = [
  [UI_POSITION, API_POSITION],
  [API_POSITION, DB_POSITION],
];

/** Request and response "packets" travelling along the primary links. */
const PACKETS = MAIN_LINKS.flatMap((_, link) =>
  [0, 1, 2].map((slot) => ({ link, phase: slot / 3, reverse: slot === 1 })),
);

/** Scene radius the camera has to fit, in world units (includes skill badges). */
const SCENE_RADIUS = 3.35;

const LABEL_CYCLE_MS = 2600;

const palettes = {
  dark: {
    body: '#1d1d21',
    edge: '#ffb224',
    glow: '#ffc247',
    link: '#ffb224',
    ring: '#5a5850',
    halo: 0.42,
    labelInk: '#edebe6',
    labelFill: 'rgba(19, 19, 21, 0.92)',
    labelStroke: 'rgba(255, 178, 36, 0.55)',
    labelAccentFill: 'rgba(255, 178, 36, 0.16)',
    labelAccentStroke: '#ffb224',
  },
  light: {
    body: '#22211e',
    edge: '#d98a00',
    glow: '#f5a000',
    link: '#b06c00',
    ring: '#a8a297',
    // Additive light does not read on a pale background.
    halo: 0,
    labelInk: '#141413',
    labelFill: 'rgba(255, 255, 255, 0.94)',
    labelStroke: 'rgba(20, 20, 19, 0.2)',
    labelAccentFill: 'rgba(255, 178, 36, 0.22)',
    labelAccentStroke: '#8a4f00',
  },
};

/**
 * Soft radial gradient used for the halos. One small canvas texture, built on
 * first use. Additive sprites give the glow without a full-screen
 * post-processing pass, which keeps frame time and shader compilation low.
 */
let haloTexture = null;

function getHaloTexture() {
  if (haloTexture) return haloTexture;

  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext('2d');
  if (context) {
    const gradient = context.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2,
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.25, 'rgba(255, 255, 255, 0.45)');
    gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.1)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);
  }

  haloTexture = new CanvasTexture(canvas);
  return haloTexture;
}

function Halo({ palette, size }) {
  if (palette.halo === 0) return null;

  return (
    <sprite scale={[size, size, 1]} renderOrder={2}>
      <spriteMaterial
        map={getHaloTexture()}
        color={palette.glow}
        opacity={palette.halo}
        blending={AdditiveBlending}
        depthWrite={false}
        depthTest={false}
        toneMapped={false}
        transparent
      />
    </sprite>
  );
}

/* ------------------------------------------------------------------ */
/* Skill badges (canvas textures — no DOM, stays readable while spinning) */
/* ------------------------------------------------------------------ */

const labelTextureCache = new Map();

function roundRect(context, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + r, y);
  context.arcTo(x + width, y, x + width, y + height, r);
  context.arcTo(x + width, y + height, x, y + height, r);
  context.arcTo(x, y + height, x, y, r);
  context.arcTo(x, y, x + width, y, r);
  context.closePath();
}

function getLabelTexture(text, palette, accent) {
  const key = `${text}|${palette.labelInk}|${accent ? 'a' : 'n'}`;
  const cached = labelTextureCache.get(key);
  if (cached) return cached;

  const dpr = Math.min(typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1, 2);
  const fontSize = 22;
  const padX = 16;
  const padY = 9;
  const measure = document.createElement('canvas').getContext('2d');
  measure.font = `600 ${fontSize}px ui-monospace, "JetBrains Mono", Menlo, monospace`;
  const textWidth = Math.ceil(measure.measureText(text).width);
  const width = textWidth + padX * 2;
  const height = fontSize + padY * 2;

  const canvas = document.createElement('canvas');
  canvas.width = Math.ceil(width * dpr);
  canvas.height = Math.ceil(height * dpr);
  const context = canvas.getContext('2d');
  context.scale(dpr, dpr);
  context.font = measure.font;
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  roundRect(context, 0.5, 0.5, width - 1, height - 1, height / 2);
  context.fillStyle = accent ? palette.labelAccentFill : palette.labelFill;
  context.fill();
  context.strokeStyle = accent ? palette.labelAccentStroke : palette.labelStroke;
  context.lineWidth = accent ? 1.5 : 1;
  context.stroke();
  context.fillStyle = accent ? palette.labelAccentStroke : palette.labelInk;
  context.fillText(text, width / 2, height / 2 + 0.5);

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.needsUpdate = true;

  const result = { texture, aspect: width / height };
  labelTextureCache.set(key, result);
  return result;
}

/** Push a satellite label a little farther from the centre so it stays readable. */
function outward(position, extra = 0.5) {
  const vector = new Vector3(...position);
  const length = Math.max(vector.length(), 0.001);
  return vector.multiplyScalar((length + extra) / length).toArray();
}

function SkillBadge({ text, position, palette, accent = false, size = 0.34 }) {
  const { texture, aspect } = useMemo(
    () => getLabelTexture(text, palette, accent),
    [text, palette, accent],
  );

  return (
    <sprite position={position} scale={[size * aspect, size, 1]} renderOrder={4}>
      <spriteMaterial
        map={texture}
        transparent
        depthWrite={false}
        depthTest={false}
        toneMapped={false}
      />
    </sprite>
  );
}

function HubLabels({ palette }) {
  return HUB_LABELS.map((hub) => (
    <SkillBadge
      key={hub.text}
      text={hub.text}
      position={hub.position}
      palette={palette}
      accent
      size={0.4}
    />
  ));
}

/* ------------------------------------------------------------------ */
/* Parts                                                                */
/* ------------------------------------------------------------------ */

function UiCluster({ palette }) {
  return (
    <group position={UI_POSITION} rotation={[0.1, 0.5, 0]}>
      {UI_TILES.map(([x, y], index) => (
        <mesh key={index} position={[x, y, 0]}>
          <boxGeometry args={[0.36, 0.44, 0.06]} />
          {index === 1 ? (
            <meshBasicMaterial color={palette.glow} toneMapped={false} />
          ) : (
            <meshLambertMaterial color={palette.body} />
          )}
          <Edges threshold={20} color={palette.edge} lineWidth={1} />
          {index === 1 && <Halo palette={palette} size={1.7} />}
        </mesh>
      ))}
    </group>
  );
}

function ApiCore({ palette }) {
  const inner = useRef(null);

  useFrame((state) => {
    if (!inner.current) return;
    const t = state.clock.elapsedTime;
    inner.current.rotation.x = t * 0.6;
    inner.current.rotation.y = t * 0.9;
    inner.current.scale.setScalar(1 + Math.sin(t * 2.2) * 0.06);
  });

  return (
    <group position={API_POSITION}>
      <mesh>
        <boxGeometry args={[1.1, 1.1, 1.1]} />
        <meshLambertMaterial color={palette.body} transparent opacity={0.55} />
        <Edges threshold={20} color={palette.edge} lineWidth={1.5} />
      </mesh>
      <mesh ref={inner}>
        <octahedronGeometry args={[0.36, 0]} />
        <meshBasicMaterial color={palette.glow} toneMapped={false} />
      </mesh>
      <Halo palette={palette} size={2.6} />
    </group>
  );
}

function DbStack({ palette }) {
  return (
    <group position={DB_POSITION} rotation={[0.25, 0, 0.1]}>
      {[0.3, 0, -0.3].map((y, index) => (
        <mesh key={y} position={[0, y, 0]}>
          <cylinderGeometry args={[0.52, 0.52, 0.2, 40]} />
          {index === 0 ? (
            <meshBasicMaterial color={palette.glow} toneMapped={false} />
          ) : (
            <meshLambertMaterial color={palette.body} />
          )}
          <Edges threshold={20} color={palette.edge} lineWidth={1} />
          {index === 0 && <Halo palette={palette} size={2.2} />}
        </mesh>
      ))}
    </group>
  );
}

function Satellites({ palette }) {
  // Six badges at a time; the full stack cycles through so nothing is left out.
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setTick((current) => current + 1), LABEL_CYCLE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      {SATELLITES.map((position, index) => {
        const skill = coreOrbitSkills[(tick + index) % coreOrbitSkills.length];

        return (
          <group key={index}>
            <mesh position={position} rotation={[index, index * 0.7, 0]}>
              <boxGeometry args={[0.17, 0.17, 0.17]} />
              <meshLambertMaterial color={palette.body} />
              <Edges threshold={20} color={palette.edge} lineWidth={1} />
            </mesh>
            <Line
              points={[API_POSITION, position]}
              color={palette.link}
              lineWidth={1}
              transparent
              opacity={0.22}
            />
            <SkillBadge text={skill} position={outward(position)} palette={palette} />
          </group>
        );
      })}
    </>
  );
}

function Links({ palette }) {
  return (
    <>
      {MAIN_LINKS.map(([from, to], index) => (
        <Line
          key={index}
          points={[from, to]}
          color={palette.link}
          lineWidth={1.5}
          transparent
          opacity={0.6}
        />
      ))}
    </>
  );
}

function Packets({ palette }) {
  const meshes = useRef([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    PACKETS.forEach((packet, index) => {
      const mesh = meshes.current[index];
      if (!mesh) return;
      const progress = (t * 0.32 + packet.phase) % 1;
      const [from, to] = MAIN_LINKS[packet.link];
      mesh.position.lerpVectors(from, to, packet.reverse ? 1 - progress : progress);
      mesh.scale.setScalar(0.35 + Math.sin(progress * Math.PI) * 0.65);
    });
  });

  return (
    <>
      {PACKETS.map((_, index) => (
        <mesh
          key={index}
          ref={(mesh) => {
            meshes.current[index] = mesh;
          }}
        >
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshBasicMaterial color={palette.glow} toneMapped={false} />
          <Halo palette={palette} size={0.55} />
        </mesh>
      ))}
    </>
  );
}

function Rings({ palette }) {
  const group = useRef(null);

  useFrame((state) => {
    if (group.current) group.current.rotation.z = state.clock.elapsedTime * 0.05;
  });

  return (
    <group ref={group}>
      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[3.2, 0.006, 6, 160]} />
        <meshBasicMaterial color={palette.ring} />
      </mesh>
      <mesh rotation={[Math.PI / 3.1, 0.6, 0]}>
        <torusGeometry args={[2.75, 0.006, 6, 160]} />
        <meshBasicMaterial color={palette.ring} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Rig: rotation from time, pointer parallax, drag and scroll           */
/* ------------------------------------------------------------------ */

const BUILD_STAGES = 4;

/**
 * Counts from 1 to `total`, one step per task, then calls `onBuilt`. The scene
 * mounts a few parts per step, so building it never blocks the page for long.
 */
function useBuildStage(total, onBuilt) {
  const [stage, setStage] = useState(1);

  useEffect(() => {
    if (stage >= total) {
      onBuilt();
      return;
    }
    const id = window.setTimeout(() => setStage(stage + 1), 0);
    return () => window.clearTimeout(id);
  }, [stage, total, onBuilt]);

  return stage;
}

function SystemCore({ palette, onBuilt }) {
  const stage = useBuildStage(BUILD_STAGES, onBuilt);
  const rig = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const drag = useRef({ active: false, lastX: 0, lastY: 0, x: 0, y: 0 });
  const canvas = useThree((state) => state.gl.domElement);

  useEffect(() => {
    const onMove = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;

      const state = drag.current;
      if (!state.active) return;
      state.x += (event.clientX - state.lastX) * 0.008;
      state.y = MathUtils.clamp(state.y + (event.clientY - state.lastY) * 0.006, -0.9, 0.9);
      state.lastX = event.clientX;
      state.lastY = event.clientY;
    };

    const onDown = (event) => {
      drag.current.active = true;
      drag.current.lastX = event.clientX;
      drag.current.lastY = event.clientY;
    };

    const onUp = () => {
      drag.current.active = false;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    window.addEventListener('pointercancel', onUp, { passive: true });
    canvas.addEventListener('pointerdown', onDown, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      canvas.removeEventListener('pointerdown', onDown);
    };
  }, [canvas]);

  useFrame((state, delta) => {
    const group = rig.current;
    if (!group) return;

    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    const scroll = MathUtils.clamp(window.scrollY / Math.max(window.innerHeight, 1), 0, 1);

    // Fit the whole scene inside the canvas, whatever its aspect ratio.
    const fit = Math.min(state.viewport.width, state.viewport.height) / (SCENE_RADIUS * 2);

    const targetY = t * 0.14 + pointer.current.x * 0.45 + drag.current.x + scroll * 1.2;
    const targetX = 0.3 + pointer.current.y * 0.25 + drag.current.y - scroll * 0.25;

    group.rotation.y = MathUtils.damp(group.rotation.y, targetY, 4, dt);
    group.rotation.x = MathUtils.damp(group.rotation.x, targetX, 4, dt);
    group.scale.setScalar(MathUtils.damp(group.scale.x, fit * (1 - scroll * 0.2), 5, dt));
    group.position.y = MathUtils.damp(group.position.y, scroll * 0.9, 5, dt);
  });

  return (
    <group ref={rig} scale={0.6}>
      <Rings palette={palette} />
      <Links palette={palette} />
      <ApiCore palette={palette} />
      {stage >= 2 && <UiCluster palette={palette} />}
      {stage >= 2 && <DbStack palette={palette} />}
      {stage >= 2 && <HubLabels palette={palette} />}
      {stage >= 3 && <Satellites palette={palette} />}
      {stage >= 4 && <Packets palette={palette} />}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Canvas                                                               */
/* ------------------------------------------------------------------ */

/**
 * Compiles every shader in the scene before the first frame is drawn. Where
 * the browser supports parallel shader compilation this happens off the main
 * thread, so the page stays responsive while the scene warms up.
 */
function Precompile({ onDone }) {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);
  const camera = useThree((state) => state.camera);

  useEffect(() => {
    let cancelled = false;
    const finish = () => {
      if (!cancelled) onDone();
    };

    // If compilation fails for any reason, draw anyway: the first frame will compile.
    gl.compileAsync(scene, camera).then(finish, finish);

    return () => {
      cancelled = true;
    };
  }, [gl, scene, camera, onDone]);

  return null;
}

/**
 * The hero centrepiece: interface tiles, an API cube and a database stack,
 * labelled with the real skill stack (hubs fixed, orbit badges cycling).
 *
 * Loaded on demand with React.lazy. DPR is capped at 1.5, shaders are
 * compiled before the first frame, and the render loop stops whenever `active`
 * is false (hero scrolled out of view).
 */
export default function SystemCoreCanvas({ active, onReady }) {
  const theme = useTheme();
  const palette = palettes[theme];
  const [built, setBuilt] = useState(false);
  const [compiled, setCompiled] = useState(false);

  const onBuilt = useCallback(() => setBuilt(true), []);
  const onCompiled = useCallback(() => {
    setCompiled(true);
    onReady();
  }, [onReady]);

  return (
    <Canvas
      flat
      dpr={[1, 1.5]}
      frameloop={active && compiled ? 'always' : 'never'}
      camera={{ position: [0, 0, 10], fov: 36 }}
      gl={{ antialias: true, alpha: true }}
      style={{ touchAction: 'pan-y' }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[-4, 6, 6]} intensity={2.4} />
      <pointLight position={[0, 0, 0]} intensity={14} color="#ffb224" distance={7} />

      <Suspense fallback={null}>
        <SystemCore palette={palette} onBuilt={onBuilt} />
        {built && <Precompile onDone={onCompiled} />}
      </Suspense>
    </Canvas>
  );
}
