import React, {useState, useEffect} from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import axios from 'axios';

const Profile = () => {
    //context
    const [auth, setAuth] = useAuth();
    //state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //get user data
    useEffect(() => {
        const {name, email, password} = auth?.user ?? {};
        setName(name);
        setEmail(email);
        setPassword(password);
    }, [auth?.user]);

    // form function
    const handleSubmit = async (e) => {
    e.preventDefault();
        try {
            const {data} = await axios.put('http://localhost:8080/api/v1/auth/profile',
            { 
                name, 
                email, 
                password,
            });
            if (data?.error) {
                toast.error(data?.error);
            } else {
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data?.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success("Profile Updated Successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };
   
  return (
    <Layout title={'My Profile'}>
        <div className='container-flui p-3 m-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <UserMenu />
                </div>
                <div className='col-md-9'>
                    <div className={`container 'right-panel-active' : ''}`} id="container">
                        <div className="form-container sign-in-container">
                            <form onSubmit={handleSubmit}>
                                <h1>UPDATE</h1>
                                <input 
                                    type="text" 
                                    placeholder="Username*" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)}
                                    autoFocus
                                />
                                <input 
                                    type="email" 
                                    placeholder="Email*" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled
                                />
                                <input 
                                    type="password" 
                                    placeholder="Password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button type="submit">UPDATE PROFILE</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  );
};

export default Profile;

