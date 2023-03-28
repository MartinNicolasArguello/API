const bcrypt = require("../../utils/handlePassword");
const Member = require("../membersMd");
const createMember = async (req, res, next) => {

    const password = await bcrypt.hashPassword(req.body.password)
    const newMember = Member({ ...req.body, password });
    newMember.save((error, result) => {
        if (error) {
            error.status = 400
            next(error);
        } else {
            res.status(200).json(newMember);
        }
    })
};

module.exports = { createMember };