const Course = require('../models/Course');


const {mongooseToObject, mutipleMongooseToObject} = require('../../utils/mongoose')
class MeController {
    
    // [GET] /me/stored/course
    storedCourses(req, res,next) {
        let courseQuery = Course.find({});
        if(req.query.hasOwnProperty('_sort')){
            courseQuery = courseQuery.sort({
               [ req.query.column ]: req.query.type
            })
        }
        Promise.all([courseQuery, Course.countDocumentsWithDeleted({deleted:true})])
        .then(([courses,deleteCount])=>
            res.render('me/stored-course',
            { 
                deleteCount,
                courses : mutipleMongooseToObject(courses)

            })
        ).catch(next);
        

       
    }
    trash(req, res,next) {
        Course.findWithDeleted({deleted:true})
        .then(courses => res.render('me/trash-course',
            { courses : mutipleMongooseToObject(courses)}))
        .catch(next)
    }

}
module.exports = new MeController();
