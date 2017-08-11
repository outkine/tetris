import React from 'react'

import TopPanel from '../../component/TopPanel.jsx'
import GameArea from './component/GameArea.jsx'

class Game extends React.Component {
  render () {
    return (
      <div>
        <TopPanel />   
        <GameArea />
      </div>
    )
  }
}

export default Game
