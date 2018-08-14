import React, { Component } from 'react'
import iconBurger from './img/burger_menu.svg'
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
  updateIcon = (marker, e) => {
    this.render()
    marker.icon = marker.iconHigh
    console.log(e.target)
    e.target.className="search-item-hover"
    const google = window.google || {};
    let anim = google.maps.Animation.BOUNCE
    marker.setAnimation(anim)
    
  }

  test = (marker) => {
    this.updateQuery(marker.title)
    this.props.map.click
    // this.render()
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
    // icon.classList.toggle('close')
    if(search.disabled) {
      
      search.removeAttribute('disabled')
      search.placeholder='Search by bus, name or address'
    }else{
      search.value=''
      search.setAttribute('disabled','')
      search.placeholder='Click to search'
    }
    console.log(search.disabled)
  }

  // move = (e) => {
  //   let array = document.querySelectorAll('li')
  //   let count = this.state.count;
  //   console.log(count)
  
  //   for(let elem of array){
  //     elem.className = "search-item"
  //   }
    
  //   if(count === array.length-1) {
  //     count = -1; this.setState({count:count})
  //   }
    
    
      
  //   if(e.keyCode === 40 && array.length > 0) {
  //     count++;
      
  //     console.log(count)
  //     array[count].focus()
  //     array[count].className="search-item-hover"
     
  //     this.setState({count:count})
  //   }
  //   if(e.keyCode === 38 && array.length > 0) {
  //     if(count === -1){
  //       count = array.length-1
  //     }else if(count === 0) {
  //       count = array.length
  //     }
  //     count--;
  //     // console.log(count)
  //     array[count].focus()
  //     array[count].className="search-item-hover"
     
  //     this.setState({count:count})
  //   }
  
  // }

  

  render () {
    const { markers, map, infoWindow } = this.props;
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
    let largeInfoWindow = new google.maps.InfoWindow()
   
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
            <div className="search-icon" onClick={()=>this.hideMenu()}></div>
            <input
              className='search-places'
              type='text'
              placeholder='Search by bus, name or address'
              value={this.state.query}
              tabIndex="1"
              onChange={(event) => {this.updateQuery(event.target.value);
                
                // window.addEventListener('keydown', this.move)
              
              }
                
              }
              onClick={(e)=>{
                e.target.value='';
                if(e.target.disabled){
                  this.updateQuery(e.target.value)
                  this.hideMenu()
                }
                // this.updateQuery(e.target.value)

                // window.removeEventListener('keydown', this.move)
                
              }}
              
              
            />
            <div className="refresh-icon" 
              onClick={()=>this.updateQuery('')}
            ></div>

          </div>
        </header>
        <div className="nav open">
        <ol     className="search-list">
            {showingMarkers.map((marker) =>
                <li key={marker.id} tabIndex={marker.id+1} className="search-item" 
                  onFocus={(e) => {this.updateIcon(marker,e)}} onBlur={(e) =>this.defaultIcon(marker, e)} onClick={() => {this.test(marker)}} 
                  onMouseOver={(e) => this.updateIcon(marker,e)} onMouseOut={(e) => this.defaultIcon(marker, e)}>
                    
                        {marker.title}
                    

                </li> 
            )}

        </ol>
        </div> 
      </div>
    )
  }
}

export default Markers