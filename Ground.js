import *as THREE from './Libra/three.module.js';

class Ground {
    constructor() {
        this._world = new THREE.Group();
        const geneGround = this._generateGround();
        geneGround.rotation.x = Math.PI/2;
        geneGround.position.y =-0.2

        this._world.add(geneGround);
    }

    _generateGround(){
        const geometry = new THREE.PlaneGeometry( 1, 30, 15 );
        const material = new THREE.MeshBasicMaterial( {color: 0x3e3e31, side: THREE.DoubleSide} );
        return new THREE.Mesh( geometry, material );

    }

    get getGround(){
        return this._world;
    }
}
export {Ground}