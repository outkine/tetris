export const COLORS = [
  '#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e',
  '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50',
  '#f1c40f', '#e67e22', '#e74c3c', '#95a5a6',
  '#f39c12', '#d35400', '#c0392b', '#7f8c8d'
]
export const GRID_COLOR = '#bdc3c7'

// format: 
// right-most block is first in the array
// rotation center is second in the array
// squares have '[0, 0]' as their rotation center
export const PIECES = [
  [
    [3, 0], [1, 0], [2, 0], [0, 0] 
  ],
  [
    [2, 1], [0, 0], [1, 1], [0, 1]
  ],
  [
    [2, 1], [2, 0], [1, 1], [0, 1] 
  ],
  [
    [1, 1], [0, 0], [1, 0], [0, 1]
  ],
  [
    [2, 0], [0, 1], [1, 1], [1, 0]
  ],
  [
    [2, 1], [0, 0], [1, 1], [1, 0] 
  ],
  [
    [2, 1], [0, 1], [1, 1], [1, 0]
  ]
]

export const PIECES_URL = [
  'media/piece7.png',
  'media/piece5.png', 
  'media/piece4.png', 
  'media/piece6.png', 
  'media/piece3.png',  
  'media/piece2.png',
  'media/piece1.png'
]