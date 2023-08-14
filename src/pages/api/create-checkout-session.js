const stripe = require('stripe')
export default async (req,res) => {
    const itemsBasket= useSelector(selectItems)
    const {items,email} = req.body
    console.log(items)
    console.log(itemsBasket.filter(item=> item.id === items[0].id))
    console.log(email)
}
