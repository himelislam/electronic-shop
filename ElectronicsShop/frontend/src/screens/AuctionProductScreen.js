import axios from 'axios';
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';


import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { Store } from '../Store';

import { toast } from 'react-toastify';
import '../index.css'
import { useForm } from 'react-hook-form';
import { isDisabled } from '@testing-library/user-event/dist/utils';
import CountDownTimer from '../components/Countdown/CountdownTimer';



const reducer = (state, action) => {
    switch (action.type) {
        case 'REFRESH_PRODUCT':
            return { ...state, product: action.payload };
        case 'CREATE_REQUEST':
            return { ...state, loadingCreateReview: true };
        case 'CREATE_SUCCESS':
            return { ...state, loadingCreateReview: false };
        case 'CREATE_FAIL':
            return { ...state, loadingCreateReview: false };
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, product: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

const AuctionProductScreen = () => {

    const [selectedImage, setSelectedImage] = useState('');

    const navigate = useNavigate();
    const params = useParams();
    const { slug } = params;

    console.log(slug, 'under')

    const [isReload, setIsReload] = useState(false)

    const [{ loading, error, product }, dispatch] =
        useReducer(reducer, {

            loading: true,
            error: '',
        });


    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/manageAuction/slug/${slug}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        };
        fetchData();
    }, [slug, isReload]);

    console.log(product, 'sluged')

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;




    const { register, handleSubmit, reset } = useForm();
 
    const [biddedPrice, setBiddedPrice] = useState();
    

    // const onSubmit = data => {
    //     console.log(data, userInfo, 'chill');

        
    //     // axios.post('/auction', data)
    //     //     .then(res => {
    //     //         if (res.data.insertedId) {
    //     //             alert('Bidding Successfull');
    //     //             reset();
    //     //         }
    //     //     })
    // };

    const onSubmit = async (e) => {
        const productId = product._id;
        const biddedUser = userInfo.name;
        console.log('user Id',  product._id)
        try {
          dispatch({ type: 'UPDATE_REQUEST' });
          await axios.put(
            `/api/manageAuction/user/${productId}`,
            {
              _id: productId,
              biddedUser,
              biddedPrice,
            },
            {
              headers: { Authorization: `Bearer ${userInfo.token}` },
            }
          );
          dispatch({
            type: 'UPDATE_SUCCESS',
          });
          toast.success('Product updated successfully');
          setIsReload(!isReload);
        //   navigate('/admin/products');
        } catch (err) {
          toast.error(getError(err));
          dispatch({ type: 'UPDATE_FAIL' });
          console.log('not updated')
        }
      };


    const biddingPrice = (event) => {
        const bid = event.target.value;
        setBiddedPrice(bid);
    }

    // const handleBiddingTime = () =>{
    //     console.log('timeout boss')
    //     console.log('heii heiii')
    // }

    return (
        <div className='container'>
            <Helmet>
                <title>{product?.name}</title>
            </Helmet>
            <div class="card mb-5">
                <div class="container-fliud">
                    <div class="wrapper row">
                        <div class="preview col-md-6">
                            <div class="preview-pic tab-content">
                                <div class="tab-pane active w-100" id="pic-1"><img src={selectedImage || product?.image} alt={product?.name} /></div>
                            </div>
                        </div>
                        <form class="details col-md-6" onSubmit={handleSubmit(onSubmit)}>
                        <div >
                            <h3  class="product-title">{product?.name}</h3>
                            <div class="rating">
                                <div class="stars">
                                    <div class="ratings">  <Rating rating={product?.rating} numReviews={product?.numReviews} />
                                    </div>
                                </div>
                                <p class="card-text"><CountDownTimer targetDate={product?.time}/></p>
                            </div>
                            <p class="product-description">{product?.description}</p>
                            <input style={{display:'none'}}  {...register("name")} value={userInfo?.name} ></input>
                            <input style={{display:'none'}}  {...register("proName")} value={product?.name} ></input>
                            <h4 class="price">current price: <span>৳{product?.price}</span></h4>
                            <h4 class="price">Bidded User: <span>{product?.biddedUser}</span></h4>
                            <h4 class="price">Bidded Price: <span>৳{product?.biddedPrice}</span></h4>
                            {/* <textarea   type='number' class="form-control"  rows="1" onChange={()=>biddingPrice()} ></textarea> */}
                            <input {...register("auction")} type='number' className='form-control' id="exampleFormControlTextarea1" onChange={biddingPrice}></input>
                            <br />
                            <button type='submit' className='w-25 btn btn-danger' disabled={product?.price || biddedPrice ? false : true } >Bid</button>
                        </div>
                        </form> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuctionProductScreen;

// product?.price || biddedPrice ? false : true 