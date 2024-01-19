

export class GameObject {
  position = {x: 0, y: 0}

  constructor(x = 0, y = 0) {
    this.position.x = x
    this.position.y = y
  }
}