const express = require('express');
const bodyParser = require('body-parser');

const promoRouter  = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next(); //continues to look for all /promos related methods based on type of request and carries above specifications to that place.
})
// /promos
.get((req,res,next) => {
    res.end('Sending data for all promos');
})
.post((req,res,next) => {
    res.end('Adding the promo '+req.body.name+' with details '+req.body.description)
})
.delete((req,res,next) => {
    res.end('Deleting all promos');   
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported');
});


// /promo/:promoId
promoRouter.route('/:promoId')
.get((req,res,next) => {
    res.end('Sending data for promo: '+req.params.promoId);
})
.post((req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on: '+req.params.promoId);
})
.put((req,res,next) => {
    res.write('Updating promo: '+req.params.promoId+ '\n');
    res.end('Updating promo '+req.body.name+' with details: '+req.body.description);
})
.delete((req,res,next) => {
    res.statusCode = 403;
    res.end('Deleting promos '+req.params.promoId);
});


module.exports = promoRouter;