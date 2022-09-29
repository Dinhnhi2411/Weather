import React, {useState, useEffect} from 'react';
import './App.css';


const api={
  key: "0f32e1b19d44fea2ffd38e3432047148",
  base: "https://api.openweathermap.org/data/2.5",
}

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(""); //output
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");



  useEffect(()=>{
   const fetchWeatherData = async () => {
      if(!searchCity) return;
        setLoading(true);// start loading data
        //process
        try{
          // ? định nghĩa querySelector / & phân biệt querySelector
          const url=`${api.base}/weather?q=${searchCity}&units=metric&appid=${api.key}`
          const response = await fetch(url);
          const data = await response.json();
          if(response.ok) {
            // setWeatherInfo(JSON.stringify(data))
          setWeatherInfo(`${data.name}, 
          ${data.sys.country},
          ${data.weather[0].description}, 
          ${data.main.temp}`);

          setErrorMessage("");
          } setErrorMessage(data.message)
        }catch(error) {
        setErrorMessage(error.message)
        }
        setLoading(false);// finish loading data
   }
   fetchWeatherData();
  },[searchCity]) // * //

  const handleSubmit =(e) =>{
    e.preventDefault();
    setSearchCity(searchInput);
  };
  return (
   <>
  <form onSubmit={handleSubmit}>
  <input 
  type="text" 
  placeholder="City" 
  value={searchInput} 
  onChange={(e)=> setSearchInput(e.target.value)}
  />
  <button>Search</button>
  </form>
  {/* when load with slow3g */}
  {loading ? (<div>Loading...</div>):(
    <>
      {errorMessage ? ( <div style={{color:"red"}}>{errorMessage}</div>
        ):( <div>{weatherInfo}</div>
        )}
    </>
    )}
   </>
  );
}

export default App;
