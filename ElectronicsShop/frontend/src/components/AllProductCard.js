import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../index.css'
import { Store } from '../Store';

const AllProductCard = (props) => {
    const { product } = props;
    console.log(product);
    return (
        <div >
            <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none' }}>
                <div className='col-md-12 col-12 allproduct mb-3'  >

                    <div className='text-center'>
                        <img className='mt-2' src={product.image} width='170px' height='170px' alt="" />
                    </div>

                    <div className='col-md-12 col-12 text-center'>
                        <p className='text-dark'>{product.name}</p>
                        <p style={{ color: '#FF4436', fontWeight: '600, Semi Bold', fontSize: '20px' }}>৳{product.price}</p>
                    </div>
                </div>
            </Link>



        </div >
    );
};

export default AllProductCard;