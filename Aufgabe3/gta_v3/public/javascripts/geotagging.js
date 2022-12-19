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

let latitude = '';
let longitude = '';


// Callback function
function currentLocationDetails(locationHelper) {
    //Updating Form Elements
    
    latitude = document.getElementById("tag-latitude").value
    longitude = document.getElementById("tag-longitude").value
    hiddenLatitudeInput = document.getElementById("discoveryHiddenLatitude")
    hiddenLongitudeInput = document.getElementById("discoveryHiddenLongitude")

    latitude = hiddenLatitudeInput.value = locationHelper.latitude
    longitude = hiddenLongitudeInput.value = locationHelper.longitude

 
}

// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    latitude = document.getElementById('tag-latitude')
    longitude = document.getElementById('tag-longitude')


    if(latitude==='' && longitude==='') {
        updateLocation();
    }
    // alert("Please change the script 'geotagging.js'");

      //Updating mapView Element
      testManager = new MapManager('1HPBmokEdBAmuzdaqc3u4K7vItqdUq1a');
      let mapURL = testManager.getMapUrl(latitude.value, longitude.value, JSON.parse(document.getElementById('mapView').getAttribute('data-geotags')));
      imageElement = document.getElementById("mapView")
      imageElement.src = mapURL;
});