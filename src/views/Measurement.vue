<template>
    <div class="position-relative cos-bg-dark">
        <header><Header :navTitle="'Measurement'"></Header></header>
        <div class="content">
            <div class="p-4 position-absolute cos-color-light">
                <h5 class="text-left">Before Starting</h5>
                <p class="text-left">1. Click the AR button at the bottom of the page</p>
                <p class="text-left">2. Waiting until there is a reticle on screen</p>
                <p class="text-left">3. Tap on the screen to start / stop measurement</p>
                <p class="text-left">4. The size will appears in the upper left corner of the screen, in the order of length, width, and height</p>
                <hr/>
                <p class="text-left cos-color-danger">This function is under the support of <strong>Google Play Services for AR</strong>, you may need to install first.</p>
                <p class="text-left cos-color-danger">If there is no AR button downside, your phone may not support this function.</p>
            </div>

            <!-- overlay infomation and button -->
            <div id="info-overlay">
                <b-list-group id="info-card" class="float-right mr-5">
                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                        <strong>Sizer Measurement</strong>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                        length<b-badge variant="primary" pill>{{m.length}}cm</b-badge>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                        width<b-badge variant="primary" pill>{{m.width}}cm</b-badge>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                        height<b-badge variant="primary" pill>{{m.height}}cm</b-badge>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex align-items-center">
                        <!-- <b-button variant="secondary" block size="sm" @click="saveHistory()">Save</b-button> -->
                        <b-overlay :show="loading" rounded opacity="0.6" spinner-small spinner-variant="secondary" class="d-inline-block w-100">
                            <b-button :disabled="loading" variant="secondary" block size="sm" class="cos-bg-lightblue cos-color-gray border-0 w-100" @click="saveHistory()">Save</b-button>
                        </b-overlay>
                    </b-list-group-item>

                </b-list-group>

                <div class="plain-message position-absolute my-5 py-5 text-light text-left d-flex flex-row">
                    <b-overlay :show="!hasPlain" rounded opacity="0.6" spinner-small spinner-variant="light" class="mr-3 mb-1"></b-overlay>
                    <svg v-show="hasPlain" class="mr-1 mt-1" t="1606139382881" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3017" width="16" height="16"><path d="M502.690909 502.690909m-502.690909 0a502.690909 502.690909 0 1 0 1005.381818 0 502.690909 502.690909 0 1 0-1005.381818 0Z" fill="#65CB7A" p-id="3018"></path><path d="M837.818182 279.272727c-27.927273-27.927273-68.266667-27.927273-96.19394 0L406.49697 617.50303l-142.739394-145.842424c-27.927273-24.824242-71.369697-24.824242-96.19394 3.10303-24.824242 24.824242-24.824242 68.266667 0 93.090909l189.284849 192.387879c27.927273 27.927273 68.266667 27.927273 96.193939 0L837.818182 375.466667c24.824242-24.824242 24.824242-68.266667 0-96.19394z" fill="#FFFFFF" p-id="3019"></path></svg>
                    {{message}}
                </div>

                <b-button variant="danger" class="position-absolute my-4 mx-2 px-3 py-2" id="exit-scene">Exit</b-button>
            </div>

            <!-- camera scene -->
            <a-scene webxr="requiredFeatures: hit-test, local-floor; optionalFeatures: dom-overlay; overlayElement: #info-overlay" vr-mode-ui="enterVRButton: #enterVRButton;" embedded ar-control exit-ar="exitARElId: #exit-scene">
                <a-camera></a-camera>
                <!-- <a-entity geometry="primitive: box; width: 1; depth: 1; height: 1" id="reticle" scale="0.5 0.5 0.5" position="0 0 -2"></a-entity> -->
            </a-scene>
        </div>
        <!-- hide enter VR button -->
        <div id="enterVRButton"></div>
    </div>
</template>

<script>
// aframe 2020-05-06 release
import aframe from "../assets/aframe-master0506.min.js"
// import aframe from 'aframe';

// use different version of three.js
// import * as THREE from "../assets/three.min.js"
// delete window.THREE;
// window.THREE=THREE;
// console.log(THREE.REVISION);

import BufferGeometryUtils from "../assets/BufferGeometryUtils.js"

import Header from "@/components/Header.vue";

export default {
    name: 'Measurement',

    data(){
        return{
            scene: null, // three.js scene object
            sceneEl: null, // aframe scene element
            camera: null, // three.js camera object
            renderer: null, // aframe scene renderer
            controller: null, // renderer controller
            reticle: null, // three.js reticle object
            hitTestSource: null,
            hitTestSourceRequested: false,
            pointList: [], // store two select points
            line: null,
            loading: false,
            lines: [],
            message: "Detecting plain...",
            hasPlain: false,
            
            // size information
            m: {
                length: 0,
                width: 0,
                height: 0
            },
            sizeLength: 0
        }
    },

    components: {
        Header,
	},

    mounted(){
        this.$$global.adjustHeight();
        this.ARControl();
        this.exitARControl();
    },

    methods:{
        ARControl(){
            let _this = this; // get Vue's this
            AFRAME.registerComponent('ar-control', {
                init: function () {
                    // get renender from aframe scene
                    _this.renderer = this.el.sceneEl.renderer;
                    _this.renderer.xr.enabled = true;

                    // get controller and add listerer
                    _this.controller = _this.renderer.xr.getController(0);
                    _this.controller.addEventListener('select', _this.onSelect);

                    // get scene
                    let scene = document.querySelector("a-scene");
                    let sceneEl = scene.object3D;
                    _this.scene = sceneEl;
                    _this.sceneEl = this.el;

                    // get three.js camera object
                    _this.camera = document.querySelector("a-camera").object3D.children[0];

                    _this.initReticle();
                    sceneEl.add(_this.reticle);
                    // console.log(document.querySelector("#reticle").object3D)
                    // _this.reticle=document.querySelector("#reticle").object3D;
                },
                tick: function(){
                    // render every frame
                    _this.render();
                }
            })
        },

        exitARControl(){
            let _this = this; // get Vue's this
            AFRAME.registerComponent('exit-ar', {
                schema: {
                    exitARElId: {type: 'selector'}
                },
                init: function () {
                    // add exit AR button listener
                    this.data.exitARElId.addEventListener('click', function(){
                        _this.renderer.xr.getSession().end();
                    });
                }
            });
        },

        storeSize(cm){
            if(this.sizeLength==0){
                this.m.length=cm;
            }else if(this.sizeLength==1){
                this.m.width=cm;
            }else if(this.sizeLength==2){
                this.m.height=cm;
            }else if(this.sizeLength>=3){
                this.sizeLength=0;
                this.m.length=cm;
                this.m.width=0;
                this.m.height=0;
            }
            this.sizeLength++;
        },

        saveHistory(){
            let date = new Date();
            this.$$history.store({
                "type": "Measurement",
                "date": parseInt(parseInt(date.getMonth())+1)+"/"+date.getDate()+" "+date.getHours()+":"+date.getMinutes(),
                "data": {
                    "0": {
                        "position": [0,0,0],
                        "size": [this.m.length, this.m.width, this.m.height]
                    }
                }
            });

            this.loading=true;

            this.$router.push({ name: "BuildScene" ,query:{ 
				length: this.m.length,
				width: this.m.width,
				height: this.m.height
			}});
        },

        initLine(point){
            let lineMaterial = new THREE.LineBasicMaterial({
                color: 0xffffff,
                linewidth: 5,
                linecap: 'round'
            });

            let lineGeometry = new THREE.BufferGeometry().setFromPoints([point, point]);
            return new THREE.Line(lineGeometry, lineMaterial);
        },

        updateLine(matrix){
            let positions = this.line.geometry.attributes.position.array;
            positions[3] = matrix.elements[12]
            positions[4] = matrix.elements[13]
            positions[5] = matrix.elements[14]
            this.line.geometry.attributes.position.needsUpdate = true;
            this.line.geometry.computeBoundingSphere();
        },

        initReticle() {
            let ring = new THREE.RingBufferGeometry(0.045, 0.05, 32).rotateX(- Math.PI / 2);
            let dot = new THREE.CircleBufferGeometry(0.005, 32).rotateX(- Math.PI / 2);
            this.reticle = new THREE.Mesh(
                BufferGeometryUtils.mergeBufferGeometries([ring, dot]),
                new THREE.MeshBasicMaterial()
            );
            this.reticle.matrixAutoUpdate = false;
            this.reticle.visible = false;
        },

        onSelect() {
            if (this.reticle.visible) {
                // get point vector
                let pVector = new THREE.Vector3();
                pVector.setFromMatrixPosition(this.reticle.matrix);

                // store point
                this.pointList.push(pVector);

                if (this.pointList.length == 2) {
                    // calculate distance
                    let preDistance = this.pointList[0].distanceTo(this.pointList[1]);
                    let distance = Math.round(preDistance * 100);
                    this.storeSize(distance);
                    
                    this.pointList = [];
                    this.line = null;
                } else {
                    // get line
                    this.line = this.initLine(this.pointList[0]);
                    // remove old lines
                    if(this.scene.children.length > 7){
                        this.scene.children.pop();
                        this.scene.children.pop();
                        this.scene.children.pop();
                    }
                    // add line
                    this.scene.add(this.line);
                }
            }
        },

        render() {
            let _this = this;
            let frame = this.sceneEl.frame;
            // get frame to make sure enter AR mode
            if (frame) {
                let referenceSpace = this.renderer.xr.getReferenceSpace();
                let session = this.renderer.xr.getSession();

                if (this.hitTestSourceRequested === false) {
                    session.requestReferenceSpace('viewer').then(function (referenceSpace) {
                        session.requestHitTestSource({ space: referenceSpace }).then(function (source) {
                            _this.hitTestSource = source;
                        });
                    });
                    session.addEventListener('end', function () {
                        _this.hitTestSourceRequested = false;
                        _this.hitTestSource = null;
                    });
                    this.hitTestSourceRequested = true;
                }

                if (this.hitTestSource) {
                    let hitTestResults = frame.getHitTestResults(this.hitTestSource);

                    if (hitTestResults.length) { // plain detected
                        let hit = hitTestResults[0];
                        this.reticle.visible = true;
                        this.reticle.matrix.fromArray(hit.getPose(referenceSpace).transform.matrix);
                        this.message = "Plain detected!"
                        this.hasPlain = true;
                    } else {
                        this.message = "Detecting plain..."
                        this.hasPlain = false;
                        this.reticle.visible = false;
                    }

                    if (this.line) {
                        this.updateLine(this.reticle.matrix);
                    }
                }

            }
            this.renderer.render(this.scene, this.camera);
        },
    },
}
</script>

<style scoped>
a-scene {
    height: 85vh;
    width: 100%;
}

#info-overlay{
    display: none;
}

#info-overlay:xr-overlay{
    display: block;
    z-index: 9999;
}

#info-card{
    width: 50%;
    transform: rotate(90deg);
    opacity: 0.7;
}

#exit-scene{
    bottom: 0;
    right: 0;
    transform: rotate(90deg);
    opacity: 0.7;
}

.plain-message{
    transform: rotate(90deg);
    opacity: 0.7;
}
</style>