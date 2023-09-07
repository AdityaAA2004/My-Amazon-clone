import Header from "../components/Header";
import {getSession} from "next-auth/react";
import moment from "moment";
import Order from "../components/Order";

export default function orders({listOfOrders,session}){

    return (
        <div className={'h-screen'}>
            <header>
                <Header />
            </header>
            <main className={"max-w-screen-2xl mx-12 my-10"}>
                <p className={'text-3xl border-b mb-2 pb-1 border-yellow-400'}>Your Orders</p>
                {session ? (
                    <h2>{listOfOrders.length} Orders</h2>
                ): (<h2>Please sign in to see your orders</h2>)}
                <div className={'mt-5 space-y-4'}>
                    {listOfOrders.map(({id,amount,amount_shipping,images,timestamp,items}) => (
                        <Order key={id} id={id} amount={amount} amount_shipping={amount_shipping} images={images} timestamp={timestamp} items={items}/>
                    ))}
                </div>
            </main>
        </div>
    )
}

export async function getServerSideProps(context){
    //Anything in this code is node.js
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    //Get user logged in credentials
    const session = await getSession(context) // the context contains the request, response and all other stuff.
    if (!session.user){
        return {
            props: {}
        }
    }

    else{
        //Load the database to get all the orders.
        const admin= require("firebase-admin");
        
        const privateKey= JSON.parse(process.env.FIREBASE_PRIVATE_KEY);
const app = !admin.apps.length ? admin.initializeApp({
  credential: admin.credential.cert({
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    private_key: privateKey,
    project_id: "clone-2-99846"
  })
}) : admin.app();

        const stripeOrders = await app.firestore().collection('users').
        doc(session.user.email).
        collection('orders').
        orderBy('timestamp','desc').
        get()
        const ordersMapped = await Promise.all(stripeOrders.docs.map(async (order) =>({
            id: order.id,
            amount:order.data().amount,
            amount_shipping: order.data().amount_shipping,
            images: order.data().images,
            timestamp:moment(order.data().timestamp.toDate()).unix(),
            items: (
                await stripe.checkout.sessions.listLineItems(order.id,{
                    limit:100
                })
            ).data
        })))
        
        return {
            props: {
                listOfOrders:ordersMapped,
                session:session,
            }
        }

    }
}
