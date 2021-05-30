import *as THREE from './Libra/three.module.js';
import * as CONTROL from './Libra/orbitcontrols.js';
import {Ground} from './Ground.js';
import {Wheel} from "./Wheel.js";
import {cube} from "./cube.js";


let scene,camera, renderer,controls, whel, obst;

const createworld = () => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 200 );
    camera.position.z = 1;

    renderer = new THREE.WebGLRenderer({antialias: true});                                              //to enable render antialias set to true

    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setAnimationLoop( animate );
    document.body.appendChild(renderer.domElement);                                                                 //attaching render to the screen or page

    controls = new CONTROL.OrbitControls(camera,renderer.domElement);

    window.addEventListener('resize',() => {
        renderer.setSize(window.innerWidth,window.innerHeight);
        camera.aspect = window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();
    });

    const surf = new Ground();
    whel = new Wheel();
    const obst = new cube();
    scene.add(surf.getGround);
    scene.add(whel.getWheel);
    scene.add(obst.getCube);


    //cube obstacle
    /*const obstacle = new Ground();
    obst = new Cube();
    scene.add(obstacle.getGround);
    scene.add(obst.getCube);*/



}

const animate = (time) => {

    renderer.render(scene,camera);

}

createworld();