import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import imga from './busIcon.png'
class InfoWindow extends Component {
    state={
        content:'',
        // windowWidth:window.innerWidth,
        // windowHeight: window.innerHeight
    }
    componentDidMount() {
        fetch('https://en.wikipedia.org/w/api.php?action=query&origin=*&titles=Jedlnia-Letnisko&prop=info|description&format=json&formatversion=2&inprop=url&descprefersource=local')
      .then((res) => res.json())
      .then((data) => {this.setState({content:data.query.pages[0]})
          // let reg = /population_total = \d*/;
          // let myArray = reg.exec(data.query.pages[0].revisions[0].content)
          // let reg1 = /\d+/
          // this.setState({content:(reg1.exec(myArray[0]))[0]})
          // console.log(reg1.exec(myArray[0]))
          console.log(data)
      })
    }

    hideWeather = () => {
        let weather = document.querySelector('.weather')
        let weatherIcon = document.querySelector('.weather_icon')
        console.log(weather.style)
        weather.classList.toggle('close')
    }
    hideMenuItems = () =>{
        let nav = document.querySelector('.nav.open')
        if(nav) {
            this.props.hideMenu()
        }
    }

    render () {
        const { info, setInfo, markerInfo, hideMenu } = this.props;
        // const { windowWidth, windowHeight } =this.state;
        let windowWidth = window.innerWidth;
        let width;
        let height;
        
        if(windowWidth > 400) {
            width = 300;
            height = 400;
        }else{
            width = 200;
            height = 400;
        }
        return (
            <div>
                
                {info?<div className="desc"  onLoad={()=>{this.hideMenuItems(); this.hideWeather()}} style={{width: width + 'px', height: height +'px',left: windowWidth/2 - width/2 + 'px', top: 150+ 'px'}}>
                    
                    <Link
                    to='/'
                    onClick={()=>{setInfo(); this.hideWeather();  ;document.querySelector('.desc').style.left=this.state.width/2+'px'}}
                    >
                    <img src={markerInfo.iconHigh}/>
                    </Link>
                    <div>{markerInfo.title}</div>
                    <div><a href={this.state.content.canonicalurl} target="_blank">wikipedia</a></div>

                </div>:''}

            </div>

        )
    }
}

export default InfoWindow