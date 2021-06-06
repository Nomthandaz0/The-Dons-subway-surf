import *as THREE from '../Libra/three.module.js';

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
        this._wheel.castShadow = true;
        this._wheel.receiveShadow = true;

    }
    _generateObj(){
        const texture2 = new THREE.TextureLoader().load('textures/wh.jpg');
        texture2.rotation = THREE.Math.degToRad(10);
        texture2.wrapS = THREE.RepeatWrapping;
        texture2.wrapT = THREE.RepeatWrapping;
        texture2.repeat.set(1,1);
        const geometry = new THREE.TorusGeometry( 10, 5, 16, 100 );
        const material = new THREE.MeshPhongMaterial({map: texture2, side: THREE.DoubleSide});
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
       // const moveD = this._KeyBind['ArrowDown'];
        if (movef) {
            this._wheel.position.z -=0.05;
            this._camera.position.z  -=0.05;
        }
        if(moveL){
            this._wheel.position.x  -=0.05;
        }
        if(moveR){
            this._wheel.position.x +=0.05;
        }
        /*if(moveD){
            this._wheel.position.z +=0.05;
            this._camera.position.z +=0.05;
        }*/
        this._wheel.position.z -= 0.1;
        this._camera.position.z -= 0.1;
        this._camera.lookAt(this._wheel.position);
        const pos = 0.005*Math.sin(time/100);
        this._wheel.position.y +=pos;

    }

    onCollision(type){}
}
export {Wheel};