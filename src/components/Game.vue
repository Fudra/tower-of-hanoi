<template>
  <div ref="hanoi"></div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { noop, useRafFn } from "@vueuse/core";
import { TimelineLite, Power3 } from "gsap/all";

import hanoiGame from "./../hanoi";
import { useStore } from "./../store";

// assets
import { ambientLight, spotLight } from "./../utils/lights";
import { floorPlane, ringShape, pegShape } from "./../utils/shapes";
import {
  COLORS,
  PEG_POSITION,
  RING_SIZE,
  RING_HEIGHT,
  ANIM_DURATION,
  MAX_HEIGHT,
} from "./../utils/constants";

import { GameMove, GameState } from "./../interfaces";

const gameMoves = ref<GameMove[]>([]);
const gameState = ref<any>({ peg: [[], [], []] });
const rings = ref<any[]>([]);

const hanoi = ref<HTMLElement | null>(null);

const state = useStore();

const calculateGameMoves = (from: number, to: number) => {
  gameMoves.value.push({
    from,
    to,
  });
};

const ringCount = computed({
  get: () => state.getters["game/getRings"],
  set: () => noop(),
});

// scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 150;
camera.position.y = -250;

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

/**
 * controls
 */
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

controls.screenSpacePanning = false;

controls.minDistance = 100;
controls.maxDistance = 500;

controls.maxPolarAngle = Math.PI / 3;
controls.update();

/**
 * lights
 */
scene.add(ambientLight);
scene.add(spotLight);

/**
 *  World
 */
const axesHelper = new THREE.AxesHelper(50);
// scene.add(axesHelper);

scene.add(floorPlane);

// add pegs
for (const number of PEG_POSITION) {
  const peg = pegShape();
  peg!.proxy!.x = number;
  scene.add(peg.object);
}

const tl = new TimelineLite();
const animateRings = (gmi: Number) => {
  const gameMoveIndex = gmi.valueOf();
  const from = gameMoves.value[gameMoveIndex].from;
  const to = gameMoves.value[gameMoveIndex].to;
  const ringIndex = gameState.value.peg[from].pop();
  gameState.value.peg[to].push(ringIndex);

  const currentRing = rings.value[ringIndex];

  tl.to(currentRing.proxy, {
    duration: ANIM_DURATION,
    ease: Power3.easeInOut,
    keyframes: [
      {
        y: RING_HEIGHT * gameState.value.peg[from].length,
        x: PEG_POSITION[from],
      },
      {
        y: MAX_HEIGHT,
        x: PEG_POSITION[from],
      },
      {
        y: MAX_HEIGHT,
        x: (PEG_POSITION[from] + PEG_POSITION[to]) / 2, // center
      },
      {
        y: MAX_HEIGHT,
        x: PEG_POSITION[to],
      },
      {
        y: RING_HEIGHT * (gameState.value.peg[to].length - 1),
        x: PEG_POSITION[to],
      },
    ],
  });
};

const clearValues = () => {
  tl.clear();

  console.log(scene);
  rings.value.forEach((ring) => {
    ring.object.removeFromParent();
  });

  rings.value = [];

  gameState.value.peg[0] = [];
  gameState.value.peg[1] = [];
  gameState.value.peg[2] = [];

  gameMoves.value = [];
};

const addRings = () => {
  for (let index = 0; index < ringCount.value; index++) {
    const ring = ringShape(RING_SIZE[index], COLORS[index]);
    scene.add(ring.object);
    ring.proxy.y = RING_HEIGHT * index;
    ring.proxy.x = PEG_POSITION[0];
    gameState.value.peg[0].push(index);
    rings.value.push(ring);
  }
};

watch(
  ringCount,
  () => {
    // remove reset values
    clearValues();

    // Rings
    addRings();
    hanoiGame(ringCount.value, calculateGameMoves);

    // generate Timeline
    for (let index = 0; index < gameMoves.value.length; index++) {
      animateRings(index);
    }
  },
  { immediate: true }
);

onMounted(() => {
  if (!renderer) return;
  hanoi.value!.appendChild(renderer.domElement);

  useRafFn(() => {
    controls?.update();

    renderer?.render(scene, camera);
  });
});
</script>