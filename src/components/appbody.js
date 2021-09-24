import React, { useEffect,useState} from 'react'
import {Button, Card, CardMedia, Typography } from '@material-ui/core'
import ReactAnimatedWeather from 'react-animated-weather';
import Axios from 'axios';
import {Data} from '../data';
import '../App.css';
import '../responsiveapp.css';
function Appbody({lat,long}) {
    const[name,setName]=useState("");
    const[country,setCountry]=useState("");
    const[temp,setTemp]=useState("");
    const[maxtemp,setmaxTemp]=useState("");
    const[mintemp,setminTemp]=useState("");
    const[feelslike,setFeelslike]=useState("");
    const[weatherName,setWeathername]=useState("");
    const[weather,setWeather]=useState("");
    const[windspeed,setWindspeed]=useState("");
    const[visibility,setVisibility]=useState("");
    const[humidity,setHumidity]=useState("");
    const[active,setActive]=useState("");
    const[timeelapsed,setTimeelapsed]=useState("");
    const[timezone,setTimezone]=useState("");
    const[pressure,setPressure]=useState("");
    const[citytobesearched,setcitytobesearched]=useState("");
    const[icon,setIcon]=useState("");
    const Defaults= {
        color:'palegreen',
        size:90,
        animate:true
      }
    useEffect(() => {
        Axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${process.env.API_KEY}`).then((data)=>{
            setName(data.data.name);
            setCountry(data.data.sys.country);
            setTemp(Math.round(data.data.main.temp));
            setmaxTemp(Math.round(data.data.main.temp_max));
            setminTemp(Math.round(data.data.main.temp_min));
            setWeathername(data.data.weather[0].main);
            setWeather(data.data.weather[0].description);
            setFeelslike(Math.round(data.data.main.feels_like));
            setWindspeed(Math.round(data.data.wind.speed));
            setVisibility(data.data.visibility/1000);
            setHumidity(data.data.main.humidity);
            setTimezone(data.data.timezone);
            setTimeelapsed(Date.now()-data.data.timezone*1000+data.data.timezone*1000);
            setPressure(data.data.main.pressure/10);
        }).catch((err)=>{console.log(err);});
    }, [])
    useEffect(()=>{
        switch(weatherName)
           {
              case "Clear":
                  setIcon("CLEAR_DAY");
                  break;
              case "Haze":
                  setIcon("WIND");
                  break;
              case "Clouds":
                  setIcon("CLOUDY");
                  break;
              case "Rain":
                  setIcon("RAIN");
                  break;
              case "Snow":
                  setIcon("SNOW");
                  break;
              case "Dust":
                  setIcon("WIND");
                  break;
              case "Fog":
                    setIcon("FOG");
                    break;
              case "Smoke":
                  setIcon("FOG");
                  break;
              case "Tornado":
                  setIcon("WIND");
                  break;
              case "Drizzle":
                  setIcon("SLEET");
                  break;
              default:
                  setIcon("CLEAR_DAY");
                  break;
           }
    },[weatherName])
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
            setWeathername(data.data.weather[0].main);
            setWeather(data.data.weather[0].description);
            setFeelslike(Math.round(data.data.main.feels_like));
            setWindspeed(Math.round(data.data.wind.speed));
            setVisibility(data.data.visibility/1000);
            setHumidity(data.data.main.humidity);
            setTimeelapsed(Date.now()-timezone*1000+data.data.timezone*1000);
            setPressure(data.data.main.pressure/10);
        }).catch((err)=>{console.log(err);});
    }
    const cards=Data.map(data=>{
        return(
                 <div className="cardlistrow">
                     {
                 data.map((datas)=>{
                    return(
                  <div className="cardlist">
                  <Card className="cards">
                     <CardMedia image={datas.image} style={{height:'100%',width:'100%'}}/>
                     <div style={{display:'flex',flexDirection:'column',justifyContent:'space-around',alignItems:'center',fontFamily:'Poppins',margin:'10px'}}>
                         <div style={{display:'flex',justifyContent:'flex-start'}}>
                         <Typography variant="h5" style={{fontFamily:'Poppins'}}>{datas.city},</Typography>
                         <Typography variant="h7" style={{fontFamily:'Poppins'}}>{datas.country}</Typography>
                         </div>
                         <Button style={{backgroundColor:'palegreen',color:'white',fontWeight:'bold'}} onClick={(e)=>{searchdata(datas.city);window.scrollBy({left:0,top:-window.pageYOffset,behavior:'smooth'});}}>Check Weather</Button>
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
            <div style={{display:'flex',alignItems:'flex-start'}}>
            <Typography variant="h4" style={{fontFamily:'Poppins'}}>{name},</Typography>
            <Typography variant="h7" style={{fontFamily:'Poppins'}}>{country}</Typography>
            </div>
            <Typography variant="h5" style={{fontFamily:'Poppins'}}>{new Date(timeelapsed).getHours()}:{new Date(timeelapsed).getMinutes()} {new Date(timeelapsed).getHours()>=12?'PM':'AM'}</Typography>
            <Typography variant="h5" style={{fontFamily:'Poppins'}}>{new Date(timeelapsed).toLocaleDateString()}</Typography>
            <ReactAnimatedWeather icon={icon} color={Defaults.color} size={Defaults.size} animate={Defaults.animate}/>
            <div style={{display:'flex',alignItems:'center'}}>
            <Typography variant="h5" style={{fontFamily:'Poppins'}}>Weather :</Typography>
            <Typography variant="h4" style={{fontFamily:'Poppins',color:'palegreen'}}>&nbsp;{weather}</Typography>
            </div>
            </div>
            <div style={{width:'3px'}}></div>
            <div className="weatherstatssecond">
            <div className="section">
            <div style={{display:'flex',alignItems:'center'}}>
            <Typography variant="h5" style={{fontFamily:'Poppins'}}>Temperature :</Typography>
            <div style={{display:'flex',alignItems:'flex-start',color:'palegreen'}}>
            <Typography variant="h4" style={{fontFamily:'Poppins'}}>&nbsp;{temp}</Typography>
            <Typography variant="h7" style={{fontFamily:'Poppins'}}><span>&#176;</span>c</Typography>
            </div>
            </div>
            <div style={{display:'flex',alignItems:'center'}}>
            <Typography variant="h5" style={{fontFamily:'Poppins'}}>Max. Temperature :</Typography>
            <div style={{display:'flex',alignItems:'flex-start',color:'palegreen'}}>
            <Typography variant="h4" style={{fontFamily:'Poppins'}}>&nbsp;{maxtemp}</Typography>
            <Typography variant="h7" style={{fontFamily:'Poppins'}}><span>&#176;</span>c</Typography>
            </div>
            </div>
            <div style={{display:'flex',alignItems:'center'}}>
            <Typography variant="h5" style={{fontFamily:'Poppins'}}>Min. Temperature :</Typography>
            <div style={{display:'flex',alignItems:'flex-start',color:'palegreen'}}>
            <Typography variant="h4" style={{fontFamily:'Poppins'}}>&nbsp;{mintemp}</Typography>
            <Typography variant="h7" style={{fontFamily:'Poppins'}}><span>&#176;</span>c</Typography>
            </div>
            </div>
            <div style={{display:'flex',alignItems:'center'}}>
            <Typography variant="h5" style={{fontFamily:'Poppins'}}>Feels Like :</Typography>
            <div style={{display:'flex',alignItems:'flex-start',color:'palegreen'}}>
            <Typography variant="h4" style={{fontFamily:'Poppins'}}>&nbsp;{feelslike}</Typography>
            <Typography variant="h7" style={{fontFamily:'Poppins'}}><span>&#176;</span>c</Typography>
            </div>
            </div>
            </div>
            <div className="section">
            <div style={{display:'flex',alignItems:'center'}}>
            <Typography variant="h5" style={{fontFamily:'Poppins'}}>Visibilty :</Typography>
            <div style={{display:'flex',alignItems:'flex-start',color:'palegreen'}}>
            <Typography variant="h4" style={{fontFamily:'Poppins'}}>&nbsp;{visibility}</Typography>
            <Typography variant="h7" style={{fontFamily:'Poppins'}}>km</Typography>
            </div>
            </div>
            <div style={{display:'flex',alignItems:'center'}}>
            <Typography variant="h5" style={{fontFamily:'Poppins'}}>Humidity :</Typography>
            <div style={{display:'flex',alignItems:'flex-start',color:'palegreen'}}>
            <Typography variant="h4" style={{fontFamily:'Poppins'}}>&nbsp;{humidity}</Typography>
            <Typography variant="h7" style={{fontFamily:'Poppins'}}>%</Typography>
            </div>
            </div>
            <div style={{display:'flex',alignItems:'center'}}>
            <Typography variant="h5" style={{fontFamily:'Poppins'}}>Windspeed :</Typography>
            <div style={{display:'flex',alignItems:'flex-start',color:'palegreen'}}>
            <Typography variant="h4" style={{fontFamily:'Poppins'}}>&nbsp;{windspeed}</Typography>
            <Typography variant="h7" style={{fontFamily:'Poppins'}}>km/h</Typography>
            </div>
            </div>
            <div style={{display:'flex',alignItems:'center'}}>
            <Typography variant="h5" style={{fontFamily:'Poppins'}}>Pressure :</Typography>
            <div style={{display:'flex',alignItems:'flex-start',color:'palegreen'}}>
            <Typography variant="h4" style={{fontFamily:'Poppins'}}>&nbsp;{pressure}</Typography>
            <Typography variant="h7" style={{fontFamily:'Poppins'}}>kPa</Typography>
            </div>
            </div>
            </div>
            </div>
            </div>
            <form className="Form" onSubmit={(e)=>{e.preventDefault();searchdata(citytobesearched);setcitytobesearched("");window.scrollBy({left:0,top:-window.pageYOffset,behavior:'smooth'});}}>
                <input type="text" required value={citytobesearched} onChange={(e)=>{setcitytobesearched(e.target.value);}}/>
                <Typography variant="h7" style={{fontFamily:'Poppins'}} className="label">Enter your city name...</Typography>
            </form>
            {cards}
            <div className={`scrolltop ${active}`} onClick={()=>{window.scrollBy({left:0,top:-window.pageYOffset,behavior:'smooth'});}}>
            <i class="fas fa-arrow-up fa-2x"></i>
            </div>
        </div>
    )
}

export default Appbody
