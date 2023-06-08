import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import "../../styles/AuthStyles.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(`http://localhost:8080/api/v1/auth/register`,
          { name, 
            email, 
            password, 
            confirmpassword,
          });
        console.log(res)
        if (res.data.success){
          toast.success(res.data.message);
          navigate("/login");
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
            <h1>SIGN UP</h1>
            <span>TO CONTINUE</span>
            <input type="text" placeholder="Username*" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email*" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="password" placeholder="Confirm password*" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <Link to={'/login'}>
                <button className="ghost" id="signUp">LOG IN</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;


