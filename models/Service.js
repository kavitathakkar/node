const mongoose = require('mongoose');

const detailSchema = new mongoose.Schema(
    {

        type: {
            type: String,
            required: true,
        },
        min: {
            type: Number,
            required: true,
        },
        max: {
            type: Number,
            required: true,
        },
        rate: {
            type: Number,
            required: true,
        },
        maxdays: {
            type: Number,
            required: true,
        },
    });

const serviceSchema = new mongoose.Schema(
    {

        type: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        detail: {
            type: [detailSchema],
            required: true,
        },
    },
    { timestamps: true }
);

const Service = mongoose.model('Service', serviceSchema);
(async () => await Service.init())();

module.exports = Service;

