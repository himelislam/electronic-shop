import React, { useEffect, useReducer, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import ProductSearch from '../components/ProductSearch';
import '../index.css'

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                products: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages,
                countProducts: action.payload.countProducts,
                loading: false,
            };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};



const HomeProduct = () => {

    const navigate = useNavigate();
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const category = sp.get('category') || 'all';
    const query = sp.get('query') || 'all';
    const price = sp.get('price') || 'all';
    const rating = sp.get('rating') || 'all';
    const order = sp.get('order') || 'newest';
    const page = sp.get('page') || 1;

    const [{ loading, error, products, pages, countProducts }, dispatch] =
        useReducer(reducer, {
            loading: true,
            error: '',
        });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(
                    `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
                );
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {
                dispatch({
                    type: 'FETCH_FAIL',
                    payload: getError(error),
                });
            }
        };
        fetchData();
    }, [category, error, order, page, price, query, rating]);

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get(`/api/products/categories`);
                setCategories(data);
            } catch (err) {
                toast.error(getError(err));
            }
        };
        fetchCategories();
    }, [dispatch]);

    const getFilterUrl = (filter) => {
        const filterPage = filter.page || page;
        const filterCategory = filter.category || category;
        const filterQuery = filter.query || query;
        const filterRating = filter.rating || rating;
        const filterPrice = filter.price || price;
        const sortOrder = filter.order || order;
        return `/?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
    };

    return (
        <div className='container mt-5'>
            <h1 className='text-center featured-color' ><span>FEATURED</span> <span className='text-danger'>PRODUCTS</span></h1>
            <Row>
                <Col md={12}>

                    <div className='text-center mt-5 mb-5'>
                        <div className=' text-center me-2 ms-2' style={{ display: 'inline' }}>
                            <Link style={{ textDecoration: 'none', color: 'black', fontSize: '20px' }}
                                className={'all' === category ? 'text-bold text-danger fs-4' : ''}
                                to={getFilterUrl({ category: 'all' })}
                            >
                                All
                            </Link>
                            {categories.map((c) => (
                                <p className='text-center ms-2 me-2' style={{ display: 'inline' }} key={c}>
                                    <Link style={{ textDecoration: 'none', color: 'black', fontSize: '20px' }}
                                        className={c === category ? 'text-bold text-danger fs-4' : ''}
                                        to={getFilterUrl({ category: c })}
                                    >
                                        {c}
                                    </Link>
                                </p>
                            ))}
                        </div>
                    </div>

                </Col>
                <Col md={12}>

                    {loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                        <>
                            {products?.length === 0 && (
                                <MessageBox>No Product Found</MessageBox>
                            )}

                            <Row>
                                {products?.slice(0, 8).map((product) => (
                                    <Col xs={6} sm={6} lg={3} className="mb-3" key={product._id}>
                                        <ProductSearch product={product}></ProductSearch>

                                    </Col>
                                ))}
                            </Row>
                        </>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default HomeProduct;