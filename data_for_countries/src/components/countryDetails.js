import axios from "axios";
import { useEffect, useState } from "react";

const CountryDetails = ({ countryData }) => {
  const [temperature, setTemperature] = useState(0);
  const [wind,setWind]=useState(0);
  const [iconUrl,setIconUrl]=useState('');
  const languages = Object.values(countryData.languages);
  useEffect(() => {
    let lat = countryData.capitalInfo.latlng[0];
    let lng = countryData.capitalInfo.latlng[1];
    const API_Key = process.env.REACT_APP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_Key}&units=metric`;
    axios.get(url).then((res) => {
      console.log(res.data.main.temp);
      setTemperature(res.data.main.temp);
      setWind(res.data.wind.speed);
      const icon=`https://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`
      setIconUrl(icon);
    });
  }, [countryData.capitalInfo.latlng]);

  return (
    <div>
      <h1>{countryData.name.common}</h1>
      <p>capital: {countryData.capital[0]}</p>
      <p>area: {countryData.area}</p>
      <div>
        <h4>languages:</h4>
        <ul>
          {languages.map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
      </div>
      <img src={countryData.flags.png} alt={countryData.flags.alt}></img>
      <h2>{countryData.capital}</h2>
      <p>temperature is {temperature} Celcius</p>
      <img src={iconUrl} alt='weather icon'></img>
      <p>Wind {wind} m/s</p>
    </div>
  );
};

export default CountryDetails;
