import React from 'react'

import GameArea from '../../component/GameArea.jsx'
import io from 'socket.io-client'

class Game extends React.Component {
  constructor (props) {
    super(props)
    this.socket = io()
  }
  render () {
    return (
      <div className='row'>
        <GameArea socket={this.socket} interactive   />
        <GameArea inputSocket={this.socket} />
      </div>
    )
  }
}

export default Game
