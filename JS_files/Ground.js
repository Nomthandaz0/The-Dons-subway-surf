import *as THREE from '../Libra/three.module.js';
import {cube} from './cube.js';
import {Coin} from './Coins.js';
import {SceneD} from "./SceneD.js";

class Ground {
    constructor() {
        this._Initialize(new SceneD().Scene1);
    }
    _Initialize(/*SceneF*/){
        this._world = new THREE.Group();
        const geneGround = this._generateGround();
        this._world.add(geneGround);
        //this._buildStage(SceneF);
    }

    _generateGround(){
        //road texture
        const texture = new THREE.TextureLoader().load('textures/road_texture.jpg');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(3,3000);
        const geometry = new THREE.PlaneGeometry( 1, 10000, 15 );
        const material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide} );
        const ground = new THREE.Mesh( geometry, material );
        ground.rotation.x = Math.PI / 2;
        ground.position.y = -0.2

        return ground;
    }

    /*_buildStage(SceneF) {

        let zpos = -10;
        for (let i = 0; i < SceneF.length; i++) {

            const rowd = SceneF[i];
           let xpos = -10;

            for (let k = 0; k < rowd.length; k++) {
                const desc = rowd[k];

                switch (desc){
                    case 1:
                        const box = new cube().cube;
                        //box.position.x = xpos;
                        //box.position.z = zpos;
                        this._world.add(box)
                        break;

                }
                xpos +=2;
            }

            zpos -=2;
        }

    }*/
    get getGround(){
        return this._world;
    }
}
export {Ground}