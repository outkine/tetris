const GRID_WIDTH = 20
const VISUAL_GRID_HEIGHT = 20
const HIDDEN_HEIGHT = 3
const GRID_HEIGHT = VISUAL_GRID_HEIGHT + HIDDEN_HEIGHT

const BLOCK_WIDTH = 30
const COLORS = [
  '#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e',
  '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50',
  '#f1c40f', '#e67e22', '#e74c3c', '#95a5a6',
  '#f39c12', '#d35400', '#c0392b', '#7f8c8d'
]
const GRID_COLOR = '#bdc3c7'
const UPDATE_WAIT = 500

const KEY_RIGHT = 39
const KEY_LEFT = 37
const KEY_ROTATE = 38
const KEY_DROP = 40

// format: 
// right-most block is first in the array
// rotation center is second in the array
// squares have '[0, 0]' as their rotation center
const PIECES = [
  [
    [3, 0], [2, 0], [0, 0], [1, 0] 
  ],
  [
    [2, 1], [1, 1], [0, 0], [0, 1]
  ],
  [
    [2, 0], [1, 1], [0, 1], [2, 1]
  ],
  [
    [1, 1], [0, 0], [1, 0], [0, 1]
  ],
  [
    [2, 0], [1, 1], [0, 1], [1, 0]
  ],
  [
    [2, 1], [1, 1], [1, 0], [0, 0]
  ],
  [
    [2, 1], [1, 1], [0, 1], [1, 0]
  ]
]

const randRange = (upper) => {
  return Math.floor(Math.random() * upper)
}

const randomItem = (array) => {
  return array[randRange(array.length)]
}

const randomColor = () => {
  return randomItem(COLORS)
}

const deepCopy = (array) => {
  let new_array = []
  for (let item of array) {
    new_array.push(item.slice())
  }
  return new_array
}

const generateNewPiece = () => {
  let piece = deepCopy(randomItem(PIECES))
  let x = randRange(GRID_WIDTH - (piece[0][0] + 1))
  for (let i = 0; i < piece.length; i++) {
    piece[i][0] += x
  }
  return piece
}

const createGrid = () => {
  let grid = []
  for (let i = 0; i < GRID_WIDTH; i++) {
    grid[i] = new Array(GRID_HEIGHT)
  }
  return grid
}

const isSquare = (piece) => {
  // ambiguous formula for determining square (PIECE ORDER KEY)
  if (piece[0][0] - piece[1][0] === 1 && piece[0][1] - piece[1][1] === 1) {
    return true
  }
  return false
}

const rotatePiece = (piece) => {
  // if is square, don't rotate
  if (isSquare(piece)) {
    return piece
  }
  let rotatedPiece = []
  for (let [x, y] of piece) {
    let offset = [piece[1][0] - x, piece[1][1] - y]
    offset[1] *= -1
    let newBlock = [piece[1][0] + offset[1], piece[1][1] + offset[0]]
    rotatedPiece.push(newBlock)
  }
  return rotatedPiece
}

const movePiece = (piece, pieceId, grid, direction) => {
  let movedPiece = []
  for (let [x, y] of piece) {
    if ((x + direction < 0 || x + direction >= GRID_WIDTH) ||
        (typeof grid[x + direction][y] !== 'undefined' && grid[x + direction][y] !== pieceId)
      ) {
      // if next to piece or next to edge don't move
      return piece
    } else {
      movedPiece.push([x + direction, y])
    }
  }
  return movedPiece
}

const dropPiece = (currentPiece, currentPieceId, grid) => {
  while (true) {
    let results = updatePiece(grid, currentPiece, currentPieceId, false)
    if (results[1] !== currentPieceId) {
      break
    }
    currentPiece = results[0]
    grid = updateGrid(grid, currentPiece, currentPieceId)
  }
  return currentPiece
}

const updatePiece = (grid, currentPiece, currentPieceId) => {
  let gameOver = false

  // check if piece reached bottom
  let crashed = false
  for (let [x, y] of currentPiece) {
    if ((y === GRID_HEIGHT - 1) ||
        (typeof grid[x][y + 1] !== 'undefined' && grid[x][y + 1] !== currentPieceId)
      ) {
      crashed = true
      break
    }
  }

  let newPiece
  if (crashed) {
    // if current piece is not completely on the board, set 'gameOver'
    for (let [x, y] of currentPiece) {
      if (y < HIDDEN_HEIGHT) {
        gameOver = true
      }
    }
    // else, generate a new piece
    newPiece = generateNewPiece()
    currentPieceId += 1
  } else {
    // move current piece down
    newPiece = []
    for (let [x, y] of currentPiece) {
      newPiece.push([x, y + 1])
    }
  }

  return [newPiece, currentPieceId, gameOver]
}

const copyOverGrid = (oldGrid, newGrid, currentPieceId) => {
  // copy over the grid except for current piece
  for (let x = 0; x < GRID_WIDTH; x++) {
    for (let y = 0; y < GRID_HEIGHT; y++) {
      if (typeof oldGrid[x][y] !== 'undefined' && oldGrid[x][y] !== currentPieceId) {
        newGrid[x][y] = oldGrid[x][y]
      }
    }
  }
}

const applyPieceToGrid = (grid, piece, pieceId) => {
  for (let [x, y] of piece) {
    grid[x][y] = pieceId
  }
}

const checkForFull = (grid) => {
  for (let y = 0; y < GRID_HEIGHT; y++) {
    let fullRow = true
    for (let x = 0; x < GRID_WIDTH; x++) {
      if (typeof grid[x][y] === 'undefined') {
        fullRow = false
        break
      }
    }
    if (fullRow) {
      for (let x = 0; x < GRID_WIDTH; x++) {
        grid[x][y] = 'undefined'
        for (let y2 = y; y2 >= 0; y2--) {
          grid[x][y2 + 1] = grid[x][y2] 
        }
      }
    }
  }
}

const drawGrid = (grid) => {
  // clear screen
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  // draw new grid
  ctx.strokeStyle = GRID_COLOR
  for (let x = 0; x <= GRID_WIDTH; x++) {
    ctx.beginPath()
    ctx.moveTo(x * BLOCK_WIDTH, 0)
    ctx.lineTo(x * BLOCK_WIDTH, canvas.height)
    ctx.stroke()
  }
  for (let y = 0; y <= GRID_HEIGHT; y++) {
    ctx.beginPath()
    ctx.moveTo(0, y * BLOCK_WIDTH)
    ctx.lineTo(canvas.width, y * BLOCK_WIDTH)
    ctx.stroke()
  }

  // draw new pieces
  for (let x = 0; x < GRID_WIDTH; x++) {
    for (let y = 0; y < GRID_HEIGHT; y++) {
      if (typeof grid[x][y] !== 'undefined') {
        // when the colors run out, loops back to the first one
        ctx.fillStyle = COLORS[grid[x][y] - COLORS.length * Math.floor(grid[x][y] / COLORS.length)]
        ctx.fillRect(x * BLOCK_WIDTH, (y - HIDDEN_HEIGHT) * BLOCK_WIDTH, BLOCK_WIDTH, BLOCK_WIDTH)
      }
    }
  }
}

const updateGrid = (grid, currentPiece, currentPieceId) => {
  let newGrid = createGrid()
  copyOverGrid(grid, newGrid, currentPieceId)
  applyPieceToGrid(newGrid, currentPiece, currentPieceId)
  return newGrid
}

const canvas = document.querySelector('canvas')
canvas.width = GRID_WIDTH * BLOCK_WIDTH
canvas.height = GRID_HEIGHT * BLOCK_WIDTH - HIDDEN_HEIGHT * BLOCK_WIDTH
const ctx = canvas.getContext('2d')

let grid = createGrid()
let currentPiece = generateNewPiece()
let currentPieceId = 0

let updateTime = 0
let pause = false

const update = (timeStamp) => {
  if ((timeStamp - updateTime > UPDATE_WAIT) && !pause) {
    updateTime = timeStamp
    let results = updatePiece(grid, currentPiece, currentPieceId)
    currentPiece = results[0]
    currentPieceId = results[1]
    grid = updateGrid(grid, currentPiece, currentPieceId)
    checkForFull(grid)
    drawGrid(grid)
    if (results[2]) {
      console.log('GAME OVER')
      return
    }
  }
  window.requestAnimationFrame(update)
}
window.requestAnimationFrame(update)

document.addEventListener('keyup', function(event) {
  if (event.keyCode === KEY_DROP) {
    currentPiece = dropPiece(currentPiece, currentPieceId, grid)
    grid = updateGrid(grid, currentPiece, currentPieceId)
    checkForFull(grid)
    drawGrid(grid)
  }
})

document.addEventListener('keydown', function(event) {
  if (event.keyCode === KEY_LEFT) {
    currentPiece = movePiece(currentPiece, currentPieceId, grid, -1)
  } else if (event.keyCode === KEY_RIGHT) {
    currentPiece = movePiece(currentPiece, currentPieceId, grid, 1)
  } else if (event.keyCode === KEY_ROTATE) {
    currentPiece = rotatePiece(currentPiece)
  } else if (event.keyCode === 32) {
    pause = true
  } else {
    return
  }
  grid = updateGrid(grid, currentPiece, currentPieceId)
  checkForFull(grid)
  drawGrid(grid)
})

