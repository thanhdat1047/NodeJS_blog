const Course = require('../models/Course');


const {mongooseToObject, mutipleMongooseToObject} = require('../../utils/mongoose')
class CourseController {
    
    // [GET] /course/:slug
    show(req, res,next) {
        Course.findOne({slug: req.params.slug})
        .then((course)=>{
            //res.json(course)
            res.render('courses/show',{course :mongooseToObject(course) })
        })
        .catch(next)
        
    }
    // [GET] /course/create
    create(req,res, next){
        res.render('courses/create')
    }
    // [POST] /course/store
    store(req,res, next){
        // res.json(req.body);
        const formData = req.body
        formData.image = `https://files.fullstack.edu.vn/f8-prod/courses/6.png`
        const course = new Course(formData)
        course.save()
        .then(()=>res.redirect('/'))
        .catch(err =>{

        });

    }

}
module.exports = new CourseController();
