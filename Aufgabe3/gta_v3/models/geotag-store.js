// File origin: VS1LAB A3

const GeoTag = require("./geotag");

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * A class for in-memory-storage of geotags
 * 
 * Use an array to store a multiset of geotags.
 * - The array must not be accessible from outside the store.
 * 
 * Provide a method 'addGeoTag' to add a geotag to the store.
 * 
 * Provide a method 'removeGeoTag' to delete geo-tags from the store by name.
 * 
 * Provide a method 'getNearbyGeoTags' that returns all geotags in the proximity of a location.
 * - The location is given as a parameter.
 * - The proximity is computed by means of a radius around the location.
 * 
 * Provide a method 'searchNearbyGeoTags' that returns all geotags in the proximity of a location that match a keyword.
 * - The proximity constrained is the same as for 'getNearbyGeoTags'.
 * - Keyword matching should include partial matches from name or hashtag fields. 
 */
class InMemoryGeoTagStore {

    #geotagsArray = [];

    constructor() {
    }

    addGeoTag(newGeotag) {
        this.#geotagsArray.push(newGeotag);
    }

    removeGeoTag(name) {
        var index;
        for (i = 0; i < this.#geotagsArray.length; i++) {
            if (name == this.#geotagsArray[i].name) {
                index = i
            }
        }
        if (index != undefined) {
            this.#geotagsArray.splice(index, 1);
        }
    }

    getNearbyGeoTags(latitude, longitude, radius) {
        var returnTags = [];
        this.#geotagsArray.forEach(element => {
            var latDistance = latitude - element.latitude;
            var lonDistance = longitude - element.longitude;

            var distanceFromOrigin = Math.sqrt((latDistance * latDistance) + (lonDistance * lonDistance))

            if (distanceFromOrigin <= radius) {
                returnTags.push(element);
            }
        });
        return returnTags
    }

    getArray() {
        return this.#geotagsArray;
    }

    searchNearbyGeoTags(latitude, longitude, radius, keyword) {
        var leftoverTags = this.getNearbyGeoTags(latitude, longitude, radius);

        var returnTags = []
        leftoverTags.forEach(element => {
            var withoutHashtag = element.hashtag.replace('#', '')
            if (element.name == keyword) {
                returnTags.push(element);
            } else if (element.hashtag == keyword) {
                returnTags.push(element);
            } else if (withoutHashtag === keyword) {
                returnTags.push(element);
            }
        });

        return returnTags
    }
}


var geotagStorageTest = new InMemoryGeoTagStore();

var testGeotag1 = new GeoTag("inProx1", "#1", 49.02, 8.02)
var testGeotag2 = new GeoTag("inProx2", "#2", 49.005, 8.005)
var testGeotag12 = new GeoTag("inProx3", "#3", 49.02, 8.02)
var testGeotag22 = new GeoTag("inProx4", "#4", 49.005, 8.005)
var testGeotag3 = new GeoTag("notInProx1", "#TestHashtag", 49.1, 8.1)
var testGeotag4 = new GeoTag("notInProx2", "#TestHashtag", 4.89, 8)


geotagStorageTest.addGeoTag(testGeotag1)
geotagStorageTest.addGeoTag(testGeotag2)
geotagStorageTest.addGeoTag(testGeotag3)
geotagStorageTest.addGeoTag(testGeotag4)
geotagStorageTest.addGeoTag(testGeotag12)
geotagStorageTest.addGeoTag(testGeotag22)


var arrayNearby = geotagStorageTest.getNearbyGeoTags(49, 8, 0.1);

var arrayNearbyAndMatching = geotagStorageTest.searchNearbyGeoTags(49, 8, 0.1, "4");


arrayNearby.forEach(element => console.log(element.name))
console.log("____________________")
arrayNearbyAndMatching.forEach(element => console.log(element.name))

module.exports = InMemoryGeoTagStore
