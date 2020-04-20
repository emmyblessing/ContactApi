const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    work: {
        type: String
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    }
});

const Contact = mongoose.model("Contact", ContactSchema);
module.exports = Contact;