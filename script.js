document.querySelector('#glass').addEventListener('click', function () {
	const departure = document.querySelector('#departure').value;
    const arrival = document.querySelector('#arrival').value;
    const date = document.querySelector('#date').value;
    console.log(date)

	fetch('http://localhost:3000/search', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ departure, arrival, date}),
	}).then(response => response.json())
		.then(data => { console.log(data)
			if (data.result) {
                document.querySelector("#init").remove()
                for (let i=0; i<data.trips.length; i++){
				document.querySelector('#result').innerHTML += `<div class="tripList">
			
            ${data.trips[i].departure}>${data.trips[i].arrival}   
            </div>
				
				`;}
				// updateDeleteCityEventListener();
				// document.querySelector('#cityNameInput').value = '';
			}

		});
});