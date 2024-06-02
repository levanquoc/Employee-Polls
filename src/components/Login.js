import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions/authAction';
import { fetchQuestions } from '../redux/actions/questionAction';

const Login = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [submit, setSubmit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    dispatch(fetchQuestions());
    dispatch(login(id, password))
      .then(() => {
        setSubmit(false);
      })
      .catch((error) => {
        console.log(error);
        setSubmit(false);
      });
  };

  return (
    <div className="container">
      <form style={{ textAlign: 'center', margin: '1em 3em' }} onSubmit={handleSubmit}>
        <h2>Employee</h2>
        <h3>Login</h3>
        <div className="form-group">
          <label htmlFor="username">Username</label>
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
          <label htmlFor="password">Password</label>
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
