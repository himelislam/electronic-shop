import axios from 'axios';
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Store } from '../Store';






const Review = () => {
    const { register, handleSubmit, reset } = useForm();
    const { state } = useContext(Store);
    const { userInfo } = state;
  


    const onSubmit = data => {
      
        axios.post('/review', data)
            .then(res => {
                if (res.data.insertedId) {
                    alert('Review Added Successfully');
                    reset();
                }
            })
    };


    return (
        <div className='mt-5 mb-5'>
            <Helmet>
                <title>Review</title>
            </Helmet>
            <form className=' row justify-content-md-center  w-50 mx-auto ' onSubmit={handleSubmit(onSubmit)}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Name</label>
                    <input {...register("Name")} value={userInfo.name} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                </div>
                <div class="mb-3">
                    <label for="exampleFormControlSelect2">Rating Value</label>
                    <select {...register("Star")} id="inputState" class="form-select">
                        <option value="">Select...</option>
                        <option value="1">1- Poor</option>
                        <option value="2">2- Fair</option>
                        <option value="3">3- Good</option>
                        <option value="4">4- Very good</option>
                        <option value="5">5- Excelent</option>
                    </select>
                </div>
                <div class="form-group mb-3">
                    <label for="exampleFormControlTextarea1">Comment</label>
                    <textarea  {...register("Comment")} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>






            </form >






        </div >
    );
};

export default Review;