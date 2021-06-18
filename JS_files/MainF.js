import *as THREE from '../Libra/three.module.js';
import * as CONTROL from '../Libra/OrbitControls.js';
import {Ground} from './Ground.js';


let scene,camera, renderer,controls, ground,gameIsPaused = true;

const level1Button = document.getElementById("level1");

level1Button.addEventListener('click',() => {

    setGameOnPlay();
});

const setGameOnPlay = () => {
    const menus = document.getElementsByClassName('menu');
    for(let i = 0; i<menus.length; i++){
        const menu = menus[i];
        menu.style.display = 'none';
    }
    gameIsPaused = false;

}

const createworld = () => {

    scene = new THREE.Scene();
    Skybox();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.z = 1;

    renderer = new THREE.WebGLRenderer({antialias: true});                                              //to enable render antialias set to true
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);                                                                 //attaching render to the screen or page

    initLights();
    controls = new CONTROL.OrbitControls(camera, renderer.domElement);

    ground = new Ground(camera);
    scene.add(ground.getGround);


    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });


    window.addEventListener('keydown', (e) => {                                 // movement of the wheel
        if(e.code === 'Enter') pauseGame();
        ground.bindKey(e.code, true);
    });
    window.addEventListener('keyup',(e)=>{                                      // slowing down/stopping
        ground.bindKey(e.code, false);
    });

    /*const audioListener = new THREE.AudioListener();

    camera.add( audioListener );

    const ocean = new THREE.Audio( audioListener );

    scene.add( ocean );
    const loader = new THREE.AudioLoader();

    loader.load(
        './ThemeSong.mp3',
        function ( audioBuffer ) {
            ocean.setBuffer( audioBuffer );
            ocean.play();
        },

        function ( xhr ) {
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },

        function ( err ) {
            console.log( 'An error happened' );
        }

);*/


};

const pauseGame = () =>{
    gameIsPaused = true;
    document.getElementById('gameOver').style.display = 'flex';
    document.getElementById('level1a').addEventListener('click',()=>{
        setGameOnPlay();
    });
    /*const  endGame= document.getElementsByClassName('endGame');
    document.getElementById('level1a').addEventListener('click', () =>{
       GameOnPlay();
    });*/


}
/*const gameOver = () =>{
    gameIsPaused = true;
    document.getElementById('gameOver').style.display = 'flex';
    document.getElementById('level1a').addEventListener('click', ()=>{
        setGameOnPlay()
    });
}*/

let dirLight;
const initLights = () =>{
    const light = new THREE.HemisphereLight( 0xffffbb, 0x080820 );
    light.position.set(0,200,0);
    scene.add( light );

    const shadowBound = 20;
    dirLight = new THREE.DirectionalLight( 0xffffff );
    dirLight.position.set(0,20,-25);

    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 4096;
    dirLight.shadow.mapSize.height = 4096;
    dirLight.shadow.camera.top = shadowBound;
    dirLight.shadow.camera.bottom = -shadowBound;
    dirLight.shadow.camera.left = -shadowBound;
    dirLight.shadow.camera.right = shadowBound;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 1000;

    scene.add( dirLight );

    const helper = new THREE.DirectionalLightHelper( dirLight,5);
    scene.add( helper );
    const shadowHelper = new THREE.CameraHelper( dirLight.shadow.camera );
    scene.add( shadowHelper );

}

const Skybox = () => {
    const loader = new THREE.CubeTextureLoader();
    scene.background = loader.load(
        [
            './SkyBox/nx.png',
            './SkyBox/ny.png',
            './SkyBox/nz.png',
            './SkyBox/px.png',
            './SkyBox/py.png',
            './SkyBox/pz.png'
        ]
    );
}

const animate = (time) => {
    renderer.render(scene,camera);
    if(gameIsPaused) return;
    controls.update();
    ground.animateGround(time);
    if(dirLight){
       dirLight.position.z -= 0.05;
    }

}

createworld();