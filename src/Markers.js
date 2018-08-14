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

  // 
  updateIcon = (marker) => {
    marker.icon = marker.iconHigh
    this.render()
    const google = window.google || {};
    let anim = google.maps.Animation.BOUNCE
    marker.setAnimation(anim)
    
  }

  test = (marker) => {
    this.updateQuery(marker.title)
  }

  defaultIcon = (marker) => {
    marker.icon = marker.iconDefault;
    this.render()
    marker.setAnimation(null)
    
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
              tabIndex="1"
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

        <ol     className="search-list">
            {showingMarkers.map((marker) =>
                <li key={marker.id} tabIndex={marker.id+1} className="search-item" 
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