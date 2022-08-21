import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Store } from '../Store';
import '../index.css'
import HomeProduct from '../components/HomeProduct';

export default function PaymentMethodScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'Stripe'
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };
  return (
    <div className='payment-container'>
      <div className="container small-container mt-5">
        <Helmet>
          <title>Payment</title>
        </Helmet>
        <div class="container3">
          <img src="https://blog.mozilla.org/wp-content/blogs.dir/278/files/2018/11/Black-Friday-Headline.png" alt="Snow" />
          <Form onSubmit={submitHandler}>
            <button onChange={(e) => setPaymentMethod(e.target.value)} type="submit" className="btn">Payment
            </button>

          </Form>
        </div>
      </div>

    </div>
  );
}
