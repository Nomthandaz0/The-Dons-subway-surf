import *as THREE from '../Libra/three.module.js';
import {CollisionHandler3} from "./CollisionHandler3.js";


class Wheel3{

    constructor(worldCamera) {

        this._score = 0;
        this._sideways =0.07;
        this._speed = 0.05;
        this._wheel = new THREE.Group();
        this._KeyBind = new THREE.Group();
        this._camera =  worldCamera ;
        this._fspeed = 0.5;
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
        const texture2 = new THREE.TextureLoader().load('textures/wheelT2.jpg');
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

    get getWheel3(){
        return this._wheel;
    }
    bindKeyPress(KeyCode , state){
        this._KeyBind[KeyCode]= state ;
    }
    animateWheel(time) {

        /**
         * wheel controls
         * forward:arrowup
         * slow speed:arrowdown
         * right:arrowright
         * left:arrowleft
         */
        const movef = this._KeyBind ['ArrowUp'];
        const moveL = this._KeyBind['ArrowLeft'];
        const moveR = this._KeyBind['ArrowRight'];
        const moved = this._KeyBind ['ArrowDown'];
        if (movef) {
            this._wheel.position.z -=this._speed;
            this._camera.position.z  -=this._speed;
        }
        if(moveL){
            this._wheel.position.x  -=this._sideways;
        }
        if(moveR){
            this._wheel.position.x +=this._sideways;
        }
        if (moved) {
            this._wheel.position.z +=0.05;
            this._camera.position.z  +=0.05;

        }

        /**
         * making the camera to move with the wheel
         */

        this._wheel.position.z -= this._fspeed;
        this._camera.position.z -= this._fspeed;
        this._camera.lookAt(this._wheel.position);
        const pos = 0.001*Math.sin(time/100);
        this._wheel.position.y +=pos;
    }

    onCollision(type){
        if (type === CollisionHandler3.obstacle){
            this._fspeed = 0;
            this._speed =0;
            this._sideways =0;
            window.location.replace("http://localhost:63342/The-Dons-subway-surf/MainF.html?_ijt=dhhkeqgu4oro69duu2fqfgot6l");
            alert(this._score)
            /**
             * wheel making no movements when it hits an obstacle
             */
        }
        if (type === CollisionHandler3.reward){
             this._score = this._score +1;
             console.log(this._score);
             this._fspeed = 0.1;
        }
    }
}
export {Wheel3};