import { Request, Response, NextFunction } from "express";
import { ContactController } from "../controllers/crmController";

/**
 *
 * @description Routes
 * @author Scott R. Sonnenwald
 */
export class Routes { 
    
    public contactController: ContactController = new ContactController() 
    
    /**
     *
     * @description Routes routes
     * @author Scott R. Sonnenwald
     * @param app Express application object.
     */
    public routes(app): void {   
        // Route of the root
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })
        
        // Route to get all the contacts 
        app.route('/contact')
        // Get all the contacts
        .get((req: Request, res: Response, next: NextFunction) => {
            // middleware
            console.log(`Request from: ${req.originalUrl}`);
            console.log(`Request type: ${req.method}`);            
            //if(req.query.key !== '78942ef2c1c98bf10fca09c808d718fa3734703e'){
            //    res.status(401).send('You shall not pass!');
            //} else {
                next();
            //}                        
        }, this.contactController.getContacts)        

        // Create a new contact
        .post(this.contactController.addNewContact);

        // Route to get, put, delete a contact by id
        app.route('/contact/:contactId')
        // Get a specific contact by id
        .get(this.contactController.getContactWithID)
        // Create or Update a specific contact by id
        .put(this.contactController.updateContact)
        // Delete a specific contact by id
        .delete(this.contactController.deleteContact)
    }
}