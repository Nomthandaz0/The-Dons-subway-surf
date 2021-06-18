import *as THREE from '../Libra/three.module.js';
import {Cube2} from './Cube2.js';
import {Coins_2} from './Coins_2.js';
import {Wheel_2} from "./Wheel_2.js";
import {CollisionHandler} from "./CollisionHandler2.js";


class Ground_2 {
    constructor(camera) {
        this._Initialize(camera);
    }
    _Initialize(camera ){
        this._world = new THREE.Group();
        this._wheel = new Wheel_2(camera);
        this._collisionHandler = new CollisionHandler();
        this._coin = new Coins_2();
        this._cube = new Cube2();
        const geneGround = this._generateGround();
        this._world.add(geneGround);
        this._world.add(this._wheel.getWheel2);
        this._world.add(this._coin.getCoin2);
        this._world.add(this._cube.getCube2);


        const cubeGroup = this._cube.getCube2;
        for(let i=0; i<cubeGroup.children.length; i++){
            const cubeChild = cubeGroup.children[i];
            this._collisionHandler.addCollidableObject(cubeChild, CollisionHandler.obstacle);
        }

        const coinGroup = this._coin.getCoin2;
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
        ground.position.y = -0.2;

        return ground;
    }

    bindKey2(Keycode, state){
        this._wheel.bindKeyPress2(Keycode, state);
    }

    get getGround2(){
        return this._world;
    }

    animateGround2 (time) {
        this._wheel.animateWheel2(time);
        this._collisionHandler.detectCollision(this._wheel);

    }
}
export {Ground_2}