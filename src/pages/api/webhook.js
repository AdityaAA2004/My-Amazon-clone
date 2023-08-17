import { buffer } from "micro"
import * as admin from "firebase-admin"

// Secure a connection to Firebase from the backend
const serviceAccount = require('../../service-account-key.json')
const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) : admin.app();

// Make connection to Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endPointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
    console.log('Fulfilling order: ', session)
    return app.firestore().collection('users').
    doc(session.metadata.email).
    collection('orders').
    doc(session.id).
    set({
        amount: session.amount_total / 100,
        amount_shipping: session.total_details.amount_shipping / 100, // Corrected
        images: JSON.parse(session.metadata.images),
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
    }).
    then(() => {
        console.log(`Success! Added Order ${session.id} to DB`)
    }).catch((err) =>{
        console.log(`Error! Error ${err.message()}`)
    })
}

export default async (req, res) => {
    if (req.method === 'POST') {
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const signature = req.headers['stripe-signature']; // Use square brackets
        let event;

        try {
            event = stripe.webhooks.constructEvent(payload, signature, endPointSecret);
        } catch (err) {
            console.error('Error:', err.message);
            return res.status(400).send(`Webhook error: ${err.message}`);
        }

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;

            try {
                await fulfillOrder(session);
                return res.status(200).send('Webhook Received');
            } catch (err) {
                console.error('Fulfillment Error:', err.message);
                return res.status(400).send(`Webhook Error: ${err.message}`);
            }
        }
    }
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    }
}
