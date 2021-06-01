import *as THREE from '../Libra/three.module.js';

class Coin{

    constructor() {
        this._group = new THREE.Group();
        let znew = -30;
             for (let i = 1; i < 10000; i++) {

                const coin = this._generateCoin();
                coin.scale.set(0.03, 0.03, 0.03);
                coin.rotation.z = Math.PI / 2;
                coin.position.z += -0.5 - i;

                if(i % 7 == 0){
                    i-=znew;
                }

                this._group.add(coin);
            }

    }

    _generateCoin(){

        const geometry = new THREE.CylinderGeometry(2,2,1);
        const material = new THREE.MeshBasicMaterial({color: 0xffff00} );
        return new THREE.Mesh( geometry, material );
    }

    get getCoin(){
        return this._group;
    }

}
export {Coin};
