const sgMail = require('@sendgrid/mail')


const { SENDGRID_API_KEY, SENDGRID_TEMPLATE_ID, STRIPE_DEFAULT_PRICE_PLAN, STRIPE_SECRET_KEY } = process.env

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed', headers: { 'Allow': 'POST' } }
    }
    const payload = JSON.parse(event.body)
    // console.log(JSON.stringify(SENDGRID_TEMPLATE_ID))
    const { email, subject } = payload

    const stripe = require("stripe")(STRIPE_SECRET_KEY)

    // create a new customer in Stripe
    const customer = await stripe.customers.create({ email: email });

    return stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: STRIPE_DEFAULT_PRICE_PLAN }],
        collection_method: 'send_invoice',
        days_until_due: 30,
    }).then(() => {
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Email will be sent shortly" })
        }
    })
    // .catch((err) => {
    //     console.log(JSON.stringify(err))
    //     return {
    //         statusCode: 500,
    //         body: JSON.stringify(err.body)
    //     }
    // })



    // sgMail.setApiKey(SENDGRID_API_KEY);

    // const body = Object.keys(payload).map((k) => {
    //     return `${k}: ${payload[k]}`
    // }).join("<br><br>");

    // const msg = {
    //     to: email,
    //     from: "khaijiet@hotmail.com",
    //     subject: subject ? subject : 'Contact Form Submission',
    //     // html: body,
    //     templateId: SENDGRID_TEMPLATE_ID
    // };

    // return sgMail
    //     .send(msg)
    //     .then(() => {
    //         return {
    //             statusCode: 200,
    //             body: JSON.stringify({ message: "Email sent" })
    //         }

    //     })
    //     .catch((err) => {
    //         console.log(JSON.stringify(err))
    //         return {
    //             statusCode: 500,
    //             body: JSON.stringify(err.body)
    //         }
    //     })

};