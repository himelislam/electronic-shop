import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { Store } from '../Store';
import { getError } from '../utils';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import '../App.css'

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default function DashboardScreen() {
  const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/orders/summary', {
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
    fetchData();
  }, [userInfo]);

  return (
    <div className='container'>

      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div class="row mt-5">
          <div class="col-xl-3 col-lg-6">
            <div class="card2 l-bg-cherry">
              <div class="card-statistic-3 p-4">
                <div class="card-icon card-icon-large"><i class="fas fa-shopping-cart"></i></div>
                <div class="mb-4">
                  <h5 class="card-title mb-0">Orders</h5>
                </div>
                <div class="row align-items-center mb-2 d-flex">
                  <div class="col-8">
                    <h2 class="d-flex align-items-center mb-0">
                      {summary.orders && summary.users[0]
                        ? summary.orders[0]?.numOrders
                        : 0}
                    </h2>
                  </div>

                </div>

              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-6">
            <div class="card2 l-bg-blue-dark">
              <div class="card-statistic-3 p-4">
                <div class="card-icon card-icon-large"><i class="fas fa-users"></i></div>
                <div class="mb-4">
                  <h5 class="card-title mb-0">Users</h5>
                </div>
                <div class="row align-items-center mb-2 d-flex">
                  <div class="col-8">
                    <h2 class="d-flex align-items-center mb-0">
                      {summary.users && summary.users[0]
                        ? summary.users[0].numUsers
                        : 0}
                    </h2>
                  </div>

                </div>

              </div>
            </div>
          </div>

          <div class="col-xl-3 col-lg-6">
            <div class="card2 l-bg-orange-dark">
              <div class="card-statistic-3 p-4">
                <div class="card-icon card-icon-large"><i class="fas fa-dollar-sign"></i></div>
                <div class="mb-4">
                  <h5 class="card-title mb-0">Total Sale</h5>
                </div>
                <div class="row align-items-center mb-2 d-flex">
                  <div class="col-8">
                    <h2 class="d-flex align-items-center mb-0">
                      ৳
                      {summary.orders && summary.users[0]
                        ? summary.orders[0]?.totalSales.toFixed(2)
                        : 0}
                    </h2>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        // <>
        //   <Row>
        //     <Col md={4}>
        //       <Card>
        //         <Card.Body>
        //           <Card.Title>
        //             {summary.users && summary.users[0]
        //               ? summary.users[0].numUsers
        //               : 0}
        //           </Card.Title>
        //           <Card.Text> Users</Card.Text>
        //         </Card.Body>
        //       </Card>
        //     </Col>
        //     <Col md={4}>
        //       <Card>
        //         <Card.Body>
        //           <Card.Title>
        //             {summary.orders && summary.users[0]
        //               ? summary.orders[0].numOrders
        //               : 0}
        //           </Card.Title>
        //           <Card.Text> Orders</Card.Text>
        //         </Card.Body>
        //       </Card>
        //     </Col>
        //     <Col md={4}>
        //       <Card>
        //         <Card.Body>
        //           <Card.Title>
        //             $
        //             {summary.orders && summary.users[0]
        //               ? summary.orders[0].totalSales.toFixed(2)
        //               : 0}
        //           </Card.Title>
        //           <Card.Text> Orders</Card.Text>
        //         </Card.Body>
        //       </Card>
        //     </Col>
        //   </Row> </>
      )}
    </div>
  );
}
