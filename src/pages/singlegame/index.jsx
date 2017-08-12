import React from 'react'

import GameArea from '../../component/GameArea.jsx'
// import style from './stylesheet.css'
import ControlsExplanation from '../../component/ControlsExplanation.jsx'
import TetrisButton from '../../component/TetrisButton.jsx'

class Component extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div className="vertical-center">
        <GameArea className="center" interactive />
      </div>
    )
  }
}

export default Component

