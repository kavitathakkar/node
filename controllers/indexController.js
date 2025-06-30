//import all models and validations
const Service = require('../models/Service');
const Member = require('../models/Member');
const Request = require('../models/Request');
const validators = require('../utilities/validators');

//1 API
const setupDB = async (req, res, next) => {
    try {
        let deletedServices = await Service.deleteMany({});
        let deletedMembers = await Member.deleteMany({});
        let deletedRequests = await Request.deleteMany({});
        let newServices = await Service.create([
            {
                type: 'Small scale Business Loans',
                code: 'SCB',
                imageUrl: 'sample.jpg',
                description: 'Providing loans which designed for your aspirations in starting a business. ',
                detail: [
                    {
                        type: 'DI Loan',
                        min: 15000,
                        max: 100000,
                        rate: 0.05,
                        maxdays: 150
                    },
                ],
            },

            {
                type: 'Wealth Management',
                code: 'WM',
                imageUrl: 'sample2.jpg',
                description: 'Providing loans which designed for your aspirations in starting a business. ',
                detail: [
                    {
                        type: 'DI Loan',
                        min: 15000,
                        max: 100000,
                        rate: 0.05,
                        maxdays: 150
                    },
                ],
            },

            {
                type: 'Money Remittance',
                code: 'MR',
                imageUrl: 'sample3.jpg',
                description: 'Providing loans which designed for your aspirations in starting a business. ',
                detail: [
                    {
                        type: 'DI Loan',
                        min: 15000,
                        max: 100000,
                        rate: 0.05,
                        maxdays: 150
                    },
                ],
            },

            {
                type: 'Micro Finance',
                code: 'MF',
                imageUrl: 'sample3.jpg',
                description: 'Providing loans which designed for your aspirations in starting a business. ',
                detail: [
                    {
                        type: 'DI Loan',
                        min: 15000,
                        max: 100000,
                        rate: 0.05,
                        maxdays: 150
                    },
                ],
            },

        ]);
        res
            .status(200)
            .json({ status: 'success', message: 'Database setup completed ' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: 'Database setup failed' });
        next(err);
    }
};

//2
const getAllServices = async (req, res, next) => {
    try {
        let foundServices = await Service.find({}, { _id: 0, _v: 0 });
        res.status(201).json({ status: 'success', data: foundServices });
    } catch (err) {
        res.status(400).json({ status: 'Fail', data: 'Not Found' });
        next(err);
    }
};

//3
const getServiceDetails = async (req, res, next) => {
    try {
        let foundServices = await Service.findOne(
            { code: req.params.type },
            { _id: 0, _v: 0 }
        );
        res.status(201).json({ status: 'success', data: foundServices });
    } catch (err) {
        res.status(400).json({ status: 'Fail', data: 'Not Found' });
        next(err);
    }
};

//4
const generateRequest = async (req, res, next) => {
    try {
        if (!validators.validateMobileNumber(req.body.mobile)) {
            res.status(400).json({ status: 'Fail', data: 'Invalid Mobile Number' });
        } else if (!validators.validateEmail(req.body.email)) {
            res.status(400).json({ status: 'Fail', data: 'Invalid Email' });
        } else {
            let postedRequest = await Request.create(req.body);
            res.status(201).json({
                status: 'success',
                data: 'Thanks for you request. Our executive will contact you soon.'
            });
        }
    }
    catch (err) {
        res.status(400).json({ status: 'Fail', data: 'Not Found' });
        next(err);
    }
};

//5
const addMember = async (req, res, next) => {
    try {
        console.log(req.body);
        let postedMember = await Member.create(req.body);
        res.status(201).json({
            status: 'success',
            data: 'Your account has been created successfully.'
        });
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ status: 'Fail', data: 'Member already exists' });
        } else {
            res.status(400).json({ status: 'Fail', data: 'Not Found' });
        }
        next(err);
    }
};

//6
const calculateEMI = async (req, res, next) => {
    try {
        let foundService = await Service.findOne(
            { code: req.params.type },
            { _id: 0, _v: 0 }
        );
        let emi = (req.body.amt * foundService.detail[0].rate * foundService.detail[0].maxdays) / 365;
        res
            .status(201)
            .json({ status: 'success', data: 'The total EMI amount is ', message: emi });
    } catch (err) {
        res.status(400).json({ status: 'Fail', data: 'Not Found' });
    }
};

//7
const updateRequest = async (req, res, next) => {
    const { mobile, code, type} = req.body;
    if (!mobile || !code || !type) {
        return res.status(400).json({ error: "Missing required parameter" });
    }
    const remark = "This is a remark defined within the function";
    try {
        const request = await Request.findOne({ mobile, code });
        if (!request) {
        return res.status(404).json({ error: "Request not found" });
        }
        request.type = type;
        request.remark = remark;
        await request.save();
        res.json({ message: "Request updated successfully" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};


//8
const updatePassword = async (req, res, next) => {
    try {
        let updatedMember = await Member.findOneAndUpdate(
            { mobile: req.body.mobile },
            { $set: { createpassword: req.body.newpassword } },
            { new: true }
        );
        if (updatedMember !== null) {
            res.status(201).json({
                status: 'success',
                data: 'Your password has been changed successfully.'
            });
        } else {
            res.status(400).json({ status: 'Fail', data: 'Member not found' });
        }
    } catch (err) {
        res.status(400).json({ status: 'Fail', data: 'Not Found' });
        next(err)
    }
};


//9
const deleteRequest = async (req, res, next) => {
    try {
        let deletedRequest = await Request.findOneAndDelete({
            mobile: req.body.mobile,
        });
        if (deletedRequest !== null) {
            res.status(201).json({
                status: 'success',
                data: 'Your request has been cancelled successfully.'
            });
        } else {
            res
                .status(400)
                .json({ status: 'Fail', data: 'No request raised for this number.' });
        }
    } catch (err) {
        res.status(400).json({ status: 'Fail', data: 'Not Found' });
        next(err)
    }
};


//10
const deleteMember = async (req, res, next) => {
    try {
        let deletedMember = await Member.findOneAndDelete({
            mobile: req.body.mobile,
        });
        if (deletedMember !== null) {
            res.status(201).json({
                status: 'success',
                data: 'Membership has been cancelled for this number.'
            });
        } else {
            res.status(400).json({
                status: 'Fail',
                data: 'No Membership available for this number.'
            });
        }
    } catch (err) {
        res.status(400).json({ status: 'Fail', data: 'Not Found' });
        next(err);
    }
};


module.exports = {
    setupDB,
    getAllServices,
    getServiceDetails,
    generateRequest,
    addMember,
    calculateEMI,
    updatePassword,
    deleteRequest,
    deleteMember,
    updateRequest
}


