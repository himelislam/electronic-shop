import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';
import Col from 'react-bootstrap/esm/Col';
import '../index.css'

const ProductSearch = (props) => {
    const { product } = props;
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { cartItems }, userInfo
    } = state;
    console.log(userInfo);

    const addToCartHandler = async (item) => {
        const existItem = cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${item._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...item, quantity },
        });
        navigate('/cart');
    };
    return (

        <div>

            <div className='col-md-12 col-12 allproduct mb-5'  >

                <div className='text-center'>
                    <Link to={`/product/${product.slug}`}>
                        <img className='mt-2' src={product.image} width='150px' height='150px' alt="" />
                    </Link>
                </div>

                <div className='col-md-12 col-12 text-center'>
                    <p className='text-dark'>{product.name}</p>
                    <div class="ratings">  <Rating rating={product.rating} numReviews={product.numReviews} />
                        <p><small className='text-danger'>only {product.countInStock} left in stock - order soon</small></p>

                    </div>
                    <p style={{ color: '#FF4436', fontWeight: '600, Semi Bold', fontSize: '20px' }}>৳{product.price}</p>


                    {

                        userInfo === null ? (product.countInStock > 0 ? (
                            <button onClick={() => addToCartHandler(product)} className="button btn btn-warning btn-sm mt-2 homecardbtn">Add to Cart</button>
                        ) : (
                            <button className="button btn btn-warning btn-sm mt-2 homecardbtn" disabled>Add to Cart</button>
                        )) : (userInfo.isAdmin ? (
                            <Link to='/admin/products'> <button class="button btn btn-warning btn-sm mt-2 homecardbtn" type="button">Edit Product</button></Link>
                        ) : (

                            product.countInStock > 0 ? (
                                <button onClick={() => addToCartHandler(product)} className="button btn btn-warning btn-sm mt-2 homecardbtn">Add to Cart</button>
                            ) : (
                                <button className="button btn btn-warning btn-sm mt-2 homecardbtn" disabled>Add to Cart</button>
                            )

                        ))
                    }


                    {/* {

                        userInfo.isAdmin ? '' : userInfo.isAdmin ? '' : ''
                    } */}



                </div>
            </div>




        </div >
    );
};

export default ProductSearch;