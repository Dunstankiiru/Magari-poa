document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = "https://magari-poa-backend.onrender.com/api/cars";
    const carContainer = document.getElementById("car-container");
    const searchInput = document.getElementById("search");
    const priceInput = document.getElementById("carPrice"); // Update to reference the correct price input
    const darkModeBtn = document.getElementById("darkModeBtn"); // Dark mode button
    darkModeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode"); // Toggle dark mode class
    });
    const sellCarForm = document.getElementById("sellCarForm");

    fetchCars();

    // Fetch and display Cars
    function fetchCars() {
        fetch(baseUrl)
            .then(response => response.json())
            .then(cars => displayCars(cars))
            .catch(error => {
                alert("Failed to fetch cars. Please try again later.");
                console.error("Error fetching cars:", error);
            });
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
            <h4>${car.type} ${soldText}</h4>
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
        const carName = document.getElementById("carName").value;
        const carType = document.getElementById("carType").value;
        const carLocation = document.getElementById("carLocation").value;
        const carPrice = priceInput.value; // Use the updated price input reference

        // Validate form inputs
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
                    addCarToDOM(newCar); // Append new car instantly
                    sellCarForm.reset(); // Clear form fields after adding a new car
                })
                .catch(error => {
                    alert("Error adding car. Please try again later.");
                    console.error("Error adding car:", error);
                });
        };

        reader.readAsDataURL(carImage);
    });

    // Search functionality
    searchInput.addEventListener("input", () => {
        const filter = searchInput.value.toLowerCase();
        const carCards = document.querySelectorAll(".car-card");
        carCards.forEach(card => {
            const carName = card.querySelector("h3").textContent.toLowerCase();
            if (carName.includes(filter)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });
});

let menu = document.querySelector('.navbar');

let search = document.querySelector('.search-box');

document.querySelector('#search-icon').onclick = () => {
    updateActiveNavbar('home'); // Update active navbar on search icon click
    search.classList.toggle('active');
    menu.classList.remove('active');
}

document.querySelector('#menu-icon').onclick = () => {
    updateActiveNavbar('menu'); // Update active navbar on menu icon click
    menu.classList.toggle('active');
    search.classList.remove('active');
}

// hide menu and search
window.onscroll = () => {
    menu.classList.remove('active');
    search.classList.remove('active');
}

let header = document.querySelector('header');

function updateActiveNavbar(section) {
    const navbarLinks = document.querySelectorAll('.navbar a');
    navbarLinks.forEach(link => {
        link.classList.remove('active'); // Remove active class from all links
        if (link.getAttribute('href') === `#${section}`) {
            link.classList.add('active'); // Add active class to the current section link
        }
    });
}

window.addEventListener('scroll', () => {
    // Logic to determine which section is in view
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;
        if (sectionTop >= 0 && sectionTop < window.innerHeight / 2) {
            updateActiveNavbar(section.id); // Update active navbar based on scroll position
        }
    });
    header.classList.toggle('shadow', window.scrollY > 0);
});
