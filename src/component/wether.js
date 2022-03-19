import axios from 'axios';
import { useState,useEffect } from 'react';
import { motion } from "framer-motion"


let  lat;
let  lon;

const Weather = () => {

   
   
    
    const [ weather , setWeather ] = useState('');
    const [ city , setCity ] = useState('');
    const [ log , setLog ] = useState(false);
    const [ icon ,setIcon ] = useState('');
    const [ code ,setCode ] = useState('');




    const api = {
        key: "c33606fb194e61c82ababcb0fcc82128",
        base: "https://api.openweathermap.org/data/2.5/"
        }


    useEffect(()=>{
     
        const  showPosition =  (position)=> {
                lat=  position.coords.latitude;
                lon = position.coords.longitude;
               console.log('--------------------------');
               axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${api.key}`)
               .then((data) => {
                   axios.get(`${api.base}weather?q=${data.data[0].name}&units=metric&APPID=${api.key}`)
                   .then((data) => {
                       setWeather(data.data);
                       setIcon(`https://openweathermap.org/img/wn/${data.data.weather[0].icon}@2x.png`)
                       setLog(true)
                   });
               });
           }
        navigator.geolocation.getCurrentPosition(showPosition);
       
       },[]);
  
       
        



    const search = (e) => 
    {
        setCode(e.code);
        console.log(e);
        if(e.code==='Enter' || e.code==='Return')
        {
            setLog(false)
               
            axios.get(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
            .then((data) => {
                setWeather(data.data);
                setIcon(`https://openweathermap.org/img/wn/${data.data.weather[0].icon}@2x.png`)
                setLog(true)
            });
        }
    }



    return(
        <div className='wether'>
            <input 
            type='text' 
            placeholder='city ..' 
            value={city}
            onChange={(e)=>{ setCity(e.target.value) }} 
            // onKeyPress={search}
            onKeyDown={search}
            />
         
         {(log)?
         
         <motion.div className='wether-info'
         initial={{y:'40vh',opacity:0 }}
         animate={{ y:0 ,opacity:1}}
         transition={{ duration:0.7 }} >

        { (weather !== '')?
              <>
              <h1> { weather.name } </h1>
              
              <div className='temp' >
              
                 <div className='g'>{Math.floor(weather.main.temp)}°
                 <img className='icon' src={icon} />
                 </div> 
                 <div className='f' > feelsLike <br/> { Math.floor(weather.main.feels_like)  }°
                 
               </div>
                  <div className='m'>{ weather.weather[0].main }</div> 
                 <div className='g1'>
                     <span><snap className='s' >max : </snap>{ Math.floor( weather.main.temp_max) }°</span>  
                    <snap><snap className='s' >min : </snap>{ Math.floor( weather.main.temp_min) }°</snap> 
                 </div>
                 
              </div>
              <div className='wind' >
                  <h2> wind </h2>
                  <div className='w' >
                     <span> <span className='s'> deg : </span> { Math.floor( weather.wind.deg) }</span> 
                     <span><span className='s'> speed : </span> { Math.floor( weather.wind.speed) } </span>
                  </div>
                 
              </div>
              </>
          :
          ''   
        }
        </motion.div>
         
         
         :''}
            

        </div>
    )
    
}
export{ Weather }