<template>
    <div class="position-relative build-scene">
        <!-- tool bar -->
        <div class="position-absolute tool-bar d-flex justify-content-between mt-1 mx-1">
            <b-button-group size="sm">
                <b-button v-b-modal.modal-new>New Box</b-button>
                <b-modal id="modal-new" size="sm" centered button-size="sm" title="New Box" class="px-4 cos-bg-dark" @ok="newObject(false)">
                    <b-input-group class="my-2" size="sm" prepend="width" append="cm">
                        <b-form-input v-model="newBox['width']" type="number" id="width" placeholder="width"></b-form-input>
                    </b-input-group>

                    <b-input-group class="my-2" size="sm" prepend="length" append="cm">
                        <b-form-input v-model="newBox['length']" type="number" id="length" placeholder="length"></b-form-input>
                    </b-input-group>

                    <b-input-group class="my-2" size="sm" prepend="height" append="cm">
                        <b-form-input v-model="newBox['height']" type="number" id="height" placeholder="height"></b-form-input>
                    </b-input-group>
                </b-modal>
                <b-button @click="newObject(true)">Duplicate</b-button>
                <b-button @click="undo()">Undo</b-button>
                <b-button @click="clear()">Clear</b-button>
            </b-button-group>
            <div>
                <b-button size="sm" variant="danger" @click="close()">Close</b-button>
                <b-button size="sm" variant="success" @click="projectScene()" class="ml-2">Project!</b-button>
            </div>
        </div>

        <!-- zoom bar -->
        <b-form-input @change="zoomControl()" class="zoom-bar position-absolute" v-model="zoom" type="range" min="-2" max="2" step="0.1"></b-form-input>

        <!-- scene control bar -->
        <div class="scene-bar position-absolute d-flex flex-column">
            <div class="d-flex justify-content-center">
                <b-button id="upControl" size="sm" class="font-weight-bold scene-control-btn d-flex justify-content-center align-items-center p-0">
                    <svg t="1605876699954" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2966" width="22" height="22"><path d="M640 674.133333l-166.4-166.4L640 341.333333a41.258667 41.258667 0 0 0 0-59.733333 41.258667 41.258667 0 0 0-59.733333 0l-196.266667 196.266667a41.258667 41.258667 0 0 0 0 59.733333l196.266667 196.266667A42.24 42.24 0 1 0 640 674.133333z" p-id="2967" fill="#ffffff"></path></svg>
                </b-button>
            </div>
            <div class="d-flex justify-content-between">
                <b-button id="leftControl" size="sm" class="font-weight-bold scene-control-btn d-flex justify-content-center align-items-center p-0">
                    <svg t="1605876699954" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2966" width="22" height="22"><path d="M640 674.133333l-166.4-166.4L640 341.333333a41.258667 41.258667 0 0 0 0-59.733333 41.258667 41.258667 0 0 0-59.733333 0l-196.266667 196.266667a41.258667 41.258667 0 0 0 0 59.733333l196.266667 196.266667A42.24 42.24 0 1 0 640 674.133333z" p-id="2967" fill="#ffffff"></path></svg>
                </b-button>
                <b-button id="rightControl" size="sm" class="font-weight-bold scene-control-btn d-flex justify-content-center align-items-center p-0">
                    <svg t="1605876699954" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2966" width="22" height="22"><path d="M640 674.133333l-166.4-166.4L640 341.333333a41.258667 41.258667 0 0 0 0-59.733333 41.258667 41.258667 0 0 0-59.733333 0l-196.266667 196.266667a41.258667 41.258667 0 0 0 0 59.733333l196.266667 196.266667A42.24 42.24 0 1 0 640 674.133333z" p-id="2967" fill="#ffffff"></path></svg>
                </b-button>
            </div>
            <div class="d-flex justify-content-center">
                <b-button id="downControl" size="sm" class="font-weight-bold scene-control-btn d-flex justify-content-center align-items-center p-0">
                    <svg t="1605876699954" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2966" width="22" height="22"><path d="M640 674.133333l-166.4-166.4L640 341.333333a41.258667 41.258667 0 0 0 0-59.733333 41.258667 41.258667 0 0 0-59.733333 0l-196.266667 196.266667a41.258667 41.258667 0 0 0 0 59.733333l196.266667 196.266667A42.24 42.24 0 1 0 640 674.133333z" p-id="2967" fill="#ffffff"></path></svg>
                </b-button>
            </div>
        </div>
        
        <!-- main scene -->
        <a-scene class="content" vr-mode-ui="enabled: false" physics="debug: true" embedded>
            <!-- texture -->
            <a-assets>
                <img id="ground" :src="require('../assets/img/ground.png')">
            </a-assets>

            <!-- camera -->
            <a-camera look-controls="enabled: false"></a-camera>

            <!-- main container -->
            <a-entity position="0 0 -5" id="scene-container">
                <a-box click-drag drag-control rotation-gesture id="theBox" position="0 0 0" rotation="0 0 0" :width="width" :depth="length" :height="height" color="#bf8853" shadow></a-box>
            </a-entity>

            <!-- ground -->
            <a-plane src="#ground" position="0 -5 0" height="25000" width="25000" rotation="-90 0 0" transparent="true" metalness="0.6" roughness="0.4" repeat="10000 10000" color="#333"></a-plane>

            <!-- sky -->
            <a-sky color="#29292c"></a-sky>
        </a-scene>
    </div>
</template>

<script>
// import aframe from 'aframe';
// aframe 2020-05-06 release
import aframe from "../assets/aframe-master0506.min.js"
import registerClickDrag from 'aframe-click-drag-component';
registerClickDrag(aframe);

export default {
    name: 'BuildScene',

    data(){
        return{
            sceneEl: Object,
            theBox: null,
            length: this.$route.query.length,
            width: this.$route.query.width,
            height: this.$route.query.height,
            data: {
                "0": {
                    "size": [this.$route.query.length, this.$route.query.width, this.$route.query.height],
                    "position": [0,0,0]
                },
            },
            id: 0,
            newBox: {
                length: 10,
                width: 10,
                height: 10
            },
            zoom: 0,
            touched: false,
            history: this.$route.query.history,
        }
    },

    created(){
        this.rotationGesture();
        this.dragControl();
    },

    mounted(){
        this.$$global.adjustHeight();
        this.sceneControl();
        this.buildFromHistory();
        this.resizeScene();
    },

    methods:{
        resizeScene(){
            let scene = document.querySelector("#scene-container");
            scene.setAttribute("scale",{x: 1/this.$$global.size, y: 1/this.$$global.size, z: 1/this.$$global.size});
        },

        buildFromHistory(){
            if(this.history!=undefined){
                this.data = this.history;
                console.log(this.data);
                let arr = Object.keys(this.history);
                this.id = parseInt(arr[arr.length-1]);

                // draw object
                let sceneEl = document.querySelector('#scene-container'); 
                let theBox = document.querySelector('#theBox');
                sceneEl.removeChild(theBox);

                let data = this.data;
                Object.keys(data).forEach(function(key){
                    let boxEl = document.createElement('a-box');
                    boxEl.setAttribute('material', {color: '#bf8853'});
                    boxEl.setAttribute('position', {x: data[key]["position"][0], y: data[key]["position"][1], z: data[key]["position"][2]});
                    boxEl.setAttribute("height", data[key]["size"][0]);
                    boxEl.setAttribute("depth", data[key]["size"][1]);
                    boxEl.setAttribute("width", data[key]["size"][2]);
                    if(data[key]["rotation"]!=undefined){
                        boxEl.setAttribute('rotation', {x: data[key]["rotation"][0], y: data[key]["rotation"][1], z: data[key]["rotation"][2]});
                    }
                    sceneEl.appendChild(boxEl);
                });

                this.theBox = sceneEl.lastChild;

                // add movement control
                let m = document.createAttribute("rotation-gesture");
                this.theBox.setAttributeNode(m);
                m = document.createAttribute("click-drag");
                this.theBox.setAttributeNode(m);
                m = document.createAttribute("drag-control");
                this.theBox.setAttributeNode(m);

                this.theBox.setAttribute("id", "#theBox")
            }
        },

        rotationGesture(){
            let _this = this;
            AFRAME.registerComponent('rotation-gesture', {
                init: function () {
                    // get object
                    let el = this.el;
                    // get scene
                    let sceneEl = document.querySelector('a-scene');

                    let finger1 = [];
                    let finger2 = [];
                    let startPoint = null;
                    let endPoint = null;

                    // add movement listener
                    sceneEl.ontouchstart=function(e){
                        // 2 point touch
                        // if(e.touches.length >= 2) {
                        //     finger1 = e.touches;
                        //     touched = true;
                        // }

                        // 2 point touch
                        if(e.touches.length >= 2){
                            startPoint = e.touches[0];
                        }
                    }

                    sceneEl.ontouchmove=function(e){
                        e.preventDefault();
                        // get object rotation
                        let rotationSZ=el.getAttribute("rotation").z;
                        let rotationSX=el.getAttribute("rotation").x;
                        let rotationSY=el.getAttribute("rotation").y;

                        if(e.touches.length >= 2){
                            endPoint = e.changedTouches[0];
                            // calculate x and y offset
                            let x = endPoint.clientX - startPoint.clientX;
                            let y = endPoint.clientY - startPoint.clientY;
                            let minDis = 10;

                            if(Math.abs(y) > minDis){ // rotate along the x axis
                                el.setAttribute("rotation", {z: rotationSZ, x: rotationSX+(y/50), y: rotationSY});
                            }else if(Math.abs(x) > minDis){ // // rotate along the y axis
                                el.setAttribute("rotation", {z: rotationSZ, x: rotationSX, y: rotationSY+(x/50)});
                            }

                            let rz=el.getAttribute("rotation").z;
                            let rx=el.getAttribute("rotation").x;
                            let ry=el.getAttribute("rotation").y;

                            _this.data[_this.id.toString()]["rotation"]=[rx, ry, rz];
                        }
                        // else if(e.touches.length >= 2 && touched) {
                        //     finger2 = e.touches;
                        //     let scale = _this.calculateScale(finger1[0], finger1[1], finger2[0], finger2[1]);
                        //     let rotation = _this.calculateDegree(finger1[0], finger1[1], finger2[0], finger2[1]);
                        //     // console.log(scale);
                        //     // console.log("R:"+rotation);

                        //     sceneCon.setAttribute("scale", {z: scale, x: scale, y: scale});
                        //     sceneCon.setAttribute("rotation", {z: parseInt(rotationSZ)+parseInt(rotation), x: rotationSX, y: rotationSY});
                        // }
                    }

                }
            });
        },

        dragControl(){
            let _this = this;
            AFRAME.registerComponent('drag-control', {
                init: function () {
                    let position = {};

                    // get position change
                    this.el.addEventListener('dragmove', function(e) {
                        position=e.detail.nextPosition;
                        _this.data[_this.id.toString()]["position"]=[position.x, position.y, position.z];
                    });

                    // store new position
                    this.el.addEventListener('dragend', function(e) {
                        // _this.data[_this.id.toString()]["position"]=[position.x, position.y, position.z];
                    });
                }
            });
        },

        zoomControl(){
            // get scene position
            let sc = document.querySelector("#scene-container");
            let positionZ=sc.getAttribute("position").z;
            let positionY=sc.getAttribute("position").y;
            let positionX=sc.getAttribute("position").x;
            
            // zoom in & out
            sc.setAttribute("position", {z: parseFloat(positionZ)+parseFloat(this.zoom), x: positionX, y: positionY});
            this.zoom=0;
        },

        sceneControl(){
            // get scene
            let sceneCon = document.querySelector('#scene-container');

            document.querySelector("#leftControl").ontouchstart=function(){
                let rotation=sceneCon.getAttribute("rotation");
                sceneCon.setAttribute("rotation", {z: rotation.z, x: rotation.x, y: rotation.y-10});
            }

            document.querySelector("#rightControl").onclick=function(){
                let rotation=sceneCon.getAttribute("rotation");
                sceneCon.setAttribute("rotation", {z: rotation.z, x: rotation.x, y: rotation.y+10});
            }

            document.querySelector("#upControl").onclick=function(){
                console.log("up");
                let rotation=sceneCon.getAttribute("rotation");
                sceneCon.setAttribute("rotation", {z: rotation.z, x: rotation.x-10, y: rotation.y});
            }

            document.querySelector("#downControl").onclick=function(){
                console.log("down");
                let rotation=sceneCon.getAttribute("rotation");
                sceneCon.setAttribute("rotation", {z: rotation.z, x: rotation.x+10, y: rotation.y});
            }
        },

        calculateScale(f1p1, f1p2, f2p1, f2p2){
            let x1 = f1p2.pageX - f1p1.pageX;
            let y1 = f1p2.pageY - f1p1.pageY;
            let dis1 = Math.sqrt(Math.pow(x1, 2) + Math.pow(y1, 2));

            let x2 = f2p2.pageX - f2p1.pageX;
            let y2 = f2p2.pageY - f2p1.pageY;
            let dis2 = Math.sqrt(Math.pow(x2, 2) + Math.pow(y2, 2));

            return (dis2 / dis1).toFixed(2)
        },

        calculateDegree(f1p1, f1p2, f2p1, f2p2){
            let x1 = f1p2.pageX - f1p1.pageX;
            let y1 = f1p2.pageY - f1p1.pageY;
            let deg1 = Math.atan2(y1, x1) * 180 / Math.PI;

            let x2 = f2p2.pageX - f2p1.pageX;
            let y2 = f2p2.pageY - f2p1.pageY;
            let deg2 = Math.atan2(y2, x2) * 180 / Math.PI;

            return (deg1 - deg2).toFixed(2)
        },

        newObject(duplicate){
            let sceneEl = document.querySelector('#scene-container'); 

            let boxEl = document.createElement('a-box');

            // get previous box
            let theBox=null;
            if(this.theBox==null) theBox = document.querySelector('#theBox');
            else theBox = this.theBox;

            // get position
            let positionX = theBox.getAttribute('position').x;
            let positionY = theBox.getAttribute('position').y;
            let positionZ = theBox.getAttribute('position').z;

            // set size
            let width = 0
            let height = 0
            let length = 0

            if(duplicate){ // duplicate previous box
                width = parseInt(theBox.getAttribute('width'));
                height = parseInt(theBox.getAttribute('height'));
                length = parseInt(theBox.getAttribute('depth'));
            }else{ // add a new box
                width = parseInt(this.newBox["width"]);
                height = parseInt(this.newBox["height"]);
                length = parseInt(this.newBox["length"]);
            }

            boxEl.setAttribute('material', {color: '#bf8853'});
            boxEl.setAttribute('position', {x: positionX+width+1, y: positionY, z: positionZ});
            boxEl.setAttribute("height", height);
            boxEl.setAttribute("depth", length);
            boxEl.setAttribute("width", width);

            // add movement control
            let m = document.createAttribute("rotation-gesture");
            boxEl.setAttributeNode(m);
            m = document.createAttribute("click-drag");
            boxEl.setAttributeNode(m);
            m = document.createAttribute("drag-control");
            boxEl.setAttributeNode(m);

            // previous box remove control
            theBox.removeAttribute("id");
            theBox.removeAttribute("rotation-gesture");
            theBox.removeAttribute("click-drag");

            // mark the box as previous box
            boxEl.setAttribute("id", "#theBox")
            this.theBox=boxEl;
            sceneEl.appendChild(boxEl);

            // store information
            this.id++;
            this.data[this.id.toString()] = {}
            this.data[this.id.toString()]["size"]=[length, width, height];
            this.data[this.id.toString()]["position"]=[positionX+width+1, positionY, positionZ];
        },

        undo(){
            let sceneEl = document.querySelector('#scene-container'); 

            let theBox=null;
            if(this.theBox==null) theBox = document.querySelector('#theBox');
            else theBox = this.theBox;
            
            let preBox = theBox.previousSibling;
            preBox.setAttribute("id", "#theBox")

            // add movement control
            let m = document.createAttribute("rotation-gesture");
            preBox.setAttributeNode(m);
            m = document.createAttribute("click-drag");
            preBox.setAttributeNode(m);
            m = document.createAttribute("drag-control");
            preBox.setAttributeNode(m);

            // remove this box
            this.theBox=preBox;
            sceneEl.removeChild(theBox);

            // update data
            this.data[this.id.toString()] = {}
            this.id--;
        },

        clear(){
            let sceneEl = document.querySelector('#scene-container'); 

            let sceneChilds = sceneEl.childNodes; 
            console.log(sceneChilds);
            for(let i = sceneChilds.length - 1; i > -1; i--) { 
                sceneEl.removeChild(sceneChilds[i]); 
            }

            this.data = {};
            this.id = -1;

        },

        close(){
            this.$router.push({ name: "Modelling"});
        },

        projectScene(){
            this.$router.push({ name: "ProjectScene" ,query:{ data: this.data }});
            let date = new Date();
            this.$$history.store({
                "type": "Modelling",
                "date": parseInt(parseInt(date.getMonth())+1)+"/"+date.getDate()+" "+date.getHours()+":"+date.getMinutes(),
                "data": this.data
            })
        },
    }
}
</script>

<style scoped>
.tool-bar{
    left: 0;
    top: 0;
    z-index: 9999;
    width: 98%;
    opacity: 0.7;
}

.zoom-bar{
    left: -80px;
    top: 350px;
    z-index: 9999;
    width: 50%;
    transform: rotate(-90deg);
    opacity: 0.7;
}

.scene-bar{
    z-index: 9999;
    bottom: 10px;
    right: 10px;
    width: 90px;
    height: 90px;
}

.scene-control-btn{
    width: 30px;
    height: 30px;
    opacity: 0.7;
}

#upControl{
    transform: rotate(90deg);
}

#downControl{
    transform: rotate(-90deg);
}

#rightControl{
    transform: rotate(180deg);
}
</style>