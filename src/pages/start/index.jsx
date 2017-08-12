import React from 'react'

import GameArea from '../../component/GameArea.jsx'

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
        <GameArea className="absolute" updateWait="200" fullScreen background transition={this.state.transition} />
        <div className="row">
          <button><a href="/singleGame"><img src="media/user.svg" style={this.state.transition ? {animationPlayState: 'running'} : {}} ref={this.imgCallbackSingle} onClick={this.imgClickSingle} /></a></button>
          <button><a href="/loading"><img src="media/user_group.svg" style={this.state.transition ? {animationPlayState: 'running'} : {}} ref={this.imgCallbackMulti} onClick={this.imgClickMulti} /></a></button>
        </div>
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
