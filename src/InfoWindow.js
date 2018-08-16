import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import imga from './busIcon.png'
class InfoWindow extends Component {
    state={
        markerInfo:this.props.markerInfo,
        // windowWidth:window.innerWidth,
        // windowHeight: window.innerHeight
        
    }
    componentDidMount() {
       
          // let reg = /population_total = \d*/;
          // let myArray = reg.exec(data.query.pages[0].revisions[0].content)
          // let reg1 = /\d+/
          // this.setState({content:(reg1.exec(myArray[0]))[0]})
          // console.log(reg1.exec(myArray[0]))
      
    }

    hideWeather = () => {
        let weather = document.querySelector('.weather')
        let weatherIcon = document.querySelector('.weather_icon')
        // console.log(weather.classList)
        if(weather.classList[0] === 'weather' && window.innerWidth < 980){
            weather.classList.toggle('close')

        }
    }
    hideMenuItems = () =>{
        let nav = document.querySelector('.nav.open')
        if(nav) {
            this.props.hideMenu();
            
        }
    }
    onLoadFunc = () => {
        this.hideMenuItems(); this.hideWeather()
    }

    render () {
        const { info, setInfo, markerInfo, photoChurch } = this.props;
        // const {  } =this.state;
        let windowWidth = window.innerWidth;
        let width;
        let height;
        if(markerInfo.type ==='church'){
            markerInfo.photo = photoChurch
        }

        console.log(markerInfo)
        
        if(windowWidth > 450) {
            width = 350;
            height = 600;
        }else{
            width = 300;
            height = 300;
        }
        return (
            <div>
                
                {info?
                    <div className="desc"  onLoad={this.onLoadFunc()} style={{width: width + 'px', height: height +'px',left: windowWidth/2 - width/2 + 'px', top: 150+ 'px'}}>
                        <div className="close-button" onClick={()=>{setInfo(); this.hideWeather();console.log(markerInfo.timetable)}}></div>
                        
                    <div className="title"><h2>{markerInfo.type.toUpperCase()}</h2></div>
                    <div><h4>{markerInfo.title}</h4></div>
                    {markerInfo.photo?<img src={markerInfo.photo.src} className="photo"/> : ''}
                    {markerInfo.timetable?(
                        <div className="timetable">
                            <h4>Timetable:</h4>
                            <table>
                                <tbody>
                                {markerInfo.timetable.map((item) =>
                                    <tr key={item}>
                                        {item.map((i) => 
                                            <td key={i}>{i}</td>
                                        )}
                                        
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                        ):''}
                    <div><a  target="_blank">wikipedia</a></div>

                </div>:''}

            </div>

        )
    }
}

export default InfoWindow