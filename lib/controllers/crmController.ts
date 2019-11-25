import * as mongoose from 'mongoose';
import { ContactSchema } from '../models/crmModel';
import { Request, Response } from 'express';

/**
 * 
 * @returns A JSON object of the document contact object.
 * @description Adds a method to the Mongodb document schema to 
 *              transform the document contact object returned
 *              from the database.
 * @author Scott R. Sonnenwald
 */
ContactSchema.method('toJSON', function () {
    const { __v, _id, created_date, ...object } = this.toObject();
    
    // Remove the document contact object versionKey.
    delete object.__v;
    // Remove the document contact object created date.
    delete object.created_date;

    // Add a createDate property to the document contact object.
    object.createdDate = new Date(this.created_date.toString()).toLocaleString();
    
    // Transform and return the document contact object.
    return Object.assign({ id: this._id.toString() }, object)
 });

const Contact = mongoose.model('Contact', ContactSchema);

/**
 * 
 * @description Contact controller
 * @author Scott R. Sonnenwald
 */
export class ContactController {
    /**
     * 
     * @description Add a new contact to the database.
     * @author Scott R. Sonnenwald
     * @param req HTTP request from the client.
     * @param res HTTP response to the client.
     */
    public addNewContact (req: Request, res: Response) {                
        let newContact = new Contact(req.body);
        
        newContact.save((err, contact) => {
            if(err){
                res.send(err);
            }    
            res.json(contact);
        });
    }

    /**
     * 
     * @description Gets all the contacts from the database.
     * @author Scott R. Sonnenwald
     * @param req HTTP request from the client.
     * @param res HTTP response to the client.
     */
    public getContacts (req: Request, res: Response) {           
        Contact.find({}, (err, contact) => {
            if(err){
                res.send(err);
            }
            
            res.json(contact);
        });
    }

    /**
     * 
     * @description Get a contact with id from the database.
     * @author Scott R. Sonnenwald
     * @param req HTTP request from the client.
     * @param res HTTP response to the client.
     */
    public getContactWithID (req: Request, res: Response) {           
        Contact.findById(req.params.contactId, (err, contact) => {
            if(err){
                res.send(err);
            }
            
            res.json(contact);
        });
    }

    /**
     * 
     * @description Update a contact in the database.
     * @author Scott R. Sonnenwald
     * @param req HTTP request from the client.
     * @param res HTTP response to the client.
     */
    public updateContact (req: Request, res: Response) {           
        Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json(contact);
        });
    }

    /**
     * 
     * @description Delete a contact from the database.
     * @author Scott R. Sonnenwald
     * @param req HTTP request from the client.
     * @param res HTTP response to the client.
     */
    public deleteContact (req: Request, res: Response) {           
        Contact.remove({ _id: req.params.contactId }, (err) => {
            if(err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted contact!'});
        });
    }
}