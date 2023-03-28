const jwt = require("jsonwebtoken");
const jwt_secret = process.env.jwt_secret;


const tokenSign = async (member, time) => {
    const sign = jwt.sign(member, jwt_secret, { expiresIn: time })
    return sign
};

const tokenVerify = async (token) => {
    try {
        return jwt.verify(token, jwt_secret);
    }
    catch (error) {
        return error;
    }
};

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

module.exports = { tokenSign, tokenVerify, parseJwt };