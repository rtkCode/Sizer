<template>
    <div class="position-relative project-scene">
        <div class="position-absolute p-2 text-center bg-light d-flex flex-row align-items-center justify-content-center" id="projecterController">
            <h4 class="m-0">Sizer Projecter</h4>
            <b-button-group size="sm" class="ml-4">
                <b-button class="d-flex justify-content-center align-items-center" @click="rotateObject()">
                    <svg t="1606749381794" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3756" width="16" height="16"><path d="M40 16h20c13.254 0 24 10.746 24 24v221.25C170.392 114.094 330.478 15.43 513.586 16.002 786.36 16.856 1008.426 240.018 1008 512.792 1007.572 786.362 785.668 1008 512 1008c-127.852 0-244.404-48.374-332.356-127.816-10.226-9.236-10.708-25.122-0.964-34.866l14.138-14.138c9.006-9.006 23.498-9.428 32.964-0.908C301.564 898.476 401.87 940 512 940c235.488 0 428-190.662 428-428 0-235.488-190.662-428-428-428-165.724 0-309.474 94.154-380.578 232H360c13.254 0 24 10.746 24 24v20c0 13.254-10.746 24-24 24H40c-13.254 0-24-10.746-24-24V40c0-13.254 10.746-24 24-24z" p-id="3757" fill="#ffffff"></path></svg>
                </b-button>
                <b-button variant="danger" id="exit-scene" size="sm" @click="hideProjecter()">Exit</b-button>
            </b-button-group>
            
        </div>

        <div class="position-absolute p-2 text-center text-light d-flex flex-row align-items-center justify-content-center" id="projecterMessage">
            <b-overlay :show="!hasMarker" rounded opacity="0.6" spinner-small spinner-variant="light" class="mr-3 mb-1"></b-overlay>
            <svg v-show="hasMarker" class="mr-1" t="1606139382881" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3017" width="16" height="16"><path d="M502.690909 502.690909m-502.690909 0a502.690909 502.690909 0 1 0 1005.381818 0 502.690909 502.690909 0 1 0-1005.381818 0Z" fill="#65CB7A" p-id="3018"></path><path d="M837.818182 279.272727c-27.927273-27.927273-68.266667-27.927273-96.19394 0L406.49697 617.50303l-142.739394-145.842424c-27.927273-24.824242-71.369697-24.824242-96.19394 3.10303-24.824242 24.824242-24.824242 68.266667 0 93.090909l189.284849 192.387879c27.927273 27.927273 68.266667 27.927273 96.193939 0L837.818182 375.466667c24.824242-24.824242 24.824242-68.266667 0-96.19394z" fill="#FFFFFF" p-id="3019"></path></svg>
            <p class="m-0">{{message}}</p>
        </div>

        <a-scene webxr="overlayElement: #projecterController" vr-mode-ui="enabled: false" embedded arjs='sourceType: webcam; debugUIEnabled: false; sourceWidth:1280; sourceHeight:960; displayWidth: 1280; displayHeight: 960;' marker-handler>
            <a-marker preset="custom" type="pattern" url="marker.patt" smooth="true">
                <a-entity position="0 0.7 0" id="scene"></a-entity>
            </a-marker>
            <a-entity camera></a-entity>
        </a-scene>
    </div>
</template>

<script>
// import aframe from 'aframe'
// aframe 2020-05-06 release
import aframe from "../assets/aframe-master0506.min.js"
import arjs from "ar.js"

export default {
    name: 'ProjectScene',

    data(){
        return{
            sceneEl: Object,
            data: this.$route.query.data,
            message: "Finding marker...",
            hasMarker: false,
            publicPath: process.env.BASE_URL,
            direction: 0,
        }
    },

    mounted(){
        this.drawObject();
        this.resizeScene();
        this.markerHandler();
    },

    methods:{
        drawObject(){
            let sceneEl = document.querySelector('#scene'); 
            let data = this.data;
            console.log(data);
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
        },

        resizeScene(){
            let scene = document.querySelector("#scene");
            scene.setAttribute("scale",{x: 1/this.$$global.size, y: 1/this.$$global.size, z: 1/this.$$global.size});
        },

        markerHandler(){
            let _this = this;
            AFRAME.registerComponent('marker-handler', {
                init: function () {
                    this.el.sceneEl.addEventListener('markerFound', function(){
                        _this.message = "Marker found";
                        _this.hasMarker = true;
                    });

                    this.el.sceneEl.addEventListener('markerLost', function(){
                        _this.message = "Marker Lost, finding...";
                        _this.hasMarker = false;
                    });
                }
            });
        },

        hideProjecter(){
            this.$router.push({ name: "Modelling"});
            location.reload();
        },

        rotateObject(){
            let sceneEl = document.querySelector('#scene');
            if(this.direction==0){
                sceneEl.setAttribute("rotation", {x: 90, y: 0, z: 0});
                this.direction=1;
            }else if(this.direction==1){
                sceneEl.setAttribute("rotation", {x: 0, y: 0, z: 90});
                this.direction=2;
            }else if(this.direction==2){
                sceneEl.setAttribute("rotation", {x: 0, y: 90, z: 0});
                this.direction=0;
            }
        }
    }
}
</script>

<style scoped>
a-scene {
    height: 100vh;
    width: 100%;
}

#projecterController{
    z-index: 9999;
    width: 100%;
    left: 0;
    top: 0;
    opacity: 0.7;
    display: inline-block;
}

#projecterMessage{
    z-index: 9999;
    width: 100%;
    left: 0;
    top: 50px;
    opacity: 0.7;
    display: inline-block;
}

.project-scene{
    width: 100%;
}
</style>