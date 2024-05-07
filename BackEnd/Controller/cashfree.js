require("dotenv").config();
const axios = require("axios")
const uniqid = require('uniqid');
const { UserModel } = require("../Model/user.model");
const { transporter } = require("../services/transporter");

const newOrderId = async (req, res) => {
    try {
        const { name, email, phone } = req.body
        let orderid = uniqid('order-')
        let customerid = uniqid('customer-')
        const options = {
            method: 'POST',
            url: `${process.env.cashfreeUrl}/pg/orders`,
            headers: {
                accept: 'application/json',
                'x-api-version': process.env.apiversion,
                'content-type': 'application/json',
                'x-client-id': process.env.cashfree_app_id,
                'x-client-secret': process.env.cashfree_secret_key
            },
            data: {
                customer_details: {
                    customer_id: customerid,
                    customer_email: email,
                    customer_phone: phone,
                    customer_name: name
                },
                order_id: orderid,
                order_amount: 999,
                order_currency: "INR"
            }
        };
        axios
            .request(options)
            .then(async function (response) {
                try {
                    const user = new UserModel({ name: name, email: email, phone: phone, sessionid: response.data.payment_session_id, orderid: orderid, customerid: customerid, });
                    await user.save();
                    return res.json({ status: "success", message: response.data.payment_session_id })
                } catch (error) {
                    console.log(error.message)
                }
            })
            .catch((error) => {
                return res.json({ status: "error", message: error.message })
            })

    } catch (error) {
        res.json({ status: "error", message: error.message })
    }
}


const checkStatus = async (req, res) => {
    const orderid = req.params.orderid;
    try {
        const options = {
            method: 'GET',
            url: `${process.env.cashfreeUrl}/pg/orders/${orderid}`,
            headers: {
                accept: 'application/json',
                'x-api-version': process.env.apiversion,
                'x-client-id': process.env.cashfree_app_id,
                'x-client-secret': process.env.cashfree_secret_key
            }
        }
        axios
            .request(options)
            .then(async function (response) {
                if (response.data.order_status == "PAID") {
                    const order = await UserModel.findOne({ orderid: orderid })
                    order.paymentstatus = true
                    await order.save()
                    // Sending Mail 
                    const mailOptions = {
                        from: 'uttamkr@uttamkrshaw.in',
                        to: `${order.email}`,
                        subject: 'Welcome To StockTutor Zoom Platform.',
                        text: 'This is a test email with attachment.',
                    };
                    // Send email
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log('Error occurred:', error);
                            // Send error response to frontend
                            return res.json({ success: false, error: 'Failed to send email' });
                        } else {
                            console.log('Email sent:', info.response);
                            // Send success response to frontend
                            return res.redirect(`http://localhost:3000/success`);
                        }
                    });
                    // return res.redirect(`http://localhost:3000/success`)
                } else {
                    let terminateStatus = await changeToTerminateStatus(orderid)
                    if (terminateStatus.order_status == "TERMINATION_REQUESTED") {
                        let terminatereason = await getTerminateReason(orderid)
                        if (terminatereason[0].payment_status == 'FAILED') {
                            let reason = terminatereason[0].error_details.error_description_raw;
                            const order = await UserModel.findOne({ orderid: orderid })
                            order.failurereason = reason
                            await order.save()
                            return res.redirect(`http://localhost:3000/reason/:${terminatereason[0].error_details.error_description_raw}`)
                        } else {
                            return res.redirect(`http://localhost:3000/failure`)
                        }
                    } else {
                        return res.redirect(`http://localhost:3000/failure`)
                    }
                }
            })
    } catch (error) {
        return res.json({ status: "error", message: error.message })
    }
}

const changeToTerminateStatus = async (props) => {
    const response = await fetch(`${process.env.cashfreeUrl}/pg/orders/${props}`, {
        method: 'PATCH',
        headers: {
            accept: 'application/json',
            'x-api-version': process.env.apiversion,
            'content-type': 'application/json',
            'x-client-id': process.env.cashfree_app_id,
            'x-client-secret': process.env.cashfree_secret_key
        },
        body: JSON.stringify({
            order_status: "TERMINATED"
        })
    })
    const result = await response.json()
    return result
}

const getTerminateReason = async (props) => {
    const response = await fetch(`${process.env.cashfreeUrl}/pg/orders/${props}/payments`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'x-api-version': process.env.apiversion,
            'x-client-id': process.env.cashfree_app_id,
            'x-client-secret': process.env.cashfree_secret_key
        }

    })
    const result = await response.json()
    return result
}

module.exports = { newOrderId, checkStatus }