const CountriesList = ({ countires ,handleShowClick}) => {
  const displayList = countires.slice(0, 10);
  return (
    <div>
      {displayList.map((country) => (
        <li key={country.tld}>{country.name.common} <button onClick={()=>handleShowClick(country)}>Show</button></li>
      ))}
    </div>
  );
};

export default CountriesList;
