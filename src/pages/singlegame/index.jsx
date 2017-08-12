import React from 'react'

import GameArea from '../../component/GameArea.jsx'
// import style from './stylesheet.css'
import ControlsExplanation from '../../component/ControlsExplanation.jsx'
import TetrisButton from '../../component/TetrisButton.jsx'

class Component extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDialog: true
    }
  }

  render () {
    return (
      <div className="vertical-center">
        <GameArea className="center" interactive pause={this.state.showDialog} background={this.state.showDialog} />
        {
          this.state.showDialog ? (
            <button className="horizontal-center" onClick={this.buttonHandler}>ready?</button>
          ) : ''
        }
      </div>
    )
  }

  buttonHandler = () => {
    this.setState({showDialog: false})
  }
}

export default Component

