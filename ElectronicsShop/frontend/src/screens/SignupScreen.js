import Axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import '../index.css'
import { useCreateUserWithEmailAndPassword, useUpdateProfile, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";


export default function SignupScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const { register, formState: { errors }, handleSubmit } = useForm();

  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [
    createUserWithEmailAndPassword,
    cUser,
    loading,
    error,
] = useCreateUserWithEmailAndPassword(auth);

const [updateProfile, updating, error3] = useUpdateProfile(auth);

const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

if(updating){
  console.log('updating')
}

if(cUser){
  navigate(redirect);
  console.log('Hello from Signup')
}

console.log(error3)
  const eye1 = <FontAwesomeIcon icon={faEye} />;
  const eye2 = <FontAwesomeIcon icon={faEye} />;

  const [passwordShown1, setPasswordShown1] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);

  const togglePasswordVisiblity1 = () => {
    setPasswordShown1(passwordShown1 ? false : true);
  };

  const togglePasswordVisiblity2 = () => {
    setPasswordShown2(passwordShown2 ? false : true);
  };

  const submitHandler = async data2 => {
    console.log(data2);
    const name = data2.name;
    const email = data2.email;
    const password = data2.password;
    const confirmPassword = data2.confirmPassword;
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    await updateProfile({displayName:name});
    try {
      createUserWithEmailAndPassword(data2.email, data2.password);
      
      console.log(name)
      const { data } = await Axios.post('/api/users/signup', {
        name,
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      if(cUser){
        navigate(redirect || '/');
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (cUser) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div className='container'>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <div className='"row"'>
            <div className="col-md-6 offset-md-3">
                <div className="card-body cardbody-color p-lg-5">
                    <div class="text-center">
                      <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                        width="200px" alt="profile" />
                    </div>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <div className="">
                            {/* <label className="label">
                                <span className="label-text">Name</span>
                            </label> */}
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="input input-bordered w-full max-w-xs form-control"
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: 'Name is Required'
                                    },
                                    pattern: {
                                      value: /^([^0-9]*)$/,
                                      message: 'Provide a valid Name'
                                  }
                                })}
                            />
                            <label className="label">
                                {errors.name?.type === 'required' && <span className="label-text-alt text-danger">{errors.name.message}</span>}
                                {errors.name?.type === 'pattern' && <span className="label-text-alt text-danger">{errors.name.message}</span>}
                            </label>
                        </div>
                        <div className="">
                            {/* <label className="label">
                                <span className="label-text">Email</span>
                            </label> */}
                            <input
                                type="text"
                                placeholder="Your Email"
                                className="form-control input input-bordered w-full max-w-xs"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Email is Required'
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'Provide a valid Email'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.email?.type === 'required' && <span className="label-text-alt text-danger">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text-alt text-danger">{errors.email.message}</span>}

                            </label>
                        </div>
                        <div className="">
                            {/* <label className="label">
                                <span className="label-text">Password</span>
                            </label> */}
                            <input
                                type={passwordShown1 ? "text" : "password"}
                                placeholder="Your Password"
                                className="form-control input input-bordered w-full max-w-xs"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: 'Password is Required'
                                    },
                                    minLength: {
                                        value: 8,
                                        message: 'Must be 8 characters or longer'
                                    },
                                    pattern: {
                                      // value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                                      value: /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/,
                                      message: 'Provide 8 characters, at least 1 letter, 1 number and 1 special character!'
                                  }
                                })}
                            />
                            <i onClick={togglePasswordVisiblity1}>{eye1}</i>
                            {/* <label className="label">
                                {errors.password?.type === 'required' && <span className="label-text-alt text-danger">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt text-danger">{errors.password.message}</span>}
                                {errors.password?.type === 'pattern' && <span className="label-text-alt text-danger">{errors.password.message}</span>}
                            </label> */}
                        </div>
                        <div className="">
                            {/* <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label> */}
                            <input
                                type={passwordShown2 ? "text" : "password"}
                                placeholder="Confirm Your Password"
                                className="form-control input input-bordered w-full max-w-xs"
                                {...register("confirmPassword", {
                                    required: {
                                        value: true,
                                        message: 'Password is Required'
                                    },
                                    minLength: {
                                        value: 8,
                                        message: 'Must be 8 characters or longer'
                                    },
                                    pattern: {
                                      value: /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/,
                                      message: 'Provide 8 characters, at least 1 letter, 1 number and 1 special character!'
                                  }
                                })}
                            /><i className='eyePlace' onClick={togglePasswordVisiblity2}>{eye2}</i>
                            <label className="label">
                                {errors.password?.type === 'required' && <span className="label-text-alt text-danger">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt text-danger">{errors.password.message}</span>}
                                {errors.password?.type === 'pattern' && <span className="label-text-alt text-danger">{errors.password.message}</span>}
                            </label>
                        </div>
                        {/* {signUpError} */}
                        <div className='text-center'>
                        <input className='btn btn-primary' type="submit" value='Sign Up' />
                        </div>
                    </form>
                    <p className='mt-3'><small>Already Have an Account? <Link to={`/signin?redirect=${redirect}`} className='text-success'>Please Sign In</Link></small></p>
                    <div className="text-center mb-3">OR</div>
                    <div className='text-center'>
                    <button onClick={() => signInWithGoogle()} className="btn btn-outline btn-info">Conitnue With Google</button>
                    </div>
                </div>
            </div>
        </div>






      {/* <div class="row">
        <div class="col-md-6 offset-md-3">
          <div class="card my-5">

            <form onSubmit={submitHandler} class="card-body cardbody-color p-lg-5">

              <div class="text-center">
                <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                  width="200px" alt="profile" />
              </div>
              <div class="mb-3">
                <input onChange={(e) => setName(e.target.value)} pattern='[A-Za-z]{2,12}' type="text" class="form-control" id="name" aria-describedby="name"
                  placeholder="Name" required />
              </div>
              <div class="mb-3">
                <input onChange={(e) => setEmail(e.target.value)} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" type="email" class="form-control" id="email" aria-describedby="emailHelp"
                  placeholder="Email" required />
              </div>
              <div class="mb-3">
                <input onChange={(e) => setPassword(e.target.value)} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" type="password" class="form-control" id="password" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" placeholder="Password" required />
              </div>
              <div class="mb-3">
                <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" class="form-control" id="password" placeholder="Confirm Password" required />
              </div>
              <div class="text-center"><button type="submit" class="btn btn-color1 px-5 mb-5 w-100 text-light">Sign Up</button></div>
              <div id="emailHelp" class="form-text text-center mb-5 text-dark">Not
                Already have an account?{' '}
                <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
              </div>
            </form>
          </div>

        </div>
      </div> */}
    </div>
  );
}
