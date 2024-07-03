const Course = require('../models/Course');
const {mmutipleMongooseToObjectui, mutipleMongooseToObject} = require('../../utils/mongoose')
class SiteController {
    // [GET] /
    home(req, res,next) {
        Course.find({}).then(courses =>{

            res.render('home',{
                courses: mutipleMongooseToObject(courses)
            }) // res.json(course)
        }).catch(next)
    }
    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}
module.exports = new SiteController();
