import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Filter = ({ handleFilter }) => {
  return (
    <div>
      find countries <input onChange={handleFilter} />
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [, setFilterName] = useState('');

  const renderCounties = () => {
    if (filteredCountries.length === 0) {
      return null;
    }

    if (filteredCountries.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    }

    if (filteredCountries.length > 1) {
      return filteredCountries.map((c) => <div key={c.name}>{c.name}</div>);
    }

    const { name, capital, population, languages, flag } = filteredCountries[0];

    return (
      <>
        <h2>{name}</h2>
        <div>capital {capital}</div>
        <div>population {population}</div>
        <h3>languages</h3>
        <ul>
          {languages.map((l) => (
            <li key={l.name}>{l.name}</li>
          ))}
        </ul>
        <img src={flag} width="150" alt="flag" />
      </>
    );
  };

  const handleFilter = ({ target: { value } }) => {
    setFilterName(value);
    const filteredValue = value.trim().toLowerCase();
    const filteredData =
      filteredValue === ''
        ? []
        : countries.filter((c) => c.name.toLowerCase().includes(filteredValue));
    setFilteredCountries(filteredData);
  };

  const getCountries = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => setCountries(response.data));
  };

  useEffect(getCountries, []);

  return (
    <div>
      <Filter handleFilter={handleFilter} />
      {renderCounties()}
    </div>
  );
};

export default App;
