import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js';

const tireExplorerCopy = {
  title: '3D Tire Explorer',
  intro:
    'Inspect a procedurally generated tire and tap each layer to understand how it improves stability, durability, and heat resistance for UAE roads.',
  controls: {
    reset: 'Reset view',
    pause: 'Pause rotation',
    resume: 'Resume rotation'
  },
  statuses: {
    loading: 'Loading procedural viewer…',
    ready: 'Drag to rotate • Wheel/pinch to zoom'
  },
  parts: {
    tread: {
      label: 'Tread',
      name: 'Tread Blocks',
      does: 'The tread is generated from instanced blocks around the tire circumference for grip and water evacuation.',
      uae: 'In UAE heat, stable tread geometry helps maintain contact patch integrity during long highway runs.'
    },
    sidewall: {
      label: 'Sidewall',
      name: 'Sidewall',
      does: 'Sidewall rings and groove bands absorb road vibration while protecting against curb and pothole impacts.',
      uae: 'Hot pavement and pressure variations demand sidewalls that stay flexible without overheating.'
    },
    belts: {
      label: 'Belts/Casing',
      name: 'Belts & Casing',
      does: 'Inner belt hoops simulate the reinforced structure that controls tread movement and footprint stability.',
      uae: 'During high-speed motorway driving, belt stability lowers heat build-up and supports consistent wear.'
    },
    bead: {
      label: 'Bead',
      name: 'Bead Zone',
      does: 'Dual bead rings represent where the tire locks tightly to the rim seat to prevent slippage.',
      uae: 'On long, hot trips, secure bead seating protects against pressure stress and maintains handling response.'
    },
    innerLiner: {
      label: 'Inner liner',
      name: 'Inner Liner',
      does: 'An inner torus shell models the air-retention barrier that limits oxygen diffusion.',
      uae: 'Strong inner-liner retention is critical in UAE temperatures to preserve inflation and fuel efficiency.'
    }
  }
};

function init3DTireExplorer() {
  const root = document.querySelector('[data-tire-explorer]');
  if (!root) return;

  const canvasHost = root.querySelector('[data-tire-canvas]');
  const statusEl = root.querySelector('[data-tire-status]');
  const infoName = root.querySelector('[data-info-name]');
  const infoDoes = root.querySelector('[data-info-does]');
  const infoUae = root.querySelector('[data-info-uae]');
  const pauseBtn = root.querySelector('[data-tire-pause]');
  const resetBtn = root.querySelector('[data-tire-reset]');
  const partBtns = [...root.querySelectorAll('[data-part]')];

  let engine = null;
  let activePart = 'tread';
  let autoRotatePaused = false;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) autoRotatePaused = true;

  const setInfo = (partKey) => {
    const part = tireExplorerCopy.parts[partKey];
    if (!part) return;
    activePart = partKey;
    infoName.textContent = part.name;
    infoDoes.textContent = part.does;
    infoUae.textContent = part.uae;
    partBtns.forEach((btn) => btn.classList.toggle('is-active', btn.dataset.part === partKey));
    engine?.highlightPart(partKey);
  };

  const setPauseButtonLabel = () => {
    pauseBtn.textContent = autoRotatePaused ? tireExplorerCopy.controls.resume : tireExplorerCopy.controls.pause;
  };

  const observer = new IntersectionObserver(
    async (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || engine) continue;
        statusEl.textContent = tireExplorerCopy.statuses.loading;
        engine = await createTireScene(canvasHost, {
          reducedMotion,
          getAutoRotatePaused: () => autoRotatePaused
        });
        setInfo(activePart);
        setPauseButtonLabel();
        statusEl.textContent = tireExplorerCopy.statuses.ready;
      }
    },
    { threshold: 0.2 }
  );

  observer.observe(root);

  partBtns.forEach((btn) => {
    btn.addEventListener('click', () => setInfo(btn.dataset.part));
  });

  pauseBtn.addEventListener('click', () => {
    autoRotatePaused = !autoRotatePaused;
    setPauseButtonLabel();
  });

  resetBtn.addEventListener('click', () => {
    engine?.resetView();
  });

  setInfo(activePart);
  setPauseButtonLabel();

  const teardown = () => {
    observer.disconnect();
    engine?.dispose();
  };

  window.addEventListener('beforeunload', teardown, { once: true });
}

async function createTireScene(host, options) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(host.clientWidth, host.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, host.clientWidth / host.clientHeight, 0.1, 100);
  camera.position.set(4.4, 2.7, 5.2);

  const hemi = new THREE.HemisphereLight(0xdde9ff, 0x171717, 0.8);
  const key = new THREE.DirectionalLight(0xffffff, 1.1);
  key.position.set(5, 6, 4);
  const fill = new THREE.DirectionalLight(0x8cc4ff, 0.5);
  fill.position.set(-4, 2, -3);
  scene.add(hemi, key, fill);

  const world = new THREE.Group();
  world.rotation.x = 0.35;
  scene.add(world);

  const parts = buildProceduralTire(world);

  let targetYaw = world.rotation.y;
  let targetPitch = world.rotation.x;
  let distance = 9;
  let interacting = false;
  let pointerId = null;
  let last = { x: 0, y: 0 };

  const pointerDown = (event) => {
    interacting = true;
    pointerId = event.pointerId;
    last = { x: event.clientX, y: event.clientY };
    renderer.domElement.setPointerCapture(pointerId);
  };

  const pointerMove = (event) => {
    if (!interacting || event.pointerId !== pointerId) return;
    const dx = event.clientX - last.x;
    const dy = event.clientY - last.y;
    targetYaw += dx * 0.008;
    targetPitch += dy * 0.006;
    targetPitch = THREE.MathUtils.clamp(targetPitch, -0.3, 1.1);
    last = { x: event.clientX, y: event.clientY };
  };

  const pointerUp = (event) => {
    if (event.pointerId !== pointerId) return;
    interacting = false;
    pointerId = null;
    renderer.domElement.releasePointerCapture(event.pointerId);
  };

  const wheel = (event) => {
    event.preventDefault();
    distance = THREE.MathUtils.clamp(distance + event.deltaY * 0.008, 6.8, 12);
  };

  renderer.domElement.addEventListener('pointerdown', pointerDown);
  renderer.domElement.addEventListener('pointermove', pointerMove);
  renderer.domElement.addEventListener('pointerup', pointerUp);
  renderer.domElement.addEventListener('pointercancel', pointerUp);
  renderer.domElement.addEventListener('wheel', wheel, { passive: false });

  let rafId = 0;
  let running = true;
  let inView = true;

  const rootObserver = new IntersectionObserver(
    (entries) => {
      inView = entries[0]?.isIntersecting ?? true;
    },
    { threshold: 0.05 }
  );
  rootObserver.observe(host.closest('[data-tire-explorer]'));

  const visHandler = () => {
    running = !document.hidden;
  };
  document.addEventListener('visibilitychange', visHandler);

  const resizeObserver = new ResizeObserver(() => {
    if (!host.clientWidth || !host.clientHeight) return;
    camera.aspect = host.clientWidth / host.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(host.clientWidth, host.clientHeight);
  });
  resizeObserver.observe(host);

  const loop = () => {
    rafId = requestAnimationFrame(loop);
    if (!running || !inView) return;

    if (!interacting && !options.getAutoRotatePaused() && !options.reducedMotion) {
      targetYaw += 0.003;
    }

    world.rotation.y = THREE.MathUtils.lerp(world.rotation.y, targetYaw, 0.1);
    world.rotation.x = THREE.MathUtils.lerp(world.rotation.x, targetPitch, 0.1);

    camera.position.set(
      Math.cos(world.rotation.y + 0.55) * distance,
      2.8,
      Math.sin(world.rotation.y + 0.55) * distance
    );
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  };
  loop();

  const resetView = () => {
    targetYaw = 0;
    targetPitch = 0.35;
    distance = 9;
  };

  const highlightPart = (part) => {
    Object.entries(parts).forEach(([name, targets]) => {
      const isActive = name === part;
      targets.forEach((entry) => {
        entry.material.emissiveIntensity = isActive ? entry.boost : entry.base;
        if (entry.material.roughness !== undefined) {
          entry.material.roughness = isActive ? Math.max(0.25, entry.material.roughness - 0.22) : entry.defaultRoughness;
        }
      });
    });
  };

  const dispose = () => {
    cancelAnimationFrame(rafId);
    document.removeEventListener('visibilitychange', visHandler);
    resizeObserver.disconnect();
    rootObserver.disconnect();
    renderer.domElement.removeEventListener('pointerdown', pointerDown);
    renderer.domElement.removeEventListener('pointermove', pointerMove);
    renderer.domElement.removeEventListener('pointerup', pointerUp);
    renderer.domElement.removeEventListener('pointercancel', pointerUp);
    renderer.domElement.removeEventListener('wheel', wheel);

    scene.traverse((node) => {
      if (!node.isMesh) return;
      node.geometry?.dispose();
      const mats = Array.isArray(node.material) ? node.material : [node.material];
      mats.forEach((mat) => mat?.dispose?.());
    });

    renderer.dispose();
    renderer.domElement.remove();
  };

  return { highlightPart, resetView, dispose };
}

function buildProceduralTire(group) {
  const darkRubber = new THREE.MeshStandardMaterial({ color: 0x1a1d22, roughness: 0.9, metalness: 0.04, emissive: 0x07211a, emissiveIntensity: 0.03 });
  const mediumRubber = new THREE.MeshStandardMaterial({ color: 0x252a30, roughness: 0.8, metalness: 0.06, emissive: 0x063f31, emissiveIntensity: 0.02 });
  const beltMaterial = new THREE.MeshStandardMaterial({ color: 0x30353a, roughness: 0.65, metalness: 0.15, emissive: 0x0b2f43, emissiveIntensity: 0.02 });
  const linerMaterial = new THREE.MeshStandardMaterial({ color: 0x101419, roughness: 0.55, metalness: 0.08, emissive: 0x07305a, emissiveIntensity: 0.03, side: THREE.BackSide });

  const tireBody = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.85, 60, 190), darkRubber.clone());
  tireBody.rotation.x = Math.PI / 2;
  group.add(tireBody);

  const sidewallBands = [];
  for (let i = 0; i < 4; i += 1) {
    const band = new THREE.Mesh(new THREE.TorusGeometry(1.95 + i * 0.05, 0.02, 12, 110), mediumRubber.clone());
    band.rotation.x = Math.PI / 2;
    band.scale.set(1, 1, 0.96 + i * 0.01);
    group.add(band);
    sidewallBands.push(band);
  }

  const treadGeom = new THREE.BoxGeometry(0.42, 0.22, 0.12);
  const treadMaterial = mediumRubber.clone();
  treadMaterial.roughness = 0.72;
  const treadCount = 88;
  const treadMesh = new THREE.InstancedMesh(treadGeom, treadMaterial, treadCount);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < treadCount; i += 1) {
    const angle = (i / treadCount) * Math.PI * 2;
    const lateral = (i % 2 === 0 ? -1 : 1) * 0.21;
    dummy.position.set(Math.cos(angle) * 2.2, Math.sin(angle) * 2.2, lateral);
    dummy.lookAt(0, 0, lateral);
    dummy.rotateY(Math.PI / 2);
    dummy.rotateX((i % 3) * 0.05);
    dummy.updateMatrix();
    treadMesh.setMatrixAt(i, dummy.matrix);
  }
  treadMesh.instanceMatrix.needsUpdate = true;
  group.add(treadMesh);

  const beltA = new THREE.Mesh(new THREE.TorusGeometry(2.02, 0.07, 20, 120), beltMaterial.clone());
  const beltB = new THREE.Mesh(new THREE.TorusGeometry(2.08, 0.05, 20, 120), beltMaterial.clone());
  beltA.rotation.x = Math.PI / 2;
  beltB.rotation.x = Math.PI / 2;
  group.add(beltA, beltB);

  const beadLeft = new THREE.Mesh(new THREE.TorusGeometry(1.48, 0.08, 20, 120), darkRubber.clone());
  const beadRight = beadLeft.clone();
  beadLeft.rotation.x = Math.PI / 2;
  beadRight.rotation.x = Math.PI / 2;
  beadLeft.position.z = -0.5;
  beadRight.position.z = 0.5;
  group.add(beadLeft, beadRight);

  const innerLiner = new THREE.Mesh(new THREE.TorusGeometry(1.58, 0.42, 40, 130), linerMaterial.clone());
  innerLiner.rotation.x = Math.PI / 2;
  group.add(innerLiner);

  const rimSilhouette = new THREE.Mesh(
    new THREE.CylinderGeometry(0.95, 0.95, 0.8, 44, 1, true),
    new THREE.MeshStandardMaterial({ color: 0x48505a, roughness: 0.48, metalness: 0.4 })
  );
  rimSilhouette.rotation.z = Math.PI / 2;
  group.add(rimSilhouette);

  const mapPart = (targets, base, boost) => targets.map((mesh) => ({ material: mesh.material, defaultRoughness: mesh.material.roughness, base, boost }));

  return {
    tread: mapPart([treadMesh], 0.02, 0.45),
    sidewall: mapPart([tireBody, ...sidewallBands], 0.03, 0.4),
    belts: mapPart([beltA, beltB], 0.02, 0.5),
    bead: mapPart([beadLeft, beadRight], 0.03, 0.56),
    innerLiner: mapPart([innerLiner], 0.03, 0.52)
  };
}

function hydrateTireExplorer() {
  const root = document.querySelector('[data-tire-explorer]');
  if (!root) return;

  root.querySelector('[data-title]').textContent = tireExplorerCopy.title;
  root.querySelector('[data-intro]').textContent = tireExplorerCopy.intro;
  root.querySelector('[data-tire-reset]').textContent = tireExplorerCopy.controls.reset;
  root.querySelector('[data-tire-pause]').textContent = tireExplorerCopy.controls.pause;
  root.querySelector('[data-tire-status]').textContent = tireExplorerCopy.statuses.loading;

  [...root.querySelectorAll('[data-part]')].forEach((btn) => {
    const key = btn.dataset.part;
    btn.textContent = tireExplorerCopy.parts[key]?.label || key;
  });

  init3DTireExplorer();
}

hydrateTireExplorer();
