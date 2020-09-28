import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Filter = ({ handleFilter }) => {
  return (
    <div>
      find countries <input onChange={handleFilter} />
    </div>
  );
};

const Countries = ({ filteredCountries, handleClick }) => {
  if (filteredCountries.length === 0) {
    return null;
  }

  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (filteredCountries.length > 1) {
    return filteredCountries.map((c) => (
      <div key={c.name}>
        {c.name} <button onClick={handleClick(c)}>show</button>
      </div>
    ));
  }

  const { name, capital, population, languages, flag } = filteredCountries[0];

  return (
    <>
      <h2>{name}</h2>
      <div>capital {capital}</div>
      <div>population {population}</div>
      <h3>Spoken languages</h3>
      <ul>
        {languages.map((l) => (
          <li key={l.name}>{l.name}</li>
        ))}
      </ul>
      <img src={flag} width="150" alt="flag" />
    </>
  );
};

const Weather = ({ weather }) => {
  if (!weather.current) {
    return null;
  }

  const {
    current: { temperature, weather_icons, wind_speed, wind_dir },
    location: { name },
  } = weather;

  return (
    <>
      <h3>Weather in {name}</h3>
      <div>
        <b>temperature:</b> {temperature} Celcius
      </div>
      <img src={weather_icons[0]} width="50" alt="weather" />
      <div>
        <b>wind:</b> {wind_speed} mph direction {wind_dir}
      </div>
    </>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [, setFilterName] = useState('');
  const [weather, setWeather] = useState({});
  const [weatherKey, setWeatherKey] = useState('');

  const getWeather = (city) => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${weatherKey}&query=${city}`,
      )
      .then((response) => {
        setWeather(response.data);
      });
  };

  const getWeatherKey = () => {
    setWeatherKey(process.env.REACT_APP_WEATHERSTACK_KEY);
  };

  const handleClick = (country) => () => {
    setFilteredCountries([country]);
    getWeather(country.capital);
  };

  const handleFilter = ({ target: { value } }) => {
    setFilterName(value);
    const filteredValue = value.trim().toLowerCase();
    const filteredData =
      filteredValue === ''
        ? []
        : countries.filter((c) => c.name.toLowerCase().includes(filteredValue));
    setFilteredCountries(filteredData);
    if (filteredData.length === 1) {
      getWeather(filteredData[0].capital);
    } else {
      setWeather({});
    }
  };

  const getCountries = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => setCountries(response.data));
  };

  useEffect(getCountries, []);
  useEffect(getWeatherKey, []);

  return (
    <div>
      <Filter handleFilter={handleFilter} />
      <Countries
        filteredCountries={filteredCountries}
        handleClick={handleClick}
      />
      <Weather weather={weather} />
    </div>
  );
};

export default App;
