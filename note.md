# Stripe

Frontend:
create-react-app
yarn add react-stripe-checkout axios

Backend:
Our backend is simply receiving the token from the front end and sending it to Stripe to complete the payment.
mkdir server
touch server.js
yarn init -y
yarn add express stripe cors dotenv knex sqlite3
knex init for migration

touch .env
mkdir routes
touch index.js payment.js
