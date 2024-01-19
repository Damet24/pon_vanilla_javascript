import { Render } from "./Render.js"


export class Game {

  constructor(viewportWidth, viewportHeight) {
    this.initialize()
    this.lastFrameTime = 0
    this.gameLoop = this.gameLoop.bind(this)
    this.createViewport(viewportWidth, viewportHeight)
    this.render = new Render(this.viewport)
  }

  initialize() {
    this.gameState = {
      scenes: [],
      currentScene: null,
      currentSceneIndex: 0
    }
  }

  update(deltaTime) {
    this.getCurrentScene().update(deltaTime)
  }

  addScene(scene){
    console.log(this.gameState.scenes)
    this.gameState.scenes.push({name: scene.name, scene})
  }

  getCurrentScene() {
    if (this.gameState.currentScene === null) {
      var currentScene = this.gameState.scenes[this.gameState.currentSceneIndex].scene
      this.gameState.currentScene = new currentScene()
      return this.gameState.currentScene
    }
    else return this.gameState.currentScene
  }

  start() {
    this.lastFrameTime = performance.now()
    window.requestAnimationFrame(this.gameLoop)
  }

  gameLoop(currentTime) {
    const deltaTime = (currentTime - this.lastFrameTime) / 1000
    this.lastFrameTime = currentTime
    this.update(deltaTime)
    this.render.renderViewport(this.gameState)
    window.requestAnimationFrame(this.gameLoop.bind(this))
  }

  createViewport(viewportWidth, viewportHeight) {
    const canvas = document.createElement('canvas')
    canvas.width = viewportWidth
    canvas.height = viewportHeight
    canvas.id = 'canvas'
    canvas.style.background = '#000000'

    document.body.appendChild(canvas)
    this.viewport = canvas.getContext('2d')
  }
}