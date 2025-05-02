import React, { useEffect, useState } from 'react';
import { Card, CardMedia, Typography } from '@material-ui/core';
import ReactAnimatedWeather from 'react-animated-weather';
import Axios from 'axios';
import { Data } from '../data';
import '../App.css';
import '../responsiveapp.css';

function Appbody({ lat, long }) {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [temp, setTemp] = useState("");
  const [maxtemp, setmaxTemp] = useState("");
  const [mintemp, setminTemp] = useState("");
  const [feelslike, setFeelslike] = useState("");
  const [weatherName, setWeathername] = useState("");
  const [weather, setWeather] = useState("");
  const [windspeed, setWindspeed] = useState("");
  const [visibility, setVisibility] = useState("");
  const [humidity, setHumidity] = useState("");
  const [active, setActive] = useState("");
  const [timeelapsed, setTimeelapsed] = useState("");
  const [pressure, setPressure] = useState("");
  const [citytobesearched, setcitytobesearched] = useState("");
  const [icon, setIcon] = useState("CLEAR_DAY");
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const Defaults = {
    color: 'palegreen',
    size: 90,
    animate: true
  };

  useEffect(() => {
    if (!lat || !long) return;
    Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then(({ data: res }) => {
        setName(res.name);
        setCountry(res.sys.country);
        setTemp(Math.round(res.main.temp));
        setmaxTemp(Math.round(res.main.temp_max));
        setminTemp(Math.round(res.main.temp_min));
        setWeathername(res.weather[0].main);
        setWeather(res.weather[0].description);
        setFeelslike(Math.round(res.main.feels_like));
        setWindspeed(Math.round(res.wind.speed));
        setVisibility(res.visibility / 1000);
        setHumidity(res.main.humidity);
        setTimeelapsed(Date.now());
        setPressure(res.main.pressure / 10);
      })
      .catch(err => console.log(err));

    window.addEventListener("scroll", () => {
      setActive(window.pageYOffset >= 100 ? "active" : "");
    });
  }, [lat, long]);

  useEffect(() => {
    const iconMap = {
      Clear: "CLEAR_DAY",
      Haze: "WIND",
      Dust: "WIND",
      Tornado: "WIND",
      Clouds: "CLOUDY",
      Rain: "RAIN",
      Snow: "SNOW",
      Fog: "FOG",
      Smoke: "FOG",
      Drizzle: "SLEET"
    };
    setIcon(iconMap[weatherName] || "CLEAR_DAY");
  }, [weatherName]);

  const searchdata = name => {
    Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then(({ data: res }) => {
        setName(res.name);
        setCountry(res.sys.country);
        setTemp(Math.round(res.main.temp));
        setmaxTemp(Math.round(res.main.temp_max));
        setminTemp(Math.round(res.main.temp_min));
        setWeathername(res.weather[0].main);
        setWeather(res.weather[0].description);
        setFeelslike(Math.round(res.main.feels_like));
        setWindspeed(Math.round(res.wind.speed));
        setVisibility(res.visibility / 1000);
        setHumidity(res.main.humidity);
        setTimeelapsed(Date.now());
        setPressure(res.main.pressure / 10);
      })
      .catch(err => console.log(err));
  };

  const autoCompleteCityName = async prefix => {
    setLoadingSuggestions(true);
    try {
      const { data } = await Axios.get(
        'https://api.geoapify.com/v1/geocode/autocomplete',
        {
          params: {
            text: prefix,
            type: 'city',
            limit: 5,
            apiKey: '2ccac1d9a63543248445b2784ad4848e'
          }
        }
      );
      const suggestionsList = data.features
        .filter(f => {
          const { city, name, country_code } = f.properties;
          return (city || name) && country_code;
        })
        .map(f => {
          const cityOrName = f.properties.city || f.properties.name;
          const countryCode = f.properties.country_code.toUpperCase();
          return `${cityOrName}, ${countryCode}`;
        });
        if (suggestionsList.length > 0) {
            setLoadingSuggestions(false);
        }

      setSuggestions(suggestionsList);
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
      setSuggestions([]);
      setLoadingSuggestions(false);
    } 
  };

  const cards = Data.map(data => (
    <div className="cardlistrow" key={data[0]?.city || Math.random()}>
      {data.map(datas => (
        <div className="cardlist" key={datas.city}>
          <Card className="cards">
            <CardMedia image={datas.image} style={{ height: '100%', width: '100%' }} />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                fontFamily: 'Poppins',
                margin: '10px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Typography variant="h5" style={{ fontFamily: 'Poppins' }}>
                  {datas.city},
                </Typography>
                <Typography variant="subtitle2" style={{ fontFamily: 'Poppins' }}>
                  {datas.country}
                </Typography>
              </div>
              <button
                className="weatherbtn"
                onClick={() => {
                  searchdata(datas.city);
                  window.scrollBy({ left: 0, top: -window.pageYOffset, behavior: 'smooth' });
                }}
              >
                Check Weather
              </button>
            </div>
          </Card>
        </div>
      ))}
    </div>
  ));

  return (
    <div className="BODY" id="page-wrapper">
      {/* Weather Stats Section */}
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

      {/* Search Form */}
      <form
        className="Form"
        onSubmit={e => {
          e.preventDefault();
          searchdata(citytobesearched);
          setcitytobesearched("");
          setSuggestions([]);
          window.scrollBy({ left: 0, top: -window.pageYOffset, behavior: 'smooth' });
        }}
      >
        <input
          type="text"
          required
          value={citytobesearched}
          onChange={e => {
            const value = e.target.value;
            autoCompleteCityName(value);
            setcitytobesearched(value);
          }}
        />
        <Typography variant="subtitle2" className="label">
          Start typing a city..
        </Typography>

        {loadingSuggestions && (
          <ul className="autocomplete-suggestions">
            <li className="loading-item">Searching…</li>
          </ul>
        )}

        {!loadingSuggestions && suggestions.length > 0 && (
          <ul className="autocomplete-suggestions">
            {suggestions.map((s, i) => (
              <li
                key={i}
                onClick={() => {
                  searchdata(s);
                  setcitytobesearched('');
                  setSuggestions([]);
                }}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </form>

      {/* Cards */}
      <div className={`cards-container ${loadingSuggestions ? 'shift-down-loading' : ''} ${suggestions.length > 0 ? 'shift-down' : ''}`}> 
        {cards}
      </div>

      {/* Scroll to Top & Overlay */}
      <div className="scrolltop ${active}" onClick={() => window.scrollBy({ left: 0, top: -window.pageYOffset, behavior: 'smooth' })}>
        <i className="fas fa-arrow-up fa-2x"></i>
      </div>
      <div className="scrolltop-overlay"></div>
    </div>
  );
}

export default Appbody;
