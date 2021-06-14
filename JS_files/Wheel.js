import *as THREE from '../Libra/three.module.js';

class Wheel{

    constructor(worldCamera) {
        this._wheel = new THREE.Group();
        this._KeyBind = new THREE.Group();
        this._camera =  worldCamera ;
        this._camera.position.set(0.01806434562578374, 0.32850558343910313, 0.9443292651752567);


        const wheelObj = this._generateObj();
        wheelObj.scale.set(0.01,0.01,0.01);
        wheelObj.rotation.y = Math.PI/2;
        wheelObj.position.y -=0.04;

        this._wheel.add(wheelObj);
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
        const wheel = new THREE.Mesh( geometry, material );
        wheel.castShadow =true;
        wheel.receiveShadow =true;

        return wheel;
    }

    get getWheel(){
        return this._wheel;
    }
    bindKeyPress(KeyCode , state){
        this._KeyBind[KeyCode]= state ;
    }
    animateWheel(time) {
        const moveU = this._KeyBind ['ArrowUp'];
        const moveL = this._KeyBind['ArrowLeft'];
        const moveR = this._KeyBind['ArrowRight'];
        const moveD = this._KeyBind ['ArrowDown'];
         if (moveU) {
            this._wheel.position.y +=0.025;

        }
        if(moveL){
            this._wheel.position.x  -=0.02;
        }
        if(moveR){
            this._wheel.position.x +=0.02;
        }
        if (moveD) {
            this._wheel.position.y -=0.025;

        }


        this._wheel.position.z -= 0.1;
        this._camera.position.z -= 0.1;
        this._camera.lookAt(this._wheel.position);
        const pos = 0.001*Math.sin(time/100);
       // this._wheel.position.y +=pos;
     }

    onCollision(type){}
}
export {Wheel};