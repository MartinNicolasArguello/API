const express = require("express");
require("./config/db");
const jwt = require("jsonwebtoken");
const cors = require("cors")
//process.env.PORT ||
const PORT = 3030;
const server = express();

server.use(cors());
server.use(express.static("public"));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use("/members", require("./members/membersRt"));


server.listen(PORT, (err) => {
    err ?
        console.log("Server down due to: ", err)
        : console.log('\x1b[34m', `Server up at: http://localhost:${PORT}`);

});

//404
server.use((req, res, next) => {
    console.log("MANEJO 404")
    let error = new Error("Not found")
    error.status = 404
    next(error)
});
//GENERAL
server.use((error, req, res, next) => {
    console.log("MANEJO GENERAL")
    if (!error.status) {
        error.status = 400;
    }
    console.log(res.message)
    res.status(error.status)
        .json({ status: error.status, message: error.message });
});

