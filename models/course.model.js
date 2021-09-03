const mongoose = require('mongoose');

var  CourseSchema = new mongoose.Schema({
    cname: {
        type: String,
        required: 'This field is required.'
    },
    cid: {
        type: String
    },
    cduration: {
        type: String
    },
    cfees: {
        type: String
    }
});

// Custom validation for email


module.exports=mongoose.model('Course', CourseSchema);