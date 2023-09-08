const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabase(){
    const client = await MongoClient.connect('mongodb://localhost:27017');
    database = client.db('shopping-site');
}

function getDb(){
    if (!database){
        throw new Error('You must connect to database first!');
    }

    return database;
}

module.exports = {
    connectToDatabase : connectToDatabase,
    getDb : getDb
};