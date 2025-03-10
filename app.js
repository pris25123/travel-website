//background image slider

const sliderImgs = ["img1.jpg", "img2.cms", "img3.jpg", "img4.jpg", "img5.jpeg", "img6.png"];
let sliderImage = document.querySelector('.background-image');
let sliderGrids = [...document.querySelectorAll('.grid-item')];

let currentImage = 0;

setInterval(() => {
    changeSliderImage();
}, 5000);

const changeSliderImage = () => {
    sliderGrids.map((gridItem, index) => {
        setTimeout(() => {
            gridItem.classList.remove('hide');

            setTimeout(() => {

                if(index == sliderGrids.length - 1){
                    if(currentImage >= sliderImgs.length - 1){
                        currentImage = 0;
                    } else{
                        currentImage++;
                    }

                    sliderImage.src = `img/${sliderImgs[currentImage]}`;

                    sliderGrids.map((item, i) => {
                        setTimeout(() => {
                            item.classList.add('hide')
                        }, i * 100);
                    })

                }

            }, 100);

        }, index * 100);
    })
}
// Sample expanded itinerary data for 8 cities in India
const cityItineraries = {
    "mumbai": [
        { day: 1, activity: "Visit Gateway of India", food: "Pav Bhaji at Jumboking", category: "cultural" },
        { day: 2, activity: "Explore Marine Drive", food: "Vada Pav at Shivaji Vadapav", category: "cultural" },
        { day: 3, activity: "Shop at Colaba Causeway", food: "Bhel Puri at Chowpatty Beach", category: "shopping" },
        { day: 4, activity: "Visit Elephanta Caves", food: "Bombay Sandwich at Ashok Vadapav", category: "cultural" },
        { day: 5, activity: "Rock Climbing at Sanjay Gandhi National Park", food: "Pav Bhaji at Jumboking", category: "adventure" },
        { day: 6, activity: "Yoga Retreat at Powai Lake", food: "Healthy smoothies at Yoga Cafe", category: "relaxation" },
        { day: 7, activity: "Cultural Dance Show", food: "Vada Pav at Shivaji Vadapav", category: "cultural" }
    ],
    "delhi": [
        { day: 1, activity: "Visit Red Fort", food: "Chole Bhature at Sita Ram Diwan Chand", category: "cultural" },
        { day: 2, activity: "Explore Qutub Minar", food: "Parathas at Paranthe Wali Gali", category: "cultural" },
        { day: 3, activity: "Shop at Dilli Haat", food: "Chaat at Haldiram's", category: "shopping" },
        { day: 4, activity: "Visit Humayun's Tomb", food: "Mughlai at Karim's", category: "cultural" },
        { day: 5, activity: "Hiking at Aravalli Hills", food: "Parathas at Paranthe Wali Gali", category: "adventure" },
        { day: 6, activity: "Street Food Exploration at Chandni Chowk", food: "Chaat at Haldiram's", category: "culinary" },
        { day: 7, activity: "Museum Tour at National Museum", food: "Chole Bhature at Sita Ram Diwan Chand", category: "cultural" }
    ],
    "jaipur": [
        { day: 1, activity: "Visit Amber Fort", food: "Dal Baati Churma at Chokhi Dhani", category: "cultural" },
        { day: 2, activity: "Explore City Palace", food: "Ghevar at LMB (Laxmi Mishtan Bhandar)", category: "cultural" },
        { day: 3, activity: "Shop at Johari Bazaar", food: "Pyaaz Kachori at Rawat Mishthan Bhandar", category: "shopping" },
        { day: 4, activity: "Visit Hawa Mahal", food: "Laal Maas at Suraj Mahal", category: "cultural" },
        { day: 5, activity: "Zip-lining at Nahargarh Fort", food: "Dal Baati Churma at Chokhi Dhani", category: "adventure" },
        { day: 6, activity: "Cultural Dance Show at Rajasthan Cultural Centre", food: "Ghevar at LMB", category: "cultural" },
        { day: 7, activity: "Visit Wildlife Sanctuary", food: "Pyaaz Kachori at Rawat Mishthan Bhandar", category: "wildlife" }
    ],
    "goa": [
        { day: 1, activity: "Relax at Baga Beach", food: "Fish Curry Rice at Fisherman’s Wharf", category: "beaches" },
        { day: 2, activity: "Explore Old Goa Churches", food: "Prawn Balchão at Gunpowder", category: "cultural" },
        { day: 3, activity: "Visit Dudhsagar Falls", food: "Goan Pork Vindaloo at Vinayak Family Restaurant", category: "wildlife" },
        { day: 4, activity: "Go on a River Cruise", food: "Beef Xacuti at Gunpowder", category: "beaches" },
        { day: 5, activity: "Snorkeling at Palolem Beach", food: "Fish Curry Rice at Fisherman’s Wharf", category: "beaches" },
        { day: 6, activity: "Safari in Bhagwan Mahavir Wildlife Sanctuary", food: "Prawn Balchão at Gunpowder", category: "wildlife" },
        { day: 7, activity: "Street Food Exploration", food: "Goan Pork Vindaloo at Vinayak Family Restaurant", category: "culinary" }
    ],
    "bangalore": [
        { day: 1, activity: "Visit Lalbagh Botanical Garden", food: "Mysore Pak at MTR", category: "cultural" },
        { day: 2, activity: "Explore Bangalore Palace", food: "Bisi Bele Bath at Vidyarthi Bhavan", category: "cultural" },
        { day: 3, activity: "Shop at Commercial Street", food: "Dosa at CTR (Central Tiffin Room)", category: "shopping" },
        { day: 4, activity: "Visit Nandi Hills", food: "Vada at Bangalore Vada Pav", category: "adventure" },
        { day: 5, activity: "Rock Climbing at Ramanagara", food: "Mysore Pak at MTR", category: "adventure" },
        { day: 6, activity: "Yoga Retreat at Art of Living", food: "Bisi Bele Bath at Vidyarthi Bhavan", category: "relaxation" },
        { day: 7, activity: "Street Food Exploration at VV Puram Food Street", food: "Dosa at CTR", category: "culinary" }
    ],
    "chennai": [
        { day: 1, activity: "Visit Marina Beach", food: "Idli and Sambar at Murugan Idli Shop", category: "beaches" },
        { day: 2, activity: "Explore Kapaleeshwarar Temple", food: "Chettinad Chicken at Anjappar", category: "cultural" },
        { day: 3, activity: "Shop at T Nagar", food: "Pongal at Saravana Bhavan", category: "shopping" },
        { day: 4, activity: "Visit Fort St. George", food: "Filter Coffee at Indian Coffee House", category: "cultural" },
        { day: 5, activity: "Yoga Retreat at VGP Golden Beach", food: "Pongal at Saravana Bhavan", category: "relaxation" },
        { day: 6, activity: "Snorkeling at Covelong Beach", food: "Idli and Sambar at Murugan Idli Shop", category: "beaches" },
        { day: 7, activity: "Cultural Dance Show at Kalakshetra", food: "Chettinad Chicken at Anjappar", category: "cultural" }
    ],
    "kolkata": [
        { day: 1, activity: "Visit Victoria Memorial", food: "Kathi Roll at Nizam's", category: "cultural" },
        { day: 2, activity: "Explore Howrah Bridge", food: "Macher Jhol at 6 Ballygunge Place", category: "cultural" },
        { day: 3, activity: "Shop at New Market", food: "Rasgulla at Balaram Mullick and Radharaman Mullick", category: "shopping" },
        { day: 4, activity: "Visit Dakshineswar Temple", food: "Macher Jhol at Diner's King", category: "cultural" },
        { day: 5, activity: "Bird Watching at Sunderbans", food: "Kathi Roll at Nizam's", category: "wildlife" },
        { day: 6, activity: "Cultural Dance Show at Rabindra Sadan", food: "Rasgulla at Balaram Mullick", category: "cultural" },
        { day: 7, activity: "Safari at Sunderbans", food: "Macher Jhol at Diner's King", category: "wildlife" }
    ],
    "hyderabad": [
        { day: 1, activity: "Visit Charminar", food: "Hyderabadi Biryani at Paradise", category: "cultural" },
        { day: 2, activity: "Explore Golconda Fort", food: "Mirchi Ka Salan with Biryani", category: "cultural" },
        { day: 3, activity: "Shop at Laad Bazaar", food: "Haleem during Ramadan", category: "shopping" },
        { day: 4, activity: "Visit Ramoji Film City", food: "Hyderabadi Biryani at Paradise", category: "adventure" },
        { day: 5, activity: "Hiking at Ananthagiri Hills", food: "Mirchi Ka Salan with Biryani", category: "adventure" },
        { day: 6, activity: "Cultural Tour at Salar Jung Museum", food: "Haleem during Ramadan", category: "cultural" },
        { day: 7, activity: "Street Food Tour at Necklace Road", food: "Hyderabadi Biryani at Paradise", category: "culinary" }
    ]
};


// Handling form submission
document.getElementById('itinerary-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const city = document.getElementById('city').value.toLowerCase();
    const duration = parseInt(document.getElementById('duration').value, 10);
    const budget = parseInt(document.getElementById('budget').value, 10);

    let itineraryHTML = `<h2>Itinerary for ${city}</h2>`;
    let itineraryData = [];
    if (cityItineraries[city]) {
        itineraryData = cityItineraries[city].slice(0, duration);
        const itineraryItems = itineraryData.map(item => `
            <div class="itinerary-item">
                <h3>Day ${item.day}</h3>
                <p><strong>Activity:</strong> ${item.activity}</p>
                <p><strong>Food to Try:</strong> ${item.food}</p>
            </div>
        `).join('');
        itineraryHTML += `<div class="itinerary-list">${itineraryItems}</div>`;
    } else {
        itineraryHTML += "<p>Sorry, we don't have an itinerary for this city.</p>";
    }

    document.getElementById('itinerary-result').innerHTML = itineraryHTML;

    // Show Save Itinerary button
    const saveButton = document.getElementById('save-itinerary-button');
    if (itineraryData.length > 0) {
        saveButton.style.display = 'block';
        saveButton.onclick = function () {
            saveItineraryToDatabase(city, duration, budget, itineraryData);
        };
    } else {
        saveButton.style.display = 'none';
    }
});

// Function to save itinerary to the database
// Function to save itinerary to the database
function saveItineraryToDatabase(city, duration, budget, itinerary) {
    // Get username and password from input fields (you need to have these fields in your HTML)
    const username = document.getElementById('username').value; // Assuming you have an input field for username

    const itineraryData = {
        username,
        city,
        duration,
        budget,
        itinerary
    };
    console.log('Sending itinerary data:', JSON.stringify(itineraryData)); // Log the data being sent

    fetch('http://127.0.0.1:5000/api/save-itinerary', { // Adjust the URL as per your server setup
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(itineraryData)
    })
    .then(response => {
        if (response.ok) {
            alert('Itinerary saved successfully!');
        } else {
            alert('Failed to save itinerary. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error saving itinerary:', error);
        alert('An error occurred while saving the itinerary.');
    });
}