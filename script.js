document.querySelector('#glass').addEventListener('click', function () {
	const departure = document.querySelector('#departure').value;
    const arrival = document.querySelector('#arrival').value;
    const date = document.querySelector('#date').value;
    console.log(date)

	fetch('https://tickehack-backend.vercel.app/search', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ departure, arrival, date}),
	}).then(response => response.json())
		.then(data => { console.log(data)
			if (data.result && data.trips.length>0) {
                document.querySelector('#init').innerHTML = ""
                for (let i=0; i<data.trips.length; i++){
				document.querySelector('#init').innerHTML += `<div class="tripList">
                <p>${data.trips[i].departure} > ${data.trips[i].arrival}</p>
                <p>${new Date(data.trips[i].date).getHours()-2}:${new Date(data.trips[i].date).getMinutes()<10?0:""}${new Date(data.trips[i].date).getMinutes()}</p>
                <p>${data.trips[i].price}€</p>
                <button type="button" class="btn-add" id="${data.trips[i]._id}">Book</button>
        
            </div>
				
				`
                updateAddTripEventListener()
				;}
			}else{
                document.querySelector('#init').innerHTML = ""
                document.querySelector('#init').innerHTML = `
                <div class="noData">
                <img id='imgNot'src="image/notfound.png" alt="train">
    <hr>
    <p>No trip found</p>
                </div>
                     `
                    
            }

		});
});



// ADD BUTTON
function updateAddTripEventListener() {
	for (let i = 0; i < document.querySelectorAll('.btn-add').length; i++) {
		document.querySelectorAll('.btn-add')[i].addEventListener('click', function () {
			fetch('https://tickehack-backend.vercel.app/carts/add', {
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

