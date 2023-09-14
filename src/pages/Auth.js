import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, {useState} from 'react'
import { toast } from 'react-toastify';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const initFormData = {firstName: "", lastName: "", email: "", password: '', confirmPassword: ""};

const Auth = ({setActive}) => {
    const [formData, setFormData] = useState(initFormData);
    const [page, setPage] = useState('sign-in');

    const {email, password, firstName, lastName, confirmPassword} = formData;
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value});
        // console.log(formData);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(page === 'sign-up'){
            if(confirmPassword !== password){
                toast.error("Password & Confirm Password doesn't Match !!!")
            }
            if(password && firstName && lastName && email){
                const {user} = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(user, {displayName: `${firstName} ${lastName}`});
                setActive('home');
                navigate('/');
            }
            else{
                return toast.error('All Fields are Mandatory !!!')
            }
        }
        else{
            if(password && email){
                const {user} = await signInWithEmailAndPassword(auth, email, password);
                setActive('home');
                navigate('/');
            }
            else{
                return toast.error('All Fields are Mandatory !!!')
            }

        }
    }

  return (
    <div className="container-fluid mb-4">
        <div className="container mt-5">
            <div className="row h-100 justify-content-center align-items-center">
                <div className="col-10 col-md-6 col-lg-4">
                    <form className='row mt-5 bg-white border rounded shadow-sm'>
                        <div className="col-12 text-center py-3">
                            <div className="text-center heading py-2 text-capitalize h3">{page}</div>
                        </div>
                        {page === 'sign-up' && (
                            <>
                                <div className="col-6 py-2">
                                    <input className='form-control input-text-box' placeholder='Enter First Name' name='firstName' value={firstName} type='text' onChange={handleInputChange} />
                                </div>
                                <div className="col-6 py-2">
                                    <input className='form-control input-text-box' placeholder='Enter Last Name' name='lastName' value={lastName} type='text' onChange={handleInputChange} />
                                </div>
                            </>
                        )}
                        <div className="col-12 py-2">
                            <input className='form-control input-text-box' placeholder='Enter Email address' name='email' value={email} type='email' onChange={handleInputChange} />
                        </div>
                        <div className="col-12 py-2">
                            <input className='form-control input-text-box' placeholder='Enter Password' name='password' value={password} type='password' onChange={handleInputChange} />
                        </div>
                        {page === 'sign-up' && (
                            <>
                                <div className="col-12 py-2">
                                    <input className='form-control input-text-box' placeholder='Enter Password Again' name='confirmPassword' value={confirmPassword} type='text' onChange={handleInputChange} />
                                </div>
                            </>
                        )}
                        <div className="col-12 py-2 text-center">
                            <button type="submit" className="btn btn-warning text-capitalize w-100" onClick={handleSubmit}>{page}</button>
                        </div>
                    </form>
                    <p className="pt-3 text-center">
                        {page === 'sign-up' ? (
                            <>Already Have Account ? <span className="fw-bold text-warning link-cursor" onClick={() => setPage('sign-in')}>Sign-in here</span></>
                        ) : (
                            <>Don't have an Account ? <span className="fw-bold text-warning link-cursor" onClick={() => setPage('sign-up')}>Sign-up here</span></>
                        ) }
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Auth