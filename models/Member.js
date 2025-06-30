const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
    {

        mobile: {
            type: Number,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
        },
        occupation: {
            type: String,
            required: true,
        },
        createpassword: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Member = mongoose.model('Member', memberSchema);
(async () => await Member.init())();

module.exports = Member;
