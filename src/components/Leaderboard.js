// components/Dashboard.js
import React,{useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { fetchUsers } from '../redux/actions/authAction'

const Dashboard = () => {
    const users = useSelector((state) => state.auth.users);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchUsers());
    }, [dispatch]);
    return (
        <div>
            <div className="container mt-3">
                <table className="table">
                <thead className="thead-light">
                    <tr>
                    <th scope="col" style={{width:'50%'}}>User</th>
                    <th scope="col">Answerd</th>
                    <th scope="col">Created</th>
                    </tr>
                </thead>
                <tbody>
                {   Object.entries(users).map(([id, user]) => (
                    <tr key={id}>
                        <td>
                            <div style={{display: 'flex',alignItems: 'center'}}>
                                <img src={user.avatarURL} style={{width: '40px', marginRight: '10px'}} alt="Hello" />
                                <div style={{flex: '1'}}>
                                    <h4>{user.name}</h4>
                                    <h5>{user.id}</h5>
                                </div>
                            </div>
                        </td>
                        <td>{Object.keys(user.answers).length}</td>
                        <td>{user.questions.length}</td>
                    </tr>
                ))}
                </tbody>
                </table>
            </div>
        </div>
  );
};
 
export default Dashboard;
