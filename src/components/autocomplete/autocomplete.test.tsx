import React from 'react';
import { render, screen } from '@testing-library/react';
import {Autocomplete} from './autocomplete';

test('renders input box', () => {
  render(<Autocomplete />);
  const inputElement = screen.getByPlaceholderText("search issue titles")
  expect(inputElement).toBeInTheDocument();
});

test('renders input box', () => {
  const suggestions = [{id: '1', title: 'test'}]
  render(<Autocomplete suggestions={suggestions} />);
  const suggestionDiv = screen.getByText("test")
  expect(suggestionDiv).toBeInTheDocument();
});
