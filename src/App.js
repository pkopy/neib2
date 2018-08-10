import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Weather from './Weather'
import Markers from './Markers'


class App extends Component {
  state={
    map:'',
    markers:[],
    locations: [
      {type: 'bus stop', title:'Radomska 60', location: {lat:51.432822, lng:21.320922}, direction:'Radom'},
      {type: 'bus stop', title:'Radomska 69', location: {lat:51.432921, lng:21.318971}, direction:'Jedlnia-Letnisko'},
      {type: 'bus stop', title:'Siczki', location: {lat:51.437613, lng:21.30547}, direction:'Radom'},
      {type: 'bus stop', title:'Radomska 32', location: {lat:51.432071, lng:21.326588}, direction:'Radom'},
      {type: 'bus stop', title:'Piłsudski Square', location: {lat:51.430069, lng:21.327622}, direction:'Radom'},
      {type:'place', title:'Pawel`s home', location: {lat:51.434571, lng: 21.316791}},
      {type:'place', title:'Monument to the victims of the Nazi occupation', location: {lat:51.430406, lng: 21.32743}},
      {type:'place', title:'Church of St Joseph', location: {lat:51.434173, lng: 21.327767}},
    ]
  }

  componentDidMount () {
    
        this.initMap()
  }

  initMap = () => {
    //  let markers = this.state.markers
    // let infoWindow = new google.maps.InfoWindow();
    const google = window.google || {};
    let bounds = new google.maps.LatLngBounds();
  
    // google.maps = google.map || {};
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat:51.434571, lng: 21.316791},
      zoom: 14,
      mapTypeControl: false,
    })   
    this.setState({map: this.map})
    // let pawel =   {lat:51.434571, lng: 21.316791};
    for(let i = 0; i < this.state.locations.length; i++){
      // console.log(location)
      let marker = new google.maps.Marker({
        position: this.state.locations[i].location,
        // map: this.map,
        animation: google.maps.Animation.DROP,
        title:`${this.state.locations[i].type.toUpperCase()}\n${this.state.locations[i].title}`,
        type: this.state.locations[i].type,
        id: i,
        icon: ''
      }) 
      this.state.markers.push(marker);
      bounds.extend(marker.position)
      // console.log(marker)
    }
    // this.state.actualMarkers = this.state.markers;
  
    this.setState({bounds: bounds})
  
    this.map.fitBounds(bounds)
    
    for(let marker of this.state.markers) {
      // marker.setMap(this.state.map)
        marker.addListener('click', () => {
          this.showListing(marker)
        })
    }
    
    
    //   content: "Tralala ldsasjfsa"
    // }) 
    // console.log(this.state.markers) 
  }
  render() {
    console.log(this.state.map)
    return (
      <div className="App">
        <div id="map"></div>
        <Markers 
          markers={this.state.markers}
          map={this.state.map}
        />
        <Weather 
          city={'jedlnia-letnisko'}
        />
        <Weather 
          city={'radom'}
        />
      </div>
    );
  }
}

export default App;
