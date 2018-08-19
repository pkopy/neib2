import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import './App.css';
import Weather from './Weather'
import Markers from './Markers'
import styles from './stylesMap'




class App extends Component {
  state={
    map:'',
    markers:[],
    locations: [],
    info: false,
    markerInfo:'',
    network: true,
    
  }

  componentDidMount () {
    let token = localStorage.token
    if (!token){
      token = localStorage.token = Math.random().toString(36).substr(-8)
    }
    fetch('http://46.41.150.120:5001/locations', {
        headers: {
          'Accept': 'application/json',
          'Authorization': token
        }
     })
      .then(res => res.json())
      .then(data=>{
        this.setState({locations:data.locations})
        return data.locations
          
      // Fetch data from Wiki API  
      }).then((data) => fetch('https://pl.wikipedia.org/w/api.php?action=query&origin=*&titles=Kościół_św._Józefa_w_Jedlni-Letnisko&prop=info|description|pageimages|cirrusdoc&format=json&formatversion=2&inprop=url&descprefersource=local&piprop=original')
      .then((res) => res.json())
      .then((info) => {
          let photo = {src: info.query.pages[0].original.source }
          let desc = info.query.pages[0].cirrusdoc[0].source.opening_text
          let link = info.query.pages[0].canonicalurl
          data.map((location) => {
            if(location.type ==='church') {
              location.photo = photo;
              location.description = desc
              location.url = link
            }
          
          })
        
          this.initMap()
          
      }) )
      .catch((err)=>{
        this.setState({network:false})
      })
 
  }
  setMarkerInfo = (marker) =>{
    this.setState({markerInfo: marker})
  }

  setInfoTrue = () => {
    this.setState({info:true})
  }

  setInfo = () => {
    this.setState({info:false})
  }

  infoWindow = (marker, largeInfoWindow) => {
    let direction='';
    if(marker.type === 'bus stop') {
      direction = `<div>Direction: ${marker.direction}</div>`
    }
    marker.addListener('click', () =>{
      if(largeInfoWindow.marker !== marker) {
        largeInfoWindow.marker = marker;
        
        largeInfoWindow.setContent(`<div style="font-size: 1.2em"><strong>${marker.title.toUpperCase()}</strong></div> 
        <div><span>${marker.type.toUpperCase()}</span></div>
        <img src=${marker.icon}> 
        ${direction}
        <div class="more">More information...</div>
        `)
        largeInfoWindow.open(this.map, marker)
        document.querySelector('.more').addEventListener('click', ()=>{
          this.setState({info: true, markerInfo: marker}); 
          largeInfoWindow.close();
          largeInfoWindow.marker=null;
          for(let marker of this.state.markers){
            marker.setMap(null)
          }
        })

        
      }
    })
    largeInfoWindow.addListener('closeclick', ()=>{
      largeInfoWindow.marker=null
    })

    
  }

  initMap = () => {
    const google = window.google || {};
    google.maps = google.maps || {};
    let bounds = new google.maps.LatLngBounds();
    let largeInfoWindow = new google.maps.InfoWindow()
    let styledMap = new google.maps.StyledMapType(styles)
    
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat:51.434571, lng: 21.316791},
      zoom: 15,
      mapTypeControl: false,
      streetViewControl: false
    })  

    this.map.mapTypes.set('styled_map', styledMap);
    this.map.setMapTypeId('styled_map');
    this.setState({map: this.map})
    
    for(let i = 0; i < this.state.locations.length; i++){
      let marker = new google.maps.Marker({
        position: this.state.locations[i].location,
        animation: google.maps.Animation.DROP,
        title:this.state.locations[i].title,
        type: this.state.locations[i].type,
        direction: this.state.locations[i].direction,
        id: i,
        icon: this.state.locations[i].iconDefault,
        iconDefault: this.state.locations[i].iconDefault,
        iconHigh: this.state.locations[i].iconHigh,
        photo: this.state.locations[i].photo,
        timetable: this.state.locations[i].timetable,
        description: this.state.locations[i].description,
        url: this.state.locations[i].url,
        largeInfoWindow: largeInfoWindow
      }) 
      
      this.state.markers.push(marker)
      bounds.extend(marker.position)
      this.infoWindow(marker, largeInfoWindow)
     
    }
  
    this.setState({bounds: bounds})
    this.map.fitBounds(bounds)
    
  }




  render() {
    
    return (
      <div className="App">
        <div id="map"></div>
        <Route exact path='/' render={() => (
          <Markers
            setInfo={this.setInfo}
            setInfoTrue={this.setInfoTrue}
            info={this.state.info}
            markerInfo={this.state.markerInfo}
            setMarkerInfo={this.setMarkerInfo}
            markers={this.state.markers}
            map={this.state.map}
            network={this.state.network}
            photoChurch={this.state.photoChurch}
            google={this.state.google}
            infoWindow={this.infoWindow}
          />

        )} />
        <Weather 
          city={'jedlnia-letnisko'}
        />
        
      </div>
    );
  }
}

export default App;
