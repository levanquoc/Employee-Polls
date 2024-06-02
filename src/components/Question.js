import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { handleSaveQuestionAnswer } from '../redux/actions/questionAction';
import { fetchQuestions } from '../redux/actions/questionAction'

const Question = () => {
    const dispatch = useDispatch();

    const { questionId } = useParams();
    const questions = useSelector((state) => state.questions);
    const user = useSelector((state) => state.auth.user);
    const question = questions[questionId];

    const oneQ = question?.optionOne?.votes?.length ?? -1;
    const oneT = question?.optionTwo?.votes?.length ?? -1;
    const handleChoose = (option) => {
        const authedUser = user.id;
        const qid = questionId;
        const answer = option;
        dispatch(handleSaveQuestionAnswer({ authedUser, qid, answer }));
        dispatch(fetchQuestions());
        alert("Choose OK")
    }
  return (
    <div>
        {(oneQ>=0 && oneT>=0) &&
        <div className="container mt-3">
            <div className="text-center">
            <h3>{question.author}</h3>
            <img src={question.avatarURL} style={{width:'250px'}} className="rounded" alt="..."/>
            <h3>Would you rather</h3>
            <div className="row">
                <div className="col-sm-6">
                <div className="card">
                    <div className="card-body p-0 pt-2">
                    <p className="card-text text-center">{question.optionOne.text}</p>
                    { (!question.optionOne.votes.includes(user.id) && !question.optionTwo.votes.includes(user.id) )
                       ? (<button className="btn btn-secondary w-100" onClick={()=>handleChoose('optionOne')}>Choose</button>)
                       : ( question.optionOne.votes.includes(user.id) 
                       ?(<button className="btn btn-success w-100 disabled">Choose : {oneQ}, Rate vote: {oneQ/(oneQ+oneT)*100}%</button>)
                       :(<button className="btn btn-secondary w-100 disabled">Choose : {oneQ}, Rate vote: {oneQ/(oneQ+oneT)*100}%</button>)
                       )
                    }
                    </div>
                </div>
                </div>
                <div className="col-sm-6">
                <div className="card">
                    <div className="card-body p-0 pt-2">
                    <p className="card-text text-center">{question.optionTwo.text}</p>
                    { (!question.optionOne.votes.includes(user.id) && !question.optionTwo.votes.includes(user.id) )
                       ? (<button className="btn btn-secondary w-100" onClick={()=>handleChoose('optionTwo')}>Choose</button>)
                       : ( question.optionTwo.votes.includes(user.id) 
                       ?(<button className="btn btn-success w-100 disabled">Choose : {oneT}, Rate vote: {oneT/(oneQ+oneT)*100}%</button>)
                       :(<button className="btn btn-secondary w-100 disabled">Choose : {oneT}, Rate vote: {oneT/(oneQ+oneT)*100}%</button>)
                       )
                    }
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        }
        {(oneQ<0 || oneT<0) &&
        <div className="container mt-3 p-5">
            <h2 className='text-center'>NOT FOUND 404</h2>
        </div>
        }
    </div>
  );
};
 
export default Question;
