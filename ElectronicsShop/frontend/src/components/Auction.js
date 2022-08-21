import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import logger from 'use-reducer-logger';

import AuctionProduct from './AuctionProduct';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

const Auction = () => {
    const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
        products: [],
        loading: true,
        error: '',
    });
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/products');

                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }
        };
        fetchData();
    }, []);


    return (
        <div className='container mt-5'>
            <h1 className='text-center'><span>AUCTION</span> <span className='text-danger'>PRODUCTS</span></h1>
            <Row>
                {products.filter(e => e.auction === 'auction').map((product) => (
                    <Col key={product.slug} sm={12} lg={6} className="mb-3">
                        <AuctionProduct product={product}></AuctionProduct>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Auction;