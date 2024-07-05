const Course = require('../models/Course');


const {mongooseToObject, mutipleMongooseToObject} = require('../../utils/mongoose')
class MeController {
    
    // [GET] /me/stored/course
    storedCourses(req, res,next) {
        Promise.all([
            Course.find({}).sortable(req), 
            Course.countDocumentsWithDeleted({deleted:true})])
            .then(([courses,deleteCount])=>
                res.render('me/stored-course',
                { 
                    deleteCount,
                    courses : mutipleMongooseToObject(courses)

                })
            ).catch(next);
        

       
    }
    // [GET] /me/trash/courses
    trash(req, res,next) {
        Course.findWithDeleted({deleted:true}).sortable(req)
        .then(courses => res.render('me/trash-course',
            { courses : mutipleMongooseToObject(courses)}))
        .catch(next)
    }

}
module.exports = new MeController();
