import *as THREE from './Libra/three.module.js';

class Wheel{

    constructor() {
        this._wheel = new THREE.Group();

        const wheelobj = this._generateObj();
        wheelobj.scale.set(0.01,0.01,0.01);
        wheelobj.rotation.y = Math.PI/2;
        wheelobj.position.y -=0.05;

        this._wheel.add(wheelobj);

    }
    _generateObj(){
        const geometry = new THREE.TorusGeometry( 10, 5, 16, 100 );
        const material = new THREE.MeshNormalMaterial();
        return new THREE.Mesh( geometry, material );

    }

    get getWheel(){
        return this._wheel;
    }

}
export {Wheel};