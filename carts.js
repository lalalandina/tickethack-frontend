fetch('http://localhost:3000/carts/trips')
	.then(response => response.json())
	.then(data => {
		if (data) {

            console.log(data)
            let total = 0
            for (let item of data){
                total += item.price
            }
            console.log(total)
			// for (let i = 0; i < data.weather.length; i++) {
			// 	document.querySelector('#cityList').innerHTML += `
			// 	<div class="cityContainer">
			// 	<p class="name">${data.weather[i].cityName}</p>
			// 	<p class="description">${data.weather[i].description}</p>
			// 	<img class="weatherIcon" src="images/${data.weather[i].main}.png"/>
			// 	<div class="temperature">
			// 		<p class="tempMin">${data.weather[i].tempMin}°C</p>
			// 		<span>-</span>
			// 		<p class="tempMax">${data.weather[i].tempMax}°C</p>
			// 	</div>
			// 	<button class="deleteCity" id="${data.weather[i].cityName}">Delete</button>
			// </div>
			// `;
			// }
			// updateDeleteCityEventListener();
		}
	});