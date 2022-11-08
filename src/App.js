import "./App.css";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import axios from "axios";
import wmo from "./wmo";
import WeatherCard from "./components/WeatherCard";

const mapboxToken =
  "pk.eyJ1IjoiYWlkYXNoLWl2bXMiLCJhIjoiY2xhNnIxb3V2MWIzeDN1cXExN2FzNm1nZiJ9.h9zhuZQFrH4Tycnjj-XC1w";

function App() {
  const [data, setData] = useState();
  const [select, setSelect] = useState(null);
  const [temp, setTemp] = useState();
  const [weather, setWeather] = useState();

  const openPopup = async (index) => {
    setSelect(index);
    const res = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${data[index].lat}&longitude=${data[index].lng}&current_weather=true`
    );
    const weatherCode = res.data.current_weather.weathercode;
    setWeather(wmo[weatherCode]);
    setTemp(res.data?.current_weather.temperature);
  };

  const closePopup = () => {
    setSelect(null);
  };

  const getData = () => {
    fetch("./in.json", {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((myData) => {
        setData(myData);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const CustomPopup = ({ index, closePopup }) => {
    const marker = data[index];
    return (
      <Popup
        latitude={marker.lat}
        longitude={marker.lng}
        onClose={closePopup}
        closeButton={true}
        closeOnClick={false}
        style={{ color: "blue" }}
      >
        {weather && (
          <WeatherCard city={marker.city} temp={temp} weather={weather} />
        )}
      </Popup>
    );
  };

  return (
    <div className="App">
      <Map
        initialViewState={{
          longitude: 79.0831,
          latitude: 21.1539,
          zoom: 4.2,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={mapboxToken}
      >
        {data?.map((x, i) => {
          return (
            <div key={i}>
              <Marker
                longitude={x.lng}
                latitude={x.lat}
                color="red"
                onClick={() => openPopup(i)}
              ></Marker>
              {select !== null && (
                <CustomPopup index={select} closePopup={closePopup} />
              )}
            </div>
          );
        })}
      </Map>
    </div>
  );
}

export default App;
