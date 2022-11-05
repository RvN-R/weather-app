import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${inputValue}&key=${process.env.REACT_APP_GOOGLE_GEOCODE_API_KEY}`
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.results.map((city) => {
            return {
              value: `${city.geometry.location.lat} ${city.geometry.location.lng}`,
              label: `${city.formatted_address}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Type the name of your city..."
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
