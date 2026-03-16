// Three.js Particles Background
// Constellation effect with mouse interaction

const canvas = document.getElementById('particles-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Particle system
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 150;

const posArray = new Float32Array(particlesCount * 3);
const colorsArray = new Float32Array(particlesCount * 3);

// Primary color - cyan
const primaryColor = new THREE.Color(0x00d4ff);
// Secondary color - magenta  
const secondaryColor = new THREE.Color(0xff006e);
// Accent color - violet
const accentColor = new THREE.Color(0x8b5cf6);

for (let i = 0; i < particlesCount * 3; i += 3) {
    // Position - spread across space
    posArray[i] = (Math.random() - 0.5) * 15;
    posArray[i + 1] = (Math.random() - 0.5) * 15;
    posArray[i + 2] = (Math.random() - 0.5) * 15;
    
    // Random color from palette
    const colorChoice = Math.random();
    let color;
    if (colorChoice < 0.5) {
        color = primaryColor;
    } else if (colorChoice < 0.8) {
        color = accentColor;
    } else {
        color = secondaryColor;
    }
    
    colorsArray[i] = color.r;
    colorsArray[i + 1] = color.g;
    colorsArray[i + 2] = color.b;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

// Material
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 5;

// Mouse interaction
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
});

// Connection lines
const linesMaterial = new THREE.LineBasicMaterial({
    color: 0x00d4ff,
    transparent: true,
    opacity: 0.15,
});

const linesGeometry = new THREE.BufferGeometry();
const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
scene.add(linesMesh);

function createConnections() {
    const positions = particlesGeometry.attributes.position.array;
    const linePositions = [];
    const connectionDistance = 2.5;
    
    for (let i = 0; i < particlesCount; i++) {
        for (let j = i + 1; j < particlesCount; j++) {
            const x1 = positions[i * 3];
            const y1 = positions[i * 3 + 1];
            const z1 = positions[i * 3 + 2];
            
            const x2 = positions[j * 3];
            const y2 = positions[j * 3 + 1];
            const z2 = positions[j * 3 + 2];
            
            const distance = Math.sqrt(
                Math.pow(x2 - x1, 2) + 
                Math.pow(y2 - y1, 2) + 
                Math.pow(z2 - z1, 2)
            );
            
            if (distance < connectionDistance) {
                linePositions.push(x1, y1, z1);
                linePositions.push(x2, y2, z2);
            }
        }
    }
    
    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
}

// Animation
let time = 0;

function animate() {
    requestAnimationFrame(animate);
    
    time += 0.0005;
    
    // Smooth mouse following
    targetX += (mouseX * 0.0005 - targetX) * 0.05;
    targetY += (mouseY * 0.0005 - targetY) * 0.05;
    
    // Rotate entire system
    particlesMesh.rotation.y = time * 0.1;
    particlesMesh.rotation.x = targetY;
    particlesMesh.rotation.y += targetX;
    
    linesMesh.rotation.y = particlesMesh.rotation.y;
    linesMesh.rotation.x = particlesMesh.rotation.x;
    
    // Update connections
    createConnections();
    
    renderer.render(scene, camera);
}

animate();

// Handle resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Subtle parallax on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    particlesMesh.rotation.z = scrolled * 0.0001;
    linesMesh.rotation.z = scrolled * 0.0001;
});