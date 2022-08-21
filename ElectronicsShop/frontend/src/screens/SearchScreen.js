import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Button from 'react-bootstrap/Button';

import LinkContainer from 'react-router-bootstrap/LinkContainer';
import ProductSearch from '../components/ProductSearch';
import '../index.css'
import ProductSearch2 from '../components/ProductSearch2';
import SearchBox from '../components/SearchBox';
import Poppup from '../components/Poppup';
import { Store } from '../Store';

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

const prices = [
  {
    name: '৳1 to ৳50000',
    value: '1-50000',
  },
  {
    name: '৳50000 to ৳100000',
    value: '50000-100000',
  },
  {
    name: '৳100000 to ৳200000',
    value: '100000-200000',
  },
];

export default function SearchScreen() {





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
    return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  };

  return (
    <div className='container'>

      <Helmet>
        <title>Products</title>
      </Helmet>
      <Row>
        <Col md={3}>

          <div className='mt-5'>
            <ul className='me-4' style={{ listStyleType: 'none' }}>
              <h3 className='text-center'>Category</h3>
              <li className=' text-center mb-2 border-cat' >

                <Link style={{ textDecoration: 'none', color: 'black', fontSize: '20px' }}
                  className={'all' === category ? 'text-bold text-danger ' : ''}
                  to={getFilterUrl({ category: 'all' })}
                >
                  All
                </Link>
                <hr />
              </li>

              {categories.map((c) => (
                <li className=' text-center mb-2 border-cat' key={c}>
                  <Link style={{ textDecoration: 'none', color: 'black', fontSize: '20px' }}
                    className={c === category ? 'text-bold text-danger ' : ''}
                    to={getFilterUrl({ category: c })}
                  >
                    {c}
                  </Link>
                  <hr />
                </li>
              ))}
            </ul>
          </div>
          <div>

            <ul className='me-4' style={{ listStyleType: 'none' }}>
              <h3 className='text-center'>Price</h3>
              <li className=' text-center mb-2 border-cat'>
                <Link style={{ textDecoration: 'none', color: 'black', fontSize: '20px' }}
                  className={'all' === price ? 'text-bold text-danger ' : ''}
                  to={getFilterUrl({ price: 'all' })}
                >
                  All
                </Link>
                <hr />
              </li>
              {prices.map((p) => (
                <li className=' text-center mb-2 border-cat' key={p.value}>
                  <Link style={{ textDecoration: 'none', color: 'black', fontSize: '20px' }}
                    to={getFilterUrl({ price: p.value })}
                    className={p.value === price ? 'text-bold text-danger ' : ''}
                  >
                    {p.name}
                  </Link>
                  <hr />
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col md={9} className='search-card'>

          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <SearchBox></SearchBox>
              <Row>

                {products.map((product) => (
                  <Col xs={6} lg={3} className="mb-3" key={product._id}>
                    <ProductSearch2 product={product}></ProductSearch2>

                  </Col>
                ))}
              </Row>


              <div>
                {[...Array(pages).keys()].map((x) => (
                  <LinkContainer
                    key={x + 1}
                    className="mx-1"
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    <Button
                      className={Number(page) === x + 1 ? 'text-bold' : ''}
                      variant="light"
                    >
                      {x + 1}
                    </Button>
                  </LinkContainer>
                ))}
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}
