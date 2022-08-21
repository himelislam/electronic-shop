import React, { useContext } from 'react';
import { Store } from '../Store';

const DisplayAuction = (props) => {
    
    const { state } = useContext(Store);
    const { userInfo } = state;
    const { name, proName, auction, _id } = props.auction;
    const { handleDelete } = props;
    return (
        <div className="col-lg-4  mb-5">


        <div class="card9  py-5">
            <div class="card-body">
                <h5 class="card-title text-left">User Name: <span className='text-danger'>{name}</span> </h5>
                <h5 class="card-title">Product Name:<span className='text-danger'>{proName}</span> </h5>
                <h5>Bidding Price:<span className='text-danger'>{auction}</span></h5>
            </div>
            {userInfo && userInfo.isAdmin && (
                    <button class='btn btn-danger btn-sm' onClick={() => handleDelete(_id)}>Delete</button>
                )}
    
        </div>
    </div >
    );
};

export default DisplayAuction;