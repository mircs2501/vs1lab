// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * A class representing example geoTags at HKA
 * 
 * TODO: populate your InMemoryGeoTagStore with these tags
 * 
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


class GeoTagExamples {
    /**
     * Provides some geoTag data
     */
    static get tagList() {
        return [
            ['Castle', 49.013790, 8.404435, '#sight'],
            ['IWI', 49.013790, 8.390071, '#edu'],
            ['Building E', 49.014993, 8.390049, '#campus'],
            ['Building F', 49.015608, 8.390112, '#campus'],
            ['Building M', 49.016171, 8.390155, '#campus'],
            ['Building LI', 49.015636, 8.389318, '#campus'],
            ['Auditorium He', 49.014915, 8.389264, '#campus'],
            ['Building R', 49.014992, 8.392365, '#campus'],
            ['Building A', 49.015738, 8.391619, '#campus'],
            ['Building B', 49.016843, 8.391372, '#campus'],
            ['Building K', 49.013190, 8.392090, '#campus'],
        ];
    }
}
const GeoTag = require('./geoTag');
//const InMemoryGeoTagStore = require('./geoTag')

var geoTags = new InMemoryGeoTagStore();
var geoTagsArray = GeoTagExamples.tagList;

geoTagsArray.forEach(element => {
    var temp = new GeoTag(element[0], element[3], element[1], element[2]);
    geoTags.addGeoTag(temp)
})

geoTags.getArray().forEach(element => console.log(element.name))







module.exports = GeoTagExamples;
