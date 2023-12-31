import { useEffect, useRef, useState } from 'react'
import '../css/SnakeGame.css'
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareSendTransaction,
  useSendTransaction,
} from 'wagmi'
function SnakeGame() {
  let dom_replay = null
  let dom_score = null
  let dom_canvas = null
  let CTX = null
  let KEY = null

  let [score, setScore] = useState(0)
  let [maxScore, setMaxScore] = useState(0)
  let [flage, setFlage] = useState(false)
  let snake,
    food,
    currentHue,
    cells = 20,
    cellSize,
    isGameOver = false,
    tails = [],
    particles = [],
    splashingParticleCount = 20,
    cellsCount,
    requestID

  let W = null
  let H = null
  class Snake {
    constructor(i, type) {
      this.pos = new helpers.Vec(W / 2, H / 2)
      this.dir = new helpers.Vec(0, 0)
      this.type = type
      this.index = i
      this.delay = 7
      this.size = W / cells
      this.color = 'lightgreen'
      this.history = []
      this.total = 1
    }
    draw() {
      let { x, y } = this.pos
      CTX.fillStyle = this.color
      CTX.shadowBlur = 20
      CTX.shadowColor = 'rgba(255,255,255,.3 )'
      CTX.fillRect(x, y, this.size, this.size)
      CTX.shadowBlur = 0
      if (this.total >= 2) {
        for (let i = 0; i < this.history.length - 1; i++) {
          let { x, y } = this.history[i]
          CTX.lineWidth = 1
          CTX.fillStyle = 'lightgreen'
          CTX.fillRect(x, y, this.size, this.size)
          CTX.strokeStyle = 'black'
          CTX.strokeRect(x, y, this.size, this.size)
        }
      }
    }
    walls() {
      let { x, y } = this.pos
      if (x + cellSize > W) {
        this.pos.x = 0
      }
      if (y + cellSize > W) {
        this.pos.y = 0
      }
      if (y < 0) {
        this.pos.y = H - cellSize
      }
      if (x < 0) {
        this.pos.x = W - cellSize
      }
    }
    controlls() {
      let dir = this.size
      if (KEY.ArrowUp) {
        this.dir = new helpers.Vec(0, -dir)
      }
      if (KEY.ArrowDown) {
        this.dir = new helpers.Vec(0, dir)
      }
      if (KEY.ArrowLeft) {
        this.dir = new helpers.Vec(-dir, 0)
      }
      if (KEY.ArrowRight) {
        this.dir = new helpers.Vec(dir, 0)
      }
    }
    selfCollision() {
      for (let i = 0; i < this.history.length; i++) {
        let p = this.history[i]
        if (helpers.isCollision(this.pos, p)) {
          isGameOver = true
        }
      }
    }
    update() {
      this.walls()
      this.draw()
      this.controlls()
      if (!this.delay--) {
        if (helpers.isCollision(this.pos, food.pos)) {
          incrementScore()
          particleSplash()
          food.spawn()
          this.total++
        }
        this.history[this.total - 1] = new helpers.Vec(this.pos.x, this.pos.y)
        for (let i = 0; i < this.total - 1; i++) {
          this.history[i] = this.history[i + 1]
        }
        this.pos.add(this.dir)
        this.delay = 7
        this.total > 3 ? this.selfCollision() : null
      }
    }
  }
  class Food {
    constructor() {
      this.pos = new helpers.Vec(
        ~~(Math.random() * cells) * cellSize,
        ~~(Math.random() * cells) * cellSize
      )
      this.color = 'red'
      this.size = cellSize
    }
    draw() {
      let { x, y } = this.pos
      CTX.globalCompositeOperation = 'lighter'
      CTX.shadowColor = this.color
      CTX.fillStyle = this.color
      CTX.beginPath()
      CTX.arc(x + this.size / 2, y + this.size / 2, this.size / 2, 0, Math.PI * 2)
      CTX.fill()
      CTX.globalCompositeOperation = 'source-over'
      CTX.shadowBlur = 0
    }
    spawn() {
      let randX = ~~(Math.random() * cells) * this.size
      let randY = ~~(Math.random() * cells) * this.size
      for (let path of snake.history) {
        if (helpers.isCollision(new helpers.Vec(randX, randY), path)) {
          return this.spawn()
        }
      }
      this.color = 'red'
      this.pos = new helpers.Vec(randX, randY)
    }
  }
  class Particle {
    constructor(pos, color, size, vel) {
      this.pos = pos
      this.color = color
      this.size = Math.abs(size / 2)
      this.ttl = 0
      this.gravity = -0.2
      this.vel = vel
    }
    draw() {
      let { x, y } = this.pos
      let hsl = this.color
        .split('')
        .filter((l) => l.match(/[^hsl()$% ]/g))
        .join('')
        .split(',')
        .map((n) => +n)
      let [r, g, b] = helpers.hsl2rgb(hsl[0], hsl[1] / 100, hsl[2] / 100)
      CTX.shadowColor = 'white'
      CTX.shadowBlur = 0
      CTX.globalCompositeOperation = 'lighter'
      CTX.fillStyle = 'white'
      CTX.fillRect(x, y, this.size, this.size)
      CTX.globalCompositeOperation = 'source-over'
    }
    update() {
      this.draw()
      this.size -= 0.3
      this.ttl += 1
      this.pos.add(this.vel)
      this.vel.y -= this.gravity
    }
  }

  let helpers = null
  useEffect(() => {
    dom_replay = document.querySelector('#replay')
    dom_score = document.querySelector('#score')
    dom_canvas = document.createElement('canvas')

    CTX = dom_canvas.getContext('2d')

    W = dom_canvas.width = 500
    H = dom_canvas.height = 500

    document.querySelector('#canvas').appendChild(dom_canvas)

    helpers = {
      Vec: class {
        constructor(x, y) {
          this.x = x
          this.y = y
        }
        add(v) {
          this.x += v.x
          this.y += v.y
          return this
        }
        mult(v) {
          if (v instanceof helpers.Vec) {
            this.x *= v.x
            this.y *= v.y
            return this
          } else {
            this.x *= v
            this.y *= v
            return this
          }
        }
      },
      isCollision(v1, v2) {
        return v1.x == v2.x && v1.y == v2.y
      },
      garbageCollector() {
        for (let i = 0; i < particles.length; i++) {
          if (particles[i].size <= 0) {
            particles.splice(i, 1)
          }
        }
      },
      drawGrid() {
        CTX.lineWidth = 1.1
        CTX.strokeStyle = '#181825'
        CTX.shadowBlur = 0
        for (let i = 1; i < cells; i++) {
          let f = (W / cells) * i
          CTX.beginPath()
          CTX.moveTo(f, 0)
          CTX.lineTo(f, H)
          CTX.stroke()
          CTX.beginPath()
          CTX.moveTo(0, f)
          CTX.lineTo(W, f)
          CTX.stroke()
          CTX.closePath()
        }
      },
      randHue() {
        return ~~(Math.random() * 360)
      },
      hsl2rgb(hue, saturation, lightness) {
        if (hue == undefined) {
          return [0, 0, 0]
        }
        var chroma = (1 - Math.abs(2 * lightness - 1)) * saturation
        var huePrime = hue / 60
        var secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1))

        huePrime = ~~huePrime
        var red
        var green
        var blue

        if (huePrime === 0) {
          red = chroma
          green = secondComponent
          blue = 0
        } else if (huePrime === 1) {
          red = secondComponent
          green = chroma
          blue = 0
        } else if (huePrime === 2) {
          red = 0
          green = chroma
          blue = secondComponent
        } else if (huePrime === 3) {
          red = 0
          green = secondComponent
          blue = chroma
        } else if (huePrime === 4) {
          red = secondComponent
          green = 0
          blue = chroma
        } else if (huePrime === 5) {
          red = chroma
          green = 0
          blue = secondComponent
        }

        var lightnessAdjustment = lightness - chroma / 2
        red += lightnessAdjustment
        green += lightnessAdjustment
        blue += lightnessAdjustment

        return [Math.round(red * 255), Math.round(green * 255), Math.round(blue * 255)]
      },
      lerp(start, end, t) {
        return start * (1 - t) + end * t
      },
    }

    KEY = {
      ArrowUp: false,
      ArrowRight: false,
      ArrowDown: false,
      ArrowLeft: false,
      resetState() {
        this.ArrowUp = false
        this.ArrowRight = false
        this.ArrowDown = false
        this.ArrowLeft = false
      },
      listen() {
        addEventListener(
          'keydown',
          (e) => {
            if (e.key === 'ArrowUp' && this.ArrowDown) return
            if (e.key === 'ArrowDown' && this.ArrowUp) return
            if (e.key === 'ArrowLeft' && this.ArrowRight) return
            if (e.key === 'ArrowRight' && this.ArrowLeft) return
            this[e.key] = true
            Object.keys(this)
              .filter((f) => f !== e.key && f !== 'listen' && f !== 'resetState')
              .forEach((k) => {
                this[k] = false
              })
          },
          false
        )
      },
    }

    initialize()
    return
  }, [])

  function incrementScore() {
    setScore(++score)
  }

  function particleSplash() {
    for (let i = 0; i < splashingParticleCount; i++) {
      let vel = new helpers.Vec(Math.random() * 6 - 3, Math.random() * 6 - 3)
      let position = new helpers.Vec(food.pos.x, food.pos.y)
      particles.push(new Particle(position, '', food.size, vel))
    }
  }

  function clear() {
    CTX.clearRect(0, 0, W, H)
  }

  function initialize() {
    CTX.imageSmoothingEnabled = false
    KEY.listen()
    setFlage(false)
    cellsCount = cells * cells
    cellSize = W / cells
    snake = new Snake()
    food = new Food()
    dom_replay.addEventListener('click', reset, false)
    loop()
  }

  function loop() {
    clear()
    if (!isGameOver) {
      requestID = requestAnimationFrame(loop)
      helpers.drawGrid()
      snake.update()
      food.draw()
      for (let p of particles) {
        p.update()
      }
      helpers.garbageCollector()
    } else {
      clear()
      gameOver()
    }
  }

  function gameOver() {
    console.log(maxScore + 'ss' + score)
    console.log('max', maxScore)
    maxScore ? null : (maxScore = score)
    console.log('score', score)
    console.log('flage', flage)
    if (score >= maxScore) {
      maxScore = score
      setFlage(true)
      console.log('1111111')
    } else {
      setFlage(false)
    }

    CTX.fillStyle = '#4cffd7'
    CTX.textAlign = 'center'
    CTX.font = 'bold 30px Poppins, sans-serif'
    CTX.fillText('GAME OVER', W / 2, H / 2)
    CTX.font = '15px Poppins, sans-serif'
    CTX.fillText('SCORE   ' + score, W / 2, H / 2 + 60)
    CTX.fillText('MAXSCORE   ' + maxScore, W / 2, H / 2 + 80)
  }

  function reset() {
    dom_score.innerText = '00'
    score = '00'
    snake = new Snake()
    setFlage(false)
    food.spawn()
    KEY.resetState()
    isGameOver = false
    cancelAnimationFrame(requestID)
    loop()
  }

  const GetTokenButton = () => {
    const { write, isLoading, isSuccess } = useContractWrite({
      address: '0x08fDe05088a6f760376af8E0Af363c0ce43e8129',
      abi: [
        {
          inputs: [],
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'spender',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'value',
              type: 'uint256',
            },
          ],
          name: 'Approval',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'from',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'value',
              type: 'uint256',
            },
          ],
          name: 'Transfer',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'from',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256',
            },
          ],
          name: 'transferTo',
          type: 'event',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'spender',
              type: 'address',
            },
          ],
          name: 'allowance',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'spender',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256',
            },
          ],
          name: 'approve',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
          ],
          name: 'balanceOf',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'decimals',
          outputs: [
            {
              internalType: 'uint8',
              name: '',
              type: 'uint8',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'spender',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'subtractedValue',
              type: 'uint256',
            },
          ],
          name: 'decreaseAllowance',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: '_maxScore',
              type: 'uint256',
            },
          ],
          name: 'getTokens',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'spender',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'addedValue',
              type: 'uint256',
            },
          ],
          name: 'increaseAllowance',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
          ],
          name: 'mint',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'name',
          outputs: [
            {
              internalType: 'string',
              name: '',
              type: 'string',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'symbol',
          outputs: [
            {
              internalType: 'string',
              name: '',
              type: 'string',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'totalSupply',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256',
            },
          ],
          name: 'transfer',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'from',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256',
            },
          ],
          name: 'transferFrom',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      functionName: 'getTokens',
    })
    const { address } = useAccount()

    return (
      <>
        <div className='tokenBtn'>
          <button
            disabled={isLoading || isSuccess}
            id='mintBtn'
            onClick={() =>
              write({
                args: [address, score],
              })
            }
          >
            <i className='fas fa-play'></i>
            GetYourToken
            {isLoading && <p>Please Wait..</p>}
            {isSuccess && <p>GetTokens Success</p>}
          </button>
        </div>
      </>
    )
  }
  return (
    <>
      <div className='container_snake noselect'>
        <div id='author'>
          <h1>Snake Game</h1>
        </div>
        <div id='canvas'></div>
        <div id='ui'>
          <h2>SCORE</h2>
          <br />
          <span id='score'>{score}</span>
        </div>

        <button id='replay'>
          <i className='fas fa-play'></i>
          RESTART
        </button>

        {flage ? <GetTokenButton></GetTokenButton> : null}
      </div>
    </>
  )
}
export default SnakeGame
