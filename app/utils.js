var request = require("request");
var mysql = require("mysql");
var mysqlConfig = require("./config").mysqlConfig;
var connection = mysql.createConnection(mysqlConfig);


var rad = function(x) {
    return x * Math.PI / 180;
};

var geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
var counties = {
    "VN": "Vrancea",
    "VL": "Valcea",
    "VS": "Vaslui",
    "TL": "Tulcea",
    "TM": "Timis",
    "TR": "Teleorman",
    "SV": "Suceava",
    "SB": "Sibiu",
    "SM": "Satu Mare",
    "SJ": "Salaj",
    "PH": "Prahova",
    "OT": "Olt",
    "NT": "Neamt",
    "MS": "Mures",
    "MH": "Mehedinti",
    "MM": "Maramures",
    "IS": "Iasi",
    "IL": "Ialomita",
    "HD": "Hunedoara",
    "HR": "Harghita",
    "GJ": "Gorj",
    "GR": "Giurgiu",
    "GL": "Galati",
    "DJ": "Dolj",
    "DB": "Dambovita",
    "CV": "Covasna",
    "CT": "Constanta",
    "CJ": "Cluj",
    "CS": "Caras-Severin",
    "CL": "Calarasi",
    "BZ": "Buzau",
    "B": "Bucuresti",
    "BV": "Brasov",
    "BR": "Braila",
    "BT": "Botosani",
    "BN": "Bistrita-Nasaud",
    "BH": "Bihor",
    "BC": "Bacau",
    "AG": "Arges",
    "AR": "Arad",
    "AB": "Alba",
    "IF": "Ilfov"
};

module.exports = {
    /*  
        Google Maps API geocoder
        Transforms address in coordinates
    */
    geocode: function(place, callback) {
        request(geocodeUrl + place, function(err, res, html) {

            var data = JSON.parse(html);
            console.log("Using Google Geocoder API: " + place + " -> " + data.status);
            if (data.status != "OK") {
                data.results.push({
                    "geometry": {
                        "location": {
                            "lat": null,
                            "lng": null
                        }
                    }
                });
            }
            callback(err, res, data);
        });
    },

    /* 
        Haversine formula to calculate distance between two geographical points
    */
    getDistance: function(p1, p2) {
        var R = 6378137; // Earth’s mean radius in meter
        var dLat = rad(p2.lat - p1.lat);
        var dLong = rad(p2.lng - p1.lng);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d / 1000; // returns the distance in km
    },

    fields: ['nr', 'DN', 'positions', 'between', 'cause', 'measure'],


    getCoords: function(place, callback) {
        var coords = {
            latitude: null,
            longitude: null
        };
        
        if (!place.length) {
            return(callback(coords));
        }

        place = place.split(",");
         if (place.length < 2) {
            return(callback(coords));
        }
        var city = place[0];
        var county = place[1].trim();
        
        var queryStmt = "select c.latitude, c.longitude from ro_cities c join admin_codes a on c.admin1_code = a.countycode where c.asciiname regexp '^" + city.replace(/ /g, ".") + "$' and a.name like '%" + counties[county] + "%'";
        connection.query(queryStmt, function(err, rows, fields) {
            if (!err) {

                 if (!rows.length) {
                     module.exports.geocode(place, function(err, res, data) {
                         if (err) throw err;
                         coords.latitude = data.results[0].geometry.location.lat;
                         coords.longitude = data.results[0].geometry.location.lng;

                         callback(coords);
                     });
                 }
                 else {
                     coords.latitude = rows[0].latitude;
                     coords.longitude = rows[0].longitude;

                     callback(coords);
                 }
            }
            else
                console.log('Error while performing Query. -> ' + city);
        });
    }
}
