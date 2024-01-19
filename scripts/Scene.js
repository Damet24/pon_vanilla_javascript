import { Input } from "./Input.js"

export class Scene {
  constructor() {
    this.state = {
      objects: []
    }
    this.inputs = new Input()
  }
  
  create(){}
  update(deltaTime) {}

  addGameObject(object) {
    this.state.objects.push(object)
  }
}