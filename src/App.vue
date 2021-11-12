<template>
  <div ref="hanoi"></div>
</template>

<script setup lang="ts">
import {onMounted, ref, render} from "vue";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {useRafFn} from "@vueuse/core";

// assets
import {ambientLight, spotLight} from "./utils/lights";
import {floorPlane, ringShape, pegShape} from "./utils/shapes";
import {PEG_POSITION} from "./utils/constants";

const hanoi = ref<HTMLElement | null>(null);

onMounted(async () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
  );

  //camera.position.set( 400, 200, 0 );
  camera.position.z = 150;
  camera.position.y = -250;

  //camera.rotation.x = 1.25;

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

  const axesHelper = new THREE.AxesHelper( 50 );
  scene.add( axesHelper );

  scene.add(floorPlane);

  // pegs
  for (const number of PEG_POSITION) {
    const peg = pegShape();
    peg.proxy.x = number;
    peg.geometry.rotateX(-Math.PI/2);
    scene.add(peg.object)
  }

  useRafFn(() => {
    controls.update();

    renderer.render(scene, camera);
  });
});
</script>
