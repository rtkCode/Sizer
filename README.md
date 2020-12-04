<h1 align="center">Sizer</h1>

<p align="center"><strong>A web-based AR modelling and measurement application.</strong></p>

> Sizer is the project of COMP3025J Augmented and Virtual Reality

## Introduction
Sizer is a web-based AR modelling and measurement application. It allows users to freely model in a virtual environment and project into reality. In addition, it can also measure the length, width, and height of real objects and store them in a virtual environment. In the third edition, Sizer added the function of measuring angle.

## Examples
<a href="https://rtkcode.github.io/Sizer/v3">Live Demo</a>
<a href="https://youtu.be/qyB4y9Armi0">Video Demo</a>

<p>
  <img width="15%" src="https://f000.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z9e80f94b4a0900107f1b0d1a_f1110c0081fdf5b46_d20201204_m134535_c000_v0001073_t0025">
  <img width="15%" src="https://f000.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z9e80f94b4a0900107f1b0d1a_f118632675ad91a85_d20201204_m134538_c000_v0001071_t0022">
  <img width="15%" src="https://f000.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z9e80f94b4a0900107f1b0d1a_f112b381814ee7a02_d20201204_m134540_c000_v0001062_t0006">
  <img width="15%" src="https://f000.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z9e80f94b4a0900107f1b0d1a_f10821ff21aa2afed_d20201204_m134541_c000_v0001069_t0039">
  <img width="15%" src="https://f000.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z9e80f94b4a0900107f1b0d1a_f10384f88784ca536_d20201204_m134542_c000_v0001077_t0021">
</p>

## Features
**Modelling**: Sizer allows users to create objects in a virtual scene, and supports free movement, copy, undo, clear, and creating new custom object operations. Users can project the created objects into reality.

**Measurement**: Sizer uses WebXR technology to detect a plane and measure the distance between two points on the plane, which can be used to measure the length, width, and height of an object.

**Measuring Angle**: Sizer enables users to measure the angle on the plane, which is achieved by calculating the angle between two lines through obtaining two vectors composed of four points.

## Libraries
**Vue.js**: <a href="https://vuejs.org/">The Progressive JavaScript Framework</a>

**A-Frame**: <a href="https://github.com/aframevr/aframe">A web framework for building virtual reality experiences</a>

**aframe-click-drag-component**: <a href="https://github.com/jesstelford/aframe-click-drag-component">A Click & Drag component for A-Frame</a>

**AR.js**: <a href="https://ar-js-org.github.io/AR.js-Docs/">Augmented Reality on the Web</a>

**three.js**: <a href="https://threejs.org/">JavaScript 3D library</a>

## Project setup
```
npm install
npm run serve
npm run build
```
