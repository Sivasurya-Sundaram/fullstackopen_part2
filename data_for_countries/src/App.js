import { useEffect, useState } from "react";
import countriesServices from "./services/countries";
import CountriesList from "./components/countriesList";
import CountryDetails from "./components/countryDetails";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [countriesList, setCountriesList] = useState([]);
  const [singleCountry, setSingleCountry] = useState([]);
  const filteredCountries =
    searchValue.length > 0
      ? countriesList.filter((x) =>
          x.name.common.toLowerCase().includes(searchValue.toLowerCase())
        )
      : singleCountry.length > 0
      ? singleCountry
      : countriesList;
  useEffect(() => {
    countriesServices.getAll().then((countries) => {
      console.log(countries);
      setCountriesList(countries);
    });
  }, []);
  const handleSearchValueChange = (event) => {
    console.log(event);
    let searchValue = event.target.value;
    setSearchValue(searchValue);
  };
  const handleShowClick = (country) => {
    countriesServices.getByName(country.name.common).then((country) => {
      setSingleCountry([country]);
      setSearchValue("");
    });
  };
  return (
    <div>
      <div>
        find countries{" "}
        <input value={searchValue} onChange={handleSearchValueChange} />
        {filteredCountries.length > 10 ? (
          <p>Too many matches,specify another filter</p>
        ) : filteredCountries.length > 1 ? (
          <CountriesList
            countires={filteredCountries}
            handleShowClick={handleShowClick}
          />
        ) : (
          filteredCountries.length === 1 && (
            <CountryDetails countryData={filteredCountries[0]} />
          )
        )}
      </div>
    </div>
  );
}

export default App;
