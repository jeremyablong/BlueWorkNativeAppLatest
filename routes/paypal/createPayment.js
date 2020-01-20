const mongoose = require("express");
const express = require("express");
const router = express.Router();
const mongo = require("mongodb");
const config = require("config");
const cors = require("cors"); 
const saltRounds = 10;
const paypal = require("paypal-rest-sdk");

paypal.configure({
    mode: "sandbox", //sandbox or live
    client_id:
        "Acdt75kQsDxglooaPgpVsKslHfaYIu5yfw1U1Kd20q-meRdQ59xNJhPSMCLOeJ0EXFqymMzTNcECj8oB",
    client_secret:
        "EDECcfRlLQxX_aru8NonhPKmflY0AkR97aCWO8d09Kc7647ydJ_69ksTiDy6vTTxkqJnaAZbt5n-bk94"
});

router.get("/", (req, res) => {
		console.log("working")
		console.log(req);
		const PayerID = req.query.PayerID;
    	const paymentId = req.query.paymentId;
	    const create_payment_json = {
	        intent: "sale",
	        payer: {
	            payment_method: "paypal"
	        },
	        redirect_urls: {
	            return_url: "http://localhost:3000/success",
	            cancel_url: "http://localhost:3000/cancel"
	        },
	        transactions: [
	            {
	                item_list: {
	                    items: [
	                        {
	                            name: "Job Posting",
	                            sku: "Job Posting",
	                            price: "2.50",
	                            currency: "USD",
	                            quantity: 1
	                        }
	                    ]
	                },
	                amount: {
	                    currency: "USD",
	                    total: "1.00"
	                },
	                description: "You are purchasing the ability to post ONE job on our job market!"
	            }
	        ]
	    };

    paypal.payment.create(create_payment_json, function(error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
            res.redirect(payment.links[1].href);
        }
    });
});

module.exports = router;