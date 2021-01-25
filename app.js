let gameState = {
    width: 640,
    height: 400,
    ball: { x: 320, y: 200, velocity: 5, deg: null },
    left: { x: 30, y: 200 },
    right: { x: 610, y: 200 },
    score: { left: 0, right: 0 },
    pressedKeys: {
        lup: false,
        ldown: false,
        rup: false,
        rdown: false
    }
}

initBall()

const canvas = document.createElement('canvas')
canvas.width = gameState.width
canvas.height = gameState.height
canvas.id = 'canvas'
canvas.style.background = '#000000'

document.body.appendChild(canvas)
const ctx = canvas.getContext('2d')

function degToRad(degrees) {
    return degrees * (Math.PI / 180)
}

function getRandomInt(min, max) {
    const degrees = [45, 135, 225, 315]
    return degrees[Math.floor(Math.random() * degrees.length)]
}

function velocityAngular() {
    let x = Math.cos(degToRad(gameState.ball.deg)) * gameState.ball.velocity
    let y = Math.sin(degToRad(gameState.ball.deg)) * gameState.ball.velocity
    return { x, y }
}

function initBall() {
    gameState.ball.deg = getRandomInt(0, 359)
    gameState.ball.velocity = 5
    gameState.ball.x = 320
    gameState.ball.y = 200
}

function update() {
    let vel = velocityAngular()
    gameState.ball.x += vel.x
    gameState.ball.y -= vel.y

    if (gameState.ball.x < 0 || gameState.ball.x > 640) {
        if (gameState.ball.x < 0) {
            gameState.score.right += 1
        }
        else if (gameState.ball.x > 640) {
            gameState.score.left += 1
        }
        initBall()
    }

    let collisionY = false

    if (gameState.ball.y < 4) {
        gameState.ball.y = 4
        collisionY = true
    }

    if (gameState.ball.y > 396) {
        gameState.ball.y = 396
        collisionY = true
    }

    if (collisionY) {
        gameState.ball.deg = -gameState.ball.deg
    }

    let conllLeft = gameState.ball.x - gameState.left.x
    let conllRight = gameState.right.x - gameState.ball.x
    
    if(conllLeft > -8 && conllLeft < 8){
        if(gameState.ball.y < gameState.left.y+32 && gameState.ball.y > gameState.left.y-32){
            gameState.ball.deg = gameState.left.y - gameState.ball.y
            gameState.ball.velocity += 0.1
        }
    }

    if(conllRight > -8 && conllRight < 8){
        if(gameState.ball.y < gameState.right.y+32 && gameState.ball.y > gameState.right.y-32){
            gameState.ball.deg = 180 - (gameState.right.y - gameState.ball.y)
            gameState.ball.velocity += 0.1
        }
    }

    if (gameState.pressedKeys.rup) {
        if (gameState.right.y > 32) {
            gameState.right.y -= 4
        }
    }

    if (gameState.pressedKeys.rdown) {
        if (gameState.right.y < 400) {
            gameState.right.y += 4
        }
    }

    if (gameState.pressedKeys.lup) {
        if (gameState.left.y > 32) {
            gameState.left.y -= 4
        }
    }

    if (gameState.pressedKeys.ldown) {
        if (gameState.left.y < 400) {
            gameState.left.y += 4
        }
    }
}

function drawDashedLine(pattern, x) {
    ctx.strokeStyle = 'white'
    ctx.beginPath();
    ctx.setLineDash(pattern);
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 400);
    ctx.stroke();
    // x += 20;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'white'

    drawDashedLine([10, 10,], 320)

    ctx.font = '20pt sans-serif'
    ctx.fillStyle = '#5e5e5e'
    ctx.fillText(gameState.score.left.toString(), 230, 70)

    ctx.font = '20pt sans-serif'
    ctx.fillStyle = '#5e5e5e'
    ctx.fillText(gameState.score.right.toString(), 400, 70)

    ctx.fillStyle = 'white'
    ctx.fillRect(gameState.ball.x - 8, gameState.ball.y - 8, 8, 8)
    ctx.fillRect(gameState.left.x - 8, gameState.left.y - 32, 8, 32)
    ctx.fillRect(gameState.right.x - 8, gameState.right.y - 32, 8, 32)
}

function loop() {
    update()
    draw()

    window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)

var keyMap = {
    73: 'rup',
    75: 'rdown',
    87: 'lup',
    83: 'ldown'
}

function keydown(event) {
    var key = keyMap[event.keyCode]
    gameState.pressedKeys[key] = true
}

function keyup(event) {
    var key = keyMap[event.keyCode]
    gameState.pressedKeys[key] = false
}

window.addEventListener("keydown", keydown, false)
window.addEventListener("keyup", keyup, false)
