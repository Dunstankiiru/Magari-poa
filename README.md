const API_URL = "http://localhost:3000/cars"; // Use json-server
const FAVORITES_URL = "http://localhost:3000/favorites";
const carList = document.getElementById("car-list");
const searchInput = document.getElementById("search");
const favoritesList = document.getElementById("favorites-list");

// Fetch car data
async function fetchCars() {
    try {
        const res = await fetch(API_URL);
        const cars = await res.json();
        displayCars(cars);
    } catch (error) {
        console.error("Error fetching car data:", error);
    }
}

// Display cars
function displayCars(cars) {
    carList.innerHTML = "";
    cars.forEach(car => {
        const carCard = document.createElement("div");
        carCard.classList.add("car-card");
        carCard.innerHTML = `
            <h3>${car.name}</h3>
            <img src="${car.image}" alt="${car.name}">
            <p>Price: Ksh ${car.price}</p>
            <p>Location: ${car.location}</p>
            <button onclick="viewDetails(${car.id})">🔍 View Details</button>
            <button onclick="addToFavorites(${car.id}, '${car.name}', '${car.image}')">❤️ Add to Favorites</button>
        `;
        carList.appendChild(carCard);
    });
}

// Search filter
searchInput.addEventListener("input", async (e) => {
    const searchText = e.target.value.toLowerCase();
    try {
        const res = await fetch(API_URL);
        const cars = await res.json();
        const filteredCars = cars.filter(car => car.name.toLowerCase().includes(searchText));
        displayCars(filteredCars);
    } catch (error) {
        console.error("Error filtering cars:", error);
    }
});

// View Details function
async function viewDetails(carId) {
    try {
        const res = await fetch(`${API_URL}/${carId}`);
        const car = await res.json();
        alert(`Car: ${car.name}\nPrice: Ksh ${car.price}\nDetails: ${car.details}`);
    } catch (error) {
        console.error("Error fetching car details:", error);
    }
}

// Add to Favorites
async function addToFavorites(carId, carName, carImage) {
    try {
        const res = await fetch(FAVORITES_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: carId, name: carName, image: carImage })
        });
        if (res.ok) {
            loadFavorites();
            alert(`${carName} added to favorites!`);
        } else {
            console.error("Failed to add to favorites");
        }
    } catch (error) {
        console.error("Error adding to favorites:", error);
    }
}

// Fetch and display favorites
async function loadFavorites() {
    try {
        const res = await fetch(FAVORITES_URL);
        const favorites = await res.json();
        displayFavorites(favorites);
    } catch (error) {
        console.error("Error fetching favorites:", error);
    }
}

// Display favorite cars
function displayFavorites(favorites) {
    favoritesList.innerHTML = "";
    favorites.forEach(fav => {
        const favCard = document.createElement("div");
        favCard.classList.add("favorite-card");
        favCard.innerHTML = `
            <h3>${fav.name}</h3>
            <img src="${fav.image}" alt="${fav.name}">
            <button onclick="removeFavorite(${fav.id})">❌ Remove</button>
        `;
        favoritesList.appendChild(favCard);
    });
}

// Remove from Favorites
async function removeFavorite(favId) {
    try {
        const res = await fetch(`${FAVORITES_URL}/${favId}`, {
            method: "DELETE"
        });
        if (res.ok) {
            loadFavorites();
            alert("Removed from favorites.");
        } else {
            console.error("Failed to remove from favorites");
        }
    } catch (error) {
        console.error("Error removing favorite:", error);
    }
}

// Initialize app
fetchCars();
loadFavorites();
