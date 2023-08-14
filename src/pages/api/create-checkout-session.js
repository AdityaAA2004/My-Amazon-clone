<<<<<<< HEAD
const stripe = require('stripe')
=======
import { useSelector } from 'react-redux'
import { selectItems } from '../../slices/basketSlice'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
>>>>>>> 12a69688d6d251330815b827e4bd2d496b4e0a46
export default async (req,res) => {
    const itemsBasket= useSelector(selectItems)
    const {items,email} = req.body
    console.log(items)
    console.log(itemsBasket.filter(item=> item.id === items[0].id))
    console.log(email)
}
