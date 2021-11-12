import * as THREE from 'three'

interface Vector3D {
  [index:string]: number | null;
}


export const shape = (
    inner = 13,
    outer = 20,
    height = 6,
    segments = 60,
    color = 0xd3d4ec
  ) => {
    const arc = new THREE.Shape();
    const hole = new THREE.Path();
  
    arc.moveTo(outer, 0);
    arc.absarc(0, 0, outer, 0, Math.PI * 2, false);
  
    hole.moveTo(inner, 0);
    hole.absarc(0, 0, inner, 0, Math.PI * 2, true);
    arc.holes.push(hole);
  
    const geometry = new THREE.ExtrudeGeometry(arc, {
      depth: height,
      bevelEnabled: false,
      curveSegments: segments,
    });
    const material = new THREE.MeshLambertMaterial({
      color,
    });
    const object = new THREE.Mesh(geometry, material);
  
    object.scale.x = 0.5;
    object.scale.y = 0.5;
  
    const proxy = new Proxy(
      {
        x: null,
        y: null,
        z: null,
      },
      {
        set(target: Vector3D , key: string, value: number) {
          target[key] = value;
          if (target.x !== null) {
            object.position.x = target.x;
          }
          if (target.y !== null) {
            object.position.y = target.y;
          }
          if (target.z !== null) {
            object.position.z = target.z;
          }
          return true;
        },
        get(target: Vector3D, key:string) {
          return target[key];
        },
      }
    );
  
    object.castShadow = true;
    object.receiveShadow = true;
  
    return {
      geometry: geometry,
      object: object,
      proxy: proxy,
    };
  };
export const ringShape = (outer:number, color:number) => shape(5, outer, 6, 40, color);


const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
const planeMaterial = new THREE.ShadowMaterial();
planeMaterial.opacity = 0.2;

export const floorPlane = new THREE.Mesh(planeGeometry, planeMaterial);
floorPlane.position.y = -6;
floorPlane.receiveShadow = true;


// gray-500
export const pegShape = () => shape(0, 3, 60, 20, '#6B7280');
