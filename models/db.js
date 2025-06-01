const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let db;

async function connectDB() {
    try {
        await client.connect();
        db = client.db('mydb'); // Replace with your DB name
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ DB Connection Error:", err);
    }
}

function getDB() {
    return db;
}

module.exports = { connectDB, getDB };