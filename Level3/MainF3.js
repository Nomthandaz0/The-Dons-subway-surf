import *as THREE from '../Libra/three.module.js';
import * as CONTROL from '../Libra/OrbitControls.js';
import {Ground_3} from './Ground-3.js';

let scene3,camera, renderer,controls, ground3,gameIsPaused = true;

const level3Button = document.getElementById("level1");
level3Button.addEventListener('click',() => {

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

    scene3 = new THREE.Scene();
    Skybox3();
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

    ground3 = new Ground_3(camera);
    scene3.add(ground3.getGround3);


    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });


    window.addEventListener('keydown', (e) => {                                 // movement of the wheel
        if(e.code === 'Enter') pauseGame();
        ground3.bindKey3(e.code, true);
    });
    window.addEventListener('keyup',(e)=>{                                      // slowing down/stopping
        ground3.bindKey3(e.code, false);
    });
};

const pauseGame = () => {
    gameIsPaused = true;
    document.getElementById('gameOver').style.display = 'flex';
    document.getElementById('level1a').addEventListener('click', () => {
        setGameOnPlay();
    });
}

const initLights = () =>{
    const light = new THREE.HemisphereLight( 0xffffbb, 0x080820 );
    light.position.set(0,200,0);
    scene3.add( light );

    const shadowBound = 20;
    const dirLight = new THREE.DirectionalLight( 0xffffff );
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

    scene3.add( dirLight );

    const helper = new THREE.DirectionalLightHelper( dirLight,5);
    scene3.add( helper );
    const shadowHelper = new THREE.CameraHelper( dirLight.shadow.camera );
    scene3.add( shadowHelper );

}

const Skybox3 = () => {
    const loader = new THREE.CubeTextureLoader();
    scene3.background = loader.load(
        [
            './SkyBox3/negx.jpg',
            './SkyBox3/negy.jpg',
            './SkyBox3/negz.jpg',
            './SkyBox3/posx.jpg',
            './SkyBox3/posy.jpg',
            './SkyBox3/posz.jpg'
        ]
    );
}

const animate = (time) => {
    renderer.render(scene3,camera);
    if(gameIsPaused) return;
    controls.update();
    ground3.animateGround3(time);

}

createworld();