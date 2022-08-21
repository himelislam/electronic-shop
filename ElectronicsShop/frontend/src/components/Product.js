
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';
import Col from 'react-bootstrap/esm/Col';
import '../index.css'

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
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

  return (
    <Col className=' card1 mx-auto'>
      <div className="row">
        <div className='col-lg-5 col-3'>
          <img className='mt-5 image' src={product.image} alt="" />
        </div>
        <div className='description-side col-lg-7 col-9 mt-3'>
          <h5 class="main-heading  text-dark me-2">{product.name}</h5>
          <p>৳{product.price}</p>
          <div class="ratings">  <Rating rating={product.rating} numReviews={product.numReviews} />
            <p><small className='text-danger'>only {product.countInStock} left in stock - order soon</small></p>
            <Link to={`/product/${product.slug}`}>
              <button type="button" class="btn btn-danger btn-sm">View Product</button>
            </Link>
            {product.countInStock > 0 ? (
              <button onClick={() => addToCartHandler(product)} className="button btn btn-warning btn-sm">Add to Cart</button>
            ) : (
              <button className="button btn btn-warning btn-sm" disabled>Add to Cart</button>
            )}

          </div>


        </div>
      </div>

    </Col >
  );
}
export default Product;
