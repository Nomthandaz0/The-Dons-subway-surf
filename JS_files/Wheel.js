import *as THREE from '../Libra/three.module.js';
//import {CollisionHandler} from "./CollisionHandler.js";

class Wheel{

    constructor(worldCamera) {
        this._wheel = new THREE.Group();
        this._KeyBind = new THREE.Group();
        this._camera =  worldCamera ;
        const wheelObj = this._generateObj();
        wheelObj.scale.set(0.01,0.01,0.01);
        wheelObj.rotation.y = Math.PI/2;
        wheelObj.position.y +=0.05;
        this._forwardSpeed = 0.05;


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
        const movef = this._KeyBind ['ArrowUp'];
        const moveL = this._KeyBind['ArrowLeft'];
        const moveR = this._KeyBind['ArrowRight'];
        const moved = this._KeyBind ['ArrowDown'];
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
        if (moved) {
            this._wheel.position.z +=this._forwardSpeed;
            this._camera.position.z  +=this._forwardSpeed;
        }


        this._wheel.position.z -= 0.1;
        this._camera.position.z -= 0.1;
        this._camera.lookAt(this._wheel.position);
        const pos = 0.001*Math.sin(time/100);
        this._wheel.position.y +=pos;

    }

    /*onCollision(type){
    if (type === CollisionHandler.obstacle){
        this._forwardSpeed = 0;
        console.log('collison occured');
    }
    }*/



}
export {Wheel};