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
    assignValues(locationHelper.latitude, locationHelper.longitude);
    createMap(locationHelper.latitude, locationHelper.longitude);
    //Updating mapView Element
}

function createMap(lat, lon) {
    testManager = new MapManager('1HPBmokEdBAmuzdaqc3u4K7vItqdUq1a');
    let mapURL = testManager.getMapUrl(lat, lon, JSON.parse(document.getElementById('mapView').getAttribute('data-geotags')));
    imageElement = document.getElementById("mapView")
    imageElement.src = mapURL;
}

function assignValues(lat, lon) {
    latitudeInput = document.getElementById("tag-latitude")
    longitudeInput = document.getElementById("tag-longitude")
    hiddenLatitudeInput = document.getElementById("discoveryHiddenLatitude")
    hiddenLongitudeInput = document.getElementById("discoveryHiddenLongitude")

    latitudeInput.value = lat;
    longitudeInput.value = lon;
    hiddenLatitudeInput.value = lat;
    hiddenLongitudeInput.value = lon;
}

// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    // alert("Please change the script 'geotagging.js'");
    latitude = document.getElementById("tag-latitude").value
    longitude = document.getElementById("tag-longitude").value

    if (latitude === "" || longitude === "") {
        updateLocation();
    } else {
        assignValues(latitude, longitude)
        createMap(latitude, longitude)
    }
});

document.getElementById("tag-form").addEventListener("submit", function (event) {
    event.preventDefault();
    fetch('/api/geotags', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: document.getElementById("tag-name").value,
            hashtag: document.getElementById("tag-hashtag").value,
            latitude: document.getElementById("tag-latitude").value,
            longitude: document.getElementById("tag-longitude").value
        })
    })
        .then(response => {
            return response.json()
        })
        .then(data => console.log(data))
});


