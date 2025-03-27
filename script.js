
document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = "https://magari-poa-backend.onrender.com/api/cars";
    const carContainer = document.getElementById("car-container");
    const searchInput = document.getElementById("search");
    const priceInput = document.getElementById("price");
    const darkModeBtn = document.getElementById("darkModeBtn");
    const sellCarForm = document.getElementById("sellCarForm");

    fetchCars();


    // Fetch and display Cars
    function fetchCars() {
        fetch(baseUrl)
            .then(response => response.json())
            .then(cars => displayCars(cars))
            .catch(error => console.error("Error fetching cars:", error));
    }

    // Display Car Listings
    function displayCars(cars) {
        carContainer.innerHTML = "";
        cars.forEach(car => {
            const carCard = document.createElement("div");
            carCard.classList.add("car-card");

            // Check if the car is sold
            const soldText = car.status === "sold" ? "<span class='sold'>SOLD</span>" : "";

            carCard.innerHTML = `
            <img src="${car.image}" alt="${car.name}">
            <h3>${car.name} ${soldText}</h3>
            <p>Location: ${car.location}</p>
            <p>Price: Ksh. ${car.price}</p>
            ${car.status !== "sold" ? `<button class="buy-btn" data-id="${car.id}">Buy Now</button>` : ""}
        `;

            carContainer.appendChild(carCard);
        });

        // Add event listeners only to available cars
        document.querySelectorAll(".buy-btn").forEach(button => {
            button.addEventListener("click", handleBuyCar);
        });
    }


    // Buy Car
    function handleBuyCar(event) {
        const carId = event.target.dataset.id;

        fetch(`${baseUrl}/${carId}`, {
            method: "PATCH", // Use PATCH to update only the status
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status: "sold" })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(updatedCar => {
                alert(`Car "${updatedCar.name}" has been marked as SOLD!`);
                fetchCars(); // Refresh the car list
            })
            .catch(error => console.error("Error updating car status:", error));
    }

  // Handle Form Submission to Add a New Car
    sellCarForm.addEventListener("submit", event => {
        event.preventDefault();

        const carImage = document.getElementById("carImage").files[0];

        if (!carImage) {
            alert("Please upload an image.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            const newCar = {
                name: document.getElementById("carName").value,
                type: document.getElementById("carType").value,
                location: document.getElementById("carLocation").value,
                price: document.getElementById("carPrice").value,
                image: e.target.result // Use base64 image URL
            };

            fetch(baseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newCar)
            })
                .then(response => response.json())
                .then(addedCar => {
                    addCarToDOM(addedCar); // Append new car instantly
                    sellCarForm.reset(); // Clear form fields
                })
                .catch(error => console.error("Error adding car:", error));
        };

        reader.readAsDataURL(carImage);
    });
});

let menu = document.querySelector('.navbar');

let search = document.querySelector('.search-box');

document.querySelector('#search-icon').onclick = () => {
    search.classList.toggle('active');
    menu.classList.remove('active');
}


document.querySelector('#menu-icon').onclick = () => {
    menu.classList.toggle('active');
    search.classList.remove('active');
}

// hide menu and search

window.onscroll = () => {
    menu.classList.remove('active');
    search.classList.remove('active');
}

let header = document.querySelector('header');

window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);
});