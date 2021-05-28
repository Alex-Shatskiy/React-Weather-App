import React, { useState } from "react"
import ReactDOM from "react-dom"

const api = {
  apiKey: "c1477f7c454a4e7e7dfd812a8b87d88d",
  base: "https://api.openweathermap.org/data/2.5/weather?q=",
}

function App() {
  const [query, setQuery] = useState("")
  const [weather, setWeather] = useState({})

  const search = (evt) => {
    if (evt.key == "Enter") {
      fetch(`${api.base}${query}&units=metric&appid=${api.apiKey}`)
        .then((res) => res.json())
        .then((result) => {
          console.log(result)
          setQuery("")
          setWeather(result)
        })
    }
  }

  const getDate = (dates) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ]
    let day = days[dates.getDay() - 1]
    let date = dates.getDate()
    let month = months[dates.getMonth()]
    let year = dates.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 12
            ? "app"
            : "app cold"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            className="search-bar"
            type="text"
            placeholder="Search..."
            onChange={(evt) => setQuery(evt.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{getDate(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp"> {Math.round(weather.main.temp)}°C</div>
              <div className="type">{weather.weather[0].main}</div>
            </div>
          </>
        ) : (
          <></>
        )}
      </main>
    </div>
  )
}

export default App
