// import React from "react";
// import axios from "axios";

// export const doPayment = (amount, tokenId, accessToken) => {
//   const body = {
//     amount: amount,
//     tokenId: tokenId,
//   };
//   const headers = {
//     'Content-Type': 'application/json',
//   };
//   return axios
//     .post('http://0.0.0.0:5000/stripe/signup', body, { headers })
//     .then(({ data }) => {
//       return data;
//     })
//     .catch(error => {
//       return Promise.reject('Error in making payment', error);
//     });
// };