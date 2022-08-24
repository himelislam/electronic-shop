import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import '../index.css';

import Carousel from 'react-bootstrap/Carousel'
import SearchBox from '../components/SearchBox';
import { Link } from 'react-router-dom';
import HomeProduct from '../components/HomeProduct';
import Auction from '../components/Auction';
import Poppup from '../components/Poppup';
import DisplayReviews from '../components/DisplayReviews';


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

function HomeScreen() {
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
    <div>

      <Helmet>
        <title>Electronis Shop</title>
      </Helmet>

      <Carousel fade>
        <Carousel.Item>

          <img

            className="d-block w-100 carousel-css"
            src="https://storage-asset.msi.com/global/picture/news/2019/nb/gs75-20190107-1.jpg"
            alt="First slide"
          />
          <div class="carousel-caption d-md-block" >
            <SearchBox></SearchBox>
          </div>

        </Carousel.Item>
        <Carousel.Item>
          <img

            className="d-block w-100 carousel-css"
            src="https://i.pinimg.com/originals/e3/56/4d/e3564db3fe0e206d9c4e866435e203c7.jpg"
            alt="Second slide"
          />
          <div class="carousel-caption d-md-block" >
            <SearchBox></SearchBox>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img

            className="d-block w-100 carousel-css"
            src="https://www.techlandbd.com/image/catalog/Tv%20and%20Home%20Appliances/Xiaomi/L43M6-6AEU/Ban-1.JPG"
            alt="Third slide"
          />
          <div class="carousel-caption d-md-block" >
            <SearchBox></SearchBox>
          </div>
        </Carousel.Item>
      </Carousel>
      <br />

      <HomeProduct></HomeProduct>

      <div className='text-center mt-5'>
        <Link to='/search'>
          <button className='btn btn-warning '>See More </button>
        </Link>
      </div>

      <br />

      <Auction></Auction>

      <br/>

      <div className='text-center mt-5'>
        <Link to='/allAuction'>
          <button className='btn btn-warning '>See More </button>
        </Link>
      </div>
  
     

      <div className='mt-5'>
        <h1 className='text-center'><span>PRODUCTS</span> <span className='text-danger'>BRAND</span></h1>
        <div className="container text-center">
          <div className="row row-cols-2 row-cols-lg-6 g-2 g-lg-3 mt-5">
            <div className="col" >
              <div className="shadow p-3 mb-5 bg-body rounded brand">

                <img src="/images/apple.jpg" width='150px' height='120px' alt="" />
              </div>
            </div>
            <div className="col">
              <div className="shadow p-3 mb-5 bg-body rounded brand">
                <img src="/images/google.jpg" width='150px' height='120px' alt="" />
              </div>
            </div>
            <div className="col">
              <div className="shadow p-3 mb-5 bg-body rounded brand">
                <img src="/images/samsung.jpg" width='150px' height='120px' alt="" />
              </div>
            </div>
            <div className="col">
              <div className="shadow p-3 mb-5 bg-body rounded brand">
                <img src="/images/oneplus.png" width='150px' height='120px' alt="" />
              </div>
            </div>
            <div className="col">
              <div className="shadow p-3 mb-5 bg-body rounded brand">
                <img src="/images/mi.png" width='150px' height='120px' alt="" />
              </div>
            </div>
            <div className="col">
              <div className="shadow p-3 mb-5 bg-body rounded brand">
                <img src="/images/blackbery.jpg" width='150px' height='120px' alt="" />
              </div>
            </div>
            <div className="col">
              <div className="shadow p-3 mb-5 bg-body rounded brand">
                <img src="/images/huawei.png" width='150px' height='120px' alt="" />
              </div>
            </div>
            <div className="col">
              <div className="shadow p-3 mb-5 bg-body rounded brand">
                <img src="/images/nokia.png" width='150px' height='120px' alt="" />
              </div>
            </div>
            <div className="col">
              <div className="shadow p-3 mb-5 bg-body rounded brand">
                <img src="/images/sony.jpg" width='150px' height='120px' alt="" />
              </div>
            </div>
            <div className="col">
              <div className="shadow p-3 mb-5 bg-body rounded brand">
                <img src="/images/vivo.png" width='150px' height='120px' alt="" />
              </div>
            </div>
            <div className="col">
              <div className="shadow p-3 mb-5 bg-body rounded brand">
                <img src="/images/lg.jpg" width='150px' height='120px' alt="" />
              </div>
            </div>
            <div className="col">
              <div className="shadow p-3 mb-5 bg-body rounded brand">
                <img src="/images/walton.jpg" width='150px' height='120px' alt="" />
              </div>
            </div>

          </div>
        </div>
      </div>


      <div className='container mb-5 mt-5'>

        <h1 className='text-center mb-5'><span>What people think of</span> <span className='text-danger'>ELECTRONICS SHOP</span></h1>
        <DisplayReviews></DisplayReviews>
      </div>


    </div>
  );
}
export default HomeScreen;
