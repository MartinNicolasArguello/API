const Member = require("../membersMd");
const jwt = require("../../utils/jwt");

const updateForm = async (req, res, next) => {
    try {
        res.status(200).json({ message: "Access Granted" })
    }
    catch (error) {
        return next();

    }
};

const updateMembership = async (req, res, next) => {

    try {
        const member = await Member.findOneAndUpdate({ email: req.body.email }, { weightsAccess: req.body.weightsAccess, spinningAccess: req.body.spinningAccess, saunaAccess: req.body.saunaAccess, poolAccess: req.body.poolAccess, isActive: req.body.isActive }, { new: true });
        console.log(member)
        res.status(200).json(member)

    }
    catch (error) {
        return next();
    }
};


const updateProfilePic = async (req, res, next) => {

    const profilePic = `http://localhost:3030/storage/${req.file.filename}`


    try {
        const member = await Member.findOneAndUpdate({ email: req.body.email }, { profilePic: profilePic }, { new: true });
        res.status(200).json(member)
    }
    catch (error) {
        return next();

    }
}

const getProfilePic = async (req, res, next) => {

    const member = (await Member.find().where({ email: req.body.email }))[0];

    res.status(200).json({ message: "Profile pic requested", profilePic: member.profilePic });
};

module.exports = { updateMembership, updateProfilePic, getProfilePic, updateForm }

