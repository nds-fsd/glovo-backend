const express = require('express');
const {UserController} = require('../controller')

const UserRouter = express.Router();


UserRouter.get('/', UserController.findAll);

UserRouter.get('/:id', UserController.findOne);

UserRouter.post('/', UserController.create);

UserRouter.delete('/:id', UserController.delete);

UserRouter.patch('/:id', UserController.update);

UserRouter.post('/search', UserController.search);

module.exports = {UserRouter};
