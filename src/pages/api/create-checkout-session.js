const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
export default async (req,res) => {
    const {items,email,quantityList} = req.body
    console.log(quantityList)
    const transformedItems = items.map(item=>({
        quantity : quantityList[item.id],
        price_data:{
            currency:'usd',
            unit_amount:(item.price*100).toFixed(), // amount in cents, again!
            product_data:{
                name: item.title,
                description: item.description,

                images:[item.image]
            }
        }
    }));
    console.log(transformedItems)

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_address_collection:{
            allowed_countries: ["US",
                "AE",
                "AG",
                "AL",
                "AM",
                "AR",
                "AT",
                "AU",
                "BA",
                "BE",
                "BG",
                "BH",
                "BO",
                "CA",
                "CH",
                "CI",
                "CL",
                "CO",
                "CR",
                "CY",
                "CZ",
                "DE",
                "DK",
                "DO",
                "EC",
                "EE",
                "EG",
                "ES",
                "ET",
                "FI",
                "FR",
                "GB",
                "GH",
                "GM",
                "GR",
                "GT",
                "GY",
                "HK",
                "HR",
                "HU",
                "ID",
                "IE",
                "IL",
                "IS",
                "IT",
                "JM",
                "JO",
                "JP",
                "KE",
                "KH",
                "KR",
                "KW",
                "LC",
                "LI",
                "LK",
                "LT",
                "LU",
                "LV",
                "MA",
                "MD",
                "MG",
                "MK",
                "MN",
                "MO",
                "MT",
                "MU",
                "MX",
                "MY",
                "NA",
                "NG",
                "NL",
                "NO",
                "NZ",
                "OM",
                "PA",
                "PE",
                "PH",
                "PL",
                "PT",
                "PY",
                "QA",
                "RO",
                "RS",
                "RW",
                "SA",
                "SE",
                "SG",
                "SI",
                "SK",
                "SN",
                "SV",
                "TH",
                "TN",
                "TR",
                "TT",
                "TZ",
                "UY",
                "UZ",
                "VN",
                "ZA",
                "BD",
                "BJ",
                "MC",
                "NE",
                "SM",
                "AZ",
                "BN",
                "BT",
                "AO",
                "DZ",
                "TW",
                "BS",
                "BW",
                "GA",
                "LA",
                "MZ",
                "KZ",
                "PK"
            ],
        },
        line_items:transformedItems ,
        shipping_options: [
            {
                "display_name": "Next-Day-Delivery",
                "type": "fixed_amount",
                "fixed_amount": {
                  "amount": "499",
                  "currency": "usd"
                },
                "tax_behavior": "exclusive",
                "delivery_estimate": {
                  "minimum": {
                    "value": "1",
                    "unit": "business_day"
                  },
                  "maximum": {
                    "value": "1",
                    "unit": "business_day"
                  }
                }
              }
        ],
        mode:"payment",
        success_url:`${process.env.HOST}/success`,
        cancel_url:`${process.env.HOST}`,
        metadata:{
            userEmail: email,
            images: JSON.stringify(items.map(item=>item.image))
        },
        
    });

    res.status(200).json({id:session.id}) // this is the response part which is returned due to stripe API call from our endpoint created here. 
}
