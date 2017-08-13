import React from 'react'

import GameArea from '../../component/GameArea.jsx'
import ControlsExplanation from '../../component/ControlsExplanation.jsx'

class Component extends React.Component {
  constructor(props) {
    super(props)
    this.state = {gameOver: false}
  }

  render () {
    return (
      <div className="vertical-center">
        <GameArea className="center" interactive background={this.state.gameOver} onGameOver={() => {console.log(this);this.setState({gameOver: true})}} />
        { this.state.gameOver ? (
            <div className="horizontal-center col">
              <h1>Game Over</h1>
              <button onClick={() => window.location = '/singleGame'}>try again?</button>
            </div>
          ) : ''
        }
      </div>
    )
  }
}

export default Component

