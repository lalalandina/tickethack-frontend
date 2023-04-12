function totalPrice (arr) {
    let total = 0
    for (let item of arr){
            total += item.price
        }
        return total
}

// FETCH all trips in cart on page opening
fetch('https://tickehack-backend.vercel.app/carts/trips')
	.then(response => response.json())
	.then(data => {
        console.log(data)
		if (data.length > 0) {
            document.querySelector('#fullcart').textContent = "";
            document.querySelector('#cart-status').textContent = "My cart"
            console.log(data)
            
            for (let item of data) {
                document.querySelector('#fullcart').innerHTML += 
                `
                <div class = "cart-item">
                    <p class = "trip">${item.departure} > ${item.arrival}</p>
                    <p class = "time">${new Date(item.date).getHours()-2}:${new Date(item.date).getMinutes()<10?0:""}${new Date(item.date).getMinutes()}</p>
                    <p class = "price">${item.price}€</p>
                    <button type="button" class="btn-delete" id="${item._id}">X</button>
                </div>
                `
            }
             

                document.querySelector('#main').innerHTML +=
                `
                <div id = "cart-total">
                    <div id = "totalprice">Total : ${totalPrice(data)}€</div>
                    <button type="button" id="btn-purchase">Purchase</button>
                </div>
                `


                // PURCHASE EVENT
                document.querySelector('#btn-purchase').addEventListener('click',function () {
                    fetch('https://tickehack-backend.vercel.app/carts/purchase')
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    window.location.assign('booking.html');
                }
                )
                })

                updateDeleteTripEventListener()

            }
           
		}
	);


    function updateDeleteTripEventListener() {
        for (let i = 0; i < document.querySelectorAll('.btn-delete').length; i++) {
            document.querySelectorAll('.btn-delete')[i].addEventListener('click', function () {
                fetch('https://tickehack-backend.vercel.app/carts/delete', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ trip: this.id }),
	})
                    .then(response => response.json())
                    .then(data => {
                        console.log(data[0].trips)
                        if (data) {
                            this.parentNode.remove();
                            document.querySelector('#totalprice').textContent = `Total : ${totalPrice(data[0].trips)}€`
                        }
                    });
            });
        }
    }


