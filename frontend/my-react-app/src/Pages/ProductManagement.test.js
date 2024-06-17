import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProductManagement from './ProductManagement';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('http://localhost:3001/api/products/', (req, res, ctx) => {
    return res(ctx.json([]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders ProductManagement component', () => {
  render(<ProductManagement />);
  const linkElement = screen.getByText(/Agregar Producto/i);
  expect(linkElement).toBeInTheDocument();
});

test('allows the user to add a new product', async () => {
  render(<ProductManagement />);

  fireEvent.change(screen.getByPlaceholderText(/Ingrese nombre del producto/i), {
    target: { value: 'Test Product' },
  });
  fireEvent.change(screen.getByPlaceholderText(/Ingrese descripción del producto/i), {
    target: { value: 'This is a test product' },
  });
  fireEvent.change(screen.getByPlaceholderText(/Ingrese precio del producto/i), {
    target: { value: '100' },
  });
  // Add similar fireEvent.change for all other inputs

  fireEvent.click(screen.getByText(/Submit/i));

  await waitFor(() => screen.getByText(/Product added successfully!/i));

  expect(screen.getByText(/Product added successfully!/i)).toBeInTheDocument();
});

// Add more tests for delete, update, and search functionalities