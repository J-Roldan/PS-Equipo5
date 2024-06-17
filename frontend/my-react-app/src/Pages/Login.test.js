import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Login from './Login';

describe('Login Component', () => {
  test('renders Login component without crashing', () => {
    render(<Login />);
  });

  test('renders signup button', () => {
    render(<Login />);
    const signupButton = screen.getByText(/Agregar/i);
    expect(signupButton).toBeInTheDocument();
  });

  test('renders login button', () => {
    render(<Login />);
    const loginButton = screen.getByRole('button', { name: /Iniciar Sesión/i });
    expect(loginButton).toBeInTheDocument();
  }); 
});