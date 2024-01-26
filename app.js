import * as THREE from 'three';

// cube.rotation.x = 0.5;
// cube.scale.set(2,2,2);
// scene.add(cube);
// console.log(cube.id, cube.name);
// console.log(cube);


// console.log(camera.id);





// setInterval(() => {
//     cube.rotation.y += 0.055;
//     renderer.render(scene, camera);
// }, 1000 / 60);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
// scene.fog = new THREE.Fog(0x000000, 100, 150);

const geometry = new THREE.DodecahedronGeometry(1, 0);
const material = [
    new THREE.MeshBasicMaterial({ color: 0x00DfFF, wireframe: true }),
    new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true }),
    new THREE.MeshBasicMaterial({ color: 0xFFFF00, wireframe: true }),
    new THREE.MeshDepthMaterial({wireframe: true }),
    new THREE.MeshNormalMaterial({wireframe: true }),
];

let cubes = []
let angle = 0;
let pause = false;

for (let i = 0; i < 1000; i++) {
    const cube = new THREE.Mesh(geometry, material[Math.floor(Math.random()*material.length)]);
    cube.userData.r = Math.random()*0.075;
    cubes.push(cube);
    cube.rotation.set(Math.random(), Math.random(), Math.random());
    cube.position.set((Math.random() - 0.5) * 150, (Math.random() - 0.5) * 150, (Math.random() - 0.5) * 150);
    const scale = Math.random()*3.5;
    cube.scale.set(scale, scale, scale);
    scene.add(cube);
}

const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, aspect, 1, 5000);

const renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const raycaster = new THREE.Raycaster();

function render (){

    if(!pause){
        angle += document.querySelector('input[type="range"].speed').value*0.0001;
        cubes = cubes.map((cube)=>{
        cube.rotation.x += cube.userData.r;
        cube.rotation.y += cube.userData.r;
        cube.rotation.z += cube.userData.r;
        return cube;
        });

        camera.position.x = Math.sin(angle) * document.querySelector('input[type="range"].dist').value*0.1;
        camera.position.z = Math.cos(angle) * document.querySelector('input[type="range"].dist').value*0.1;
        camera.position.y = Math.sin(angle) * document.querySelector('input[type="range"].dist').value*0.1;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);

    }
    requestAnimationFrame(render);
}

render();

document.addEventListener('keyup', (e)=>{
    if(e.key==" "){
        pause = !pause;
    }
});

// setInterval(() => {
    
//     renderer.render(scene, camera);
// }, 1000 / 60);