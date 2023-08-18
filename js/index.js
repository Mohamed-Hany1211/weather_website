// array to store the background imgs
const imgs = ["./imgs/banner.png", "./imgs/pexels-markus-spiske-110874.jpg", "./imgs/pexels-pixabay-158163.jpg", "./imgs/pexels-pixabay-301599.jpg"];
// global vars
const btn = document.getElementById('submit');
const hm = document.querySelector('.home');
const SearchInput = document.getElementById('search-input');
const country = document.getElementById('countary');
const temp = document.getElementById('temp');
const icon = document.getElementById('weather-img');
const stat = document.getElementById('weather-status');
const maxTemp = document.getElementById('max-temp');
const icon2 = document.getElementById('sor-img1');
const minTemp = document.querySelector('.sup-temp');
const stat2 = document.querySelector('.status2');
const icon3 = document.getElementById('sor-img2');
const maxTemp2 = document.getElementById('max-temp2');
const minTemp2 = document.getElementById('min-temp');
const stat3 = document.getElementById('stat3');
const day1 = document.getElementById('day');
const day2 = document.getElementById('day2');
const day3 = document.getElementById('day3');
let d = 0;

btn.addEventListener('click', function () {
    if (SearchInput.value.length >= 3) {
        getData(SearchInput.value);
    }
})

SearchInput.addEventListener('keyup', async function () {
    if (SearchInput.value.length >= 3) {
        getData(SearchInput.value);
    }
})

// function to get data from Api
async function getData(data) {
    let get = await fetch('https://api.weatherapi.com/v1/forecast.json?key=7c1748c30d59486d972163455230508&q=' + data + '&days=3');
    d = await get.json();
    country.innerHTML = d.location.name;
    temp.innerHTML = d.current.temp_c + '<sup>o</sup>C';
    icon.src = d.current.condition.icon;
    stat.innerHTML = d.current.condition.text;
    if (d.current.condition.text == 'Patchy rain possible' || d.current.condition.text == 'rainy') {
        hm.style = `background-image: url(${imgs[1]})`;
    } else if (d.current.condition.text == 'Sunny') {
        hm.style = `background-image: url(${imgs[3]})`;
    } else if (d.current.condition.text == "Partly cloudy" || d.current.condition.text == 'Cloudy' || d.current.condition.text == 'Overcast') {
        hm.style = `background-image: url(${imgs[2]})`;
    } else {
        hm.style = `background-image: url(${imgs[0]})`;
    }
    maxTemp.innerHTML = d.forecast.forecastday[0].day.maxtemp_c + '<sup>o</sup>C';
    minTemp.innerHTML = d.forecast.forecastday[0].day.mintemp_c + '<sup>o</sup>';
    stat2.innerHTML = d.forecast.forecastday[0].day.condition.text;
    icon2.src = d.forecast.forecastday[0].day.condition.icon;
    maxTemp2.innerHTML = d.forecast.forecastday[1].day.maxtemp_c + '<sup>o</sup>C';
    minTemp2.innerHTML = d.forecast.forecastday[1].day.mintemp_c + '<sup>o</sup>';
    stat3.innerHTML = d.forecast.forecastday[1].day.condition.text;
    icon3.src = d.forecast.forecastday[1].day.condition.icon;
    day1.innerHTML = new Date(`${d.current.last_updated}`).toDateString();
    day2.innerHTML = new Date(`${d.forecast.forecastday[1].date}`).toDateString();
    day3.innerHTML = new Date(`${d.forecast.forecastday[2].date}`).toDateString();
}

