function departureIn (date){
const now = new Date();

// Set the target datetime to compare with
const targetDate = new Date(date);
// Create a new date object in UTC format that is equal to the initial date
const utcDate = new Date(targetDate.toISOString());
// Calculate the time difference in milliseconds
const timeDiff = utcDate.getTime() - now.getTime();

// Convert milliseconds to hours and days
const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
const daysDiff = Math.floor(hoursDiff / 24);
let result = ""
if(daysDiff>0){
    result = `Departure ${daysDiff} days and ${hoursDiff % 24} hours`
} else {result = `Departure in ${(hoursDiff % 24)} hours`}

return result}


fetch('http://localhost:3000/carts/bookings')
	.then(response => response.json())
	.then(data => {
		if (data.length > 0) {
            document.querySelector('#fullcart').textContent = "";
            document.querySelector('#cart-status').textContent = "My bookings"
            console.log(typeof new Date(data[0].date))
            
            for (let item of data) {
                document.querySelector('#fullcart').innerHTML += 
                `
                <div class = "cart-item">
                    <p class = "trip">${item.departure} > ${item.arrival}</p>
                    <p class = "time">${new Date(item.date).getHours()-2}:${new Date(item.date).getMinutes()<10?0:""}${new Date(item.date).getMinutes()}</p>
                    <p class = "price">${item.price}€</p>
                    <p class = "departure-in">${departureIn(item.date)}</p>
                </div>
                `
            }

            document.querySelector('#bookings').innerHTML +=
            `
            <hr>
            <p id ="enjoy">Enjoy your travels with Tickethack !</p>
            `
                
            
            }
           
		}
	);