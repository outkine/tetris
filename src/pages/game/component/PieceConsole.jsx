import React from 'react'

import { COLORS, PIECES_URL } from '../../../common/constants.js'
import style from '../stylesheet.css'

class Component extends React.Component {
  constructor (props) {
    super(props)
    this.props.socket.on('crash', (data) => {
      if (data['id'] == opponent) {
        this.generateButtons()
      }
    })
    this.state = {pieces: this.shuffle(PIECES_URL).slice(0, 4), colors: this.shuffle(COLORS).slice(0, 4),}
  }

  render () {
    return (
      <div>
        <div className="row">
          <button className={style.TetrisButton} onClick={() => this.callback(0)}><img className={style.TetrisImg} style={{backgroundColor: this.state.colors[0]}} src={this.state.pieces[0]} /></button>
          <button className={style.TetrisButton} onClick={() => this.callback(1)}><img className={style.TetrisImg} style={{backgroundColor: this.state.colors[1]}} src={this.state.pieces[1]} /></button>
        </div>
        <div className="row">
          <button className={style.TetrisButton} onClick={() => this.callback(2)}><img className={style.TetrisImg} style={{backgroundColor: this.state.colors[2]}} src={this.state.pieces[2]} /></button>
          <button className={style.TetrisButton} onClick={() => this.callback(3)}><img className={style.TetrisImg} style={{backgroundColor: this.state.colors[3]}} src={this.state.pieces[3]} /></button>
        </div>
      </div>
    )
  }

  shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;
    let newArray = array.slice(0)

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = newArray[currentIndex];
      newArray[currentIndex] = newArray[randomIndex];
      newArray[randomIndex] = temporaryValue;
    }

    return newArray;
  }

  generateButtons = () => {
    this.setState({
      colors: this.shuffle(COLORS).slice(0, 4),
      pieces: this.shuffle(PIECES_URL).slice(0, 4)
    })
  }

  callback = (index) => {
    console.log(this.state.pieces[index])
    this.props.socket.emit('choice', {id: id, choice: PIECES_URL.indexOf(this.state.pieces[index])})
  }
}

export default Component

