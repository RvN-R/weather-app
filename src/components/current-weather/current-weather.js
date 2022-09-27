import "./current-weather.css";

const CurrentWeather = ({ data }) => {
  const weatherIcon = require(`../../icons/${data.weather[0].icon}.png`);

  // const weatherStyle = {
  //   width: 300,
  //   borderRadius: 6,
  //   color: "white",
  //   backgroundColor: "#333",
  //   paddingTop: 0,
  //   paddingRight: 20,
  //   paddingBottom: 20,
  //   paddingLeft: 20,
  //   marginTop: 20,
  //   marginRight: "auto",
  //   marginBottom: 0,
  //   marginLeft: "auto",
  // };

  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{data.city}</p>
          <p className="weather-description">{data.weather[0].description}</p>
        </div>
        <img alt="weather" className="weather-icon" src={weatherIcon}></img>
      </div>
      <div className="bottom">
        <p className="temperature">{Math.round(data.main.temp)}°C</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Details</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value">
              {Math.round(data.main.feels_like)}°C
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{data.wind.speed} m/s</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{data.main.humidity}</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">{data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
