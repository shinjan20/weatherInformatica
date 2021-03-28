import React from 'react'
import '../App.css';
function navbar() {
    return (
        <div>
            <div style={{backgroundColor:'palegreen',height:'10vh',display:'flex',justifyContent:'space-around',alignItems:'center'}}>
                <div className='header' id="first" style={{width:'20%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'flex-end'}}>
                <h1 style={{fontWeight:'bold',fontSize:'40px',margin:0,lineHeight:1}}>WeatherInformatica</h1>
                <h6 style={{margin:'10px 0'}}>your one-stop solution for weather-related queries...</h6>
                </div>
                <div className='second' style={{display:'flex',justifyContent:'flex-end',width:'30%'}}>
                <div className='header'style={{display:'flex',alignItems:'center'}}>
                <h3>Logout &nbsp;</h3>
                <i class="fas fa-sign-in-alt fa-2x"></i>
                </div>
                </div>
            </div>
        </div>
    )
}

export default navbar
