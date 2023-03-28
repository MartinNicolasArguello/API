const bcrypt = require("../../utils/handlePassword");
const Member = require("../membersMd");
const jwt = require("../../utils/jwt")
let loginError = new Error("Invalid member information provided");
loginError.status = 401;

const loginMember = async (req, res, next) => {

    const member = (await Member.find().where({ email: req.body.email }))[0];
    if (!member) {
        return next(loginError);
    }
    const hashedPassword = member.password;
    const match = await bcrypt.checkPassword(req.body.password, hashedPassword);
    if (!match) {
        return next(loginError);
    }
    const memberToken = await jwt.tokenSign({ id: member.id, email: member.email, password: member.password, lastName: member.lastName }, "24h");
    res.status(200).json({ message: "login successfull", token: memberToken, member: member });
}

module.exports = { loginMember };