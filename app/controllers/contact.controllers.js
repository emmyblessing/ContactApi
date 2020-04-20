const Contact = require('../models/contact.model');

const contactController = {
    // Return all contacts
    getContact: (req, res) => {
        Contact.find()
        .then(contacts => {
            res.send(contacts);
        }).catch(err =>{
            res.status(500).send({
                message: err.message || "Some errors occurs when retrieving contacts"
            });
        });
    },

    // Return a specific contact by id     
    getContactById: (req, res) => {
        Contact.findById(req.params.cID)
        .then(contact => {
            if(!contact) {
                return res.status(404).send({
                    message: "Contact not found with this ID" + req.params.cID
                });
            }
            res.send(contact);
        }).catch(err => {
            if(err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "Contact not found with this ID" + req.params.cID
                });
            }
        });
    },

    //create contact
    createContact: (req, res) => {
        // validate request for name
        if(!req.body.name) {
            return res.status(404).send({
                message: "Contact name cannot be empty"
            });
        }

        //create new contact
        const contact = new Contact({
            name: req.body.name || unnamed,
            email: req.body.email,
            mobile: req.body.mobile,
			work: req.body.work
        });

        // save note to database 
        contact.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error creating contact"
            });
        });
    },

    editContact: (req, res) => {
        if(!req.body.name){
            return res.status(404).send({
                message: "Contact name cannot be empty"
            });
        }

        Contact.findByIdAndUpdate(req.params.cID, {
            name: req.body.name || unnamed,
            email: req.body.email,
            mobile: req.body.mobile,
			work: req.body.work
        }, {new: true})
        .then(contact => {
            if(!contact){
                return res.status(404).send({
                    message: "Contact not found with this ID" + req.params.cID
                });
            }
            res.send(contact);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Contact not found with this ID" + req.params.cID
                });
            }

            res.status(500).send({
                message: "Error updating contact with ID" + req.params.cID
            });
        });
    },

    deleteContact: (req, res) => {
        Contact.findByIdAndRemove(req.params.cID)
        .then(contact => {
            if(!contact) {
                return res.status(404).send({
                    message: "Contact not found with ID" + req.params.cID
                });
            }

            res.send({
                message: "Contact deleted successfully"
            });
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Contact not found with ID" + req.params.cID
                });
            }

            res.status(500).send({
                message: "Could not delete contact"
            });
        });
    }
};

module.exports = contactController;