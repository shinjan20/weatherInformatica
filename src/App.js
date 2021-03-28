import { useEffect,useState } from 'react';
import './App.css';
import Appbody from './components/appbody';
import Footer from './components/Footer';
import Navbar from './components/navbar';
import Spinner from './components/spinner';
function App() {
  const[pos,setpos]=useState(null);
  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition((msg,err)=>{
      if(err)console.log(err);
      if(msg)
      {
        setpos({
          lat:msg.coords.latitude,
          long:msg.coords.longitude
        });
      }
    })
  }, [])
  return (
    <div className="App">
      <Navbar/>
      {
        (pos==null)?<Spinner/>:<Appbody lat={pos.lat} long={pos.long}/>
      }
      <Footer/>
    </div>
  );
}

export default App;
