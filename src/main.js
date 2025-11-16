import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

//Scene en camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 5, 24); //outside house

//Background
const backgroundTexture = new THREE.TextureLoader().load('./images/spacebackground.jpg');
scene.background = backgroundTexture;

//Loading textures
const outsideWallTexture = new THREE.TextureLoader().load('./images/outsidewall.jpg');
const roofTexture = new THREE.TextureLoader().load('./images/roofTexture.avif');
const grassTexture = new THREE.TextureLoader().load('./images/grassTexture.avif');
const paintingTexture = new THREE.TextureLoader().load('./images/pixel-avatar.jpg');
const floorTexture = new THREE.TextureLoader().load('./images/floorTexture.jpg');

//Overal light setup
const light = new THREE.AmbientLight(0x404040);
light.intensity = 16;
scene.add(light);

//Sun
const sunSphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sunSphereMaterial = new THREE.MeshBasicMaterial({ color: 0xedca00 });
const sunSphere = new THREE.Mesh(sunSphereGeometry, sunSphereMaterial);
sunSphere.position.set(20, 20, 10);
scene.add(sunSphere);
const sun = new THREE.DirectionalLight(0xffffff, 1);
sun.position.set(20, 30, 10);
scene.add(sun);

// Objects //
//Grass
const grassGeometry = new THREE.BoxGeometry(30, 0.2, 20);
const grassMaterial = new THREE.MeshStandardMaterial({
  map: grassTexture,
});
const grass = new THREE.Mesh(grassGeometry, grassMaterial);
grass.position.set(3, -3, 0);
scene.add(grass);

//Walls
const wall1Geometry = new THREE.BoxGeometry(0.2, 6, 12);
const wall1Material = new THREE.MeshStandardMaterial({
  map: outsideWallTexture,
})
const wall1 = new THREE.Mesh(wall1Geometry, wall1Material)
wall1.position.set(-8, 0, -1);
scene.add(wall1);

const wall2Geometry = new THREE.BoxGeometry(16, 6, 0.2);
const wall2Material = new THREE.MeshStandardMaterial({
  map: outsideWallTexture,
})
const wall2 = new THREE.Mesh(wall2Geometry, wall2Material)
wall2.position.set(0, 0, -7);
scene.add(wall2);

const wall3Geometry = new THREE.BoxGeometry(0.2, 6, 12);
const wall3Material = new THREE.MeshStandardMaterial({
  map: outsideWallTexture,
})
const wall3 = new THREE.Mesh(wall3Geometry, wall3Material)
wall3.position.set(8, 0, -1);
scene.add(wall3);

const wall4Geometry = new THREE.BoxGeometry(12, 6, 0.2);
const wall4Material = new THREE.MeshStandardMaterial({
  map: outsideWallTexture,
})
const wall4 = new THREE.Mesh(wall4Geometry, wall4Material)
wall4.position.set(-2, 0, 5);
scene.add(wall4);

//Floor
const floorGeometry = new THREE.BoxGeometry(16, 0.1, 12);
const floorMaterial = new THREE.MeshStandardMaterial({
  map: floorTexture,
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.set(0, -2.8, -1);
scene.add(floor);

//Door
const doorGeometry = new THREE.BoxGeometry(3, 6, 0.2);
const doorMaterial = new THREE.MeshStandardMaterial({
  color: 0x654321,
})
const door = new THREE.Mesh(doorGeometry, doorMaterial)
door.rotation.y = Math.PI / 0.3;
door.position.set(3.4, 0, 6.4);
scene.add(door);

const doorHandleGeometry = new THREE.SphereGeometry(0.2, 32, 32, 0, Math.PI, 0, Math.PI);
const doorHandleMaterial = new THREE.MeshStandardMaterial({
  color: 0xffff00,
})
const doorHandle = new THREE.Mesh(doorHandleGeometry, doorHandleMaterial)
doorHandle.position.set(3, -0.2, 7.2);
doorHandle.rotation.y = Math.PI / -0.6;
scene.add(doorHandle);

//Roof
const roofGeometry = new THREE.ConeGeometry(11.5, 2, 4, 10, true);
const roofMaterial = new THREE.MeshStandardMaterial({
  map: roofTexture,
});
const roof = new THREE.Mesh(roofGeometry, roofMaterial);
roof.rotation.y = Math.PI / 4;
roof.position.set(0, 4, 0);
scene.add(roof);

const ceilingGeometry = new THREE.BoxGeometry(15.8, 0.1, 15.8);
const ceilingMaterial = new THREE.MeshStandardMaterial({
  color: 0xadada6,
});
const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
ceiling.position.set(0, 3, 0);
scene.add(ceiling);

//Balustrade
const balustradeGeometry = new THREE.BoxGeometry(0.6, 6, 0.6);
const balustradeMaterial = new THREE.MeshStandardMaterial({
  // map: outsideWallTexture
  color: 0xadada6,
});
const balustrade = new THREE.Mesh(balustradeGeometry, balustradeMaterial)
balustrade.position.set(-7.5, 0, 7.5);
scene.add(balustrade);

//Lamps
function createLamp(scene, x, y, z) {
  const lampGeometry = new THREE.SphereGeometry(0.2, 32, 32);
  const lampMaterial = new THREE.MeshStandardMaterial({
    emissive: 0xe0d263,
    emissiveIntensity: 2,
  });

  const lampHolderGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 32);
  const lampHolderMaterial = new THREE.MeshStandardMaterial({
    color: 0x333333,
  });

  const lampCapGeometry = new THREE.ConeGeometry(0.6, 0.5, 32);
  const lampCapMaterial = new THREE.MeshStandardMaterial({
    color: 0x333333,
  });

  const lamp = new THREE.Mesh(lampGeometry, lampMaterial);
  lamp.position.set(x, y, z);
  scene.add(lamp);

  const lampHolder = new THREE.Mesh(lampHolderGeometry, lampHolderMaterial);
  lampHolder.position.set(x, y + 0.6, z);
  scene.add(lampHolder);

  const lampCap = new THREE.Mesh(lampCapGeometry, lampCapMaterial);
  lampCap.position.set(x, y + 0.25, z);
  scene.add(lampCap);
}

//Inside lamp
const insideLamp = createLamp(scene, 0, 2, 0);
const insideLight = new THREE.SpotLight(0xffffff, 20, 50, Math.PI / 3, 0.5, 1);
insideLight.position.set(0, 2, 0);
insideLight.castShadow = true;
scene.add(insideLight);

//Outside lamps
const outsideLamp1 = createLamp(scene, -6, 2, 6.2);
const outsideLight1 = new THREE.SpotLight(0xffffff, 3, 50, Math.PI / 6, 0.3, 1);
outsideLight1.position.set(-6, 2, 6.2);
outsideLight1.target.position.set(-6, 0, 6.2);
scene.add(outsideLight1.target);
scene.add(outsideLight1);

const outsideLamp2 = createLamp(scene, -3, 2, 6.2);
const outsideLight2 = new THREE.SpotLight(0xffffff, 3, 50, Math.PI / 6, 0.3, 1);
outsideLight2.position.set(-3, 2, 6.2);
outsideLight2.target.position.set(-3, 0, 6.2);
scene.add(outsideLight2.target);
scene.add(outsideLight2);

const outsideLamp3 = createLamp(scene, 0, 2, 6.2);
const outsideLight3 = new THREE.SpotLight(0xffffff, 3, 50, Math.PI / 6, 0.3, 1);
outsideLight3.position.set(0, 2, 6.2);
outsideLight3.target.position.set(0, 0, 6.2);
scene.add(outsideLight3.target);
scene.add(outsideLight3);

//Painting
const paintingGeometry = new THREE.PlaneGeometry(3, 3);
const paintingMaterial = new THREE.MeshStandardMaterial({
  map: paintingTexture,
  side: THREE.DoubleSide,
});
const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
painting.position.set(-4, 0, -6.8);
scene.add(painting);

//Car
function createWheel(scene, x, y, z) {
  const wheelGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 32);
  const wheelMaterial = new THREE.MeshStandardMaterial({
    color: 0x333333,
  });
  const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
  wheel.rotation.z = Math.PI / 2;
  wheel.position.set(x, y, z);
  scene.add(wheel);
};

const wheel1 = createWheel(scene, 10, -2.5, 2);
const wheel2 = createWheel(scene, 10, -2.5, -4);
const wheel3 = createWheel(scene, 14, -2.5, 2);
const wheel4 = createWheel(scene, 14, -2.5, -4);

const carBodyGeometry = new THREE.BoxGeometry(4, 1.5, 8);
const carBodyMaterial = new THREE.MeshStandardMaterial({
  color: 0xff0000,
  metalness: 0.5,
  roughness: 0.5,
});
const carBody = new THREE.Mesh(carBodyGeometry, carBodyMaterial);
carBody.position.set(12, -1.7, -1);
scene.add(carBody);

const carBodyTopGeometry = new THREE.BoxGeometry(4, 1.5, 4);
const carBodyTopMaterial = new THREE.MeshStandardMaterial({
  color: 0xff0000,
  metalness: 0.5,
  roughness: 0.5,
});
const carBodyTop = new THREE.Mesh(carBodyTopGeometry, carBodyTopMaterial);
carBodyTop.position.set(12, -0.2, -1);
scene.add(carBodyTop);

const engineGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.5, 32);
const engineMaterial = new THREE.MeshStandardMaterial({
  color: 0x555555,
  metalness: 0.8,
  roughness: 0.5,
});
const engine = new THREE.Mesh(engineGeometry, engineMaterial);
engine.rotation.set(0, Math.PI / 2, Math.PI / 2);
engine.position.set(13.5, -2, -5.1);
scene.add(engine);

const window1Geometry = new THREE.PlaneGeometry(3.8, 1.2);
const window1Material = new THREE.MeshStandardMaterial({
  color: 0x87ceeb,
});
const window1 = new THREE.Mesh(window1Geometry, window1Material);
window1.position.set(12, -0.2, 1.01);
scene.add(window1);

const window2Geometry = new THREE.PlaneGeometry(3.8, 1.2);
const window2Material = new THREE.MeshStandardMaterial({
  color: 0x87ceeb,
});
const window2 = new THREE.Mesh(window2Geometry, window2Material);
window2.position.set(12, -0.2, -3.01);
window2.rotation.y = Math.PI;
scene.add(window2);

//Car lights
function createCarLight(scene, x, y, z) {
  const carLightGeometry = new THREE.SphereGeometry(0.3, 32, 32);
  const carLightMaterial = new THREE.MeshStandardMaterial({
    emissive: 0x222222,
    emissiveIntensity: 5,
  });
  const carLight1 = new THREE.Mesh(carLightGeometry, carLightMaterial);
  carLight1.position.set(x, y, z);
  scene.add(carLight1);

  let lightsOn = false;
  setInterval(() => {
    lightsOn = !lightsOn; // switch, als het waar is, wordt het onwaar, ...

    if (lightsOn) {
      carLightMaterial.emissiveIntensity = 3;
      carLightMaterial.emissive.setHex(0xedca00);
    } else {
      carLightMaterial.emissiveIntensity = 0.1;
      carLightMaterial.emissive.setHex(0x222222);
    }
  }, 1000);
};

const carLight1 = createCarLight(scene, 10.5, -1.7, 3);
const carLight2 = createCarLight(scene, 13.5, -1.7, 3);

//Clouds
const cloudObjects = [];
const clouds = new OBJLoader();
for (let i = 0; i < 8; i++) {
  clouds.load('./assets/Cloud.obj', (obj) => {
    obj.userData.basePos = {
      x: Math.random() * 44 - 22,
      y: Math.random() * 6 + 8,
      z: Math.random() * 32 - 22
    };
    obj.position.copy(obj.userData.basePos);
    cloudObjects.push(obj);
    scene.add(obj);
  });
}

//Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

//Resize
const controls = new OrbitControls(camera, renderer.domElement);
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

function animate(time) {
  cloudObjects.forEach(cloud => {
    const b = cloud.userData.basePos;
    cloud.position.x = b.x + Math.sin(time * 0.00032) * 2;
    cloud.position.z = b.z + Math.cos(time * 0.00024) * 2;
  });

  renderer.render(scene, camera);
  controls.update();
}