// src/components/PrivateRoute.js

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate,useLocation  } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const paramssearch = new URLSearchParams(location.search);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const queryString = window.location.href.toString().split('?')[1];
  const params = new URLSearchParams(queryString);
  const redirectToValue = params.get('redirectTo');
  console.log(paramssearch)
  if(redirectToValue!=="" && paramssearch.size > 0)
    return !isAuthenticated ? children : <Navigate to={`/${redirectToValue}`} />;
  else 
    return !isAuthenticated ? children : <Navigate to="/home" />;
};

export default PrivateRoute;
