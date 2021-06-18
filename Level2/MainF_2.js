import *as THREE from '../Libra/three.module.js';
import * as CONTROL from '../Libra/OrbitControls.js';
import {Ground_2} from './Ground_2.js';

let scene2,camera, renderer,controls, ground2,gameIsPaused = true;

const level2Button = document.getElementById("level2");
level2Button.addEventListener('click',() => {

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

    scene2 = new THREE.Scene();
    Skybox2();
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

    ground2 = new Ground_2(camera);
    scene2.add(ground2.getGround2);


    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });


    window.addEventListener('keydown', (e) => {                                 // movement of the wheel
        if(e.code === 'Enter') pauseGame();
        ground2.bindKey2(e.code, true);
    });
    window.addEventListener('keyup',(e)=>{                                      // slowing down/stopping
        ground2.bindKey2(e.code, false);
    });

    const audioListener = new THREE.AudioListener();
    camera.add( audioListener );
    const ocean = new THREE.Audio( audioListener );

    scene2.add( ocean );
    const loader = new THREE.AudioLoader();

    loader.load(
        './ThemeSong.mp3',
        function ( audioBuffer ) {
            ocean.setBuffer( audioBuffer );
            const music = document.getElementById("music");
            music.addEventListener('click',() => {
                ocean.resume();
            });
            ocean.play();
        },

        function ( xhr ) {
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },

        function ( err ) {
            console.log( 'An error happened' );
        }

    );

}

const pauseGame = () => {
    gameIsPaused = true;
    document.getElementById('gameOver').style.display = 'flex';
    document.getElementById('level1a').addEventListener('click', () => {
        setGameOnPlay();
    });
}

/**Light we used is directional light
 */

let dirLight;
const initLights = () =>{
    const light = new THREE.HemisphereLight( 0xffffbb, 0x080820 );
    light.position.set(0,200,0);
    scene2.add( light );

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

    scene2.add( dirLight );

    const helper = new THREE.DirectionalLightHelper( dirLight,5);
    scene2.add( helper );
    const shadowHelper = new THREE.CameraHelper( dirLight.shadow.camera );
    scene2.add( shadowHelper );

}

const Skybox2 = () => {
    const loader = new THREE.CubeTextureLoader();
    scene2.background = loader.load(
        [
            './SkyBox2/nx.png',
            './SkyBox2/ny.png',
            './SkyBox2/nz.png',
            './SkyBox2/px.png',
            './SkyBox2/py.png',
            './SkyBox2/pz.png'
        ]
    );
}

const animate = (time) => {
    renderer.render(scene2,camera);
    if(gameIsPaused) return;
    controls.update();
    ground2.animateGround2(time);
    /**
     * getting light to move with the wheel
     */
    if(dirLight){
        dirLight.position.z -= 0.05;
    }

}

createworld();