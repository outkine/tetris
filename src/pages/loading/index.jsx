import React from 'react'

class Main extends React.Component {
  render () {
    return (
      <div className="vertical-center">
        <img src='media/rotation.gif' />
        <h3>finding an opponent...</h3>
      </div>
    )
  }

  componentDidMount () {
    this.interval = setInterval(() => {
      window.location = '/game'
    }, 3000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }
}

export default Main
