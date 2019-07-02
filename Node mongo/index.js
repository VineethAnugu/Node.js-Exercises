const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbOperation = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {
    assert.equal(err, null);

    console.log('Connected to the server.');

    const db = client.db(dbname);
    dbOperation.insertDocument(db, {name: "Fish", description: "Fry"}, 'dishes', (result) => {
        console.log("Inserted Document: \n ", result.ops,"\n");

        dbOperation.findDocuments(db, 'dishes', (docs) => {
            console.log("Found documents: \n", docs);

            dbOperation.updateDocument(db, {name:"Fish"}, {description: "Tikka"}, 'dishes', (result) => {
                console.log("Updated document \n ", result.result,"\n");

                db.dropCollection("dishes", (result) => {
                    console.log(result," Dropped");

                    client.close();
                });
            });
        });
    });



    // const collection = db.collection("dishes");

    // collection.insertOne({"name": "Boti", "description": "kebab"}, (err, result) => {
    //     assert.equal(err, null);
    //     console.log('After insert \n');
    //     console.log(result.ops);

    //     collection.find({}).toArray((err, docs) => {
    //         assert.equal(err,null);
    //         console.log('Found: \n');
    //         console.log(docs);

    //         db.dropCollection("dishes", (err, result) => {
    //             assert.equal(err,null);

    //             client.close();
    //         });
    //     });
    // });
});

