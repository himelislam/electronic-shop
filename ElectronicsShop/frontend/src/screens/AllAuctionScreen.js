import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import AuctionProduct from '../components/AuctionProduct';

const AllAuctionScreen = () => {
    const [{ products }, dispatch] = useReducer(logger(useReducer), {
        products: [],
        loading: true,
        error: '',
    });
    // useEffect(() => {
    //     const fetchData = async () => {
    //         dispatch({ type: 'FETCH_REQUEST' });
    //         try {
    //             const result = await axios.get('/api/manageAuction');

    //             dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
    //         } catch (err) {
    //             dispatch({ type: 'FETCH_FAIL', payload: err.message });
    //         }
    //     };
    //     fetchData();
    // }, []);

    const [auctionProduct, setAuctionProduct] = useState([])

    useEffect(()=>{
        fetch('/api/manageAuction',)
        .then(res => res.json())
        .then(data => setAuctionProduct(data) )
    },[])

    console.log(auctionProduct, 'here now');
    return (
        <div>
            <h1 className='text-center'><span>AUCTION</span> <span className='text-danger'>PRODUCTS</span></h1>
            <Row>
                {auctionProduct?.map((product) => (
                    <Col key={product.slug} sm={12} lg={6} className="mb-3">
                        <AuctionProduct product={product}></AuctionProduct>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default AllAuctionScreen;