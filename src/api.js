require("dotenv").config();
export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "254f908999mshaec63a0df1091bcp10913bjsn0389dfea9aa8",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export const GEO_API_URL = process.env.GEO_API_URL;

export const WEATHER_API_URL = process.env.WEATHER_API_URL;

export const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
