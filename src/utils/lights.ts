  import * as THREE from 'three'
  
  // spot light example from https://github.com/mrdoob/three.js/blob/master/examples/webgl_lights_spotlight.html
  export const spotLight = new THREE.SpotLight(0xffffff, 1);
  spotLight.position.set(70, 50, 140);
  spotLight.angle = Math.PI / 4;
  spotLight.penumbra = 0.1;
  spotLight.decay = 2;
  spotLight.distance = 400;

  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 512;
  spotLight.shadow.mapSize.height = 512;
  spotLight.shadow.camera.near = 10;
  spotLight.shadow.camera.far = 200;
  spotLight.shadow.focus = 1;

  export const ambientLight = new THREE.AmbientLight(0xe8ebfb);