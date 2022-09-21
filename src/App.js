import "./App.css";
import Search from "./components/search/search.js";
import CurrentWeather from "./components/current-weather/current-weather.js";
import Forcast from "./components/forcast/forcast";
import { useState } from "react";
import genericCity from "./genericCity.jpg";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [containerBackground, setContainerBackground] = useState([]);
  const [imageAppears, setImageAppears] = useState(false);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const fetchCityName = searchData.label;

    const locationOfComma = fetchCityName.toLowerCase().indexOf(",");
    const googleCityName = fetchCityName
      .toLowerCase()
      .slice(0, locationOfComma);

    const backgroundImageFetch = fetch(
      `https://api.teleport.org/api/urban_areas/slug:${googleCityName}/images/`
    );

    const currentWeatherFetch = fetch(
      `${process.env.REACT_APP_WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
    );

    const forecastFetch = fetch(
      `${process.env.REACT_APP_WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch, backgroundImageFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();
        const backgroundImageResponse = await response[2].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
        setContainerBackground(backgroundImageResponse.photos[0].image);
        setImageAppears(true);
      })

      .catch((err) => {
        console.log(err);
        setImageAppears(false);
      });
  };

  const cityActive = {
    backgroundImage: `url(${containerBackground.mobile})`,
  };

  const cityInactive = {
    backgroundImage: `url(${genericCity})`,
  };

  function backgroundImageDecider() {
    if (imageAppears === false) {
      return cityInactive;
    } else {
      return cityActive;
    }
  }

  return (
    <div className="container" style={backgroundImageDecider()}>
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forcast data={forecast} />}
    </div>
  );
}

export default App;
