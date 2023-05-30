const express = require('express');
const router = express.Router();
const subscriberController = require('../controllers/subscriberController');
const multer = require('multer');
const upload = multer();

router.post('/create', upload.single('image'), subscriberController.createSubscriber);
router.get('/list', subscriberController.listSubscriber);
router.get('/list:id', subscriberController.listSubscriberByCode);
router.get('/filter', subscriberController.filterSubscriber);
router.put('/up:id', subscriberController.upSubscriber);
router.delete('/:id', subscriberController.delSubscriber);

module.exports = router;