import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import { Link } from 'react-router-dom'
import './App.css';
import Weather from './Weather'
import Markers from './Markers'




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
        
        this.initMap()  
        
      }).catch(()=>{
        this.setState({locations: [
          {type: 'bus stop', title:'Radomska 60', location: {lat:51.432822, lng:21.320922}, direction:'Radom'},
          {type: 'bus stop', title:'Radomska 69', location: {lat:51.432921, lng:21.318971}, direction:'Jedlnia-Letnisko'},
          {type: 'bus stop', title:'Siczki', location: {lat:51.437613, lng:21.30547}, direction:'Radom'},
          {type: 'bus stop', title:'Radomska 32', location: {lat:51.432071, lng:21.326588}, direction:'Radom'},
          {type: 'bus stop', title:'Piłsudski Square', location: {lat:51.430069, lng:21.327622}, direction:'Radom'},
          {type:'place', title:'Pawel`s home', location: {lat:51.434571, lng: 21.316791}},
          {type:'place', title:'Monument to the victims of the Nazi occupation', location: {lat:51.430406, lng: 21.32743}},
          {type:'place', title:'Church of St Joseph', location: {lat:51.434173, lng: 21.327767}},
        ]});
        this.setState({network:false})
      })
    
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
        <div class="more">TEST</dive>
        <div> ${marker.position} </div>`)
        largeInfoWindow.open(this.map, marker)
        document.querySelector('.more').addEventListener('click', ()=>{this.setState({info: true, markerInfo: marker}); console.log(marker)})
      }
    })
    largeInfoWindow.addListener('closeclick', ()=>{
      largeInfoWindow.marker=null
    })

    largeInfoWindow.addListener('click', () => {
      console.log('xxx')
    })
  }

  initMap = () => {
    const google = window.google || {};
    let bounds = new google.maps.LatLngBounds();
    let largeInfoWindow = new google.maps.InfoWindow()
    let styledMap = new google.maps.StyledMapType(
      [
        {
          "featureType": "poi.business",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.government",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.medical",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.medical",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.medical",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.medical",
          "elementType": "labels.text",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.place_of_worship",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.school",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        }
      ]  
    )
    
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat:51.434571, lng: 21.316791},
      zoom: 15,
      mapTypeControl: false,
    })  

    this.map.mapTypes.set('styled_map', styledMap);
    this.map.setMapTypeId('styled_map');
  
    this.setState({map: this.map})
    // this.state.map.addListener('click', ()=> console.log('xx'))
    
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
      }) 
      this.state.markers.push(marker);
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
            info={this.state.info}
            markerInfo={this.state.markerInfo}
            markers={this.state.markers}
            map={this.state.map}
            network={this.state.network}
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
