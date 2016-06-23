module.exports = {
    // CNADNR events page
    URL : 'http://213.177.10.50:6060/itn/drumuri.asp',
    
    // MongoDB configuration object
    mongodbConfig: {
        url : "mongodb://" + process.env.IP +  "/TrafficEvents"
    },
    
    //Scraper interval
    interval : 3000,
    
    //Google Geocoder API delay
    geocodeDelay : 1000,
    
    //Google Geocoder API limit
    geocodeLimit : 2,
    
    //Milliseconds between API requests
    apiRequestDelay : 210,
    
    //MySQL configuration object
    mysqlConfig : {
        host     : process.env.IP,
        user     : 'radutatomir',
        password : '',
        database : 'c9'
    }
};