import React from 'react'

import GameArea from '../../component/GameArea.jsx'
import ControlsExplanation from '../../component/ControlsExplanation.jsx'
import Footer from '../../component/Footer.jsx'

class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      transition: false
    }
  }
  render () {
    return (
      <div className="vertical-center">
        <GameArea className="center" updateWait="200" background transition={this.state.transition} />
        {
          !this.state.transition ? (
            <div className="horizontal-center col">
              <h3>Welcome to</h3>
              <h1>Austhetically Pleasing Tetris</h1>
              <br /><br />
              <ControlsExplanation />
              <br />
              <div className="row">
                <button><img src="media/user.svg" style={this.state.transition ? {animationPlayState: 'running'} : {}} ref={this.imgCallbackSingle} onClick={this.imgClickSingle} /></button>
                <button><img src="media/user_group.svg" style={this.state.transition ? {animationPlayState: 'running'} : {}} ref={this.imgCallbackMulti} onClick={this.imgClickMulti} /></button>
              </div>
            </div>
          ) : ''
        }
      <Footer />
      </div>
    )
  }

  imgCallbackSingle = (element) => {
    this.imgSingle = element
  }

  imgCallbackMulti = (element) => {
    this.imgMulti = element
  }

  imgClickSingle = (element) => {
    this.setState({transition: '/singleGame'})
  }

  imgClickMulti = (element) => {
    this.setState({transition: '/loading'})
  }
}

export default Main
