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
  const [filterName, setFilterName] = useState('');

  const handleFilter = ({ target: { value } }) => {
    setFilterName(value);
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
    </div>
  );
};

export default App;
