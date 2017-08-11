import React from 'react'

// import style from './stylesheet.css'

class GameArea extends React.Component {
  render () {
    return (
      <canvas ref={this.canvasCallback} />
    )
  }

  canvasCallback = (canvas) => {
    // js canvas code goes here
  }
}

export default GameArea
