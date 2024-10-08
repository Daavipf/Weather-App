const placeName = document.getElementById('location')
const button = document.getElementById('call-api')
const infoContainer = document.querySelector('.info-container')
const temperatureField = document.getElementById('temperature')
const rainField = document.getElementById('rain')
const humidityField = document.getElementById('humidity')
const windField = document.getElementById('wind')
const weatherStatus = document.querySelector(".weather-status")
const image = document.getElementById("weather-image")

button.addEventListener('click', () => {
	const apiKey = "API_KEY"
	const city = placeName.value

	if(city === ""){
		return
	}

	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`
	fetch(url)
		.then(response => response.json())
		.then(data => {
			weatherStatus.innerHTML = data.weather[0].main
			temperatureField.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`
			rainField.innerHTML = data.rain ? data.rain["1h"] : "0"
			humidityField.innerHTML = `${data.main.humidity}<span>%</span>`
			windField.innerHTML = `${parseInt(data.wind.speed)}<span>km/h</span>`
			image.src = `./assets/${data.weather[0].main}.png`
			infoContainer.classList.remove('hidden')
		})
		.catch(error => alert("houve um erro", error))
})

