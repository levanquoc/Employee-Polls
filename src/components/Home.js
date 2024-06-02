import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../redux/actions/questionAction';
import { format } from 'date-fns';

const About = () => {
  const [active, setActive] = useState("New Question");
  const dispatch = useDispatch();

  // Gọi action fetchQuestions khi component được render lần đầu tiên
  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  // Lấy state từ Redux store
  const questions = useSelector((state) => state.questions);
  const user = useSelector((state) => state.auth.user);

  // Hàm thay đổi trạng thái active khi người dùng chọn tab
  const handleClick = (type) => {
    setActive(type);
  };

  return (
    <div>
      <div className="container mt-3">
        <div>
          <button
            type="button"
            className={`btn ${active === "New Question" ? "btn-dark" : "btn-light"} mr-2 mb-2`}
            onClick={() => handleClick("New Question")}
          >
            New Question
          </button>
          <button
            type="button"
            className={`btn ${active === "Done" ? "btn-dark" : "btn-light"} mr-2 mb-2`}
            onClick={() => handleClick("Done")}
          >
            Done
          </button>
          <button
            type="button"
            className={`btn ${active === "All" ? "btn-dark" : "btn-light"} mr-2 mb-2`}
            onClick={() => handleClick("All")}
          >
            All
          </button>
        </div>
        {(active === "All" || active === "New Question") && (
          <table className="table" style={{ border: '1px solid lightgray' }}>
            <thead>
              <tr>
                <th scope="col">
                  <h2 className="text-center">New Question</h2>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="row">
                    {Object.entries(questions)
                      .sort((a, b) => b[1].timestamp - a[1].timestamp)
                      .map(([id, question]) => (
                        !question.optionOne.votes.includes(user.id) && !question.optionTwo.votes.includes(user.id) && (
                          <div className="col-sm-3 mt-2" key={id}>
                            <div className="card">
                              <div className="card-body">
                                <h5 className="card-title text-secondary text-center">{question.author}</h5>
                                <p className="card-text text-muted text-center">{format(new Date(question.timestamp), 'h:aaa M/d/yyyy')}</p>
                                <Link to={`/questions/${question.id}`} className="btn btn-primary w-100">Show</Link>
                              </div>
                            </div>
                          </div>
                        )
                      ))}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        )}
        {(active === "All" || active === "Done") && (
          <table className="table" style={{ border: '1px solid lightgray' }}>
            <thead>
              <tr>
                <th scope="col">
                  <h2 className="text-center">Done</h2>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="row">
                    {Object.entries(questions)
                      .sort((a, b) => b[1].timestamp - a[1].timestamp)
                      .map(([id, question]) => (
                        (question.optionOne.votes.includes(user.id) || question.optionTwo.votes.includes(user.id)) && (
                          <div className="col-sm-3 mt-2" key={id}>
                            <div className="card">
                              <div className="card-body">
                                <h5 className="card-title text-secondary text-center">{question.author}</h5>
                                <p className="card-text text-muted text-center">{format(new Date(question.timestamp), 'h:aaa M/d/yyyy')}</p>
                                <Link to={`/questions/${question.id}`} className="btn btn-primary w-100">Show</Link>
                              </div>
                            </div>
                          </div>
                        )
                      ))}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default About;
