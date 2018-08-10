import React, { Component } from 'react'

class Markers extends Component {
  render () {
    const { markers, map } = this.props;
    for(let marker of markers){
      if(marker.id%2!==0){

        marker.setMap(map)
      }
    }
    return(
      <div/>
    )
  }
}

export default Markers