const express = require('express');
const contactRouter = express.Router();
const contactController = require('../controllers/contact.controllers');

//GET: route to display all contacts
contactRouter.get('/', contactController.getContact);

//GET: route to display a specific contact by id
contactRouter.get('/:cID', contactController.getContactById);

//POST: route to create a contact
contactRouter.post('/', contactController.createContact);

//PUT: route to edit a specific contact by id
contactRouter.put('/:cID', contactController.editContact);

//DELETE: route to delete a specific contact by id;
contactRouter.delete('/:cID', contactController.deleteContact);

module.exports = contactRouter;