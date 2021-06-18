import *as THREE from '../Libra/three.module.js';

class Coins_2{

    constructor() {
        this._group = new THREE.Group();

        /**
         *Duplication of coins and giving each position
         */
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
            this._group.castShadow = true;
            this._group.receiveShadow = true;
        }

    }

    _generateCoin(){

        const geometry = new THREE.CylinderGeometry(2,2,1);
        const material = new THREE.MeshPhongMaterial({color: 0xffff00} );
        const coin = new THREE.Mesh( geometry, material );
        coin.castShadow = true;
        coin.receiveShadow = true;

        return coin;
    }
    /**
     *function for getting coins
     */
    get getCoin2(){
        return this._group;
    }

}
export {Coins_2};
