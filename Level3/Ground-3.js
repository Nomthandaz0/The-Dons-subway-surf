import *as THREE from '../Libra/three.module.js';
import {Cube3} from './Cube3.js';
import {Coins_3} from './Coins-3.js';
import {SceneD} from "../JS_files/SceneD.js";
import {Wheel3} from "./Wheel-3.js";
import {CollisionHandler} from "../JS_files/CollisionHandler.js";


class Ground_3 {
    constructor(camera) {
        this._Initialize(camera, new SceneD().Scene1);
    }
    _Initialize(camera ,SceneF){
        this._world = new THREE.Group();
        this._wheel = new Wheel3(camera);
        this._collisionHandler = new CollisionHandler();
        this._coin = new Coins_3();
        this._cube = new Cube3();
        const geneGround = this._generateGround();
        this._world.add(geneGround);
        this._world.add(this._wheel.getWheel);
        this._world.add(this._coin.getCoin3);
        this._world.add(this._cube.getCube3);


       /* const cubeGroup = this._cube.getCube3;
        for(let i=0; i<cubeGroup.children.length; i++){
            const cubeChild = cubeGroup.children[i];
            this._collisionHandler.addCollidableObject(cubeChild, CollisionHandler.obstacle);
        }

        const coinGroup = this._coin.getCoin3;
        for(let i=0; i<coinGroup.children.length; i++){
            const coinChild = coinGroup.children[i];
            this._collisionHandler.addCollidableObject(coinChild, CollisionHandler.reward);
        }*/
        // this._buildStage(SceneF);
    }

    _generateGround(){
        //road texture
        const texture = new THREE.TextureLoader().load('textures/road_texture.jpg');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(3,3000);
        const geometry = new THREE.PlaneGeometry( 1, 10000, 15 );
        const material = new THREE.MeshPhongMaterial( {map: texture, side: THREE.DoubleSide} );
        const ground = new THREE.Mesh( geometry, material );
        ground.receiveShadow = true;
        ground.rotation.x = Math.PI / 2;
        ground.position.y = -0.2;

        return ground;
    }

    bindKey3(Keycode, state){
        this._wheel.bindKeyPress(Keycode, state);
    }

    get getGround3(){
        return this._world;
    }

    animateGround3 (time) {
        this._wheel.animateWheel(time);
        //this._collisionHandler.detectCollision(this._wheel);

    }
}
export {Ground_3}