import { Typography } from '@material-ui/core';
import React from 'react'
import '../App.css';
function navbar() {
    return (
        <div>
            <div className='header'>
                <div id="first" style={{height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <Typography variant="h4" style={{fontWeight:'bold',width:"100%",margin:0,lineHeight:1,fontFamily:"Poppins"}}>WeatherInformatica</Typography>
                <h6 style={{margin:0,lineHeight:1}}>your one-stop solution for weather-related queries...</h6>
                </div>
            </div>
        </div>
    )
}

export default navbar
