import { buffer } from "micro"
import * as admin from "firebase-admin"
//Secure a connection to Firebase from the backend
const serviceAccount = require('../../service-account-key.json')
const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}): admin.app(); //To check if apps are not initialized twice. 

//Make connection to Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endPointSecret = process.env.STRIPE_SIGNING_SECRET;
const fulfillOrder = async (session) =>{
    console.log('Fulfulling order: ',session)
    return app.firestore().collection('users').doc(session.metadata.email).collection('orders').doc(session.id).set({
        amount: session.amount_total / 100,
        amount_shipping: session.total_details.amount_shipping / 100,
        images: JSON.parse(session.metadata.images), 
        timestamp: admin.firestore.FieldValue.serverTimestamp(), //this uses the server timestamp for synchronous timing.
    }).then(() =>{
        console.log(`Sucess! Added Order ${session.id} to DB`)
    })
}
export default async (req,res) => {
    if (req.method === 'POST'){
        const requestBuffer = await buffer(req); 
        //We need to gnereate the certificate using a buffer of information
        const payload = requestBuffer.toString()
        const signature = req.headers("stripe-signature");
        let event;
        //Verify that the event posted came from stripe
        try{
            event = stripe.webhooks.constructEvent(payload,signature,endPointSecret);
        } catch (err){
            alert('Error: ',err.message)
            return res.status(400).send(`Webhook error: ${err.message}`)
        }

        //Handle checkout session completed event
        if (event.type === 'checkout.session.completed'){
            const session = event.data.object

            //fulfill the order
            return fulfillOrder(session).then(res.status(200)).catch((err)=>res.status(400).send(`Webhook Error ${err.message}`))
            
        }
    }
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    }
}
//Here, we want the request to be like a stream than a parsed object.

//Body-parser parses an HTTP request body that usually helps when you need to know more than just the URL being hit.
// Using body-parser allows you to access req.body from within routes and use that data.

