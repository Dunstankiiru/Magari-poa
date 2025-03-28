document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = "https://magari-poa-backend.onrender.com/api/cars";
    const carContainer = document.getElementById("car-container");
    const searchInput = document.getElementById("search");
    const sellCarForm = document.getElementById("sellCarForm");
    const searchButton = document.getElementById("search-button"); 

    let allCars = [];

    fetchCars();

    //  Fetch Cars 
    function fetchCars() {
        return fetch(baseUrl)
            .then(response => response.json())
            .then(cars => {
                allCars = cars;
                displayCars(cars);
                return cars;
            })
            .catch(error => console.error("Error fetching cars:", error));
    }

    // Display Cars
    function displayCars(cars) {
        carContainer.innerHTML = "";

        if (cars.length === 0) {
            carContainer.innerHTML = "<p>No cars found.</p>";
            return;
        }

        cars.forEach(car => {
            const carCard = document.createElement("div");
            carCard.classList.add("car-card");


            carCard.innerHTML = `
                <img src="${car.image}" alt="${car.name}">
                <h3>${car.name}</h3>
                <h4>${car.type}</h4>
                <p><strong>Location:</strong> ${car.location}</p>
                <p><strong>Price:</strong> Ksh. ${car.price}</p>
                <p><strong>Engine Rating:</strong> ${car.engineRating} cc</p>
                <p><strong>Drive Mode:</strong> ${car.driveMode}</p>
                <p><strong>Seats:</strong> ${car.numberOfSeats}</p>
                <p><strong>Previous Owners:</strong> ${car.previousOwners}</p>
                <p><strong>Color:</strong> ${car.color}</p>
                <h2>${car.status === "sold" ? "<span class='sold'>SOLD</span>" : ""}</h2>
                ${car.status !== "sold" ? `<button class="btn btn-outline-success" data-id="${car.id}">Buy Now</button>` : ""}
            `;

            carContainer.appendChild(carCard);
        });


        document.querySelectorAll(".btn.btn-outline-success").forEach(button => {
            button.addEventListener("click", handleBuyCar);
        });
    }

    //  Buy Car 
    function handleBuyCar(event) {
        const carId = event.target.dataset.id;

        fetch(`${baseUrl}/${carId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status: "sold" })
        })
            .then(response => response.json())
            .then(updatedCar => {
                alert(`Car "${updatedCar.name}" has been marked as SOLD!`);
                fetchCars();
            })
            .catch(error => console.error("Error updating car:", error));
    }

    //Add New Car to DOM

    function addCarToDOM(newCar) {
        const carCard = document.createElement("div");
        carCard.classList.add("car-card");

        carCard.innerHTML = `
            <img src="${newCar.image}" alt="${newCar.name}">
            <h3>${newCar.name}</h3>
            <h4>${newCar.type}</h4>
            <p><strong>Location:</strong> ${newCar.location}</p>
            <p><strong>Price:</strong> Ksh. ${newCar.price}</p>
            <p><strong>Engine Rating:</strong> ${newCar.engineRating} cc</p>
            <p><strong>Drive Mode:</strong> ${newCar.driveMode}</p>
            <p><strong>Seats:</strong> ${newCar.numberOfSeats}</p>
            <p><strong>Previous Owners:</strong> ${newCar.previousOwners}</p>
            <p><strong>Color:</strong> ${newCar.color}</p>
        `;

        carContainer.appendChild(carCard);
    }

    //Selling Form 
    sellCarForm.addEventListener("submit", event => {
        event.preventDefault();

        const carImage = document.getElementById("carImage").files[0];
        const carName = document.getElementById("carName").value.trim();
        const carType = document.getElementById("carType").value.trim();
        const carLocation = document.getElementById("carLocation").value.trim();
        const carPrice = priceInput.value.trim();
        const engineRating = document.getElementById("engineRating").value.trim();
        const driveMode = document.getElementById("driveMode").value.tim();
        const numberOfSeats = document.getElementById("numberOfSeats").value.trim();
        const previousOwners = document.getElementById("previousOwners").value.trim();
        const color = document.getElementById("color").value.trim();

        if (!carName || !carType || !carLocation || !carPrice || !carImage) {
            alert("Please fill in all fields and upload an image.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            const newCar = {
                name: carName,
                type: carType,
                location: carLocation,
                price: carPrice,
                image: e.target.result,
                engineRating: engineRating,
                driveMode: driveMode,
                numberOfSeats: numberOfSeats,
                previousOwners: previousOwners,
                color: color
            };

            fetch(baseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newCar)
            })
                .then(response => response.json())
                .then(response => {
                    addCarToDOM(response);
                    sellCarForm.reset();
                    document.getElementById("carImage").value = "";
                })
                .catch(error => console.error("Error adding car:", error));
        };

        reader.readAsDataURL(carImage);
    });

    // Search 

    searchButton.addEventListener("click", () => {
        const filter = searchInput.value.trim().toLowerCase();
        console.log("Searching for:", filter); 
        const filteredCars = allCars.filter(car =>
            car.name.toLowerCase().includes(filter) ||
            car.location.toLowerCase().includes(filter)
        );

        if (filteredCars.length === 0) {
            alert("No matching cars found.");
        }

        displayCars(filteredCars);
    });

    searchInput.addEventListener("keypress", event => {
        if (event.key === "Enter") {
            event.preventDefault();
            searchButton.click();
        }
    });



    // ✅ Navbar & Menu 
    let menu = document.querySelector('.navbar');
    let searchBox = document.querySelector('.search-box');

    document.querySelector('#search-icon').addEventListener("click", () => {
        searchBox.classList.toggle('active');
        menu.classList.remove('active');
        if (searchBox.classList.contains('active')) {
            searchInput.focus(); // Focus on the search input when the box is active
        }
    });

    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener("click", () => {
            document.querySelectorAll('.navbar a').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    document.querySelector('#menu-icon').addEventListener("click", () => {
        menu.classList.toggle('active');
        searchBox.classList.remove('active');
    });

});
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", function () {
        document.querySelectorAll(".nav-link").forEach(item => item.classList.remove("active"));
        this.classList.add("active");
    });
});
document.getElementById("sort-price").addEventListener("click", () => {
    const sortedCars = [...allCars].sort((a, b) => a.price - b.price);
    displayCars(sortedCars);
});

