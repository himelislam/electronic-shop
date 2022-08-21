import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DisplayAuction from './DisplayAuction';

const DisplayAuctions = () => {
    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
        axios.post('/all/auction').then((response) => {
            setAuctions(response.data);
        });
    }, []);


    
    const handleDelete = id => {
        const url = `/auction/${id}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {

                if (data.deletedCount) {
                    alert('Are you sure to delete');
                    const remaining = auctions.filter(service => service._id !== id);
                    setAuctions(remaining);

                }

            })
    }
    return (
        <div className=' text-center mt-5'>
        <div className="container overflow-hidden">
    
            <div className="row gy-5">
                {
                    auctions.map(auction => <DisplayAuction key={auction._id} auction={auction} handleDelete={handleDelete}></DisplayAuction>)
                }
            </div>
        </div>
    </div>
    );
};

export default DisplayAuctions;