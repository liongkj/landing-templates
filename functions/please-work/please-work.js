const { STRIPE_DEFAULT_PRICE_PLAN, STRIPE_SECRET_KEY } = process.env
const stripe = require("stripe")(STRIPE_SECRET_KEY)

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed', headers: { 'Allow': 'POST' } }
    }
    let payload = JSON.parse(event.body).payload
    const { email } = payload.data;
    console.log(email);

    // create a new customer in Stripe
    const customer = await stripe.customers.create({ email: email });

    return stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: STRIPE_DEFAULT_PRICE_PLAN }],
        collection_method: 'send_invoice',
        days_until_due: 30,
    }).then((subscription) => {
        // console.log(subscription)
        stripe.invoices.sendInvoice(subscription.latest_invoice, function (err, invoice) {
            // asynchronously called
            // console.log(invoice);
            // console.log(err)
        })
    })
        .then(() => {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "Email will be sent shortly" })
            }
        })
        .catch((err) => {
            console.log(JSON.stringify(err))
            return {
                statusCode: 500,
                body: JSON.stringify(err.body)
            }
        })





};