const express = require('express');
const app = express();
const router = express.Router();


const stripe = require('stripe')("sk_test_6EzSXCZ258zeJ60Bl9kvIXCG00tSxB8pT6");

router.post('/', (req, res) => {
  return stripe.charges
    .create({
      amount: req.body.amount, // Unit: cents
      currency: 'usd',
      source: req.body.tokenId,
      description: 'Test payment',
    })
    .then((result) => { 
    	console.log(result);
    	res.status(200).json(result)
    });
});

module.exports = router;