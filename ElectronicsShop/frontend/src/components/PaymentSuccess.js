import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
    return (
        <div className='text-center' style={{ marginTop: '100px', marginBottom: '100px' }}>
            <img src="http://cdn.onlinewebfonts.com/svg/img_319740.png" height='100px' width='100px' style={{ borderRadius: '50%' }} alt="" />
            <h1>Payment Successfull</h1>
            <Link class="btn btn-danger text-white text-decoration-none" to='/'>BACK TO HOME</Link>
        </div>
    );
};

export default PaymentSuccess;