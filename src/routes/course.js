const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

//newsController.index function handler
router.get('/create', courseController.create);
router.post('/handle-form-actions', courseController.handleFormAction)
router.post('/handle-form-trask-actions', courseController.handleFormTraskActions)
router.get('/:id/edit',courseController.edit);
router.post('/store', courseController.store);
router.put('/:id', courseController.update);
router.delete('/:id', courseController.delete);
router.delete('/:id/force', courseController.destroy);
router.patch('/:id/restore', courseController.patch);
router.get('/:slug', courseController.show);

module.exports = router;