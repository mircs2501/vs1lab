// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/** * 
 * A class representing geotags.
 * GeoTag objects should contain at least all fields of the tagging form.
 */
class GeoTag {
    constructor(name, hashtag, latitude, longitude) {
        this.name = name;
        this.hashtag = hashtag;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

module.exports = GeoTag;
