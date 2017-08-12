import React from 'react'

import style from './stylesheet.css'

class Component extends React.Component {
  render () {
    return (
      <img src='media/controls.png' style={{height:'200px'}} className={style.ControlsExplanation} />
    )
  }
}

export default Component

