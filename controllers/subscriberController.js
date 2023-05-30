const subscribeModel = require('../models/subscribeModel');
const multer = require('multer');
const upload = multer();


class SubscriberController {
    async createSubscriber(req, res) {
        try {
          upload.single('image')(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
              return res.status(500).json({ error: 'Error to upload image' });
            } else if (err) {
              return res.status(500).json({ error: 'Error to create subscriber' });
            }
      
            const image = req.file.buffer; 
      
            const newSubscriber = new subscribeModel(req.body);
            newSubscriber.image = image; 

            await newSubscriber.save();
            res.status(201).json(newSubscriber);
          });
        } catch (error) {
          res.status(500).json({ error: 'Error to create subscriber' });
        }
      }

      async listSubscribers(req, res) {
        const usuarios = await subscribeModel.find({});
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error to list subscribers' });
    }

    
      
      async listSubscribersByCode(req, res) {
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
          const id = req.params.id;
          const _id = String((await subscribeModel.findOne({ 'id': id }))._id);
          const upData = {
            fisrtName: req.body.fisrtName,
            lastName: req.body.lastName ,
            birthDate: req.body.birthDate,
            tel: req.body.tel,
            address: req.body.address,
            distric: req.body.distric,
            city: req.body.cidade,
            state: req.body.estado,
            status: req.body.status,
            image: req.body.imagem
          };
          await subscribeModel.findByIdAndUpdate(_id, upData);
          res.status(200).send();
        }
    
    
        async delSubscriber(req, res) {
            const id = req.params.id;
            const _id = String((await subscribeModel.findOne({ 'id': id }))._id);
            await subscribeModel.findByIdAndRemove(String(_id));
            res.status(200).send({ message: 'Subscriber deleted successfully!' });
        } catch (error) {
            res.status(500).json({ error: 'Error to deleted' });
        };               
    }
    
    module.exports = new SubscriberController();