import { _getQuestions,_saveQuestion,_saveQuestionAnswer  } from '../utils/data';

export const RECEIVE_QUESTION = 'RECEIVE_QUESTION';
export const SAVE_QUESTION_ANSWER_SUCCESS = 'SAVE_QUESTION_ANSWER_SUCCESS';
export const SAVE_QUESTION_ANSWER_FAILURE = 'SAVE_QUESTION_ANSWER_FAILURE';

export const receiveQuestions = (questions) => ({
  type: RECEIVE_QUESTION,
  questions,
});

export const saveQuestionAnswerSuccess = (authedUser, qid, answer) => ({
  type: SAVE_QUESTION_ANSWER_SUCCESS,
  authedUser,
  qid,
  answer,
});

export const saveQuestionAnswerFailure = (error) => ({
  type: SAVE_QUESTION_ANSWER_FAILURE,
  error,
});

export const fetchQuestions = () => {
  return (dispatch) => {
    return _getQuestions().then((questions) => {
      dispatch(receiveQuestions(questions));
    });
  };
};

export const fetchAddQuestions = (newQuestion) => {
  return (dispatch) => {
    return _saveQuestion(newQuestion).then((formattedQuestion) => {
      fetchQuestions();
    }).catch((error) => {
      throw error;
    });
  };
};

export const handleSaveQuestionAnswer = ({ authUser, qid, answer }) => {
  return (dispatch) => {
    return _saveQuestionAnswer({ authUser, qid, answer })
      .then(() => {   
      })
      .catch((error) => {
        dispatch(saveQuestionAnswerFailure(error));
      });
  };
};