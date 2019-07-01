const express = require('express');
const bodyParser = require('body-parser');

const dishRouter  = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next(); //continues to look for all /dishes related methods based on type of request and carries above specifications to that place.
})
// /dishes
.get((req,res,next) => {
    res.end('Sending data for all dishes');
})
.post((req,res,next) => {
    res.end('Adding the dish '+req.body.name+' with details '+req.body.description)
})
.delete((req,res,next) => {
    res.end('Deleting all dishes');   
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported');
});


// /dishes/:dishId
dishRouter.route('/:dishId')
.get((req,res,next) => {
    res.end('Sending data for dish: '+req.params.dishId);
})
.post((req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on: '+req.params.dishId);
})
.put((req,res,next) => {
    res.write('Updating dish: '+req.params.dishId+ '\n');
    res.end('Updating dish '+req.body.name+' with details: '+req.body.description);
})
.delete((req,res,next) => {
    res.statusCode = 403;
    res.end('Deleting dish '+req.params.dishId);
});


module.exports = dishRouter;