import React, { Component } from 'react'
import iconBusHigh from './img/bus-station-green.svg'
import iconChurchHigh from './img/church-green.svg'

class Markers extends Component {
  
  state = {
    query:'',
    icon:'',
    count:-1,
    moveFlag: true
  }

  updateQuery = (query) =>{
    this.setState({query: query})
  }
  initialize = (marker) =>{
    const google = window.google || {};
    let panorama = new google.maps.StreetViewPanorama(
      document.getElementById('pano'), {
        position: marker.position,
        pov: {
          heading: 34,
          pitch: 10
        }
      });
      this.props.map.setStreetView(panorama);
  }

  // 
  updateIcon = (marker) => {
    marker.icon = marker.iconHigh
    const google = window.google || {};
    let anim = google.maps.Animation.BOUNCE
    marker.setAnimation(anim)
    
  }

  test = (marker) => {
    // console.log(marker)
    this.updateQuery(marker.title)
  
    // marker.icon = this.state.icon;
  }

  defaultIcon = (marker) => {
    // console.log(marker.icon)
    marker.icon = marker.iconDefault;
    marker.setAnimation(null)
    // this.setState({icon: ''})
    
  }

  move = (e) => {
    let array = document.querySelectorAll('li')
    let count = this.state.count;
    console.log(count)
  
    for(let elem of array){
      elem.className = "search-item"
    }
    
    if(count === array.length-1) {
      count = -1; this.setState({count:count})
    }
    
    
      
    if(e.keyCode === 40 && array.length > 0) {
      count++;
      
      console.log(count)
      array[count].focus()
      array[count].className="search-item-hover"
     
      this.setState({count:count})
    }
    if(e.keyCode === 38 && array.length > 0) {
      if(count === -1){
        count = array.length-1
      }else if(count === 0) {
        count = array.length
      }
      count--;
      // console.log(count)
      array[count].focus()
      array[count].className="search-item-hover"
     
      this.setState({count:count})
    }
  
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
              onChange={(event) => {this.updateQuery(event.target.value);
                
                window.addEventListener('keydown', this.move)
              
              }
                
              }
              onClick={(e)=>{
                e.target.value='';
                this.updateQuery(e.target.value)
                window.removeEventListener('keydown', this.move)
                this.setState({count:-1})

              }}
              
              
            />
          </div>
        </header>

        <ol tabIndex="-1" className="search-list">
            {showingMarkers.map((marker) =>
                <li key={marker.id} tabIndex="-1" className="search-item" 
                  onFocus={() => this.updateIcon(marker)} onBlur={() =>this.defaultIcon(marker)} onClick={() => {this.test(marker)}} 
                  onMouseOver={() => this.updateIcon(marker)} onMouseOut={() => this.defaultIcon(marker)}>
                    
                        {marker.title}
                    

                </li> 
            )}
        </ol>
      </div>
    )
  }
}

export default Markers