import React, { Component } from 'react'
import iconBusHigh from './bus-station-green.svg'
import iconChurchHigh from './church-green.svg'

class Markers extends Component {

  state = {
    query:'',
    icon:'',
  }

  updateQuery = (query) =>{
    this.setState({query: query.trim()})
  }

  // 
  updateIcon = (marker) => {
    this.setState({icon: marker.icon})
    switch (marker.type) {
      case 'bus stop':
        marker.icon = iconBusHigh;
        break
      // case 'home':
      //   marker.icon = iconHouse;
      //   break;
      case 'church':
        marker.icon = iconChurchHigh;
        break;
      default:
        marker.icon = marker.icon;
    }
  }

  defaultIcon = (marker) => {
    marker.icon = this.state.icon;
    this.setState({icon: ''})
  }

  

  render () {
    const { markers, map } = this.props;
    const { query } = this.state;

    let showingMarkers
        if(query){
            const match = new RegExp(this.state.query, 'i')
            showingMarkers = markers.filter((marker) => match.test(marker.title))
        }else{
            showingMarkers = markers;
        }

        
    // for(let marker of showingMarkers){
    //     marker.setMap(map)
    // }

    
    const google = window.google || {};
    let bounds = new google.maps.LatLngBounds();
   
    for(let marker of markers) {
      marker.setMap(null)
    }

    for(let marker of showingMarkers) {
      marker.setMap(map);
      bounds.extend(marker.position);
      map.fitBounds(bounds)
    }
    
  
    return(
      <div>
        <input
          className='search-contacts'
          type='text'
          placeholder='Search contacts'
          value={this.state.query}
          onChange={(event) => this.updateQuery(event.target.value)}
        />
        <ol style={{position: 'absolute'}}>
                    {showingMarkers.map((marker) =>
                        <li key={marker.id} id={`marker:${marker.id}`}>
                            <div onMouseOver={() => this.updateIcon(marker)} onMouseOut={() => this.defaultIcon(marker)} >
                                {marker.title}
                            </div>

                        </li> 
                    )}
                </ol>
      </div>
    )
  }
}

export default Markers