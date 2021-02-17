const sgMail = require('@sendgrid/mail')


const { SENDGRID_API_KEY, SENDGRID_TEMPLATE_ID } = process.env

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed', headers: { 'Allow': 'POST' } }
    }
    const payload = JSON.parse(event.body)
    // console.log(JSON.stringify(SENDGRID_TEMPLATE_ID))
    const { email, subject } = payload

    sgMail.setApiKey(SENDGRID_API_KEY);

    const body = Object.keys(payload).map((k) => {
        return `${k}: ${payload[k]}`
    }).join("<br><br>");

    const msg = {
        to: email,
        from: "khaijiet@hotmail.com",
        subject: subject ? subject : 'Contact Form Submission',
        // html: body,
        templateId: SENDGRID_TEMPLATE_ID
    };

    return sgMail
        .send(msg)
        .then(() => {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "Email sent" })
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