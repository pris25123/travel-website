// itinerary.js

document.getElementById('itinerary-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Collecting user inputs
    const city = document.getElementById('city').value;
    const date = document.getElementById('date').value;
    const duration = document.getElementById('duration').value;
    const budget = document.getElementById('budget').value;

    // Collecting checked experiences
    const experiences = Array.from(document.querySelectorAll('input[name="experience"]:checked')).map(el => el.value);
    const travelGroup = document.querySelector('input[name="group"]:checked').value;
    const companions = document.querySelector('input[name="companions"]:checked')?.value || "None";

    // Generate itinerary using the backend API
    const itinerary = await generateItinerary(city, date, duration, budget, experiences, travelGroup, companions);

    // Display the itinerary
    document.getElementById('itinerary-result').innerHTML = itinerary;
});

// Function to generate itinerary using your Node.js API
async function generateItinerary(city, date, duration, budget, experiences, travelGroup, companions) {
    try {
        const response = await fetch('/api/generate-itinerary', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                city,
                date,
                duration,
                budget,
                experiences,
                travelGroup,
                companions
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.itinerary; // Assuming the server returns the itinerary in this format
    } catch (error) {
        console.error('Error generating itinerary:', error);
        return 'An error occurred while generating the itinerary. Please try again.';
    }
}