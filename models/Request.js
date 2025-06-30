const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema(
    {

        mobile: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        amt: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        msg: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Request = mongoose.model('Request', requestSchema);
(async () => await Request.init())();

module.exports = Request;

