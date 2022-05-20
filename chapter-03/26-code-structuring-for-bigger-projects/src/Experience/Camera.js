import Experience from "./Experience";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height);
    this.instance.position.set(6, 4, 8);
    this.scene.add(this.instance);
  }
}
