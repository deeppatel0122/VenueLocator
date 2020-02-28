const request = require('request');

// searchVenues params: near, query
exports.getSearchVenues = (req, res, next) => {
    console.log("Query:");
    console.log(req.query);
    console.log("-------");
    getVenues(req).then((response) => {
        console.log(response);
        if(response.meta.code == 200){
            res.status(200).send(response.response.venues);
        }else{
            res.status(404).send("Bad Request. Try Again!")
        }    
    }).catch(err => res.status(400).send(err)); 
}

    // request for venues
    let getVenues = (req) => {
        return new Promise((resolve, reject) => {
            request({
                url: 'https://api.foursquare.com/v2/venues/search',
                method: 'GET',
                qs: {
                    client_id: process.env.FS_CLIENT_ID,
                    client_secret: process.env.FS_CLIENT_SECRET,
                    near: req.query.near,
                    query: req.query.query,
                    v: '20180323',
                    limit: 10
                }
            }, function (err, res, body) {
                if (err) {
                    console.error(err);
                    reject(new Error("API Error"));
                } else { // good response
                    let response = JSON.parse(body);
                    resolve(response);
                }
            });
        });
    }
