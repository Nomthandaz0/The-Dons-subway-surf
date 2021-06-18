import *as THREE from '../Libra/three.module.js';

class Obstacle2{
    constructor() {
        this._group = new THREE.Group();

        for (let i=4; i<100; i++) {

            const genePlane = this._generatePlane();
            genePlane.scale.set(0.5, 0.5, 1);
            genePlane.position.y += 0.1;
            genePlane.position.z -=i*10;
            this._group.add(genePlane);

        }
    }
    _generatePlane(){
        const geometry = new THREE.PlaneGeometry( 1, 1 );
        const material = new THREE.MeshPhongMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
        const plane = new THREE.Mesh( geometry, material );
        plane.receiveShadow = true;
        plane.receiveShadow =true

        return plane;
    }

    get getObstacle(){
        return this._group;
    }

    animateObstacle(time) {
        this._group.rotation.y =time/300;
    }

    }
export {Obstacle2}