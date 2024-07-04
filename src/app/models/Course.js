const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: {type: String , required:true,maxLength:255},
    description: {type:String,maxLength:255},
    image: {type:String,maxLength:255 },
    level: {type: String,maxLength:255},
    videoId: {type : String,maxLength:255,require:true},
    slug:{type: String, slug:'name', unique:true}
},{
    timestamps:true,
});

//Add plugin
mongoose.plugin(slug)
CourseSchema.plugin(mongooseDelete,{ 
    deletedAt : true,
    overrideMethods: 'all' })



module.exports = mongoose.model('Course',CourseSchema);
