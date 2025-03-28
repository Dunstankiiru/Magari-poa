document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = "https://magari-poa-backend.onrender.com/api/cars";
    const carContainer = document.getElementById("car-container");
    const searchInput = document.getElementById("search");
    const priceInput = document.getElementById("carPrice");
    const darkModeBtn = document.getElementById("darkModeBtn"); 
    darkModeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode"); 
    });
    const sellCarForm = document.getElementById("sellCarForm");

    fetchCars();

    // Fetch and display Cars
    function fetchCars() {
        fetch(baseUrl)
            .then(response => response.json())
            .then(cars => displayCars(cars));

    }

    // Display Car Listings
    function displayCars(cars) {
        carContainer.innerHTML = "";
        cars.forEach(car => {
            const carCard = document.createElement("div");
            carCard.classList.add("car-card");

            const soldText = car.status === "sold" ? "<span class='sold'>SOLD</span>" : "";

            carCard.innerHTML = `
            <img src="${car.image}" alt="${car.name}">
            <h3>${car.name}</h3>
            <h4>${car.type}</h4>
            <h2>${soldText}</h2>
            <p>Location: ${car.location}</p>
            <p>Price: Ksh. ${car.price}</p>
            ${car.status !== "sold" ? `<button class="buy-btn" data-id="${car.id}">Buy Now</button>` : ""}
        `;

            carContainer.appendChild(carCard);
        });

      
        document.querySelectorAll(".buy-btn").forEach(button => {
            button.addEventListener("click", handleBuyCar);
        });
    }

    // Buy Car
    function handleBuyCar(event) {
        const carId = event.target.dataset.id;

        fetch(`${baseUrl}/${carId}`, {
            method: "PATCH", 
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
                fetchCars(); 
            })
    }

    // Form Submission to Add a New Car
    sellCarForm.addEventListener("submit", event => {
        event.preventDefault();

        const carImage = document.getElementById("carImage").files[0]; 
        const carName = document.getElementById("carName").value;
        const carType = document.getElementById("carType").value;
        const carLocation = document.getElementById("carLocation").value;
        const carPrice = priceInput.value; 

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
                image: e.target.result 
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
                    addCarToDOM(newCar); 
                    sellCarForm.reset(); 
                });
        };

        reader.readAsDataURL(carImage);
    });

    // Search functionality
    document.getElementById("search-button").addEventListener("click", () => {
        const filter = searchInput.value.toLowerCase();
        fetchCars().then(cars => {
            const filteredCars = cars.filter(car => car.name.toLowerCase().includes(filter));
            displayCars(filteredCars);
        });
    });

   
    const filteredCars = cars.filter(car => car.name.toLowerCase().includes(filter));
    displayCars(filteredCars);

    });
let menu = document.querySelector('.navbar');

let search = document.querySelector('.search-box');

document.querySelector('#search-icon').onclick = () => {
    updateActiveNavbar('home'); 
    search.classList.toggle('active');
    menu.classList.remove('active');
}

document.querySelector('#menu-icon').onclick = () => {
    updateActiveNavbar('menu'); 
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
        link.classList.remove('active'); 
        if (link.getAttribute('href') === `#${section}`) {
            link.classList.add('active'); 
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
            updateActiveNavbar(section.id); 
        }
    });
    header.classList.toggle('shadow', window.scrollY > 0);
});
