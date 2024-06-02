// components/Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions/authAction';
import { fetchQuestions } from '../redux/actions/questionAction'

const Login = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [submit, setSubmit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchQuestions());
    setSubmit(true);
    dispatch(login(id, password))
      .then(() => {
        setSubmit(false);
      })
      .catch((error) => {
        //alert(12)
      });
  };

  return (
    <div className="container">
      <form style={{ textAlign: 'center', margin: '1em 3em' }} onSubmit={handleSubmit}>
        <h3>Employee</h3>
        <img 
          src="https://www.polly.ai/hs-fs/hubfs/Blog%20Images/Illustrations%20(blue,%20png)/Internal%20Comms%20Fun%204.png?width=2000&name=Internal%20Comms%20Fun%204.png"
          alt="Internal Comms Fun" 
          style={{ width: '50%', minWidth: '300px' }}
        />
        <h3>Login</h3>
        <div className="form-group">
          <label htmlFor="username">username</label>
          <input 
            className="form-control" 
            id="username" 
            aria-describedby="emailHelp" 
            type="text" 
            value={id} 
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="form-control" 
            id="password"
          />
        </div>
        {submit ? 
          <button type="submit" className="btn btn-success disabled">Login ...</button> 
          : <button type="submit" className="btn btn-primary">Submit</button>
        }
      </form>
    </div>
  );
};

export default Login;
