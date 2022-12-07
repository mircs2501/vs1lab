// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console. 
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...
console.log("The geoTagging script is going to start...");

/**
 * A class to help using the HTML5 Geolocation API.
 */

/**
 * A class to help using the MapQuest map service.
 */
class MapManager {
    #apiKey = '';

    /**
     * Create a new MapManager instance.
     * @param {string} apiKey Your MapQuest API Key
     */
    constructor(apiKey) {
        this.#apiKey = apiKey;
    }

    /**
     * Generate a MapQuest image URL for the specified parameters.
     * @param {number} latitude The map center latitude
     * @param {number} longitude The map center longitude
     * @param {{latitude, longitude, name}[]} tags The map tags, defaults to just the current location
     * @param {number} zoom The map zoom, defaults to 10
     * @returns {string} URL of generated map
     */
    getMapUrl(latitude, longitude, tags = [], zoom = 15) {
        if (this.#apiKey === '') {
            console.log("No API key provided.");
            return "images/mapview.jpg";
        }

        let tagList = `${latitude},${longitude}|marker-start`;
        tagList += tags.reduce((acc, tag) => `${acc}||${tag.latitude},${tag.longitude}|flag-${tag.name}`, "");

        const mapQuestUrl = `https://www.mapquestapi.com/staticmap/v5/map?key=${this.#apiKey}&size=600,400&type=light&zoom=${zoom}&center=${latitude},${longitude}&locations=${tagList}`;
        console.log("Generated MapQuest URL:", mapQuestUrl);

        return mapQuestUrl;
    }
}

/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */
// ... your code here ...

function updateLocation() {
    LocationHelper.findLocation(currentLocationDetails);
}

// Callback function
function currentLocationDetails(locationHelper) {
    //Updating Form Elements
    latitudeInput = document.getElementById("tag-latitude")
    longitudeInput = document.getElementById("tag-longitude")
    hiddenLatitudeInput = document.getElementById("discoveryHiddenLatitude")
    hiddenLongitudeInput = document.getElementById("discoveryHiddenLongitude")

    latitudeInput.value = hiddenLatitudeInput.value = locationHelper.latitude
    longitudeInput.value = hiddenLongitudeInput.value = locationHelper.longitude

    //Updating mapView Element
    testManager = new MapManager('1HPBmokEdBAmuzdaqc3u4K7vItqdUq1a');
    let mapURL = testManager.getMapUrl(locationHelper.latitude, locationHelper.longitude)
    imageElement = document.getElementById("mapView")
    imageElement.src = mapURL;
}

// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    // alert("Please change the script 'geotagging.js'");
    updateLocation();
});