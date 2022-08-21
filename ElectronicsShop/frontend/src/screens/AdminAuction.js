import React from 'react';
import { Link } from 'react-router-dom';
import DisplayAuctions from './DisplayAuctions';


const AdminAuction = () => {
    return (
        <div className='container mt-5 mb-5'>
        <div className='row'>
          <div className="col-md-2 col-4 text-center " style={{ borderRightStyle: 'solid' }}>
            <Link to="/admin/admindashboard" className="nav-link ">Dashboard</Link>
            <hr style={{ backgroundColor: '#52017d', height: '3px' }} />
            <Link to="/admin/products" className=" nav-link ">Manage Products</Link>
            <hr style={{ backgroundColor: '#52017d', height: '3px' }} />
            <Link to="/admin/orders" className="  nav-link ">Manage Orders</Link>
            <hr style={{ backgroundColor: '#52017d', height: '3px' }} />
            <Link to="/admin/users" className=" nav-link">Manage Users</Link>
            <hr style={{ backgroundColor: '#52017d', height: '3px' }} />
            <Link to="/admin/auction" className=" nav-link text-danger">Auction</Link>
          <hr style={{ backgroundColor: '#52017d', height: '3px' }} />
          </div>
  
  
          <div className="col-md-10 col-8">
  <DisplayAuctions></DisplayAuctions>

  
          </div>
  
        </div>
      </div>
    );
};

export default AdminAuction;