import React, { Component } from 'react'


class Weather extends Component {
  state = {
    temp: '',
    icon: '',
  }

  componentDidMount () {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.props.city},pl&units=metric&appid=8fc1f63fcefa3c2d6d57a54a6400073e`).then((res) => res.json())
      .then((data)=>this.setState({temp:data.main.temp, icon:`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}))
      .catch(() => this.setState({temp: '-', icon:''}))
  }
  
  render() {
    const { temp, icon } = this.state
    return (
      <div>
        <div className="weather">
          <div>{temp} &#176;C</div>
          {icon ? <img src={icon} alt="weather`s icon" /> : <span>...</span>}
          <p>Powered by Openweathermap.org</p>
        </div>
        
        {icon ? <img src={icon} alt="weather`s icon" className="weather_icon"/> : <span></span>}
      </div>
    )
  }

}

export default Weather