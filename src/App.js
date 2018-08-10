import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Weather from './Weather'


class App extends Component {
  state={
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
    const script = document.createElement("script");

        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCOu94PdyQ8C-iv_GfghV4RDNGviPrtePY&v=3";
        script.async = true;

        document.body.appendChild(script);
  }
  render() {
    return (
      <div className="App">
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
