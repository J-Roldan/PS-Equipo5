import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import ProductDetail from './ProductDetail';

// Set global timeout to 2 minutes
jest.setTimeout(120000);

// Mock the useParams hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

// Mock the fetch API
global.fetch = jest.fn((url) =>
  Promise.resolve({
    ok: true,
    json: () => {
      switch (url) {
        case 'http://localhost:3001/api/products/1':
          return Promise.resolve({ name: 'Test Product 1' });
        case 'http://localhost:3001/api/products/2':
          return Promise.resolve({ name: 'Test Product 2' });
        // Add more cases if needed
        default:
          return Promise.resolve({ name: 'Test Product' });
      }
    },
  })
);

describe('ProductDetail', () => {
  beforeEach(() => {
    fetch.mockClear();
    useParams.mockReturnValue({ productId: '1' });
  });

  test('renders ProductDetail component without crashing', async () => {
    render(<ProductDetail />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // Wait for the product data to be fetched
    await waitFor(async () => {
      const productName = await screen.findByText(/Test Product 1/i);
      expect(productName).toBeInTheDocument();
    }, { timeout: 60000 });
  });
});