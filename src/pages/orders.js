import Header from "../components/Header";
import {getSession, useSession} from "next-auth/react";
import {db} from "../../firebase";
import moment from "moment";
import Order from "../components/Order";
import {list} from "postcss";
import {useDispatch} from "react-redux";
import {resetBasket} from "../slices/basketSlice";

export default function orders({listOfOrders}){
    const session = useSession()
    const dispatch = useDispatch()
    dispatch(resetBasket())
    return (
        <div className={'h-screen'}>
            <header>
                <Header />
            </header>
            <main className={"max-w-screen-2xl mx-auto my-10"}>
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
    if (!session){
        return {
            props: {}
        }
    }

    else{
        //Load the database to get all the orders.
        const stripeOrders = await db.collection('users').
        doc(((await session).user.email)).
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
        console.log(ordersMapped)
        return {
            props: {
                listOfOrders:ordersMapped,
                session,
            }
        }

    }
}