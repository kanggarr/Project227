import React from 'react';
import { NavLink } from 'react-router-dom';

const UserMenu = () => {
  return (
    <div className='text-center'>
        <div className="list-group">
            <h4>Dashboard</h4>
            <NavLink
                 to="/dashboard/user/profile" 
                className="list-group-item list-group-item-action"
            >
                My Profile
            </NavLink>
            <NavLink 
                to="/dashboard/user/upload" 
                className="list-group-item list-group-item-action"
            >
                Upload
            </NavLink>
            <NavLink 
                to="/dashboard/user/orders" 
                className="list-group-item list-group-item-action"
            >
                My Products
            </NavLink>            
        </div>
    </div>   
  );
};

export default UserMenu;
