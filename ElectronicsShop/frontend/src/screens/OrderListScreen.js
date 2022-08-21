import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};
export default function OrderListScreen() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, orders, loadingDelete, successDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [userInfo, successDelete]);

  const deleteHandler = async (order) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        dispatch({ type: 'DELETE_REQUEST' });
        await axios.delete(`/api/orders/${order._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success('order deleted successfully');
        dispatch({ type: 'DELETE_SUCCESS' });
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: 'DELETE_FAIL',
        });
      }
    }
  };

  return (

    <div className='container mt-5 mb-5'>
      <div className='row'>
        <div className="col-md-2 col-4 text-center " style={{ borderRightStyle: 'solid' }}>
          <Link to="/admin/admindashboard" className="nav-link ">Dashboard</Link>
          <hr style={{ backgroundColor: '#52017d', height: '3px' }} />
          <Link to="/admin/products" className=" nav-link ">Manage Products</Link>
          <hr style={{ backgroundColor: '#52017d', height: '3px' }} />
          <Link to="/admin/orders" className="  nav-link text-danger">Manage Orders</Link>
          <hr style={{ backgroundColor: '#52017d', height: '3px' }} />
          <Link to="/admin/users" className=" nav-link">Manage Users</Link>
          <hr style={{ backgroundColor: '#52017d', height: '3px' }} />
          <Link to="/admin/auction" className=" nav-link">Auction</Link>
          <hr style={{ backgroundColor: '#52017d', height: '3px' }} />
        </div>


        <div className="col-md-10 col-8">

          <div className='container'>
            <Helmet>
              <title>Orders</title>
            </Helmet>

            {loadingDelete && <LoadingBox></LoadingBox>}
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <div class="container table-responsive py-5" >
                <table className="table table-bordered table-hover" style={{ boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px" }}>
                  <thead>
                    <tr>
                      <th>USER</th>
                      <th>DATE</th>
                      <th>TOTAL</th>
                      <th>DELIVERED</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>

                        <td>{order.user ? order.user.name : 'DELETED USER'}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>{order.totalPrice.toFixed(2)}</td>
                        <td>
                          {order.isDelivered
                            ? order.deliveredAt.substring(0, 10)
                            : 'No'}
                        </td>
                        <td>
                          <Button
                            type="button"
                            variant="light"
                            onClick={() => {
                              navigate(`/order/${order._id}`);
                            }}
                          >
                            Details
                          </Button>
                          &nbsp;
                          <Button
                            type="button"
                            variant="light"
                            onClick={() => deleteHandler(order)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>


        </div>

      </div>
    </div>

  );
}
