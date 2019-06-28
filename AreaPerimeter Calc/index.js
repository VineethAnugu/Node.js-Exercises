var rect = require('./rectangle');
var square = require('./square');

function solve(l, b){
    console.log("Lenght: " + l + " and Breadth: " + b);

    if(l==b){
        square(l,b,(err, sq) => {
            if(err){
                console.log("ERROR: " + err.message);
            }
            else{
                console.log("Area of square: " + sq.area());
                console.log("Perimeter of square: " + sq.perimeter());
            }
        });
    }

    rect(l,b, (err, rectangle) => {
        if(err){
            console.log("ERROR: " + err.message);
        }
        else{
            console.log("Area of rectangle: " + rectangle.area());
            console.log("Peimeter of rectangle: " + rectangle.perimeter());
        }
    });
}

solve(10, 20);
solve(0,-5);
solve(20,20);