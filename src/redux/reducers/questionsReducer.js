import { RECEIVE_QUESTION } from '../actions/questionAction';  

const initialState = {

};

const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_QUESTION:
      return {
        ...state,
        ...action.questions
      };
    default:
      return state;
  }
};

export default questionsReducer;