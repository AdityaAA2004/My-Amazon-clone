import { useSelector } from 'react-redux'
import { selectItems } from '../../slices/basketSlice'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
export default async (req,res) => {
    const itemsBasket= useSelector(selectItems)
    const {items,email} = req.body
    console.log(items)
    console.log(itemsBasket.filter(item=> item.id === items[0].id))
    console.log(email)
}
