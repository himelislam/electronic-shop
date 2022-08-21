import Axios from 'axios';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle} from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import '../index.css'
import auth from '../firebase.init';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";


export default function SigninScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { register, formState: { errors }, handleSubmit } = useForm();
  const eye = <FontAwesomeIcon icon={faEye} />;
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [passwordShown, setPasswordShown] = useState(false);

  const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [
    signInWithEmailAndPassword,
    sUser,
    loading,
    error,
] = useSignInWithEmailAndPassword(auth);

const [sendPasswordResetEmail, sending, error2] = useSendPasswordResetEmail(
  auth
);

const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

if(sUser){
  console.log('Hello from Firebase');
  navigate(redirect || '/');
}
let signInError;

if(sending){
  
  console.log('Password reset mail sent')
  signInError = <p className='text-success'><small></small></p>
}

  console.log(error?.message);

  if(error){
    signInError = <p className='text-danger'><small>{error?.message}</small></p>
}

const togglePasswordVisiblity = () => {
  setPasswordShown(passwordShown ? false : true);
};

  const resetPassword = () => {
    sendPasswordResetEmail(email);
    toast.success('Password reset mail sent')
    console.log('clicked to reset')
  }

  const submitHandler = async data => {
    const email = data.email; 
    setEmail(data.email);
    const password = data.password;
    // event.preventDefault();
    signInWithEmailAndPassword(data.email, data.password)
    try {
      const { data } = await Axios.post('/api/users/signin', {
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      if(sUser){
        navigate(redirect || '/');
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };


  useEffect(() => {
    if (sUser) {
      navigate(redirect);
      console.log('Hello Done')
    }
  }, [navigate, redirect, userInfo]);








  return (
    <div className='container' >
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <div className='row'>
            <div className="col-md-6 offset-md-3">
                <div className="card-body cardbody-color p-lg-5">
                <div class="text-center">
                    <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                    width="200px" alt="profile" />
                </div>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <div className="">
                            {/* <label className="label">
                                <span className="label-text">Email</span>
                            </label> */}
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="input input-bordered w-full max-w-xs form-control"
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
                                {errors.email?.type === 'required' && <span className="label-text-alt text-red-600">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-600">{errors.email.message}</span>}

                            </label>
                        </div>
                        <div className="">
                            {/* <label className="label">
                                <span className="label-text">Password</span>
                            </label> */}
                            <input
                                type={passwordShown ? "text" : "password"}
                                placeholder="Your Password"
                                className="input input-bordered w-full max-w-xs form-control"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: 'Password is Required'
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Must be 6 characters or longer'
                                    }
                                })}
                            />
                            <i onClick={togglePasswordVisiblity}>{eye}</i>
                            <label className="label">
                                {errors.password?.type === 'required' && <span className="label-text-alt text-red-600">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-600">{errors.password.message}</span>}

                            </label>
                        </div>
                                {signInError}
                        <div className='text-center'>
                        <input className='btn btn-primary' type="submit" value='Login' />
                        </div>
                    </form>
                    <div id="emailHelp" class="form-text mb-4 text-dark">
                <p className='text-primary pe-auto' onClick={resetPassword} >Forget Password?</p>
              </div>
                    <p><small>New to Electronic Shop? <Link to={`/signup?redirect=${redirect}`} className='text-success'>Create New Account</Link></small></p>
                    <div className="text-center">OR</div>
                    <div className='text-center mt-3'>
                    <button onClick={() => signInWithGoogle()} className="btn btn-info">Conitnue With Google</button>
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
                <input onChange={(e) => setEmail(e.target.value)} type="email" class="form-control" id="email" aria-describedby="emailHelp"
                  placeholder="Email" />
              </div>
              <div class="mb-3">
                <input onChange={(e) => setPassword(e.target.value)} type="password" class="form-control" id="psw" name='psw' placeholder="password" />
              </div>

              {signInError}

              <div id="emailHelp" class="form-text mb-4 text-dark">
                <p className='text-primary pe-auto' onClick={resetPassword} >Forget Password?</p>
              </div>
              <div class="text-center"><button type="submit" class="btn btn-color1 px-5 mb-5 w-100">Sign in</button></div>
              <div id="emailHelp" class="form-text text-center mb-5 text-dark">Not
                New customer?{' '}
                <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
              </div>
            </form>
          </div>


        </div>





      </div> */}
    </div>
  );
}
