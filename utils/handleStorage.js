const multer = require("multer");

const storage = multer.diskStorage({

    destination: (req, file, callback) => {
        const pathStorage = `${__dirname}/../public/storage`
        callback(null, pathStorage);
    },
    filename: (req, file, callback) => {
        const ext = file.originalname.split(".").pop()
        const filename = `memberPic_${Date.now()}.${ext}`;
        callback(null, filename);
    }
});

const uploadPic = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg" ||
            !file
        ) {
            callback(null, true);
        }
        else {
            callback(null, false);
            return callback(new Error("Invalid file format"));
        }
    },
});

module.exports = { uploadPic };