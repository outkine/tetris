import React from 'react'

class Main extends React.Component {
  render () {
    return (
      <p>
        loading.......  
      </p>
    )
  }

  componentDidMount () {
    this.interval = setInterval(() => {
      window.location = '/game'
    }, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }
}

export default Main
