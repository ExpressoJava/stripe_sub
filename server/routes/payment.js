// Creating Stripe instance by passing in our Stripe_SECRET_KEY
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const db = require('../Config/dbConfig.js')
// A callback that will send a response/error back to front end.
// const stripeChargeCallback = res => (stripeErr, stripeRes) => {
// 	if (stripeErr) {
// 		res.status(500).send({ error: stripeErr })
// 	} else {
// 		res.status(200).send({ success: stripeRes })
// 	}
// }
// Creating endpoints: GET/POST for payment route
// GET request is justserver up and running
// Post request: Creating a body of the token id, amount, and currency
// We use our Stripe instance to create a charge by passing in the body object from the client and the callback for the response
// const paymentApi = app => {
// 	app.get('/', (req, res) => {
// 		res.send({
// 			message: 'Hello Stripe checkout server!',
// 			timestamp: new Date().toISOString()
// 		})
// 	})
// 	app.post('/', (req, res) => {
// 		const body = {
// 			source: req.body.token.id,
// 			amount: req.body.amount,
// 			currency: 'usd'
// 		}
// 		stripe.charges.create(body, stripeChargeCallback(res))
// 	})
// 	return app
// }

// subscription

// A callback that will send a response/error back to front end.
// const stripeChargeCallback = res => (stripeErr, stripeRes) => {
// 	if (stripeErr) {
// 		res.status(500).send({ error: stripeErr })
// 	} else {
// 		res.status(200).send({ success: stripeRes })
// 	}
// }
// Creating endpoints: GET/POST for payment route
// GET request is justserver up and running
// Post request: Creating a body of the token id, amount, and currency
// We use our Stripe instance to create a charge by passing in the body object from the client and the callback for the response
const paymentApi = app => {
	// app.get('/', (req, res) => {
	// 	res.send({
	// 		message: 'Hello Stripe checkout server!',
	// 		timestamp: new Date().toISOString()
	// 	})
	// })

	app.post('http://localhost:8000/payment', (req, res) => {
		const { token, email } = req.body

		stripe.customers.create(
			{
				email: email,
				source: token.id
			},
			(err, customer) => {
				if (err) {
					return res
						.status(500)
						.json({ message: 'Failed to create customer', err })
				} else {
					stripe.subscriptions.create(
						{
							customer: customer.id,
							items: [
								{
									plan: 'plan_FEWUaw5oRDccVl'
								}
							]
						},
						(err, subscription) => {
							if (err) {
								return res
									.status(500)
									.json({ message: 'Failed to subscribe', err })
							} else {
								db('stripetoken')
									.insert({
										subscription_id: subscription.id,
										customer_id: customer.id,
										paid: true
									})
									.then(() => {
										return res.status(201).json({ message: 'Success' })
									})
									.catch(err => {
										return res.status(500).json(err)
									})
							}
						}
					)
				}
			}
		)
	})
	return app
}

module.exports = paymentApi
