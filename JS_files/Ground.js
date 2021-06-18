import *as THREE from '../Libra/three.module.js';
import {cube} from './cube.js';
import {Coin} from './Coin.js';
import {Wheel} from "./Wheel.js";
import {CollisionHandler} from "./CollisionHandler.js";


class Ground {
    constructor(camera) {
        this._Initialize(camera);
    }
    _Initialize(camera){
        this._world = new THREE.Group();
        this._wheel = new Wheel(camera);
        this._collisionHandler = new CollisionHandler();
        this._coin = new Coin();
        this._cube = new cube();
        const geneGround = this._generateGround();
        this._world.add(geneGround);
        this._world.add(this._wheel.getWheel);
        this._world.add(this._coin.getCoin);
        this._world.add(this._cube.getCube);

        /**
         *passing cube as an obstacle
         */

        const cubeGroup = this._cube.getCube;
        for(let i=0; i<cubeGroup.children.length; i++){
            const cubeChild = cubeGroup.children[i];
            this._collisionHandler.addCollidableObject(cubeChild, CollisionHandler.obstacle);
        }

        /**
         *passing coin as a reward
         */
        const coinGroup = this._coin.getCoin;
        for(let i=0; i<coinGroup.children.length; i++){
            const coinChild = coinGroup.children[i];
            this._collisionHandler.addCollidableObject(coinChild, CollisionHandler.reward);
        }
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
        ground.position.y = -0.2

        return ground;
    }

    bindKey(Keycode, state){
        this._wheel.bindKeyPress(Keycode, state);
    }

    get getGround(){
        return this._world;
    }

    animateGround (time) {
        this._wheel.animateWheel(time);
        this._collisionHandler.detectCollision(this._wheel);
    }
}
export {Ground}