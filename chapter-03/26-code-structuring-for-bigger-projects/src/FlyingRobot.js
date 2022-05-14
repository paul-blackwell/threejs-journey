import Robot from "./Robot";

export default class FlyingRobot extends Robot {
  constructor (name, legs) {
    super(name, legs);
  }

  sayHi() {
    console.log(`Hello my name is ${this.name} and I am a flying robot`);
  }

  takeOff() {
    console.log(`Have a good flight ${this.name}`)
  }

  land() {
    console.log(`Welcome back ${this.name}`)
  }
}
