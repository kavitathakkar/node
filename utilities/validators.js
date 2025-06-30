function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
    }
    
    function validateMobileNumber(mobile){
    const mobileNumberRegex = /^\d{10}$/;
    return mobileNumberRegex.test(mobile);
    }
    
    module.exports = {
    validateEmail,
    validateMobileNumber
    };
    