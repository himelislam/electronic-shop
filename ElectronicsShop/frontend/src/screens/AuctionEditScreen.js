import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Store } from '../Store';
import { getError } from '../utils';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Button from 'react-bootstrap/Button';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
};
export default function AuctionEditScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { id: auctionMannageId } = params;

  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const biddedPrice = 0;
  const biddedUser = '';


  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/manageAuction/${auctionMannageId}`);

        setName(data.name);
        setSlug(data.slug);
        setPrice(data.price);
        setImage(data.image);
        setImages(data.images);
        setCategory(data.category);
        setBrand(data.brand);
        setDescription(data.description);
        setTime(data.time);
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();

  }, [auctionMannageId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/manageAuction/${auctionMannageId}`,
        {
          _id: auctionMannageId,
          name,
          slug,
          price,
          image,
          images,
          category,
          brand,
          description,
          time,
          biddedPrice,
          biddedUser,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      toast.success('Product updated successfully');
      navigate('/admin/manageAuction');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPDATE_FAIL' });
      console.log('not updated')
    }
  };
  const uploadFileHandler = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await axios.post('/api/upload', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: 'UPLOAD_SUCCESS' });

      if (forImages) {
        setImages([...images, data.secure_url]);
      } else {
        setImage(data.secure_url);
      }
      toast.success('Image uploaded successfully. click Update to apply it');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };
 


  return (
    <div className='container mt-5 mb-5'>
      <div className="row">
        <div className="col-md-2 col-4 text-center " style={{ borderRightStyle: 'solid' }}>
          <Link to="/admin/admindashboard" className=" nav-link ">Dashboard</Link>
          <hr style={{ backgroundColor: '#52017d', height: '3px' }} />
          <Link to="/admin/products" className=" nav-link ">Manage Products</Link>
          <hr style={{ backgroundColor: '#52017d', height: '3px' }} />
          <Link to="/admin/manageAuction" className=" nav-link text-danger">Manage Auctions</Link>
          <hr style={{ backgroundColor: '#52017d', height: '3px' }} />
          <Link to="/admin/orders" className="  nav-link">Manage Orders</Link>
          <hr style={{ backgroundColor: '#52017d', height: '3px' }} />
          <Link to="/admin/users" className=" nav-link">Manage Users</Link>
          <hr style={{ backgroundColor: '#52017d', height: '3px' }} />
          {/* <Link to="/admin/auction" className=" nav-link">Auction</Link>
          <hr style={{ backgroundColor: '#52017d', height: '3px' }} /> */}
        </div>

        <div className="col-md-10 col-8">
          <Container style={{ boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset" }} className="small-container my-5 py-3">
            <Helmet>
              <title>Edit Auction</title>
            </Helmet>


            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="slug">
                  <Form.Label>Slug</Form.Label>
                  <Form.Control
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="Price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="image">
                  <Form.Label>Image File</Form.Label>
                  <Form.Control
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="imageFile">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control type="file" onChange={uploadFileHandler} />
                  {loadingUpload && <LoadingBox></LoadingBox>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="brand">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </Form.Group>
                {/* time add */}
                <Form.Group className="mb-3" controlId="time">
                  <Form.Label>Date and Time</Form.Label>
                  <Form.Control
                    type='datetime-local'
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </Form.Group>
                <div className="mb-3">
                  <Button disabled={loadingUpdate} type="submit">
                    Update
                  </Button>
                  {loadingUpdate && <LoadingBox></LoadingBox>}
                </div>
              </Form>
            )}
          </Container>
        </div>
      </div>
    </div>
  );
}
