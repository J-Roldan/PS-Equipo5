import React from 'react';
import { render, screen } from '@testing-library/react';
import AdminDashboard from './AdminDashboard';

describe('AdminDashboard', () => {
  test('renders AdminDashboard component without crashing', () => {
    render(<AdminDashboard />);
    expect(screen.getByText(/Crear Empleado/i)).toBeInTheDocument();
  });

  test('renders form fields', () => {
    render(<AdminDashboard />);
    expect(screen.getByPlaceholderText(/Ingrese nombre del usuario/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ingrese email del usuario/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ingrese password del usuario/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ingrese edad del usuario/i)).toBeInTheDocument();
    expect(screen.getByText(/Seleccione género/i)).toBeInTheDocument();
  });

  test('renders user table', () => {
    render(<AdminDashboard />);
    expect(screen.getAllByText(/Nombre/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Email/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Edad/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Género/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Actions/i).length).toBeGreaterThan(0);
});
});