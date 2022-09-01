import "./App.css";
import Search from "./components/search/search.js";
import CurrentWeather from "./components/current-weather/current-weather.js";
import Forcast from "./components/forcast/forcast";
import { useEffect, useState } from "react";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const fetchedName = searchData.label;
    const numSpaces = fetchedName.split(" ").length - 1;
    let amendedName = "";

    if (numSpaces === 2) {
      amendedName = fetchedName.toLowerCase().replace(" ", "-").split(" ");
    } else {
      amendedName = fetchedName.toLowerCase().split(" ");
    }

    console.log(amendedName[0]);

    const backgroundImageFetch = fetch(
      `https://api.teleport.org/api/urban_areas/slug:${amendedName[0]}/images/`
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

        console.log(backgroundImageResponse);

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
      })

      .catch((err) => {
        console.log(err);
      });

    console.log(process.env.NODE_ENV);
  };

  // use the effects to see if you can replace london with other cities to get there images
  useEffect(() => {
    fetch(`https://api.teleport.org/api/urban_areas/slug:new-york/images/`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forcast data={forecast} />}
    </div>
  );
}

export default App;
