import React, { Component } from 'react'

class InfoWindow extends Component {
   

    hideWeather = () => {
        let weather = document.querySelector('.weather')
        if( window.innerWidth < 980 ){
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
        const { info, setInfo, markerInfo } = this.props;
        let windowWidth = window.innerWidth;
        let width;
        let height;
        
        
        
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
                    <div className="desc"  role="dialog" onLoad={this.onLoadFunc()} style={{width: width + 'px', height: height +'px',left: windowWidth/2 - width/2 + 'px', top: 150+ 'px'}}>
                        <div className="close-button" onClick={()=>{setInfo(); this.hideWeather()}}></div>
                        
                    <div className="title"><h2>{markerInfo.type.toUpperCase()}</h2></div>
                    <div><h4>{markerInfo.title}</h4></div>
                    {markerInfo.photo?<img src={markerInfo.photo.src} className="photo" alt={markerInfo.title}/> : ''}
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
                    {markerInfo.description?<div>
                            <p>
                            {markerInfo.description}
                            </p>    
                            <div><a href={markerInfo.url} target="_blank">more ...</a></div>
                        </div>:''}    

                </div>:''}

            </div>

        )
    }
}

export default InfoWindow