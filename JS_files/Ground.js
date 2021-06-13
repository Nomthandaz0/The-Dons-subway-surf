import *as THREE from '../Libra/three.module.js';
import {cube} from './cube.js';
import {Coin} from './Coins.js';
import {SceneD} from "./SceneD.js";
import {Wheel} from "./Wheel.js";

class Ground {
    constructor(camera) {
        this._Initialize(camera, new SceneD().Scene1);
    }
    _Initialize(camera ,SceneF){
        this._world = new THREE.Group();
        this._wheel = new Wheel(camera);
        this._coin = new Coin();
        this._cube = new cube();
        const geneGround = this._generateGround();
        this._world.add(geneGround);
        this._world.add(this._wheel.getWheel);
        this._world.add(this._coin.getCoin);
        this._world.add(this._cube.getCube);

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

    /*_buildStage(SceneF) {

        let zPos = -0.5;
        let zPos2 = -0.5;

        for (let i = 0; i < SceneF.length; i++) {  //6
            const rowD = SceneF[i];
            let xPos = 0.3;
            let xPos2 = 0.3;


            for (let k = 0; k < rowD.length; k++) {
                const desc = rowD[k];

                switch (desc){
                    case 1:
                        const coin = new Coin().getCoin;
                        coin.position.x = xPos;
                        coin.position.z = zPos;
                        this._world.add(coin);
                        break;

                    case 2:
                        const cube = new cube().getCube;
                        cube.position.x = xPos2;
                        cube.position.z = zPos2;
                        this._world.add(cube);
                        break;
                }
                xPos -=0.3;
                xPos2 -=0.3;

            }

            zPos -=1;
            zPos2 -=1;

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
    }
}
export {Ground}