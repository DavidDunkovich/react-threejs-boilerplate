import React, { Component } from "react";
import * as THREE from "three";
import OrbitControls from "orbit-controls-es6";

class Scene extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.aspectRatio = window.innerWidth / window.innerHeight;
  }

  handleWindowResize = () => {
    const { innerWidth, innerHeight } = window;
    this.aspectRatio = innerWidth / innerHeight;
    this.camera.aspect = this.aspectRatio;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(innerWidth, innerHeight);
  }

  componentDidMount() {
    this.setupScene();
    window.addEventListener("resize", this.handleWindowResize);
  }

  setupScene = () => {
    this.scene = new THREE.Scene();
    this.setUpCamera();
    this.initializeRenderer();
    this.addGridHelper();
    this.addMeshes();
    this.animate();
  }

  initializeRenderer = () => {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.5;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("scene").appendChild(this.renderer.domElement);
  }

  setUpCamera = () => {
    this.camera = new THREE.PerspectiveCamera(60, this.aspectRatio, 100, 2000000);
    this.camera.position.set(0, 100, 2000);
    this.controls = new OrbitControls(this.camera);
  }
  

  addGridHelper = () => {
    const helper = new THREE.GridHelper(10000, 2, 0xffffff, 0xffffff);
    this.scene.add(helper);
  }
  
  addMeshes = () => {
    const geometry = new THREE.BoxGeometry(200, 200, 200);
    const mesh = new THREE.Mesh(geometry);
    this.scene.add(mesh);
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div id="scene" />
    );
  }
}

export default Scene;
