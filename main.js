import "./style.css";
import * as THREE from "three"
// import { RGBELoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/Addons.js";

// Set up the camera 
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,100);
camera.position.z = 5;

const radius = 1;
const segments = 32;
const colors = ["red", "green", "blue", "yellow"]
const spheres = new THREE.Group();

for(let i=0; i<4; i++) {
  const geometry = new THREE.SphereGeometry(radius,segments,segments);
  const material = new THREE.MeshBasicMaterial({ color: colors[i] , antialias: true });
  const sphere = new THREE.Mesh(geometry, material);
  spheres.add(sphere);
}

scene.add(spheres);

// Set up the renderer
const renderer = new THREE.WebGLRenderer({ canvas : document.querySelector("canvas"), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Set up orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
