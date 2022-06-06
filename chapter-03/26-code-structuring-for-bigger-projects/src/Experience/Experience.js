import * as THREE from 'three';
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Times";
import Resources from './Utils/Resources';
import Camera from './Camera';
import Renderer from './Renderer';
import World from './World/World';
import sources from './sources';


let instance = null;

export default class Experience {
  constructor(canvas) {

    // Singleton 
    if(instance) {
      return instance;
    }
    instance = this;

    // Global access
    window.experience = this;

    // Options
    this.canvas = canvas;

    // Setup
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

    // Sizes resize event
    this.sizes.on('resize', () => {
      this.resize();
    })

    // Time tick event
    this.time.on('tick', () => {
      this.update();
    })

  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }
}
