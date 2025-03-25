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
                <img src="${car.image}" alt="${car.name}" class = "car-image">
                <h3>${car.name}</h3>
                <p>Type: ${car.type}</p>
                <p>Location: ${car.location}</p>
                <p>Price: Ksh. ${car.price}</p>
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
