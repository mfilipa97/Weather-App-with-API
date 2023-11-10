const input = document.getElementById("cityInput");
const button = document.getElementById("searchButton");
const apiKey= "7ce153ef3170c60aeb3f7c600f2569bb"

input.addEventListener("keydown",(e)=>{
    if (e.key ==="Enter"){
        getWeather();
    }
});

button.addEventListener("click", () => {
    getWeather();
});


function getWeather() {
    const city = document.getElementById("cityInput").value; // Assuming you have an input element with the id "cityInput"

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then((response) => response.json())
        .then((data) => {
            if (data.cod === 200) {
                const weather = String(data.weather[0].main.toLowerCase());
                document.querySelector(".empty").style.display = "none";
                document.getElementById("weatherInfo").style.display = "block";

                document.getElementById("weatherWrap").style.backgroundImage = `url("./assets/weather_${weather}-${Math.floor(Math.random() * 1) + 1}.jpg")`;

                const img = document.querySelector(".weather_icon");
                img.src = `./assets/${weather}.png`;

                const temp = document.querySelector(".temp");
                temp.innerHTML = Math.floor(data.main.temp) + "<span class='unit'>ºc</span>";

                const humidity = document.querySelector(".humidity");
                humidity.innerHTML = Math.floor(data.main.humidity) + "%";

                const wind = document.querySelector(".wind");
                wind.innerHTML = Math.floor(data.wind.speed) + "km/h";

                const description = document.querySelector(".description");
                description.innerHTML = data.weather[0].description;
            } else {
                document.querySelector(".empty").style.display = "block";
                document.getElementById("weatherInfo").style.display = "none";
                document.querySelector(".empty").innerHTML = "Oops. Something is wrong. Try again :)";
            }
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
        });
}
