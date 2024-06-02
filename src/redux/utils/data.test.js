/**
 * @jest-environment jsdom
 */
import * as React from 'react';
import renderer from 'react-test-renderer';
import App from '../../App';
import { _saveQuestion,_saveQuestionAnswer  } from './data';
import { Provider } from 'react-redux';
import store from '../store';

describe('Testing with function _saveQuestion', () => {
    it('should return the saved question with all expected fields when correctly formatted data is passed', async () => {
        const question = {
          optionOneText: 'Option One',
          optionTwoText: 'Option Two',
          author: 'sarahedo',
          avatarURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1nYUKHA8kkUlIr9DG9woo_y0QtY9m9SGylQ&s'
        };
    
        const savedQuestion = await _saveQuestion(question);
        expect(savedQuestion).toHaveProperty('id');
        expect(savedQuestion).toHaveProperty('timestamp');
        expect(savedQuestion).toHaveProperty('author', question.author);
        expect(savedQuestion).toHaveProperty('avatarURL', question.avatarURL);
        expect(savedQuestion).toHaveProperty('optionOne');
        expect(savedQuestion.optionOne).toHaveProperty('text', question.optionOneText);
        expect(savedQuestion.optionOne).toHaveProperty('votes');
        expect(savedQuestion).toHaveProperty('optionTwo');
        expect(savedQuestion.optionTwo).toHaveProperty('text', question.optionTwoText);
        expect(savedQuestion.optionTwo).toHaveProperty('votes');
    });

    it('should return an error if incorrect data is passed:optionOneText', async () => {
        const question = {
            optionOneText: 'Option One',
            // Thiếu optionTwoText và author
        };
        await expect(_saveQuestion(question)).rejects.toEqual('Please provide optionOneText, optionTwoText, and author');
    });
    it('should return an error if incorrect data is passed:optionTwoText', async () => {
        const question = {
            optionTwoText: 'Option Two',
            // Thiếu optionTwoText và author
        };
        await expect(_saveQuestion(question)).rejects.toEqual('Please provide optionOneText, optionTwoText, and author');
    });
});

describe('Testing with function _saveQuestionAnswer', () => {
    it('should return true when correctly formatted data is passed', async () => {
        const authedUser = 'sarahedo';
        const qid = '8xf0y6ziyjabvozdd253nd';
        const answer = 'optionOne';
    
        const result = await _saveQuestionAnswer({ authedUser, qid, answer });
        expect(result).toBe(true);
    });

    it('should return an error if incorrect data is passed : authedUser', async () => {
        const authedUser = '';
        const qid = '123123'; // qid bị bỏ trống
        const answer = 'optionOne';

        await expect(_saveQuestionAnswer({ authedUser, qid, answer })).rejects.toEqual("Please provide authedUser, qid, and answer");
    });
    it('should return an error if incorrect data is passed : qid', async () => {
        const authedUser = 'sarahedo';
        const qid = ''; // qid bị bỏ trống
        const answer = 'optionOne';

        await expect(_saveQuestionAnswer({ authedUser, qid, answer })).rejects.toEqual("Please provide authedUser, qid, and answer");
    });
    it('should return an error if incorrect data is passed : answer', async () => {
        const authedUser = 'sarahedo';
        const qid = '12321'; // qid bị bỏ trống
        const answer = '';

        await expect(_saveQuestionAnswer({ authedUser, qid, answer })).rejects.toEqual("Please provide authedUser, qid, and answer");
    });
});

describe('Testing with toMatchSnapshot', () => {
    it('matches the snapshot when a name is passed', () => {
        const component = renderer.create(
            <Provider store={store}>
                     <App />
            </Provider>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
});