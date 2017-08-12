import React from 'react'

import GameArea from '../../component/GameArea.jsx'
import Chat from './component/Chat.jsx'
import io from 'socket.io-client'

class Game extends React.Component {
  constructor (props) {
    super(props)
    this.socket = io('http://127.0.0.1:5000/')
    this.socket.emit('move', 'what up')
  }
  render () {
    return (
      <div>
        <GameArea socket={this.socket} />
      </div>
    )
  }
}

export default Game
