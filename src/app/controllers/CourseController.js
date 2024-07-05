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
        req.body.image = `https://files.fullstack.edu.vn/f8-prod/courses/6.png`
        const course = new Course(req.body)
        course.save()
        .then(()=>res.redirect('/me/stored/courses'))
        .catch(err =>{

        });
    }
    // [GET] /course/:id/edit
    edit(req,res, next){
        Course.findById(req.params.id)
        .then(course=> res.render('courses/edit',{
            course: mongooseToObject(course)
        }))
        .catch(next)
    }
    // [PUT] /course/:id
    update(req,res,next){
        Course.updateOne({_id : req.params.id}, req.body)
        .then(()=> res.redirect("/me/stored/courses"))
        .catch(next)
    }
    // [DELETE] /course/:id
    delete(req,res,next){
        Course.delete({_id:req.params.id})
        .then(()=>res.redirect("back"))
        .catch(next)
    }

    // [DELETE] /course/:id/force
    destroy(req,res,next){
        Course.deleteOne({_id:req.params.id})
        .then(()=>res.redirect("back"))
        .catch(next)
    }

    // [PATCH] /course/:id/restore
    patch(req,res,next){
        Course.restore({_id:req.params.id})
        .then(()=>res.redirect("back"))
        .catch(next)
    }

    // [POST] /course/handle-form-actions
    handleFormAction(req,res,next){
        switch(req.body.action){
            case 'delete':
                Course.delete({_id: {$in : req.body.courseIds}})
                .then(()=>res.redirect("back"))
                .catch(next)
                break;
            default:
                res.json({message: 'Action is invalid'});
        }
    }
    // [POST] /course/handle-form-trask-actions
    handleFormTraskActions(req,res,next){
        switch(req.body.action){
            case 'restore':
                Course.restore({_id: {$in : req.body.courseIds}})
                .then(()=>res.redirect("back"))
                .catch(next)
                break;
            case 'destroy':
                Course.deleteMany({_id: {$in : req.body.courseIds}})
                .then(()=>res.redirect("back"))
                .catch(next)
                break;
    
            default:
                res.json({message: 'Action is invalid'});
        }
    }

}
module.exports = new CourseController();
