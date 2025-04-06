// Set up basic variables
let scene, camera, renderer, carModel;

// Initialize the scene
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Set up the renderer
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Add ambient light and directional light
const ambientLight = new THREE.AmbientLight(0x404040, 2); // Ambient light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Load the 3D Rolls-Royce model
const loader = new THREE.GLTFLoader();
loader.load('models/rolls-royce.gltf', function(gltf) {
    carModel = gltf.scene;
    carModel.scale.set(0.5, 0.5, 0.5); // Adjust model size
    scene.add(carModel);
}, undefined, function(error) {
    console.error(error);
});

// Set camera position
camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the car model for animation effect
    if (carModel) {
        carModel.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
}

animate();

// Resize renderer on window resize
window.addEventListener('resize', function() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;  // Smooth interaction
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
const shadowLight = new THREE.PointLight(0xffffff, 1, 10);
shadowLight.position.set(0, 5, 0);
scene.add(shadowLight);
carModel.castShadow = true;
carModel.receiveShadow = true;
