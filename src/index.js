function updateWeather({ data }) {
  const {
    city,
    time,
    condition: { description, icon_url },
    temperature: { current, humidity },
    wind: { speed },
  } = data;

  document.querySelector("#temperature").innerHTML = Math.round(current);
  document.querySelector("#city").innerHTML = city;
  document.querySelector("#time").innerHTML = formatDate(new Date(time * 1000));
  document.querySelector("#description").innerHTML = description;
  document.querySelector("#humidity").innerHTML = `${humidity}%`;
  document.querySelector("#speed").innerHTML = `${speed}km/h`;
  document.querySelector(
    "#icon"
  ).innerHTML = `<img src="${icon_url}" class="weather-app-icon" />`;

  getForecast(city);
}

function formatDate(date) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[date.getDay()];
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  const apiKey = "3ed42bdf70af90btac454840e3c5oa26";
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  const city = document.querySelector("#search-form-input").value;
  searchCity(city);
}

function formatDay(timestamp) {
  const date = new Date(timestamp * 1000);
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()];
}

function getForecast(city) {
  const apiKey = "3ed42bdf70af90btac454840e3c5oa26";
  const apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast({ data }) {
  const forecastHtml = data.daily
    .slice(0, 5)
    .map(
      (day) => `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature"><strong>${Math.round(
            day.temperature.maximum
          )}°</strong></div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}°</div>
        </div>
      </div>`
    )
    .join("");

  document.querySelector("#forecast").innerHTML = forecastHtml;
}

document
  .querySelector("#search-form")
  .addEventListener("submit", handleSearchSubmit);
searchCity("Stockholm");
