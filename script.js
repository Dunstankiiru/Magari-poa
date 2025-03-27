document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = "https://magari-poa-backend.onrender.com/api/cars";
    const carContainer = document.getElementById("car-container");
    const searchInput = document.getElementById("search");
    const priceInput = document.getElementById("price");
    const darkModeBtn = document.getElementById("darkModeBtn");
    const sellCarForm = document.getElementById("sellCarForm");

    let menu = document

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

            carCard.innerHTML = `
                <img src="${car.image}" alt="${car.name}">
                <h3>${car.name}</h3>
                <p>Location: ${car.location}</p>
                <p>Price: Ksh. ${car.price}</p>
                <button class="buy-btn" data-id="${car.id}">Buy Now</button>
            `;

            carContainer.appendChild(carCard);
        });

        // Add event listeners for "Buy Now" buttons
        document.querySelectorAll(".buy-btn").forEach(button => {
            button.addEventListener("click", handleBuyCar);
        });
    }

    // Buy Car
    function handleBuyCar(event) {
        const carId = event.target.dataset.id;
        alert(`Car with ID ${carId} has been purchased!`);
    }

    // Filter Cars
    function handleFilterCars() {
        const searchText = searchInput.value.toLowerCase();
        const maxPrice = priceInput.value;

        fetch(baseUrl)
            .then(response => response.json())
            .then(cars => {
                let filteredCars = cars.filter(car =>
                    car.name.toLowerCase().includes(searchText) ||
                    car.location.toLowerCase().includes(searchText)
                );

                if (maxPrice) {
                    filteredCars = filteredCars.filter(car => car.price <= maxPrice);
                }

                displayCars(filteredCars);
            })
            .catch(error => console.error("Error filtering cars:", error));
    }

    // Event Listeners for Filtering
    searchInput.addEventListener("input", handleFilterCars);
    priceInput.addEventListener("input", handleFilterCars);

    // Dark Mode Toggle
    darkModeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

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
                .then(() => {
                    fetchCars();
                    sellCarForm.reset();
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