const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('Connected to the server');

    Dishes.create({
        name: 'Italian',
        description: 'Pizza'
    })
        .then((dish) => {
            console.log(dish);

            return Dishes.findByIdAndUpdate(dish._id, {
                $set: {description: "Metropolitan Pizza"}
            },{
                new: true
            }).exec();
        })
        .then((dish) => {
            console.log(dish);
            dish.comment.push({
                rating:5,
                comment: "Authentic Italian",
                author: "Vineeth"
            });
            return dish.save();
        })
        .then((dish) => {
                console.log(dish)
            return Dishes.remove({});
        })
        .then(() => {
            return mongoose.connection.close();
        })
        .catch((err) => {
            console.log(err);
        });
});