import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import imga from './busIcon.png'
class InfoWindow extends Component {
    state={
        content:''
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
    render () {
        const { info, setInfo, markerInfo } = this.props;
        return (
            <div>
                
                {info?<div className="desc">
                    
                    <Link
                    to='/'
                    onClick={()=>{setInfo(); console.log(this.state.content)}}
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