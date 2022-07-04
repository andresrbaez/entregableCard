import { useState, useEffect } from "react";
import axios from "axios";
// import logo from './logo.svg'
import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [num, setNum] = useState(true);
  const [temp, setTemp] = useState(true);

  // Temperature data
  let cel = Math.round(data.main?.temp - 273.15);
  let far = Math.round((cel * 9) / 5 + 32);

  const changeUnit = () => {
    setTemp(!temp);
    setNum(!num);
  };

  useEffect(() => {
    const success = (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=025b425b0a60deecb1428760726f5a95`
        )
        .then((res) => {
          setData(res.data);
        });
    };
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  // Convert sunrise unix to local time string
  var sec = data.sys;
  var date = new Date(sec?.sunrise * 1000);
  var timeSunrise = date.toLocaleTimeString();

  // Convert sunset unix to local time string
  var date = new Date(sec?.sunset * 1000);
  var timeSunset = date.toLocaleTimeString();

  return (
    <div className="App">
      <div className="contenedor-card">
        <h2>Weather App</h2>
        <p>
          {data.name}, {data.sys?.country}
        </p>
        <div className="row">
          <div className="info-1">
            <img
              src={`http://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`}
              alt=""
            />
            <p>
              {" "}
              <b>
                {" "}
                {num ? cel : far} º{temp ? "C" : "F"}{" "}
              </b>
            </p>
          </div>
          <div className="info-2">
            <ul>
              <li className="text-center">
                {" "}
                <b>"{data.weather?.[0].description}"</b>
              </li>
              <li>
                <b>
                  Wind Speed <i class="bx bx-wind"></i>
                </b>
                <span className="text-black"> {data.wind?.speed} m/s</span>
              </li>
              <li>
                <b>
                  Humidity <i class="bx bx-water"></i>
                </b>
                <span className="text-black"> {data.main?.humidity} %</span>
              </li>
              <li>
                <b>
                  Clouds <i class="bx bx-cloud"></i>
                </b>
                <span className="text-black"> {data.clouds?.all} %</span>
              </li>
              <li>
                <b>
                  Sunrise <i class="bx bx-up-arrow-alt"></i>
                </b>
                <span className="text-black"> {timeSunrise}</span>
              </li>
              <li>
                <b>
                  Sunset <i class="bx bx-down-arrow-alt"></i>
                </b>
                <span className="text-black"> {timeSunset}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center btn-center">
          <button onClick={changeUnit} className="change-unit" type="button">
            Degrees ºF/ºC
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
