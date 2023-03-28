const jwt = require("../utils/jwt");

let authError = new Error("Invalid/Null token provided");
authError.status = 403;
const tokenAuth = async (req, res, next) => {

    if (!req.headers.authorization) {
        return next(authError);
    };
    const token = req.headers.authorization.split(" ").pop();
    const validToken = await jwt.tokenVerify(token);
    if (validToken instanceof Error) {
        return next(authError)
    }
    next();
};


module.exports = tokenAuth
