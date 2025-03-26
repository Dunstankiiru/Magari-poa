<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Car Marketplace</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Car Marketplace</h1>
        <button id="darkModeBtn">Toggle Dark Mode</button>
    </header>

    <div class="search-filters">
        <input type="text" id="search" placeholder="Search by name or location...">
        <input type="number" id="price" placeholder="Max Price">
    </div>

    <div id="car-container"></div>

    <h2>Sell Your Car</h2>
    <form id="sellCarForm">
        <input type="text" id="carName" placeholder="Car Name" required>
        <input type="text" id="carType" placeholder="Car Type" required>
        <input type="text" id="carLocation" placeholder="Location" required>
        <input type="number" id="carPrice" placeholder="Price" required>
        <input type="url" id="carImage" placeholder="Image URL" required>
        <button type="submit">Add Car</button>
    </form>

    <script src="script.js"></script>
</body>
</html>


style

bbody {
    font-family: Arial, sans-serif;
    padding: 20px;
    background-color: #f4f4f4;
    transition: background-color 0.3s, color 0.3s;
}

.dark-mode {
    background-color: #333;
    color: white;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.search-filters {
    margin-bottom: 20px;
}

.car-card {
    background: white;
    padding: 15px;
    margin: 10px 0;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.dark-mode .car-card {
    background: #555;
    color: white;
}

.car-card img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 5px;
}

button {
    cursor: pointer;
    padding: 10px;
    border: none;
    background: #007BFF;
    color: white;
    border-radius: 5px;
}

button:hover {
    background: #0056b3;
}

document.addEventListener("DOMContentLoaded", () => {
    const carContainer = document.getElementById("car-container");
    const searchInput = document.getElementById("search");
    const priceInput = document.getElementById("price");
    const darkModeBtn = document.getElementById("darkModeBtn");
    const sellCarForm = document.getElementById("sellCarForm");

    // Fetch and display cars
    function fetchCars() {
        fetch("http://localhost:3000/cars")
            .then(response => response.json())
            .then(cars => displayCars(cars));
    }

    // Display car listings
    function displayCars(cars) {
        carContainer.innerHTML = "";
        cars.forEach(car => {
            const carCard = document.createElement("div");
            carCard.classList.add("car-card");

            carCard.innerHTML = `
                <img src="${car.image}" alt="${car.name}">
                <h3>${car.name}</h3>
                <p>Type: ${car.type}</p>
                <p>Location: ${car.location}</p>
                <p>Price: $${car.price}</p>
                <button class="buy-btn" data-id="${car.id}">Buy Now</button>
            `;

            carContainer.appendChild(carCard);
        });

        // Add event listeners for Buy Now buttons
        document.querySelectorAll(".buy-btn").forEach(button => {
            button.addEventListener("click", handleBuyCar);
        });
    }

    // Click Event: Handle buying a car
    function handleBuyCar(event) {
        const carId = event.target.dataset.id;
        alert(`Car with ID ${carId} has been purchased!`);
    }

    // Input Event: Filter cars based on search input and price
    function handleFilterCars() {
        const searchText = searchInput.value.toLowerCase();
        const maxPrice = priceInput.value;

        fetch("http://localhost:3000/cars")
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
            });
    }

    searchInput.addEventListener("input", handleFilterCars);
    priceInput.addEventListener("input", handleFilterCars);

    // Click Event: Toggle Dark Mode
    darkModeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    // Submit Event: Add a new car listing
    sellCarForm.addEventListener("submit", event => {
        event.preventDefault();

        const newCar = {
            name: document.getElementById("carName").value,
            type: document.getElementById("carType").value,
            location: document.getElementById("carLocation").value,
            price: document.getElementById("carPrice").value,
            image: document.getElementById("carImage").value
        };

        fetch("http://localhost:3000/cars", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCar)
        }).then(() => {
            fetchCars();
            sellCarForm.reset();
        });
    });

    fetchCars();
});
