<template>
  <div ref="hanoi"></div>

  <info-modal :show="state.getters['base/isModalAboutOpen']" @close="() => state.dispatch('base/closeAboutModal')"/>
  <controls @openInfoModal="() => state.dispatch('base/openAboutModal')" />
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {useRafFn} from "@vueuse/core";
import {TimelineLite, Power3} from 'gsap/all'
import hanoiGame from "./hanoi";
import {useStore} from "./store";


// @ts-ignore-next-line
import InfoModal from './components/InfoModal.vue'
import Controls from './components/Controls.vue'

// modals 
// todo move to vuex store

const state = useStore();




// assets
import {ambientLight, spotLight} from "./utils/lights";
import {floorPlane, ringShape, pegShape} from "./utils/shapes";
import {COLORS, PEG_POSITION, RING_SIZE, RING_COUNT, RING_HEIGHT, ANIM_DURATION, MAX_HEIGHT} from "./utils/constants";
import {GameMove, GameState} from "./interfaces";

const hanoi = ref<HTMLElement | null>(null);

const gameMoves = ref<GameMove[]>([]);
const gameState = ref<any>({peg: [[], [], []]});
const rings = ref<any[]>([]);


const calculateGameMoves = (from: number, to: number) => {
  gameMoves.value.push({
    from,
    to,
  });
};


onMounted(async () => {
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
  renderer.setClearColor(0xFFFFFF, 1)
  hanoi.value!.appendChild(renderer.domElement);

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
  scene.add(axesHelper);

  scene.add(floorPlane);

  // pegs
  for (const number of PEG_POSITION) {
    const peg = pegShape();
    peg.proxy.x = number;
    scene.add(peg.object)
  }

  // Rings
  for (let index = 0; index < RING_COUNT; index++) {
    const ring = ringShape(RING_SIZE[index], COLORS[index]);
    scene.add(ring.object);
    ring.proxy.y = RING_HEIGHT * index;
    ring.proxy.x = PEG_POSITION[0];
    gameState.value.peg[0].push(index);
    rings.value.push(ring);
  }

  hanoiGame(RING_COUNT, calculateGameMoves);

  const tl = new TimelineLite()
  const animateRings = (gameMoveIndex: number) => {
    const from = gameMoves.value[gameMoveIndex].from.toString();
    const to = gameMoves.value[gameMoveIndex].to.toString();
    const ringIndex = gameState.value.peg[from].pop();
    gameState.value.peg[to].push(ringIndex);

    const currentRing = rings.value[ringIndex];

    tl.to(currentRing.proxy, {
      duration: ANIM_DURATION,
      ease: Power3.easeOut,
      keyframes: [
        {
          y: RING_HEIGHT * (gameState.value.peg[from].length - 1),
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
  }

  // generate Timeline
  for (let index = 0; index < gameMoves.value.length; index++) {
    animateRings(index);
  }

  useRafFn(() => {
    controls.update();

    renderer.render(scene, camera);
  });
});
</script>
