import React from 'react';
import { render, screen } from '@testing-library/react';
import MiCuenta from './MiCuenta';

describe('MiCuenta', () => {
  test('renders MiCuenta component without crashing', () => {
    render(<MiCuenta />);
    expect(screen.getByText(/Mi Cuenta/i)).toBeInTheDocument();
  });

  test('renders welcome message', () => {
    render(<MiCuenta />);
    expect(screen.getByText(/Bienvenido a tu cuenta./i)).toBeInTheDocument();
  });
});