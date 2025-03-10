const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
    username: { type: String, required: true },
    city: { type: String, required: true },
    duration: { type: Number, required: true },
    budget: { type: Number, required: true },
    itinerary: { type: String, required: true }
});

const ItineraryModel = mongoose.model('Itinerary', itinerarySchema);
module.exports = ItineraryModel;
