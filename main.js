import * as THREE from "three"
import { RGBELoader } from "three/examples/jsm/Addons.js";
import gsap from "gsap";

// Setting up the camera 
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(25,window.innerWidth/window.innerHeight,0.1,100);
camera.position.z = 9;

// Setting up the lights and hdri 
const loader = new RGBELoader();
loader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/moonlit_golf_1k.hdr',function(texture){
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;
});

const ambientLight = new THREE.AmbientLight(0xffffff,0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5,5,5);
scene.add(directionalLight);


// Setting up the planets
const radius = 1.3;
const segments = 64;
const orbitRadius = 4.5;
const colors = ["red", "green", "blue", "yellow"];
const textures = ["./csilla/color.png","./earth/map.jpg","./venus/map.jpg","./volcanic/color.png"];
const spheres = new THREE.Group();

// ------- POSITIONING FOR 4 PLANETS --------------------------------
// Planet 1 at 0 degree : (0/4 ) * (Math.PI*2) = 0 * 360 = 0
// Planet 2 at 90 degree : (1/4 ) * (Math.PI*2) = 0.25 * 360 = 90
// Planet 3 at 180 degree : (2/4 ) * (Math.PI*2) = 0.50 * 360 = 180
// Planet 4 at 270 degree : (3/4 ) * (Math.PI*2) = 0.75 * 360 = 270

// Circle equation in 2d plane
// Postioning of X = r*cos(theta)
// Postioning of Y = r*sin(theta)

// Circle equation in 3d plane
// Postioning of X = r*cos(theta)
// Postioning of Z = r*sin(theta)    <-----

for(let i=0; i<4; i++) {
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(textures[i]);

  const geometry = new THREE.SphereGeometry(radius,segments,segments);
  const material = new THREE.MeshStandardMaterial({ map:texture });
  const sphere = new THREE.Mesh(geometry, material);


  const angle = (i/4)*(Math.PI*2);
  sphere.position.x = orbitRadius * Math.cos(angle);
  sphere.position.z = orbitRadius * Math.sin(angle);  
  spheres.add(sphere);
}

spheres.rotation.x = 0.1;
spheres.position.y = -0.8;
scene.add(spheres);

// Setting up the renderer
const renderer = new THREE.WebGLRenderer({ canvas : document.querySelector("canvas"), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Rotating up the planets 
// setInterval(()=>{
//   gsap.to(spheres.rotation,{
//     y: `+=${Math.PI/2}`,
//     duration:2,
//     ease: 'expo.easeInOut'
//   })
// },2500)

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
