const express = require('express');
const router = express.Router();
const subscriberController = require('../controllers/subscriberController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/create', upload.single('image'), subscriberController.createSubscriber);
router.get('/list', subscriberController.listSubscriber);
router.get('/list/:id', subscriberController.listSubscriberById);
router.get('/filter', subscriberController.filterSubscriber);
router.put('/up/:id', subscriberController.upSubscriber);
router.delete('/delete/:id', subscriberController.delSubscriber);

module.exports = router;