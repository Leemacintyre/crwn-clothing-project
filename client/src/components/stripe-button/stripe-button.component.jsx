import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51JI4e8EKW3fOhbkKbbUCO8314UsDwh1PoXYJliHdJG65VDZ4TyuEDTDUlkYGNbyo0u9ELyTyfeqyJ687LcWBbGNb000WBfUyhu'

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token: token
            }
        }).then((response) => {
            console.log(response);
            alert('payment successful')
        }).catch((error) => {
            console.log('payment error', JSON.parse(error))
            alert('there was an issue with your payment. Please make sure you use the provided credit card')
        })
    };

    return (
        <StripeCheckout
            label='Pay Now'
            name=' CRWN Clothing Ltd'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;