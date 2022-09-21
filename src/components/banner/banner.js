import "./banner.css";
import WeatherAppLogo from "../../weather-app-logo.png";

const Banner = () => {
  return (
    <div>
      <div className="weather-logo-container">
        <img
          className="weather-logo"
          src={WeatherAppLogo}
          alt="Weather App Logo"
        ></img>
      </div>
    </div>
  );
};
export default Banner;
