const bcrypt = require("./handlePassword");
const Member = require("../members/membersMd");
const jwt = require("./jwt");

const passwordChange = async (req, res, next) => {
    const tokenData = jwt.parseJwt(req.params.token);

    const newPassword = await bcrypt.hashPassword(req.body.newPasswordOne);
    try {
        await Member.findByIdAndUpdate(tokenData.id, {
            password: newPassword
        });

        res.status(200).json({
            message: `Password changed for Mr/Mrs ${tokenData.lastName} `
        })
    }
    catch (error) {
        next(error)
    };

};

module.exports = { passwordChange };