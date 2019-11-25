"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const crmModel_1 = require("../models/crmModel");
crmModel_1.ContactSchema.method('toJSON', function () {
    const _a = this.toObject(), { __v, _id, created_date } = _a, object = __rest(_a, ["__v", "_id", "created_date"]);
    delete object.__v;
    delete object.created_date;
    object.createdDate = new Date(this.created_date.toString()).toLocaleString();
    return Object.assign({ id: this._id.toString() }, object);
});
const Contact = mongoose.model('Contact', crmModel_1.ContactSchema);
class ContactController {
    addNewContact(req, res) {
        let newContact = new Contact(req.body);
        newContact.save((err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }
    getContacts(req, res) {
        Contact.find({}, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }
    getContactWithID(req, res) {
        Contact.findById(req.params.contactId, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }
    updateContact(req, res) {
        Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }
    deleteContact(req, res) {
        Contact.remove({ _id: req.params.contactId }, (err) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted contact!' });
        });
    }
}
exports.ContactController = ContactController;
//# sourceMappingURL=crmController.js.map