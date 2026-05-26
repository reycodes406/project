function refreshWeather(response){
    
    
    let temperatureElement=document.querySelector("#temperature");
    let temperature= response.data.temperature.current;
    let cityElement=document.querySelector("#city");

    let descriptionElement=document.querySelector("#description");
    let humidityElement=document.querySelector("#humidity");
    let iconElement=document.querySelector("#icon");
    let windspeedElement=document.querySelector("#wind-speed");
    let timeElement=document.querySelector("#time");
    let date=new Date(response.data.time *1000);

    console.log(response.data.condition.description);

    cityElement.innerHTML=response.data.city;
    descriptionElement.innerHTML=response.data.condition.description;
    humidityElement.innerHTML = response.data.temperature.humidity + "%";
    iconElement.innerHTML = `<img src="${response.data.condition.icon}" alt="weather icon"/>`;
    temperatureElement.innerHTML=Math.round(temperature);
    windspeedElement.innerHTML=response.data.wind.speed +"km/h";
    timeElement.innerHTML=formatDate(date);}

 function formatDate(date){
    let hours=date.getHours();
    let minutes=date.getMinutes();

    let days=["Sunday","Tuesday","wednesday","Thursday","Friday","Saturday"];
    let day=days[date.getDay()];

    if (minutes<10) {

       minutes =0`${minutes}`;
    }

    return `${day} ${hours}:${minutes}`;


}


function searchCity(city){
    let apiKey="o08a4413d9b143ctb6884e5248b4ccaf";
    let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(refreshWeather);
}



function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput=document.querySelector("#search-form-input");
    let cityElement=document.querySelector("#city");
    cityElement.textContent=searchInput.value;
    searchCity(searchInput.value);
}

let searchFormElement=document.querySelector("#search-form");
searchFormElement.addEventListener("submit",handleSearchSubmit);