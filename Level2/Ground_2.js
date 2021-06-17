import *as THREE from '../Libra/three.module.js';
import {Cube2} from './Cube2.js';
import {Coins_2} from './Coins_2.js';
import {SceneD} from "../JS_files/SceneD.js";
import {Wheel_2} from "./Wheel_2.js";
import {CollisionHandler} from "../JS_files/CollisionHandler.js";


class Ground_2 {
    constructor(camera) {
        this._Initialize(camera, new SceneD().Scene1);
    }
    _Initialize(camera ,SceneF){
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


    /* _buildStage(SceneF) {

         for(let r=0; r<10; r++ ) {
             let zPos = -0.5;
             let zPos2 = -0.5;

             for (let i = 0; i < SceneF.length; i++) {  //6
                 const rowD = SceneF[i];
                 let xPos = 0.3;
                 let xPos2 = 0.3;


                 for (let k = 0; k < rowD.length; k++) {
                     const desc = rowD[k];

                     switch (desc) {
                         case 1:
                             const coin = new Coin().getCoin;
                             coin.position.x = xPos;
                             coin.position.z = zPos;
                             this._world.add(coin);
                             this._collisionHandler.addCollidableObject(coin, CollisionHandler.reward);
                             break;

                         case 2:
                             const cubes = new cube().getCube;
                             cubes.position.x = xPos2;
                             cubes.position.z = zPos2;
                             this._world.add(cubes);
                             this._collisionHandler.addCollidableObject(cubes, CollisionHandler.obstacle);
                             break;
                     }

                     xPos -= 0.3;
                     xPos2 -= 0.3;

                 }

                 zPos -= 0.5;
                 zPos2 -= 0.5;

             }
         }
     }*/

    bindKey2(Keycode, state){
        this._wheel.bindKeyPress2(Keycode, state);
    }

    get getGround2(){
        return this._world;
    }

    animateGround2 (time) {
        this._wheel.animateWheel2(time);
        //this._collisionHandler.detectCollision(this._wheel);

    }
}
export {Ground_2}