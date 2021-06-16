import *as THREE from '../Libra/three.module.js';


export class CollisionHandler {

    static obstacle = 0;
    static reward = 0


    constructor() {
        this._Initialize();
    }

    _Initialize() {
        this._collidableObjs = [];
    }

    addCollidableObject(object, type) {
        this._collidableObjs.push([new THREE.Box3().setFromObject(object), type]);
    }

    detectCollision(wheel) {
        const wheelBox = new THREE.Box3().setFromObject(wheel.getWheel);

        for (const obj in this._collidableObjs) {
            const colliabledObject = this._collidableObjs[obj];
            const object = colliabledObject[0];
            const type = colliabledObject[1];

            if (wheelBox.intersectsBox(object)) {
                wheel.onCollision(type);
            }
        }

    }
}