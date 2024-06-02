import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { fetchAddQuestions } from  '../redux/actions/questionAction';
import { useNavigate } from 'react-router-dom';

const New = () => {
  const author = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    let question = {
      optionOneText: first,
      optionTwoText: last,
      author: author.id,
      avatarURL : author.avatarURL
    }
    dispatch(fetchAddQuestions(question))
      .then(() => {
        navigate('/home'); // Điều hướng đến trang chủ hoặc trang mong muốn sau khi thành công
      })
      .catch((error) => {
        alert('Error: ' + error); // Hiển thị alert nếu có lỗi
      });
  };

  return (
    <div>
        <div className="container">
            <form style={{textAlign: 'center', margin:'1em 3em'}} onSubmit={handleSubmit}>
            <h3>Would you rather</h3>
            <h5 className="text-muted">Create your own poll</h5>
            <div className="form-group">
                <label htmlFor="textFirst">First option</label>
                <input type="text" className="form-control" id="textFirst" value={first} onChange={(e) => setFirst(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="textLast">Last option</label>
                <input type="text" className="form-control" id="textLast" value={last} onChange={(e) => setLast(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    </div>
  );
};
 
export default New;
