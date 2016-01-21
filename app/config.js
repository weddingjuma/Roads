module.exports = {
    // CNADNR events page
    URL:    'http://213.177.10.50:6060/itn/drumuri.asp',
    
    // MongoDB URL
    dbUrl:  "mongodb://" + process.env.IP +  "/TrafficEvents",
    
    //Scraper interval
    interval: 3000,
    
    //Google Geocoder API delay
    geocodeDelay: 1000,
    
    //Google Geocoder API limit
    geocodeLimit: 2
}