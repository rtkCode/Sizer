<template>
    <div class="position-relative cos-bg-dark">
        <header><Header :navTitle="'Angle'"></Header></header>
        <div class="content">
            <div class="p-4 position-absolute cos-color-light">
                <h5 class="text-left">Before Starting</h5>
                <p class="text-left">1. Click the AR button at the bottom of the page</p>
                <p class="text-left">2. Waiting until there is a reticle on screen</p>
                <p class="text-left">3. Tap on the screen to draw two lines</p>
                <p class="text-left">4. The angle will appears in the upper left corner of the screen</p>
                <hr/>
                <p class="text-left cos-color-danger">This function is under the support of <strong>Google Play Services for AR</strong>, you may need to install first.</p>
                <p class="text-left cos-color-danger">If there is no AR button downside, your phone may not support this function.</p>
            </div>

            <!-- overlay infomation and button -->
            <div id="info-overlay">
                <b-list-group id="info-card" class="float-right mr-5">
                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                        <strong>Sizer Included Angle</strong>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                        Line1<b-badge variant="primary" pill>{{distanceList[0]}} cm</b-badge>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                        Line2<b-badge variant="primary" pill>{{distanceList[1]}} cm</b-badge>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                        Angle<b-badge variant="primary" pill>{{angle}} deg</b-badge>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex align-items-center">
                        <b-button variant="danger" block size="sm" id="exit-scene">Exit</b-button>
                    </b-list-group-item>

                </b-list-group>

                <div class="plain-message position-absolute my-5 py-5 text-light text-left d-flex flex-row">
                    <b-overlay :show="!hasPlain" rounded opacity="0.6" spinner-small spinner-variant="light" class="mr-3 mb-1"></b-overlay>
                    <svg v-show="hasPlain" class="mr-1 mt-1" t="1606139382881" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3017" width="16" height="16"><path d="M502.690909 502.690909m-502.690909 0a502.690909 502.690909 0 1 0 1005.381818 0 502.690909 502.690909 0 1 0-1005.381818 0Z" fill="#65CB7A" p-id="3018"></path><path d="M837.818182 279.272727c-27.927273-27.927273-68.266667-27.927273-96.19394 0L406.49697 617.50303l-142.739394-145.842424c-27.927273-24.824242-71.369697-24.824242-96.19394 3.10303-24.824242 24.824242-24.824242 68.266667 0 93.090909l189.284849 192.387879c27.927273 27.927273 68.266667 27.927273 96.193939 0L837.818182 375.466667c24.824242-24.824242 24.824242-68.266667 0-96.19394z" fill="#FFFFFF" p-id="3019"></path></svg>
                    {{message}}
                </div>
            </div>

            <!-- camera scene -->
            <a-scene webxr="requiredFeatures: hit-test, local-floor; optionalFeatures: dom-overlay; overlayElement: #info-overlay" vr-mode-ui="enterVRButton: #enterVRButton;" embedded ar-control exit-ar="exitARElId: #exit-scene">
                <a-assets>
                    <img id="sight" :src="require('../assets/img/sight.png')">
                </a-assets>

                <a-camera></a-camera>

                <!-- reticle -->
                <a-entity id="reticle" scale="0.5 0.5 0.5">
                    <a-plane src="#sight" position="0 0 0" height="0.1" width="0.1" rotation="-90 0 45" transparent="true" metalness="0" roughness="1" opacity="0.8"></a-plane>
                </a-entity>
            </a-scene>
        </div>
        <!-- hide enter VR button -->
        <div id="enterVRButton"></div>
    </div>
</template>

<script>
// aframe 2020-05-06 release
import aframe from "../assets/aframe-master0506.min.js"

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
            distanceList: [], // store two line length
            vectorList: [], // strore two line vector
            line: null, // current line

            // UI related
            loading: false,
            message: "Detecting plane...",
            hasPlain: false,
            
            // measurement
            angle: 0,
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

                    // get reticle & add reticle to the scene
                    _this.reticle = document.querySelector("#reticle").object3D;
                    _this.reticle.visible = false // hide reticle until find plane
                    _this.reticle.matrixAutoUpdate = false; // prevent auto movement
                    sceneEl.add(_this.reticle);
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

        // learned from three.js doc https://threejs.org/docs/#manual/en/introduction/How-to-update-things
        updateLine(matrix){
            // get reticle position
            let reticlePos = this.line.geometry.attributes.position.array;
            // update line position
            for(let i=3;i<6;i++){
                reticlePos[i] = matrix.elements[i+9]
            }
            // update
            this.line.geometry.attributes.position.needsUpdate = true;
            // recompute bounding volumes
            this.line.geometry.computeBoundingSphere();
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
                    let distance = preDistance * 100;
                    distance = distance.toFixed(1);

                    // calculate line vector
                    let lineVector = new THREE.Vector3().subVectors(this.pointList[0], this.pointList[1]);
                    this.vectorList.push(lineVector);

                    // store distance
                    this.distanceList.push(distance);

                    // calculate degree
                    if(this.distanceList.length==2){
                        let rad = this.vectorList[0].angleTo(this.vectorList[1]);
                        this.angle = (180 - THREE.Math.radToDeg(rad).toFixed(1)).toFixed(1);
                        this.vectorList = [];
                    }

                    if(this.distanceList.length>2){
                        this.distanceList=[];
                        this.distanceList.push(distance);
                    }
                    
                    this.pointList = [];
                    this.line = null;

                    if(this.distanceList.length<2){
                        this.onSelect();
                    }
                } else {
                    // draw new line (at this time the line is just a point)
                    let material = new THREE.LineBasicMaterial({ linewidth: 4, color: 0x5dbff2 });
                    let geometry = new THREE.BufferGeometry().setFromPoints([this.pointList[0], this.pointList[0]]);
                    this.line = new THREE.Line(geometry, material);

                    // remove old lines
                    if(this.scene.children.length > 7){
                        this.scene.children.splice(5,2);
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
            if (frame) { // if not enter AR mode, frame == unidefined
                let referenceSpace = this.renderer.xr.getReferenceSpace();
                let session = this.renderer.xr.getSession();

                // learned from https://web.dev/vr-comes-to-the-web/
                // learned from https://developer.mozilla.org/en-US/docs/Web/API/XRSession
                // learned from https://developer.mozilla.org/en-US/docs/Web/API/XRReferenceSpaceType

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

                    if (hitTestResults.length) { // plane detected
                        let hit = hitTestResults[0];
                        this.reticle.visible = true;
                        this.reticle.matrix.fromArray(hit.getPose(referenceSpace).transform.matrix);
                        this.message = "Plane detected!"
                        this.hasPlain = true;
                    } else {
                        // No plane detected
                        this.message = "Detecting plane..."
                        this.hasPlain = false;
                        this.reticle.visible = false;
                    }

                    if (this.line) {
                        // update this line in real time
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

.plain-message{
    transform: rotate(90deg);
    opacity: 0.7;
}
</style>