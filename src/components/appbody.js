import React, { useEffect,useState} from 'react'
import {Button, Card,  CardContent, CardMedia, Typography } from '@material-ui/core'
import Axios from 'axios';
import {Data} from '../data';
function Appbody({lat,long}) {
    const[name,setName]=useState(null);
    const[country,setCountry]=useState(null);
    const[temp,setTemp]=useState(null);
    const[maxtemp,setmaxTemp]=useState(null);
    const[mintemp,setminTemp]=useState(null);
    const[feelslike,setFeelslike]=useState(null);
    const[weather,setWeather]=useState(null);
    const[windspeed,setWindspeed]=useState(null);
    const[visibility,setVisibility]=useState(null);
    const[humidity,setHumidity]=useState(null);
    const[active,setActive]=useState("");
    const[citytobesearched,setcitytobesearched]=useState("");
    useEffect(() => {
        Axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=53e82d9887e86e231a783b8ee5641c2c`).then((data)=>{
            setName(data.data.name);
            setCountry(data.data.sys.country);
            setTemp(Math.round(data.data.main.temp));
            setmaxTemp(Math.round(data.data.main.temp_max));
            setminTemp(Math.round(data.data.main.temp_min));
            setWeather(data.data.weather[0].description);
            setFeelslike(Math.round(data.data.main.feels_like));
            setWindspeed(Math.round(data.data.wind.speed));
            setVisibility(data.data.visibility/1000);
            setHumidity(data.data.main.humidity);
        }).catch((err)=>{console.log(err);});
    }, [])
    window.addEventListener("scroll",()=>{
        if(window.pageYOffset>=100)setActive("active");
        else setActive("");
    })
    const searchdata=(name)=>{
        Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=53e82d9887e86e231a783b8ee5641c2c`).then((data)=>{
            setName(data.data.name);
            setCountry(data.data.sys.country);
            setTemp(Math.round(data.data.main.temp));
            setmaxTemp(Math.round(data.data.main.temp_max));
            setminTemp(Math.round(data.data.main.temp_min));
            setWeather(data.data.weather[0].description);
            setFeelslike(Math.round(data.data.main.feels_like));
            setWindspeed(Math.round(data.data.wind.speed));
            setVisibility(data.data.visibility/1000);
            setHumidity(data.data.main.humidity);
        }).catch((err)=>{console.log(err);});
    }
    const cards=Data.map(data=>{
        return(
                 <div style={{display:'flex',justifyContent:'space-around'}}>
                     {
                 data.map((datas)=>{
                    return(
                  <div style={{display:'flex',justifyContent:'space-around',margin:'10px 0'}}>
                  <Card className="cards" style={{height:'300px',width:'250px',display:'flex',flexDirection:'column',alignItems:'center'}}>
                     <CardMedia image={datas.image} style={{height:'100%',width:'100%'}}/>
                     <div style={{display:'flex',flexDirection:'column',justifyContent:'space-around',alignItems:'center',fontFamily:'Poppins',margin:'10px'}}>
                         <div style={{display:'flex',justifyContent:'flex-start'}}>
                         <Typography variant="h5" style={{fontFamily:'Poppins'}}>{datas.city},</Typography>
                         <Typography variant="h7" style={{fontFamily:'Poppins'}}>{datas.country}</Typography>
                         </div>
                         <Button size="large" style={{backgroundColor:'palegreen',color:'white',fontWeight:'bold'}}>Check Weather</Button>
                    </div>
                  </Card>
                  </div>
                    )
                })
               }
                </div>
        )
    })
    return (
        <div className="BODY">
            <div className="weatherstats">
            <div className="weatherstatsfirst">
            <h1>{name} , {country}</h1>
            </div>
            <div style={{width:'3px',backgroundColor:'white'}}></div>
            <div className="weatherstatssecond">
            <div style={{display:'flex',flexDirection:'column',alignItems:"center"}}>
            <h1>Temperature : {temp}<span>&#176;C</span></h1>
            <h1>Maximum Temperature : {maxtemp}<span>&#176;C</span></h1>
            <h1>Minimum Temperature : {mintemp}<span>&#176;C</span></h1>
            <h1>Feels Like : {feelslike}<span>&#176;C</span></h1>
            </div>
            <div style={{display:'flex',flexDirection:'column',alignItems:"center"}}>
            <h1>Weather : {weather}</h1>
            <h1>Visibilty : {visibility} km</h1>
            <h1>Humidity : {humidity} %</h1>
            <h1>Windspeed : {windspeed} km/h</h1>
            </div>
            </div>
            </div>
            <form style={{margin:'auto',width:'50%',display:'flex',flexDirection:'column'}} onSubmit={(e)=>{e.preventDefault();searchdata(citytobesearched);setcitytobesearched("");}}>
                <input type="text" value={citytobesearched} onChange={(e)=>{setcitytobesearched(e.target.value);}}/>
                <span className="label">Enter your city name...</span>
            </form>
            {cards}
            <div className={`scrolltop ${active}`} onClick={()=>{window.scrollBy({left:0,top:-window.pageYOffset,behavior:'smooth'});}}>
            <i class="fas fa-arrow-up fa-2x"></i>
            </div>
        </div>
    )
}

export default Appbody
