import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import "../../styles/AuthStyles.css";
import { useAuth } from '../../context/auth';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUpActive, setIsSignUpActive] = useState(false);
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:8080/api/v1/auth/login`,
            { email, password }
            );
            console.log(res)
            if (res.data.success){
                toast.success(res.data.message);
                setIsSignUpActive(false);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem('auth',JSON.stringify(res.data));
                navigate(location.state ||'/');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };
    return (
        <Layout title="Register - Herhobs">
            <div className={`container ${isSignUpActive ? 'right-panel-active' : ''}`} id="container">
                <div className="form-container sign-in-container">
                    <form className='register-login' onSubmit={handleSubmit}>
                        <h1>LOG IN</h1>
                        <span>TO CONTINUE</span>
                        <input type="email" placeholder="Email*" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        {/* <button type="button" onClick={() => {navigate('/forgot-password')}}>
                            Forgot Password
                        </button> */}
                        <button type="submit">LOG IN</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-right">
                            <h1>Welcome Back!</h1>
                            <p>All the fun starts here! Wanna feel these happy vibes? Create an account and you’re all set to go?</p>
                            <Link to={'/register'}>
                                <button className="ghost" id="signUp">SIGN UP</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Login;

