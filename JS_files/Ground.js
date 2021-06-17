import *as THREE from '../Libra/three.module.js';
import {cube} from './cube.js';
import {Coin} from './Coin.js';
import {SceneD} from "./SceneD.js";
import {Wheel} from "./Wheel.js";
import {CollisionHandler} from "./CollisionHandler.js";


class Ground {
    constructor(camera) {
        this._Initialize(camera, new SceneD().Scene1);
    }
    _Initialize(camera ,SceneF){
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


        const cubeGroup = this._cube.getCube;
        for(let i=0; i<cubeGroup.children.length; i++){
            const cubeChild = cubeGroup.children[i];
            this._collisionHandler.addCollidableObject(cubeChild, CollisionHandler.obstacle);
        }

        const coinGroup = this._coin.getCoin;
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
        ground.position.y = -0.2

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