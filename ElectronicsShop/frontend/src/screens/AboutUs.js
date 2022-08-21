import React from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css'

const AboutUs = () => {
    return (
        <div className='container my-5'>
            <div className='row' style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}>
                <div className='col-lg-6'>
                    <img src="https://www.mobiletechtalk.co.uk/wp-content/uploads/2020/10/mobiletechtalk.co_.uk-image3.jpeg" className='img-fluid' alt="" />
                </div>
                <div className='col-lg-6 py-3'>
                    <h3>Electronics Shop</h3>
                    <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro saepe repellendus officiis natus inventore numquam unde eveniet, magni vitae quidem totam iure nam tempore culpa illo voluptas. Vel vitae consequuntur iusto aspernatur neque ducimus, aliquam, ex explicabo ad quos est, nesciunt ea quibusdam. Veniam cupiditate, exercitationem fugiat molestias nihil odit? Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor soluta a earum deleniti dolorem, placeat iusto quibusdam, quas eos cupiditate incidunt voluptatum, unde voluptatem recusandae laudantium. Dolore, molestiae soluta neque ipsum quisquam in veniam rerum, explicabo id ex qui cum consectetur? Porro deserunt nostrum voluptatem ea doloribus magnam deleniti, itaque quasi facere commodi error tempora totam cum odio harum nobis architecto et ut nemo qui repellat exercitationem quaerat. Consequatur quod nulla, eius ea sed voluptatum pariatur error eligendi aliquid voluptatem enim sapiente voluptates deserunt, consectetur quibusdam repudiandae, natus excepturi quia minus vero. Laborum delectus placeat architecto similique ipsam consequuntur velit. </p>
                    <Link to='/'>
                        <button className='btn btn-warning'>Back to Home Page</button>
                    </Link>
                </div>


            </div>
        </div>
    );
};

export default AboutUs;