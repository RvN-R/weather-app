import "./App.css";
import Search from "./components/search/search.js";
import Banner from "./components/banner/banner";
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

    // fetchCityName pulls the city name from search.js
    const fetchCityName = searchData.label;
    // locationOfComma returns the location of the comma from the result of fetchCityName
    const locationOfComma = fetchCityName.toLowerCase().indexOf(",");
    // googleCityName returns the name of the city without its initials. Instead of London,UK it returns london
    const googleCityName = fetchCityName
      .toLowerCase()
      .slice(0, locationOfComma);

    // locationOfSpace checks googleCityName results and returns the location of a space
    const locationOfSpace = googleCityName.indexOf(" ");
    // includesSpace checks googleCityName and returns true or false as to whether the name has a space
    const includesSpace = googleCityName.includes(" ");

    let cityName = "";
    // if statement below checks includesSpace, if true it takes the googleCityName for example Sydney NSW and returns sydney
    // if false it takes the googelCityName for example London, UK and returns london
    if (includesSpace === true) {
      cityName = googleCityName.slice(0, locationOfSpace);
    } else {
      cityName = fetchCityName.toLowerCase().slice(0, locationOfComma);
    }

    // first attempt at fetching Road Goat api, need to use BasicAuth using myHeaders and then adding that to the header response
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Basic ${process.env.REACT_APP_ROAD_GOAT_AUTH}`
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const backgroundImageFetch = fetch(
      `https://api.roadgoat.com/api/v2/destinations/auto_complete?q=${cityName}`,
      requestOptions
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
        setContainerBackground(
          backgroundImageResponse.included[0].attributes.image
        );

        setImageAppears(true);
      })

      .catch((err) => {
        console.log(err);
        setImageAppears(false);
      });
  };

  const cityActive = {
    backgroundImage: `url(${containerBackground.full})`,
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
      <div>{currentWeather === null && <Banner />}</div>
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forcast data={forecast} />}
    </div>
  );
}

export default App;
