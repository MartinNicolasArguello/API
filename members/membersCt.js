const Member = require("../members/membersMd")

const getAllMembers = (req, res, next) => {

    Member.find().then((data) => {

        !data.length
            ? next()
            : res.status(200).json(data)
    }).catch(error => {
        error.status = 500
        next(error);
    });

};

const searchMember = async (req, res, next) => {

    const { query } = req.params;
    Member.find({ $text: { $search: query } }, (err, result) => {
        if (err) { return next() };
        return res.status(200).json({ result })
    })

};

const updateMembership = async (req, res, next) => {

    try {
        const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(member)
    }
    catch (error) {

        next();

    }
}

const deleteMemberById = async (req, res, next) => {

    try {
        const member = await Member.findByIdAndDelete(req.params.id)
        res.status(200).json({ member: member.id, message: "usuario borrado" })
    }
    catch (error) {
        next();

    }
};


module.exports = { getAllMembers, deleteMemberById, updateMembership, searchMember }