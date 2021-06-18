import *as THREE from '../Libra/three.module.js';

class Cube2{

    constructor() {
        this._group = new THREE.Group();

        for (let i=0; i<100; i++) {

            const cub = this._generateCube();
            cub.scale.set(0.1, 0.1, 0.1);

            cub.position.x += 0.3;
            cub.position.z += -0.45-50*i;
            cub.position.y -= 0.10;

            this._group.add(cub);
            this._group.castShadow = true;
            this._group.receiveShadow = true

        }

        for (let k=1; k<100; k++) {

            const cub = this._generateCube();
            cub.scale.set(0.1, 0.1, 0.1);
            this._group.add(cub)

            cub.position.x -= 0.3;
            cub.position.z += -0.45-25*k;
            cub.position.y -= 0.10;
            this._group.add(cub);
        }

    }

    _generateCube(){
        const texture3 = new THREE.TextureLoader().load('textures/box.jpg');
        texture3.wrapS = THREE.RepeatWrapping;
        texture3.wrapT = THREE.RepeatWrapping;
        texture3.repeat.set(1,1);
        const geometry = new THREE.BoxGeometry( 2, 2, 2 );
        const material = new THREE.MeshPhongMaterial( {map: texture3, side: THREE.DoubleSide} );
        return new THREE.Mesh( geometry, material );
    }

    get getCube2(){
        return this._group;
    }

}
export {Cube2};
