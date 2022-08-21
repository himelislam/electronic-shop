import { useContext } from 'react';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MessageBox from '../components/MessageBox';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './cartScreen.css'

export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };

  return (
    <div className='container mt-5 mb-5'>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>

      <Row >
        <Col md={12} lg={12}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/search">Go to Shopping</Link>
            </MessageBox>
          ) : (
            <div class="card4">
              <div class="row cartrow">
                <div class="col-md-8 cart4">
                  <div class="title">
                    <div class="row cartrow">
                      <div class="col">
                        <h4><b>Shopping Cart</b></h4>
                      </div>

                    </div>
                  </div>
                  {cartItems.map((item) => (
                    <div class="row cartrow border-top border-bottom">
                      <div class="row cartrow main align-items-center">
                        <div class="col-md-2 col-2"><img class="img-fluid cartimg" src={item.image} /></div>
                        <div class="col-3 col-md-3">
                          <div class="row cartrow ">{item.name}</div>
                        </div>
                        <div class="col-1 col-md-1 mb-3">
                          <button
                            className='btn btn-sm bg-light'
                            onClick={() =>
                              updateCartHandler(item, item.quantity - 1)
                            }

                            disabled={item.quantity === 1}
                          >
                            -
                          </button>{' '}
                        </div>
                        <div className="col-1 col-md-1 text-center">
                          <span className='text-dark '>{item.quantity}</span>{' '}
                        </div>
                        <div className="col-1 col-md-1 mb-3">

                          <button
                            className='btn btn-sm bg-light'

                            onClick={() =>
                              updateCartHandler(item, item.quantity + 1)
                            }
                            disabled={item.quantity === item.countInStock}
                          >
                            +
                          </button>
                        </div>

                        <div class="col-md-3 col-2 text-center">৳ {item.price} </div>
                        <div className="col-md-1 col-1">
                          <Button
                            onClick={() => removeItemHandler(item)}
                            variant="dark"
                          >
                            X
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className='text-center'>
                    <Link className='btn btn-danger mt-3' to='/search'>Buy more Products</Link>
                  </div>
                </div>
                <div class="col-md-4 summary">
                  <div>
                    <h5><b>Summary</b></h5>
                  </div>


                  <div class="row cartrow" style={{
                    borderTop: '1px solid rgba(0,0,0,.1)', padding: '2vh 0'
                  }}>
                    <div class="col">TOTAL PRICE</div>
                    <div class="col text-right"> ৳{cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}</div>
                  </div> <Button
                    type="button"
                    variant="danger"
                    onClick={checkoutHandler}
                    disabled={cartItems.length === 0}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </div>
          )
          }

        </Col >

      </Row >
    </div >
  );
}
