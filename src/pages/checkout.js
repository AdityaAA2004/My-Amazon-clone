import { useSelector } from "react-redux";
import Header from "../components/Header";
import Image from "next/image";
import { selectItems } from "../slices/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
import Currency from 'react-currency-formatter-v2';
import { useSession } from "next-auth/react";
<<<<<<< HEAD
<<<<<<< HEAD
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const stripePromise = loadStripe(process.env.stripe_public_key)
=======
import {selectUser} from '../slices/sessionSlice';

>>>>>>> da20e21ccd854c376a40cad65c996cd3db25633d
=======
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const stripePromise = loadStripe(process.env.stripe_public_key)
>>>>>>> c6c4a4ba2b7de9255ed40bd0204f8b9389979fa0
function checkout() {
  const items = useSelector(selectItems);
  const session = useSession()
  
  const newBasket = Array.from(new Set(items.map(item => item.id))).map(id => items.find(item => item.id === id));
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c6c4a4ba2b7de9255ed40bd0204f8b9389979fa0
  console.log(newBasket)
  const buttonStyling = `button mt-4 ${!session.data && 'from-gray-300 to-gray-500 text-gray-200 border-gray-200 cursor-not-allowed'}`
  const createCheckoutSession = async () =>{
    console.log("Checkout session created");
    //Call the backend to create a checkout session
    const stripe = await stripePromise;
    const checkoutSession = axios.post('api/create-checkout-session.js',
    {
      items: items,
      email: session?.data?.user?.email
    })
  }
<<<<<<< HEAD
=======
   console.log(newBasket)
  const buttonStyling = `button mt-4 ${!session && 'from-gray-300 to-gray-500 text-gray-200 border-gray-200 cursor-not-allowed'}`
>>>>>>> da20e21ccd854c376a40cad65c996cd3db25633d
=======
>>>>>>> c6c4a4ba2b7de9255ed40bd0204f8b9389979fa0
  return (
    <div className="bg-gray-100">
        <Header/>
        <main className="lg:flex max-w-screen-2xl mx-auto ">
            {/* Left */}
            <div className=" flex-grow m-5 shadow-sm">
                <Image src="https://links.papareact.com/ikj"
                height={250}
                width={1020}
                
                objectFit="contain" />
                <div className="flex flex-col p-5 space-y-10 bg-white">
                    <h1 className="text-3xl border-b pb-4">{newBasket.length === 0 ? 'Your Amazon Basket is Empty':'Your Shopping Basket'}</h1>
                    {newBasket.map((item,i) => (
                      <CheckoutProduct
                      key= {i} //This is generally not a great way of making a unique key. This can be like a worst case scenario.
                      id= {item.id}
                      title = {item.title}
                      price={item.price}
                      description={item.description}
                      category={item.category}
                      image={item.image}
                      rating={item.rating}
                      hasPrime={item.hasPrime} />
                    ))}
                </div>

            </div>

            {/* Right */}

            <div className="flex flex-col bg-white p-10 shadow-md">
              {items.length > 0 && (
                <>
                  <h2 className="whitespace-nowrap">Subtotal ({items.length} items): <span className="font-bold">
                    <Currency quantity={items.reduce((total,item) => total + item.price,0)}/>
                    {/* Note the expression inside the quantity prop. The in-built 'reduce' method is an ES-6 method.
                     It is used to iterate through the 'items' (a list of basket items). The first parameter 'total'
                     starts from 0. Then, the total keeps adding up by the item's price. */}
                    </span>
                    </h2>
<<<<<<< HEAD
<<<<<<< HEAD
                    <button className={buttonStyling} role="link" onClick={createCheckoutSession}>
                      {!session ? "Sign In to Checkout" : "Proceed to Checkout"}
=======
                    <button className={buttonStyling}>
                      {!session.data ? "Sign In to Checkout" : "Proceed to Checkout"}
>>>>>>> da20e21ccd854c376a40cad65c996cd3db25633d
=======
                    <button className={buttonStyling} role="link" onClick={createCheckoutSession}>
                      {!session ? "Sign In to Checkout" : "Proceed to Checkout"}
>>>>>>> c6c4a4ba2b7de9255ed40bd0204f8b9389979fa0
                    </button>
                </>
              )}
            </div>
        </main>
    </div>
  )
}

export default checkout
