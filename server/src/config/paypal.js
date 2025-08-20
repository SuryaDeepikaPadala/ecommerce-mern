// config/paypal.js
const paypal = require('@paypal/checkout-server-sdk');

function client() {
  const environment = new paypal.core.SandboxEnvironment(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET
  );
  return new paypal.core.PayPalHttpClient(environment);
}

module.exports = client;
