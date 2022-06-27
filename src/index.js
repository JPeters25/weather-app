import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    const zip = $('#zipCode').val();
    $('#location').val("");

    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}${zip}&units=imperial&appid=${process.env.API_KEY}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        /* eslint-disable*/
        getElements(response);
        /* eslint-enable*/
      }
    };

    request.open("GET", url, true);
    request.send();
    /* eslint-disable*/
    function getElements(response) {
      $('.showHumidity').text(`The humidity in ${city}${zip} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature in Fahrenheit is ${response.main.temp} degrees.`);
      $('.windSpeed').text(`The wind speed is ${response.wind.speed} mph.`);
      $('.cloudCoverage').text(`The cloud coverage is ${response.clouds.all}%.`);
      $('.sunrise').text(`Sunrise today is at ${response.sys.sunrise}`);
      $('.sunset').text(`Sunset today is at ${response.sys.sunset}`);
    };
    /*eslint-enable*/
  });
});