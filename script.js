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
                <p>${data.trips[i].departure}>${data.trips[i].arrival}</p>
                <p>${new Date(data.trips[i].date).getHours()-2}:${new Date(data.trips[i].date).getMinutes()<10?0:""}${new Date(data.trips[i].date).getMinutes()}</p>
                <p>${data.trips[i].price}€</p>
                <button type="button" class="btn-add" id="${data.trips[i]._id}">Book</button>
        
            </div>
				
				`
				;}
			}else{
                    
            }

		});
});



// ADD BUTTON
function updateAddTripEventListener() {
	for (let i = 0; i < document.querySelectorAll('.btn-add').length; i++) {
		document.querySelectorAll('.btn-add')[i].addEventListener('click', function () {
			fetch('http://localhost:3000/carts/add', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({ trip: this.id }),
})
				.then(response => response.json())
				.then(data => {
					console.log(data[0].trips)
					
						window.location.assign('carts.html');

					
				});
		});
	}
}
