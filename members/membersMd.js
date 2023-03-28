const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
    DNI: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    lastName: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    weightsAccess: { type: String, default: null },
    spinningAccess: { type: String, default: null },
    saunaAccess: { type: String, default: null },
    poolAccess: { type: String, default: null },
    profilePic: { type: String, default: "http://localhost:3030/storage/default.jpg" }

},
    {
        timestamps: true,
    }
);

memberSchema.index({ lastName: "text" });


memberSchema.set("toJSON", {
    transform(doc, ret) {
        ret.id = ret._id
        delete ret.__v;
        delete ret.password;
        delete ret._id
    }
})
memberSchema.index({ lastName: "name" });

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;

