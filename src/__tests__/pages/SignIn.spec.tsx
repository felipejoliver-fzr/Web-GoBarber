import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import SignIn from '../../pages/SignIn';

// mock do react-router-dom e de quem o utiliza dentro da página de SignIn
jest.mock('react-router-dom', () => {
  return {
    useHistory: jest.fn(),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('SignIn Page', () => {
  it('Should be able to sign in', () => {
    const { getByPlaceholderText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');

    fireEvent.change(emailField, { target: { value: 'test@email.com' } });
    fireEvent.change(passwordField, { target: { value: '12345' } });
  });
});
