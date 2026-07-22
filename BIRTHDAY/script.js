// Music Player Toggle
let isPlaying = false;
const bgMusic = document.getElementById('bgMusic');
const musicText = document.getElementById('musicText');

function toggleMusic() {
    if (!isPlaying) {
        bgMusic.play().then(() => {
            isPlaying = true;
            musicText.innerText = "Playing";
        }).catch(e => console.log("Audio play blocked"));
    } else {
        bgMusic.pause();
        isPlaying = false;
        musicText.innerText = "Play Music";
    }
}

// Open Envelope Message
function openEnvelope() {
    document.getElementById('envelopeView').style.display = 'none';
    document.getElementById('messageContent').style.display = 'block';
    if(!isPlaying) toggleMusic();
}

// Trigger Surprise Effect
function triggerSurprise() {
    alert("🎉 Happy Birthday! Wishing you endless happiness, love, and success! 💖✨");
}

// --- THREE.JS 3D BACKGROUND (FLOATING BALLOONS) & CAKE ---
const canvas = document.getElementById('bgCanvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Lighting for Background & Balloons
const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffb6c1, 1, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Create Floating Balloons in Background
const balloons = [];
const balloonGeo = new THREE.SphereGeometry(0.8, 32, 32);
const balloonColors = [0xffb6c1, 0xe8b4b8, 0xff9a9e, 0xffc0cb, 0xffe6f0];

for (let i = 0; i < 15; i++) {
    const mat = new THREE.MeshStandardMaterial({ 
        color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
        roughness: 0.2,
        metalness: 0.1
    });
    const balloon = new THREE.Mesh(balloonGeo, mat);
    
    balloon.position.x = (Math.random() - 0.5) * 25;
    balloon.position.y = -15 - Math.random() * 15;
    balloon.position.z = -10 - Math.random() * 10;
    
    balloon.speed = 0.03 + Math.random() * 0.04;
    balloon.initialX = balloon.position.x;

    scene.add(balloon);
    balloons.push(balloon);
}

camera.position.z = 15;

// --- 3D CAKE RENDER SCENE ---
const cakeContainer = document.getElementById('cakeContainer');
const cakeScene = new THREE.Scene();
const cakeCamera = new THREE.PerspectiveCamera(45, cakeContainer.clientWidth / cakeContainer.clientHeight, 0.1, 1000);
const cakeRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

cakeRenderer.setSize(cakeContainer.clientWidth, cakeContainer.clientHeight);
cakeRenderer.setPixelRatio(window.devicePixelRatio);
cakeContainer.appendChild(cakeRenderer.domElement);

const cakeAmbient = new THREE.AmbientLight(0xffffff, 0.8);
cakeScene.add(cakeAmbient);

const cakeLight = new THREE.PointLight(0xffb6c1, 1, 100);
cakeLight.position.set(5, 5, 5);
cakeScene.add(cakeLight);

// Create 3D Birthday Cake Group
const cakeGroup = new THREE.Group();

// Bottom Layer
const baseGeo = new THREE.CylinderGeometry(2, 2, 1, 32);
const baseMat = new THREE.MeshStandardMaterial({ color: 0xffd1dc, roughness: 0.3 });
const baseMesh = new THREE.Mesh(baseGeo, baseMat);
baseMesh.position.y = -0.5;
cakeGroup.add(baseMesh);

// Top Layer
const topGeo = new THREE.CylinderGeometry(1.3, 1.3, 0.8, 32);
const topMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
const topMesh = new THREE.Mesh(topGeo, topMat);
topMesh.position.y = 0.3;
cakeGroup.add(topMesh);

// Candle
const candleGeo = new THREE.CylinderGeometry(0.12, 0.12, 1, 16);
const candleMat = new THREE.MeshStandardMaterial({ color: 0xe8b4b8 });
const candleMesh = new THREE.Mesh(candleGeo, candleMat);
candleMesh.position.y = 0.9;
cakeGroup.add(candleMesh);

// Flame
const flameGeo = new THREE.SphereGeometry(0.15, 16, 16);
const flameMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
const flameMesh = new THREE.Mesh(flameGeo, flameMat);
flameMesh.position.y = 1.5;
cakeGroup.add(flameMesh);

cakeScene.add(cakeGroup);
cakeCamera.position.z = 6;

// Animation Loop for Balloons & Cake
function animate() {
    requestAnimationFrame(animate);

    // Animate background floating balloons
    balloons.forEach((b, index) => {
        b.position.y += b.speed;
        b.position.x = b.initialX + Math.sin(Date.now() * 0.002 + index) * 1.5;
        
        // Reset position when balloon floats off screen
        if (b.position.y > 20) {
            b.position.y = -15;
            b.position.x = (Math.random() - 0.5) * 25;
            b.initialX = b.position.x;
        }
    });

    // Rotate 3D Cake
    cakeGroup.rotation.y += 0.005;

    renderer.render(scene, camera);
    cakeRenderer.render(cakeScene, cakeCamera);
}
animate();

// Blow Candles Action
let candlesBlown = false;
function blowCandles() {
    if (!candlesBlown) {
        flameMesh.visible = false;
        document.getElementById('blowCandleBtn').innerText = "Make A Wish Completed! ✨🎂";
        candlesBlown = true;
        if(!isPlaying) toggleMusic();
        alert("🕯️ Candles blown out! Your wish has been sent to the stars! 🌟");
    }
}

// Window Resize Responsiveness
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    cakeCamera.aspect = cakeContainer.clientWidth / cakeContainer.clientHeight;
    cakeCamera.updateProjectionMatrix();
    cakeRenderer.setSize(cakeContainer.clientWidth, cakeContainer.clientHeight);
});