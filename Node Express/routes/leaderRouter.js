const express = require('express');
const bodyParser = require('body-parser');

const leaderrouter  = express.Router();
leaderrouter.use(bodyParser.json());

leaderrouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next(); //continues to look for all /leaders related methods based on type of request and carries above specifications to that place.
})
// /leaders
.get((req,res,next) => {
    res.end('Sending data for all leaders');
})
.post((req,res,next) => {
    res.end('Adding the leader '+req.body.name+' with details '+req.body.description)
})
.delete((req,res,next) => {
    res.end('Deleting all leaders');   
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported');
});


// /leader/:leaderId
leaderrouter.route('/:leaderId')
.get((req,res,next) => {
    res.end('Sending data for leader: '+req.params.leaderId);
})
.post((req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on: '+req.params.leaderId);
})
.put((req,res,next) => {
    res.write('Updating leader: '+req.params.leaderId+ '\n');
    res.end('Updating leader '+req.body.name+' with details: '+req.body.description);
})
.delete((req,res,next) => {
    res.statusCode = 403;
    res.end('Deleting leader '+req.params.leaderId);
});


module.exports = leaderrouter;