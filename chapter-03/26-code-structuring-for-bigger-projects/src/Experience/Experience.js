import Sizes from "./Utils/Sizes";
import Time from "./Utils/Times";

export default class Experience {
  constructor(canvas) {

    // Global access
    window.experience = this;

    // Options
    this.canvas = canvas;

    // Setup
    this.sizes = new Sizes();
    this.time = new Time();

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
  }

  update() {
    
  }
}
