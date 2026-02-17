import React, { useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import CityComponent from "./modules/CityComponent";
import WeatherComponent from "./modules/WeatherInfoComponent";

export const WeatherIcons = {
  "01d": process.env.PUBLIC_URL + "/icons/sunny.svg",
  "01n": process.env.PUBLIC_URL + "/icons/night.svg",
  "02d": process.env.PUBLIC_URL + "/icons/day.svg",
  "02n": process.env.PUBLIC_URL + "/icons/cloudy-night.svg",
  "03d": process.env.PUBLIC_URL + "/icons/cloudy.svg",
  "03n": process.env.PUBLIC_URL + "/icons/cloudy.svg",
  "04d": process.env.PUBLIC_URL + "/icons/perfect-day.svg",
  "04n": process.env.PUBLIC_URL + "/icons/cloudy-night.svg",
  "09d": process.env.PUBLIC_URL + "/icons/rain.svg",
  "09n": process.env.PUBLIC_URL + "/icons/rain-night.svg",
  "10d": process.env.PUBLIC_URL + "/icons/rain.svg",
  "10n": process.env.PUBLIC_URL + "/icons/rain-night.svg",
  "11d": process.env.PUBLIC_URL + "/icons/storm.svg",
  "11n": process.env.PUBLIC_URL + "/icons/storm.svg",
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 380px;
  padding: 20px 10px;
  margin: auto;
  border-radius: 4px;
  box-shadow: 0 3px 6px 0 #555;
  background: white;
  font-family: Montserrat;
`;

const AppLabel = styled.span`
  color: black;
  margin: 20px auto;
  font-size: 18px;
  font-weight: bold;
`;

const CloseButton = styled.span`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: white;
  color: white;
  padding: 5px 10px;
  border-radius: 50%;
  font-weight: bold;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
`;

function App() {
  const [city, updateCity] = useState();
  const [weather, updateWeather] = useState();
  const fetchWeather = async (e) => {
    e.preventDefault();
    const response = await Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fe4feefa8543e06d4f3c66d92c61b69c`,
    );
    updateWeather(response.data);
  };
  return (
    <Container>
      <AppLabel>React Weather App</AppLabel>
      {city && weather ? (
  <>
    <CloseButton onClick={() => {
      updateWeather(null);
      updateCity("");
    }}>
      ❌
    </CloseButton>
    <WeatherComponent weather={weather} city={city} />
  </>
) : (
  <CityComponent updateCity={updateCity} fetchWeather={fetchWeather} />
)}

    </Container>
  );
}

export default App;
