import *as THREE from './Libra/three.module.js';

class Wheel{

    constructor(worldCamera) {
        this._wheel = new THREE.Group();
        this._KeyBind = new THREE.Group();
        this._camera =  worldCamera ;
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
    bindKeyPress(KeyCode , state){
        this._KeyBind[KeyCode]= state ;
    }
    animateWheel(time) {
        const movef = this._KeyBind ['ArrowUp'];
        const moveL = this._KeyBind['ArrowLeft'];
        const moveR = this._KeyBind['ArrowRight'];
        if (movef) {
            this._wheel.position.z -=0.05;
            this._camera.position.z  -=0.05;
        }
        if(moveL){
            this._wheel.position.x  -=0.01;
        }
        if(moveR){
            this._wheel.position.x +=0.01;
        }


    }
}
export {Wheel};