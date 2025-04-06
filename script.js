// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('3d-canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit controls for interactivity (rotation, zoom)
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;

// Load the 3D model of Rolls-Royce
const loader = new THREE.GLTFLoader();
let carModel = null;

// Show a loading indicator until the model is fully loaded
const loadingIndicator = document.createElement('div');
loadingIndicator.textContent = 'Loading...';
loadingIndicator.style.position = 'absolute';
loadingIndicator.style.top = '50%';
loadingIndicator.style.left = '50%';
loadingIndicator.style.transform = 'translate(-50%, -50%)';
loadingIndicator.style.color = 'white';
loadingIndicator.style.fontSize = '24px';
document.body.appendChild(loadingIndicator);

// Handle button click event to view the car model
document.getElementById('viewCarBtn').addEventListener('click', function () {
  document.getElementById('3d-container').style.display = 'block'; // Show the 3D container
  loadingIndicator.style.display = 'block'; // Show loading indicator

  // Load the car model when the button is clicked
  loader.load('path_to_your_rolls_royce_model.glb', function (gltf) {
    carModel = gltf.scene;
    scene.add(carModel);
    carModel.scale.set(2, 2, 2);  // Scale the model to fit the scene
    carModel.position.set(0, 0, 0);  // Center the car in the scene
    
    // Hide loading indicator once the model is loaded
    loadingIndicator.style.display = 'none';
  }, undefined, function (error) {
    console.error('An error occurred while loading the model: ', error);
    loadingIndicator.textContent = 'Failed to load model';
  });
});

// Set the camera position
camera.position.z = 5;

// Render loop
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Update the controls for smooth interaction
  renderer.render(scene, camera);
}
animate();

// Adjust canvas size when window is resized
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
