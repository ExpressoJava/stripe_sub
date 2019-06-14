exports.up = knex => {
	return knex.schema.createTable('stripetoken', table => {
		table.increments()
		table.boolean('paid').defaultTo(false)
		table.string('customer_id').unique()
		table.string('subscription_id').unique()
	})
}

exports.down = knex => {
	return knex.schema.dropTableIfExists('stripetoken')
}
