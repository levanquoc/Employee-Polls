import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authAction';
 
const Menu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/home" className="navbar-brand ml-3">Home</Link>
        <Link to="/leaderboard" className="navbar-brand ml-3">Leaderboard</Link>
        <Link to="/add" className="navbar-brand ml-3">Add</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
    
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
        </ul>
        <form className="form-inline my-2 my-lg-0">
            <div className="dropdown">
            <img src={user.avatarURL} className="img-thumbnail rounded-circle mr-2" alt="..." style={{width:'50px'}} />
            <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
              Welcome, {user.name}!
            </button>
            <div className="dropdown-menu">
              <p className="btn btn-danger w-100"onClick={() => dispatch(logout())}>Logout</p>
            </div>
            </div>
        </form>
        </div>
  </nav>
  );
};
 
export default Menu;