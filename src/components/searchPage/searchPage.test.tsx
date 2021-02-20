import React from 'react';
import { render, screen } from '@testing-library/react';
import {SearchPage} from './searchPage';

test('renders input box', () => {
  render(<SearchPage />);
  const inputElement = screen.getByPlaceholderText("search issue titles")
  expect(inputElement).toBeInTheDocument();
});