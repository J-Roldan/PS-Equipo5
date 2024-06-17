import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home Component', () => {
  test('renders Home component without crashing', () => {
    render(<Home />);
  });

  test('renders filter section', () => {
    render(<Home />);
    const filterSection = screen.getByText(/Filtros:/i);
    expect(filterSection).toBeInTheDocument();
  });

  test('renders product section', () => {
    render(<Home />);
    const productSection = screen.getByText(/Productos/i);
    expect(productSection).toBeInTheDocument();
  });
});