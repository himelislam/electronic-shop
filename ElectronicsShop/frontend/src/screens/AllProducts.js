import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import logger from 'use-reducer-logger';
import AllProductCard from '../components/AllProductCard';
import Product from '../components/Product';
import ProductSearch2 from '../components/ProductSearch2';
import '../index.css'

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

const AllProducts = () => {
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
        <div className='container'>
            <Row>
                {products.map((product) => (
                    <Col key={product.slug} xs={6} sm={6} md={3} lg={3} className="mb-3 mt-3">
                        <AllProductCard product={product}></AllProductCard>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default AllProducts;