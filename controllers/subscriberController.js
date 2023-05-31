const subscribeModel = require('../models/subscriberModel');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); 
  }
});

const upload = multer({ storage: storage });

class SubscriberController {
    async createSubscriber(req, res) {
      try {
        const image = req.file.filename; 
    
        const newSubscriber = new subscribeModel(req.body);
        newSubscriber.image = image; 
    
        await newSubscriber.save();
        res.status(201).json(newSubscriber);
      } catch (error) {
        res.status(500).json({ error: 'Error to create subscriber' });
      }
      }

      async listSubscriber(req, res) {
        const usuarios = await subscribeModel.find({});
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error to list subscribers' });
    }

    
      
      async listSubscriberByCode(req, res) {
        const id = req.params.id;
        try {
            const user = await subscribeModel.findOne({ 'id': id});
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ erro: 'Subscribers not found!'});
            }
        } catch (error) {
            res.status(500).json({ error: 'Error to list subscribers' });
        }
    };


    
        async filterSubscriber(req, res) {
          try {
            const { firstName, lastName, city, state, status } = req.query;
        
            const filtro = {};
        
            if (firstName) {
              filtro.firstName = firstName;
            }
            if (lastName) {
              filtro.lastName = lastName;
            }
            if (city) {
              filtro.city = city;
            }
            if (state) {
              filtro.state = state;
            }
            if (status) {
              filtro.status = status;
            }
            const result = await subscribeModel.find(filtro);
            
            res.status(200).json(result);
          } catch (error) {
            res.status(500).json({ error: 'Error to list subscriber' });
          }
        }
    
        async upSubscriber(req, res) {
          try {
            const id = req.params.id;
            const subscriber = await subscribeModel.findOne({ 'id': id });
        
            if (!subscriber) {
              return res.status(404).json({ error: 'Subscriber not found' });
            }
        
            const upData = {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              birthDate: req.body.birthDate,
              tel: req.body.tel,
              address: req.body.address,
              district: req.body.district,
              city: req.body.city,
              state: req.body.state,
              status: req.body.status,
              image: req.body.image
            };
             
        await subscribeModel.findByIdAndUpdate(subscriber._id, upData);
        res.status(200).json({ message: 'Subscriber updated successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Error updating subscriber' });
      }
    }

        async delSubscriber(req, res) {
          const id = req.params.id;
        
          try {
            const subscriber = await subscribeModel.findOne({ 'id': id });
        
            if (!subscriber) {
              return res.status(404).json({ error: 'Subscriber not found' });
            }
        
            await subscribeModel.findByIdAndRemove(subscriber._id);
        
            res.status(200).json({ message: 'Subscriber deleted successfully!' });
          } catch (error) {
            res.status(500).json({ error: 'Error deleting subscriber' });
          }
        }
        
    
    }
    
    module.exports = new SubscriberController();