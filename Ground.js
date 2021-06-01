import *as THREE from './Libra/three.module.js';
//import {Cube} from "./cube.js";


class Ground {
    constructor() {
        this._world = new THREE.Group();

        const geneGround = this._generateGround();
        geneGround.rotation.x = Math.PI / 2;
        geneGround.position.y = -0.2

        this._world.add(geneGround);

    }

    _generateGround(){
        //road texture
        const texture = new THREE.TextureLoader().load('textures/road_texture.jpg');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(3,3000);
        const geometry = new THREE.PlaneGeometry( 1, 10000, 15 );
        const material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide} );

        return new THREE.Mesh( geometry, material );

    }

    get getGround(){
        return this._world;
    }
    get getHeight(){
        return 10000;
    }
}
export {Ground}