import React from 'react'
import ReactDOM from 'react-dom'

import Start from './pages/start/index.jsx'
import Loading from './pages/loading/index.jsx'
import Game from './pages/game/index.jsx'
import './index.css'

let Component
switch(layout) {
  case 'start':
    Component = Start
    break
  case 'loading':
    Component = Loading
    break
  case 'game':
    Component = Game
    break
}

ReactDOM.render(
  <Component />,
  document.getElementById('app')
)
