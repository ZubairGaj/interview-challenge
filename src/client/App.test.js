import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';
import mockServerResponse from '../../testing/mockServerResponse'

import '@testing-library/jest-dom/extend-expect'; // For extending expect
import { act } from 'react-dom/test-utils';

beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({
            responseArray: mockServerResponse
        }),
        responseArray: mockServerResponse
    }));
});

it('renders App component', async () => {
  await act(async () => { await render(<App />);})
  expect(screen.getByTestId('menuItems')).toBeInTheDocument();
  expect(screen.queryByText('Test Asset')).toBeInTheDocument();
});

it('adds and removes items to/from the preview', async () => {
  await act(async () => { await render(<App />);})
  
  fireEvent.click(screen.getByText('Test Asset'));
  expect(screen.getByTestId('previewItems')).toBeInTheDocument();
  
  fireEvent.click(screen.getByText('x'));
  expect(screen.queryByText('Item Name')).toBeNull();
});

it('filters menu items by name', async () => {
  render(<App />);
  screen.getByTestId('itemNumber').textContent
  const input = screen.getByPlaceholderText('Name');
  fireEvent.change(input, { target: { value: 'assetthatdoesnt exist' } });
  expect(screen.getByTestId('itemNumber').textContent).toBe("0");
});
