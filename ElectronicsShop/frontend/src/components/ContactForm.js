import React from 'react';
import '../index.css'

const ContactForm = () => {
    return (
        <div class="container">
            <div class="row ">
                <div class="col-lg-7 mx-auto">
                    <div class="card8 
                     mx-auto p-4 ">
                        <div class="card-body">
                            <div class="container">
                                <form id="contact-form" role="form">
                                    <div class="controls">

                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label style={{ color: "#333" }} for="form_name">Firstname *</label>
                                                    <input id="form_name" type="text" pattern='[A-Za-z]{2,12}' name="name" class="form-control mb-4" placeholder="Please enter your firstname *" required="required" data-error="Firstname is required." />

                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label style={{ color: "#333" }} for="form_lastname">Lastname *</label>
                                                    <input id="form_lastname" pattern='[A-Za-z]{2,12}' type="text" name="surname" class="form-control mb-4" placeholder="Please enter your lastname *" required="required" data-error="Lastname is required." />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label style={{ color: "#333" }} for="form_email">Email *</label>
                                                    <input id="form_email" type="email" name="email" class="form-control mb-4" placeholder="Please enter your email *" required="required" data-error="Valid email is required." />

                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label style={{ color: "#333" }} for="form_need">Please specify your need *</label>
                                                    <select id="form_need" name="need" class="form-control mb-4" required="required" data-error="Please specify your need.">
                                                        <option value="" selected disabled>--Select Your Issue--</option>
                                                        <option >Request Invoice for order</option>
                                                        <option >Request order status</option>
                                                        <option >Haven't received cashback yet</option>
                                                        <option >Other</option>
                                                    </select>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label style={{ color: "#333" }} for="form_message">Message *</label>
                                                    <textarea id="form_message" name="message" class="form-control mb-4" placeholder="Write your message here." rows="4" required="required" data-error="Please, leave us a message."></textarea>
                                                </div>

                                            </div>


                                            <div class="col-md-12 text-center">

                                                <input type="submit" style={{ backgroundColor: '#52017D' }} class="btn btn-send text-light  pt-2 btn-block
                            " value="Send Message" />

                                            </div>

                                        </div>


                                    </div>
                                </form>
                            </div>
                        </div>


                    </div>


                </div>


            </div>
        </div>

    );
};

export default ContactForm;