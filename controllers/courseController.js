const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Course = mongoose.model('Course');

router.get('/', (req, res) => {
    res.render("course/addOrEdit", {
        viewTitle: "Insert Course"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var course = new Course();
    course.cname = req.body.cname;
    course.cid = req.body.cid;
    course.cduration = req.body.cduartion;
    course.cfees = req.body.cfees;
    course.save((err, doc) => {
        if (!err)
            res.redirect('course/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("course/addOrEdit", {
                    viewTitle: "Insert Course",
                    course: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('course/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("course/addOrEdit", {
                    viewTitle: 'Update Course',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Course.find((err, docs) => {
        if (!err) {
            res.render("course/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving course list :' + err);
        }
    });
});




router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("course/addOrEdit", {
                viewTitle: "Update Course",
                employee: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('course/list');
        }
        else { console.log('Error in course delete :' + err); }
    });
});

module.exports = router;