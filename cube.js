import *as THREE from './Libra/three.module.js';

class cube{

    constructor(){
        this._group = new THREE.Group();
        const cub = this._generateCube();
        cub.scale.set(0.1,0.1,0.1);
        this._group.add(cub)

        cub.position.x += 0.1;
        cub.position.z += -0.45;
        cub.position.y -= 0.05;

    }

    _generateCube(){
        const geometry = new THREE.BoxGeometry( 0.5, 0.9, 1 );
        const material = new THREE.MeshBasicMaterial( {color: 0xffd700} );
        return new THREE.Mesh( geometry, material );

    }

    get getCube(){
        return this._group;
    }

}
export {cube};
