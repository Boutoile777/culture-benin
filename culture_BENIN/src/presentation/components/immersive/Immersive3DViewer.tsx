import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface Immersive3DViewerProps {
  modelUrl: string;
  title: string;
  caption: string;
  onClose: () => void;
}

// Couleurs appliquées par nom de matériau glTF : le modèle ne définit pas de
// couleur sur tous ses matériaux (ils retombent sinon sur le blanc par défaut
// du glTF), donc on assigne une teinte évoquant l'architecture historique
// béninoise (murs en terre/latérite, bois foncé).
const HISTORICAL_COLORS_BY_MATERIAL_NAME: Record<string, number> = {
  "old building": 0xc88c56,
  wood: 0x6b4423,
};

interface ViewerControls {
  zoomIn: () => void;
  zoomOut: () => void;
  moveForward: () => void;
  moveBack: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  reset: () => void;
}

export function Immersive3DViewer({
  modelUrl,
  title,
  caption,
  onClose,
}: Immersive3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<ViewerControls | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let dynamicStep = 0.5;
    let initialPosition: THREE.Vector3 | null = null;
    let initialTarget: THREE.Vector3 | null = null;
    let modelGroup: THREE.Group | null = null;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x88a0b0);
    const fog = new THREE.Fog(0x88a0b0, 20, 100);
    scene.fog = fog;

    const camera = new THREE.PerspectiveCamera(
      70,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 1.6, 5);
    camera.lookAt(0, 1.6, 0);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.set(2048, 2048);
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 50;
    dirLight.shadow.camera.left = -20;
    dirLight.shadow.camera.right = 20;
    dirLight.shadow.camera.top = 20;
    dirLight.shadow.camera.bottom = -20;
    scene.add(dirLight);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.cursor = "grab";
    container.appendChild(renderer.domElement);

    const raycaster = new THREE.Raycaster();

    function getPointerDirection(clientX: number, clientY: number) {
      const rect = container!.getBoundingClientRect();
      const ndc = new THREE.Vector2(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        -((clientY - rect.top) / rect.height) * 2 + 1,
      );
      raycaster.setFromCamera(ndc, camera);
      return raycaster.ray.direction.clone().normalize();
    }

    function aimAt(clientX: number, clientY: number) {
      const direction = getPointerDirection(clientX, clientY);
      camera.lookAt(camera.position.clone().add(direction));
    }

    // ---- Glisser : regarde librement à 360° (yaw illimité, tangage limité) ----
    const ROTATE_SPEED = 0.0035;
    const PITCH_LIMIT = Math.PI / 2 - 0.01;
    let isDragging = false;
    let dragMoved = false;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let yaw = 0;
    let pitch = 0;

    function syncYawPitchFromCamera() {
      const euler = new THREE.Euler().setFromQuaternion(camera.quaternion, "YXZ");
      yaw = euler.y;
      pitch = euler.x;
    }

    function onPointerDown(e: PointerEvent) {
      isDragging = true;
      dragMoved = false;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      syncYawPitchFromCamera();
      renderer.domElement.style.cursor = "grabbing";
    }

    function onPointerMove(e: PointerEvent) {
      if (!isDragging) return;
      const dx = e.clientX - lastPointerX;
      const dy = e.clientY - lastPointerY;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;

      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) dragMoved = true;
      if (!dragMoved) return;

      yaw -= dx * ROTATE_SPEED;
      pitch -= dy * ROTATE_SPEED;
      pitch = Math.max(-PITCH_LIMIT, Math.min(PITCH_LIMIT, pitch));

      camera.quaternion.setFromEuler(new THREE.Euler(pitch, yaw, 0, "YXZ"));
    }

    function onPointerUp(e: PointerEvent) {
      if (isDragging && !dragMoved) {
        aimAt(e.clientX, e.clientY);
      }
      isDragging = false;
      dragMoved = false;
      renderer.domElement.style.cursor = "grab";
    }

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      const direction = getPointerDirection(e.clientX, e.clientY);
      camera.position.addScaledVector(direction, e.deltaY < 0 ? dynamicStep : -dynamicStep);
    }

    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerup", onPointerUp);
    renderer.domElement.addEventListener("pointerleave", onPointerUp);
    renderer.domElement.addEventListener("wheel", onWheel, { passive: false });
    renderer.domElement.addEventListener("contextmenu", (e) => e.preventDefault());

    function applyHistoricalColors(root: THREE.Object3D) {
      root.traverse((child) => {
        if (!(child instanceof THREE.Mesh) || !child.material) return;
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((mat) => {
          const hex = HISTORICAL_COLORS_BY_MATERIAL_NAME[mat.name];
          if (hex !== undefined && "color" in mat) {
            (mat as THREE.MeshStandardMaterial).color.setHex(hex);
          }
        });
      });
    }

    function placeCameraOutsideModel(root: THREE.Object3D) {
      const box = new THREE.Box3().setFromObject(root);
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(center);

      const maxDim = Math.max(size.x, size.y, size.z) || 1;
      const distance = maxDim * 0.35 + 4;

      dynamicStep = Math.max(0.05, maxDim / 50);

      camera.near = Math.max(0.1, maxDim / 500);
      camera.far = Math.max(1000, (maxDim * 1.3 + maxDim) * 4);
      camera.updateProjectionMatrix();

      fog.near = maxDim * 0.5;
      fog.far = maxDim * 1.3 + maxDim * 3;

      const lookHeight = center.y + size.y * 0.1;
      camera.position.set(center.x, lookHeight, center.z + distance);
      camera.lookAt(center.x, lookHeight, center.z);

      initialPosition = camera.position.clone();
      initialTarget = new THREE.Vector3(center.x, lookHeight, center.z);
    }

    function resetToInitialView() {
      if (!initialPosition || !initialTarget) return;
      camera.position.copy(initialPosition);
      camera.lookAt(initialTarget);
      syncYawPitchFromCamera();
    }

    function getForwardFull() {
      const dir = new THREE.Vector3();
      camera.getWorldDirection(dir);
      return dir;
    }

    function getForwardHorizontal() {
      const dir = getForwardFull();
      dir.y = 0;
      if (dir.lengthSq() < 1e-6) dir.set(0, 0, -1);
      return dir.normalize();
    }

    function getRightHorizontal() {
      return new THREE.Vector3().crossVectors(getForwardHorizontal(), camera.up).normalize();
    }

    function zoomStep(amount: number) {
      camera.position.addScaledVector(getForwardFull(), amount);
    }

    function moveStep(direction: THREE.Vector3, amount: number) {
      camera.position.addScaledVector(direction, amount);
    }

    const loader = new GLTFLoader();
    let cancelled = false;

    loader.load(
      modelUrl,
      (gltf) => {
        if (cancelled) return;
        modelGroup = gltf.scene;
        modelGroup.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material) {
              const materials = Array.isArray(child.material) ? child.material : [child.material];
              materials.forEach((mat) => {
                mat.side = THREE.DoubleSide;
              });
            }
          }
        });
        applyHistoricalColors(modelGroup);
        scene.add(modelGroup);
        placeCameraOutsideModel(modelGroup);
      },
      undefined,
      (error) => {
        console.error("Erreur de chargement du modèle 3D", error);
      },
    );

    function onResize() {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    // Expose les actions de navigation aux boutons React via une ref plutôt
    // qu'un state, pour ne jamais déclencher de re-render pendant l'animation.
    controlsRef.current = {
      zoomIn: () => zoomStep(dynamicStep),
      zoomOut: () => zoomStep(-dynamicStep),
      moveForward: () => moveStep(getForwardHorizontal(), dynamicStep),
      moveBack: () => moveStep(getForwardHorizontal(), -dynamicStep),
      moveLeft: () => moveStep(getRightHorizontal(), -dynamicStep),
      moveRight: () => moveStep(getRightHorizontal(), dynamicStep),
      reset: resetToInitialView,
    };

    return () => {
      cancelled = true;
      controlsRef.current = null;
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      renderer.domElement.removeEventListener("pointerleave", onPointerUp);
      renderer.domElement.removeEventListener("wheel", onWheel);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelUrl]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function useHoldable(action: (() => void) | undefined) {
    const intervalRef = useRef<number | null>(null);
    return {
      onPointerDown: (e: React.PointerEvent) => {
        e.preventDefault();
        action?.();
        intervalRef.current = window.setInterval(() => action?.(), 60);
      },
      onPointerUp: () => {
        if (intervalRef.current !== null) {
          window.clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      },
      onPointerLeave: () => {
        if (intervalRef.current !== null) {
          window.clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      },
    };
  }

  const zoomInHandlers = useHoldable(() => controlsRef.current?.zoomIn());
  const zoomOutHandlers = useHoldable(() => controlsRef.current?.zoomOut());
  const forwardHandlers = useHoldable(() => controlsRef.current?.moveForward());
  const backHandlers = useHoldable(() => controlsRef.current?.moveBack());
  const leftHandlers = useHoldable(() => controlsRef.current?.moveLeft());
  const rightHandlers = useHoldable(() => controlsRef.current?.moveRight());

  return (
    <div className="fixed inset-0 z-[150] bg-[#0d0d0d]">
      <div ref={containerRef} className="absolute inset-0" />

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between bg-gradient-to-b from-black/65 to-transparent p-5">
        <div className="text-white">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white/75">
            Visite immersive · Modèle 3D
          </div>
          <div className="mt-1 font-display text-lg font-medium">{title}</div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer la visite immersive"
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white transition-colors hover:bg-white/30"
        >
          ✕
        </button>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
        <p className="text-[12.5px] text-white/80">{caption}</p>
      </div>

      {/* Déplacement (glisser pour regarder à 360°, D-pad pour avancer/reculer/latéral) */}
      <div className="absolute bottom-5 left-5 grid grid-cols-3 grid-rows-3 gap-1.5">
        <button
          type="button"
          aria-label="Avancer"
          title="Avancer"
          className="col-start-2 row-start-1 flex h-11 w-11 touch-none items-center justify-center rounded-lg border border-white/25 bg-black/50 text-white hover:bg-black/70"
          {...forwardHandlers}
        >
          <ChevronUpIcon />
        </button>
        <button
          type="button"
          aria-label="Aller à gauche"
          title="Aller à gauche"
          className="col-start-1 row-start-2 flex h-11 w-11 touch-none items-center justify-center rounded-lg border border-white/25 bg-black/50 text-white hover:bg-black/70"
          {...leftHandlers}
        >
          <ChevronLeftIcon />
        </button>
        <button
          type="button"
          aria-label="Revenir à la vue initiale"
          title="Revenir à la vue initiale"
          className="col-start-2 row-start-2 flex h-11 w-11 items-center justify-center rounded-lg border border-white/25 bg-black/50 text-white hover:bg-black/70"
          onClick={() => controlsRef.current?.reset()}
        >
          <ResetIcon />
        </button>
        <button
          type="button"
          aria-label="Aller à droite"
          title="Aller à droite"
          className="col-start-3 row-start-2 flex h-11 w-11 touch-none items-center justify-center rounded-lg border border-white/25 bg-black/50 text-white hover:bg-black/70"
          {...rightHandlers}
        >
          <ChevronRightIcon />
        </button>
        <button
          type="button"
          aria-label="Reculer"
          title="Reculer"
          className="col-start-2 row-start-3 flex h-11 w-11 touch-none items-center justify-center rounded-lg border border-white/25 bg-black/50 text-white hover:bg-black/70"
          {...backHandlers}
        >
          <ChevronDownIcon />
        </button>
      </div>

      {/* Zoom */}
      <div className="absolute bottom-5 right-5 grid grid-cols-1 gap-1.5">
        <button
          type="button"
          aria-label="Zoomer"
          title="Zoomer"
          className="flex h-11 w-11 touch-none items-center justify-center rounded-lg border border-white/25 bg-black/50 text-white hover:bg-black/70"
          {...zoomInHandlers}
        >
          <ZoomInIcon />
        </button>
        <button
          type="button"
          aria-label="Dézoomer"
          title="Dézoomer"
          className="flex h-11 w-11 touch-none items-center justify-center rounded-lg border border-white/25 bg-black/50 text-white hover:bg-black/70"
          {...zoomOutHandlers}
        >
          <ZoomOutIcon />
        </button>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-20 -translate-x-1/2 rounded-full bg-black/45 px-4 py-2 text-center text-[11px] text-white/80 sm:hidden">
        Glisser : regarder autour · Icônes : avancer / zoomer
      </div>
    </div>
  );
}

function ChevronUpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px]">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}
function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px]">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px]">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px]">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
function ZoomInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-[22px] w-[22px]">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
}
function ZoomOutIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-[22px] w-[22px]">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
}
function ResetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px]">
      <path d="M3 12a9 9 0 1 1 2.64 6.36" />
      <polyline points="3 21 3 15 9 15" />
    </svg>
  );
}
