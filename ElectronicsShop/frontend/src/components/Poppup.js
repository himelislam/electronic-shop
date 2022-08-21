import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css'

const Poppup = () => {
    return (
        <div>
            <div >
                <input type="checkbox" id="check" />
                <label class="chat-btn popupchatbutton" for="check">
                    <i class="fa fa-commenting-o comment"></i>
                    <i class="fa fa-close close"></i>
                </label>
                <div class="wrapper2">
                    <div className='text-left'>
                        <span className='text-light fs-4'>Electronics</span> <span className='text-warning'>Shop</span>

                        <ul class="list-unstyled text-light ms-2">
                            <li>
                                <p><i class="fas fa-map-marker-alt pe-2"></i>Mohakhali, Dhaka-1212,Bangladesh</p>
                            </li>
                            <li>
                                <p><i class="fas fa-phone pe-2"></i>+ 01 234 567 89</p>
                            </li>
                            <li>
                                <p><i class="fas fa-envelope pe-2 mb-0"></i>electronicsshop@gmail.com</p>
                            </li>

                        </ul>
                        <ul class="list-unstyled d-flex flex-row justify-content-center">
                            <li>
                                <a class="text-white px-2" href="#!">
                                    <i class="fab fa-facebook-square"></i>
                                </a>
                            </li>
                            <li>
                                <a class="text-white px-2" href="#!">
                                    <i class="fab fa-instagram"></i>
                                </a>
                            </li>
                            <li>
                                <a class="text-white ps-2" href="#!">
                                    <i class="fab fa-youtube"></i>
                                </a>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Poppup;