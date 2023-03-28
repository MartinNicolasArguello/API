require("dotenv").config();

const mongoose = require("mongoose");

const options = {
    maxPoolSize: 100,
    useNewUrlParser: true,
    useUnifiedTopology: true
};


const db_uri = process.env.db_uri;
mongoose.set("strictQuery", false);
mongoose.connect(db_uri, options, (err) => {
    err ? console.log('\x1b[31m', 'Could not connect to Mongo Atlas')

        : console.log('\x1b[34m', 'Connected to Mongo Atlas');
});