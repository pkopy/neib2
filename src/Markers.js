import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import InfoWindow from './InfoWindow'
import NoNetwork from './NoNetwork'

class Markers extends Component {
  
  state = {
    query:'',
    icon:'',  
    
  }

  updateQuery = (query) =>{
    this.setState({query: query})
  }

  updateIcon = (marker, e) => {
    this.render()
    marker.icon = marker.iconHigh
    e.target.className="search-item-hover"
    const google = window.google || {};
    let anim = google.maps.Animation.BOUNCE
    marker.setAnimation(anim)
    
  }

  test = (marker) => {
    this.updateQuery(marker.title)
    
    
    let largeInfoWindow = marker.largeInfoWindow
    let direction='';
    if(marker.type === 'bus stop') {
      direction = `<div>Direction: ${marker.direction}</div>`
    }
    if(largeInfoWindow.marker !== marker) {
      largeInfoWindow.marker = marker;
      
      largeInfoWindow.setContent(`<div style="font-size: 1.2em"><strong>${marker.title.toUpperCase()}</strong></div> 
        <div><span>${marker.type.toUpperCase()}</span></div>
        <img src=${marker.icon}> 
        ${direction}
        <div class="more">More information...</div>`
      )
      this.props.setMarkerInfo(marker)
      largeInfoWindow.open(this.map, marker)
      
      document.querySelector('.more').addEventListener('click', ()=>{ 
        this.props.setInfoTrue()
        largeInfoWindow.close();
        largeInfoWindow.marker=null; 
      })  
    }    
    marker.largeInfoWindow.open(this.props.map, marker)
  }

  defaultIcon = (marker, e) => {
    marker.icon = marker.iconDefault;
    e.target.className="search-item"
    e.target.blur()
    marker.setAnimation(null)
    this.render() 
  }

  hideMenu = () => {
    let drawer = document.querySelector('.nav');
    let search = document.querySelector('.search-places')
    let icon = document.querySelector('.search-icon')
    drawer.classList.toggle('open');
    icon.classList.toggle('close')
    if (search.disabled) {
      search.removeAttribute('disabled')
      search.placeholder='Search by type or address'
    } else {
      search.value=''
      search.setAttribute('disabled','')
    }

  }

 

  render () {
    const { markers, map, info, setInfo, markerInfo, network, photoChurch } = this.props;
    const { query } = this.state;

    let showingMarkers
    if(query){
        const match = new RegExp(escapeRegExp(this.state.query), 'i')
        showingMarkers = markers.filter((marker) => match.test(marker.title) || match.test(marker.type) )
    }else{
        showingMarkers = markers;
    }

    const google = window.google;
        
    if(google){
      let bounds = new google.maps.LatLngBounds();
      for(let marker of markers) {
        marker.setMap(null)
      }

      for(let marker of showingMarkers) {
        marker.setMap(map);
        bounds.extend(marker.position);
        map.fitBounds(bounds) 
      }
    }
    
  
    return(
      <div>
        <header className="App-header">    
          <h1 className="App-title">Jedlnia-Letnisko Info</h1>
          <div className="search-bar" >
            <div className="search-icon" onClick={()=>this.hideMenu()}></div>
            <input
              className='search-places'
              type='text'
              placeholder='Search by type or address'
              value={this.state.query}
              tabIndex="1"
              onChange={(event) => {this.updateQuery(event.target.value);

              }
                
              }
              onClick={(e)=>{
                e.target.value='';
                if(e.target.disabled){
                  this.updateQuery(e.target.value)
                  this.hideMenu()
                }
 
              }}
              
              
            />
            <div className="refresh-icon" 
              onClick={()=>this.updateQuery('')}
            ></div>

          </div>
        </header>
        <div className="nav open">
          <ol className="search-list">
            {showingMarkers.map((marker) =>
                <li key={marker.id} tabIndex={marker.id+1} className="search-item" 
                  onFocus={(e) => {this.updateIcon(marker,e)}} onBlur={(e) =>this.defaultIcon(marker, e)} onClick={() => {this.test(marker)}} 
                  onMouseOver={(e) => this.updateIcon(marker,e)} onMouseOut={(e) => this.defaultIcon(marker, e)}>
                    {marker.title}
                </li> 
            )}
          </ol>
        </div> 
        <InfoWindow 
          hideMenu={this.hideMenu}
          markerInfo={markerInfo}
          info={info}
          setInfo={setInfo}
          photoChurch={photoChurch}
        />
        {network?'':(<NoNetwork />)}
      </div>
    )
  }
}

export default Markers