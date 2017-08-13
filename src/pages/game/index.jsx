import React from 'react'

import GameArea from '../../component/GameArea.jsx'
import PieceConsole from './component/PieceConsole.jsx'
import io from 'socket.io-client'
import style from './stylesheet.css'

class Game extends React.Component {
  constructor (props) {
    super(props)
    // this.socket = io('http://127.0.0.1:5000/socket.io')
    this.socket = io()
  }
  render () {
    return (
      <div className='vertical-center'>
        <div className='row'>
          <GameArea className={style.GameArea} socket={this.socket} interactive   />
          <PieceConsole socket={this.socket} />
          <GameArea className={style.GameArea} inputSocket={this.socket} />
        </div>
      </div>
    )
  }
}

export default Game
