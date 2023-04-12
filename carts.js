fetch('http://localhost:3000/carts/trips')
	.then(response => response.json())
	.then(data => {
		if (data) {
            document.querySelector('#cart-container').textContent = "";
            document.querySelector('#cart-status').textContent = "My cart"
            console.log(data)
            
            for (let item of data) {
                document.querySelector('#cart-container').innerHTML += 
                `
                <div class = "cart-item">
                    <p class = "trip">${item.departure} > ${item.arrival}</p>
                    <p class = "time">${new Date(item.date).getHours()-2}:${new Date(item.date).getMinutes()<10?0:""}${new Date(item.date).getMinutes()}</p>
                    <p class = "price">${item.price}€</p>
                    <button type="button" class="btn-delete">X</button>
                </div>
                `
            }
                document.querySelector('#main').innerHTML +=
                `
                <div id = "total">
                    <span>Hello</span>
                </div>
                `

            }
            // let total = 0
            // for (let item of data){
            //     total += item.price
            // }
            // console.log(total)
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
	);