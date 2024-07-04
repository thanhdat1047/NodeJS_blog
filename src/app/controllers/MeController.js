const Course = require('../models/Course');


const {mongooseToObject, mutipleMongooseToObject} = require('../../utils/mongoose')
class MeController {
    
    // [GET] /me/stored/course
    storedCourses(req, res,next) {
        Course.find({})
        .then(courses => res.render('me/stored-course',
            { courses : mutipleMongooseToObject(courses)}))
        .catch(next)
    }
    trash(req, res,next) {
        Course.findWithDeleted({deleted:true})
        .then(courses => res.render('me/trash-course',
            { courses : mutipleMongooseToObject(courses)}))
        .catch(next)
    }

}
module.exports = new MeController();
