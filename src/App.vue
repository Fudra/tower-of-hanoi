<template>
  <div ref="hanoi"></div>
</template>

<script setup lang="ts">
import {onMounted, ref, render} from "vue";
import * as THREE from "three";
import {useRafFn} from "@vueuse/core";

// assets
import {ambientLight, spotLight} from "./utils/lights";
import {floorPlane, ringShape, pegShape} from "./utils/shapes";
import {PEG_POSITION } from "./utils/constants";

const hanoi = ref<HTMLElement | null>(null);

onMounted(async () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
  );

  camera.position.z = 110;
  camera.position.y = -250;
  camera.rotation.x = 1.25;

  const renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xFFFFFF, 1)
  hanoi.value!.appendChild(renderer.domElement);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // add plane
  scene.add(floorPlane);

  /**
   * lights
   */
  scene.add(ambientLight);
  scene.add(spotLight);

  /**
   * Pegs
   */
  for (const number of PEG_POSITION) {
    const peg = pegShape();
    peg.proxy.x = number;
    scene.add(peg.object)
  }

  useRafFn(() => {
    renderer.render(scene, camera);
  });
  console.log({renderer, scene})
});
</script>
