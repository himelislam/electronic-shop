import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DisplayReview from './DisplayReview';



const DisplayReviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.post('/all/review').then((response) => {
            setReviews(response.data);
        });
    }, []);


    const handleDelete = id => {
        const url = `/review/${id}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {

                if (data.deletedCount) {
                    alert('Are you sure to delete');
                    const remaining = reviews.filter(service => service._id !== id);
                    setReviews(remaining);

                }

            })
    }

    return (
        <div className=' text-center mt-5'>
            <div className="container overflow-hidden">
                <hr />
                <div className="row gy-5">
                    {
                        reviews.map(review => <DisplayReview key={review._id} review={review} handleDelete={handleDelete}></DisplayReview>)
                    }
                </div>
            </div>
        </div>
    );
};

export default DisplayReviews;