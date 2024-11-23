function fetchWeather(city) {
    const apiKey = '10099929769836d7022086023838b869';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found or API error');
            }
            return response.json();
        })
        .then(data => {
            const weatherResult = document.getElementById('weather-result');
            weatherResult.innerHTML = `
                <h2>${data.name}</h2>
                <p>Temperature: ${data.main.temp} °C</p>
                <p>Condition: ${data.weather[0].description}</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;

            // Dynamic Background
            const condition = data.weather[0].main.toLowerCase();
            const body = document.body;
            switch (condition) {
                case 'clear':
                    body.style.backgroundImage = "url('./clear.gif')";
                    break;
                case 'clouds':
                    body.style.backgroundImage = "url('./clouds.gif')";
                    break;
                case 'rain':
                    body.style.backgroundImage = "url('./rain.gif')";
                    break;
                case 'snow':
                    body.style.backgroundImage = "url('./snow.gif')";
                    break;
                default:
                    body.style.backgroundImage = "url('./default.gif')";
            }

            body.style.backgroundSize = "cover";
            body.style.backgroundRepeat = "no-repeat";
            body.style.backgroundPosition = "center";
        })
        .catch(error => {
            document.getElementById('weather-result').textContent = 'City not found!';
            console.error(error);
        });
}
