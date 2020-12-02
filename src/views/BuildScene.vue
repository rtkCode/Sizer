<template>
    <div class="position-relative build-scene">
        <!-- tool bar -->
        <div class="position-absolute tool-bar d-flex justify-content-between mt-1 mx-1">
            <b-button-group size="sm">
                <b-button>
                    <!-- Title -->
                    <strong>Sizer</strong>
                </b-button>
                <b-button v-b-modal.modal-new class="d-flex justify-content-center align-items-center">
                    <!-- New Box -->
                    <svg t="1606723955370" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8736" width="15" height="15"><path d="M58.18714 261.513847 489.750985 506.066692C497.230148 510.304885 506.385346 510.304885 513.86451 506.066692L945.428356 261.513847C962.456593 251.864512 961.814227 227.116685 944.308329 218.363735L512.744484 2.581813C505.859648-0.860604 497.755846-0.860604 490.871012 2.581813L59.307167 218.363735C41.801269 227.116685 41.158901 251.864512 58.18714 261.513847L58.18714 261.513847ZM82.300665 218.960567 81.180638 262.110679 512.744484 46.328756 490.871012 46.328756 922.434857 262.110679 921.314829 218.960567 489.750985 463.513412 513.86451 463.513412 82.300665 218.960567 82.300665 218.960567Z" p-id="8737" fill="#ffffff"></path><path d="M477.352463 504.929698 477.352463 974.793958C477.352463 993.514057 497.526411 1005.2927 513.828779 996.090807L974.163548 736.254285C981.846246 731.917777 986.597801 723.77952 986.597801 714.957436L986.597801 398.477284C986.597801 384.971004 975.648796 374.021999 962.142515 374.021999 948.636235 374.021999 937.687232 384.971004 937.687232 398.477284L937.687232 714.957436 950.121483 693.660589 489.786716 953.497111 526.263031 974.793958 526.263031 504.929698C526.263031 491.423418 515.314029 480.474415 501.807748 480.474415 488.301468 480.474415 477.352463 491.423418 477.352463 504.929698L477.352463 504.929698Z" p-id="8738" fill="#ffffff"></path><path d="M514.421935 953.842987 82.858091 694.006466 94.699187 714.957436 94.699187 254.622669C94.699187 241.116388 83.750183 230.167383 70.243903 230.167383 56.737622 230.167383 45.788618 241.116388 45.788618 254.622669L45.788618 714.957436C45.788618 723.534342 50.281834 731.484386 57.629714 735.908407L489.193559 995.74493C500.764461 1002.711554 515.792096 998.979049 522.758718 987.408147 529.725342 975.837246 525.992838 960.809611 514.421935 953.842987L514.421935 953.842987Z" p-id="8739" fill="#ffffff"></path><path d="M172.745454 448.218441 316.60007 534.531209C328.181609 541.480132 343.203518 537.724655 350.152444 526.143115 357.101367 514.561577 353.34589 499.539667 341.76435 492.590741L197.909735 406.277973C186.328194 399.32905 171.306285 403.084527 164.357361 414.666067 157.408437 426.247607 161.163914 441.269517 172.745454 448.218441L172.745454 448.218441Z" p-id="8740" fill="#ffffff"></path></svg>
                </b-button>
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
                <b-button @click="newObject(true)" class="d-flex justify-content-center align-items-center">
                    <!-- Duplicate -->
                    <svg t="1606723863524" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7252" width="16" height="16"><path d="M227.555556 853.333333h455.111111V341.333333H227.555556v512zM170.666667 341.105778c0-31.288889 25.941333-56.661333 56.604444-56.661334h455.68c31.288889 0 56.604444 25.315556 56.604445 56.661334v512.455111c0 31.288889-25.941333 56.661333-56.604445 56.661333h-455.68A56.604444 56.604444 0 0 1 170.666667 853.560889V341.105778zM284.444444 455.111111v56.888889h341.333334V455.111111H284.444444z m0 113.777778v56.888889h341.333334v-56.888889H284.444444z m0 113.777778v56.888889h227.555556v-56.888889H284.444444z m516.892445 56.888889v-56.888889h51.882667C853.333333 682.666667 853.390222 512 853.333333 170.780444L397.937778 170.666667c0.398222 0 0.455111 21.959111 0.284444 65.877333H341.333333V170.837333C341.333333 139.377778 367.274667 113.777778 397.937778 113.777778h455.68c31.288889 0 56.604444 25.941333 56.604444 57.002666v511.772445A56.888889 56.888889 0 0 1 853.219556 739.555556h-51.882667z" p-id="7253" fill="#ffffff"></path></svg>
                </b-button>
                <b-button @click="undo()" class="d-flex justify-content-center align-items-center">
                    <!-- Undo -->
                    <svg t="1606723575107" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3411" width="16" height="16"><path d="M596.16 284.064H258.56l101.376-101.44a32 32 0 1 0-45.216-45.248L178.592 273.472c-11.904 11.872-18.496 27.84-18.56 44.8v0.608c0 17.472 7.104 33.248 18.56 44.672l136.128 136.16a31.808 31.808 0 0 0 45.248 0 31.904 31.904 0 0 0 0-45.248l-106.752-106.496h342.976c114.88 0 208.32 93.312 208.32 208s-93.44 208-208.32 208h-223.36a32 32 0 0 0 0 64h223.36c150.144 0 272.32-122.016 272.32-272s-122.176-272-272.32-272" p-id="3412" fill="#ffffff"></path></svg>
                </b-button>
                <b-button @click="clear()" class="d-flex justify-content-center align-items-center">
                    <!-- Clear -->
                    <svg t="1606723820000" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6372" width="16" height="16"><path d="M810.666667 273.066667L750.933333 213.333333 512 452.266667 273.066667 213.333333 213.333333 273.066667l238.933334 238.933333L213.333333 750.933333 273.066667 810.666667l238.933333-238.933334 238.933333 238.933334 59.733334-59.733334-238.933334-238.933333z" fill="#ffffff" p-id="6373"></path></svg>
                </b-button>
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
                    boxEl.setAttribute("depth", data[key]["size"][0]);
                    boxEl.setAttribute("width", data[key]["size"][1]);
                    boxEl.setAttribute("height", data[key]["size"][2]);
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

            boxEl.setAttribute('material', {color: '#bf8853', opacity: 0.9});
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