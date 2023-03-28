const jwt = require("./jwt");
const passwordRecover = async (req, res, next) => {
    const { token } = req.params;
    const parsedToken = jwt.parseJwt(token);
    const tokenStatus = await jwt.tokenVerify(token);
    if (tokenStatus instanceof Error) {
        tokenStatus.status = 400
        tokenStatus.message = "Invalid token"
        return next(error = tokenStatus)
    };
    res.status(200).send(
        `<h1>Hello Mr/Mrs ${parsedToken.lastName} you are now in password recover. <h1/>`
    );
};

module.exports = { passwordRecover };