const Member = require("../members/membersMd");
const jwt = require("./jwt");
const transporter = require("./mailer");
const passwordLost = async (req, res, next) => {

    const lostPasswordError = Error("not member corresponding the provided email");
    const member = (await Member.find().where({
        email: req.body.email

    }))[0];
    if (!member) {
        lostPasswordError.status = 404;
        return next(lostPasswordError);
    };
    const dataForToken = {
        id: member.id,
        DNI: member.DNI,
        email: member.email,
        lastName: member.lastName,
        password: member.password

    };

    const token = await jwt.tokenSign(dataForToken, "24h");
    const link = `http://localhost:3030/members/password-recover/${token}`;
    const mailInfo = {
        from: "cybersecurity@olympusgym.com",
        to: member.email,
        subject: "Password recovery requested",
        html: `<h2> To proceed please click on the link bellow </h2> <a href=${link}> RESET PASSWORD <a/>`,

    };

    transporter.sendMail(mailInfo, (error, data) => {
        if (error) {
            error.status = 400;
            return next(error);
        }
        res.status(200).json({
            message: "Email sent successfully"
        });

    })

};

module.exports = { passwordLost };
