import React, { Component } from 'react'
import emot from './img/emot.svg'

class NoNetwork extends Component {
  render () {
    return (
      <div>
        <div className="problem">
        We don't have any data from server
        <div><img src={emot} alt="sad emot icon"/></div>
        </div>
        
      </div>
    )
  }
}
export default NoNetwork