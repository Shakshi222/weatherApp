const apiKey="042e5b7f23c7144297b19d045efee014";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox= document.querySelector(".search input");
const searchBtn= document.querySelector(".search button");
const weatherIcon= document.querySelector(".weather-icon");
async function checkWeather(city) {
    const response= await fetch(apiUrl + city +`&appid=${apiKey}`);
    if(response.status==404){
        document.querySelector(".error").style.display="block";
        document.querySelector(".weather").style.display="none";
        return;
    }
    else{
    var data= await response.json();
    document.querySelector(".city").innerHTML= data.name;
    document.querySelector(".temp").innerHTML= Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML= data.main.humidity + "%";
    document.querySelector(".wind").innerHTML= Math.round(data.wind.speed) + "km/h";
    const currentTime = data.dt; 
    const sunriseTime = data.sys.sunrise;
    const sunsetTime = data.sys.sunset;
    
    let isNight = currentTime < sunriseTime || currentTime > sunsetTime;

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src=isNight ? "images/nightcloud.png" :"images/clouds.png";
    }
    else if(data.weather[0].main=="Clear"){
        weatherIcon.src=isNight ? "images/night.png":"images/clear.png";
    }
    else if(data.weather[0].main=="Rain"){
        weatherIcon.src=isNight ? "images/nightrain.png":"images/rain.png";
    }
    else if(data.weather[0].main=="Drizzle"){
        weatherIcon.src=isNight ? "images/nightdizzle.png":"images/drizzle.png";
    }
    else if(data.weather[0].main=="Mist"){
        weatherIcon.src=isNight ? "images/nightmist.png":"images/mist.png";
    }
    document.querySelector(".weather").style.display="block";
    document.querySelector(".error").style.display="none";
}
}
searchBtn.addEventListener("click" ,()=>{
    checkWeather(searchBox.value);
})