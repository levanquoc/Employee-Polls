
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Login from './Login';


describe('Login Component', () => {
  test('should update id and password fields, and submit the form', async () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const usernameInput = getByLabelText(/username/i);
    fireEvent.change(usernameInput, { target: { value: 'sarahedo' } });
    expect(usernameInput.value).toBe('sarahedo');
  });
});
