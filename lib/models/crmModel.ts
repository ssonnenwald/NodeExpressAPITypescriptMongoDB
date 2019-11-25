import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * 
 * @description Describes the Mongodb document for a contact.
 */
export const ContactSchema = new Schema({
    /**
     * 
     * @description The first name of a contact.
     */
    firstName: {
        type: String,
        required: 'Enter a first name'
    },
    /**
     * 
     * @description The last name of a contact.
     */
    lastName: {
        type: String,
        required: 'Enter a first name'
    },
    /**
     * 
     * @description The email of a contact.
     */
    email: {
        type: String            
    },
    /**
     * 
     * @description The company of a contact.
     */
    company: {
        type: String            
    },
    /**
     * 
     * @description The phone number of a contact.
     */
    phone: {
        type: Number            
    },
    /**
     * 
     * @description The create date of a contact.
     */
    created_date: {
        type: Date,
        default: Date.now
    }
});