import *as THREE from '../Libra/three.module.js';
import {CollisionHandler} from "./CollisionHandler2.js";

class Wheel_2{

    constructor(worldCamera) {
        this._sideways =0.07;
        this._speed = 0.5;
        this.score =0;
        this._wheel = new THREE.Group();
        this._KeyBind = new THREE.Group();
        this._camera =  worldCamera ;
        this._fspeed = 0.1;
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

    get getWheel2(){
        return this._wheel;
    }
    bindKeyPress2(KeyCode , state){
        this._KeyBind[KeyCode]= state ;
    }
    animateWheel2(time) {

        const counter = 0.5;
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
            this._wheel.position.z +=this._speed;
            this._camera.position.z  +=this._speed;
            /* const poss = counter*Math.sin(time/10000);
             this._wheel.position.y +=poss;
             this._camera.position.y +=poss;
             this._counter += 0.3;
             if(this._wheel.position.y > 0.6){
                 console.log(this._wheel.position.y)
                 this._wheel.position.y -=0.5;
                 this._camera.position.y -=0.5;
             }*/
        }


        this._wheel.position.z -= this._fspeed;
        this._camera.position.z -= this._fspeed;
        this._camera.lookAt(this._wheel.position);
        const pos = 0.001*Math.sin(time/100);
        this._wheel.position.y +=pos;
    }

    onCollision(type){
        if (type === CollisionHandler.obstacle){
            this._fspeed = 0;
            this._sideways = 0;
            this._speed = 0;
            this.gameOver();
        }

        if (type === CollisionHandler.reward){
            this.score = this.score +1;
            console.log(this.score);
            this._fspeed = 0.1;
        }
    }
    gameOver(){
        document.getElementById('score').innerHTML = "YOUR SCORE IS: " + this.score;
    }
}
export {Wheel_2};