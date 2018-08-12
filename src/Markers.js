import React, { Component } from 'react'
import iconBusHigh from './img/bus-station-green.svg'
import iconChurchHigh from './img/church-green.svg'

class Markers extends Component {
  
  state = {
    query:'',
    icon:'',
  }

  updateQuery = (query) =>{
    this.setState({query: query})
  }

  // 
  updateIcon = (marker) => {
    console.log(marker.iconHigh)
    this.setState({icon: marker.icon})
    // switch (marker.type) {
    //   case 'bus stop':
    //     marker.icon = iconBusHigh;
    //     break
    //   // case 'home':
    //   //   marker.icon = iconHouse;
    //   //   break;
    //   case 'church':
    //     marker.icon = iconChurchHigh;
    //     break;
    //   default:
    //     marker.icon = marker.icon;
    // }
    marker.icon = marker.iconHigh
    const google = window.google || {};
    let anim = google.maps.Animation.BOUNCE
    marker.setAnimation(anim)
    // this.updateQuery(marker.title)
  }

  test = (marker) => {
    // console.log(marker)
    this.updateQuery(marker.title)
  }

  defaultIcon = (marker) => {
    marker.icon = this.state.icon;
    marker.setAnimation(null)
    this.setState({icon: ''})
    
  }

  

  render () {
    const { markers, map } = this.props;
    const { query } = this.state;

    let showingMarkers
        if(query){
            const match = new RegExp(this.state.query, 'i')
            showingMarkers = markers.filter((marker) => match.test(marker.title) || match.test(marker.type) )
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
      // map.setCenter()
      
    }
    
  
    return(
      <div>
        <header className="App-header">    
          <h1 className="App-title">Jedlnia-Letnisko Info</h1>
          <div className="search-bar" >
            <input
              className='search-places'
              type='text'
              placeholder='Search by bus, name or address'
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
              onClick={(e)=>{
                e.target.value='';
                this.updateQuery(e.target.value)
              }}
              
            />
          </div>
        </header>
        {(query!=='')?(<ol className="search-list">
            {showingMarkers.map((marker) =>
                <li key={marker.id} className="search-item" onClick={() => {this.test(marker)}} onMouseOver={() => this.updateIcon(marker)} onMouseOut={() => this.defaultIcon(marker)}>
                    <div  >
                        {marker.title}
                    </div>

                </li> 
            )}
        </ol>):''}
      </div>
    )
  }
}

export default Markers