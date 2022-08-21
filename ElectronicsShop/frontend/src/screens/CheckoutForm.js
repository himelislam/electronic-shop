import { useStripe, useElements, PaymentElement, CardElement } from '@stripe/react-stripe-js';

import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const CheckoutForm = ({ product }) => {
    // console.log(product.totalPrice);

    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            setSuccess('');
            setError(error.message);
        } else {
            setError('');
            setSuccess('Payment Sucessfull ');
            navigate('/success');
        }


    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement className='mt-3 mb-3'
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: 'blue',
                                '::placeholder': {
                                    color: 'black',

                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" disabled={!stripe}>
                    Pay ৳{product.totalPrice}
                </button>
            </form>
            {
                error && <p style={{ color: 'red' }}>{error}</p>

            }
            {
                success && <p style={{ color: 'green' }}>{success}

                </p>
            }
        </div>
    );
};

export default CheckoutForm;