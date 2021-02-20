import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import {AutocompleteListItem} from './autocompleteListItem'

export interface AutocompleteProps {
    suggestions?: Array<string>
    onChange?: (text: string) => void;
    onComplete? : (text: string|null) => void;
  }

export const Autocomplete: React.FunctionComponent<AutocompleteProps> = ({
    suggestions = [],
    onChange = () => {},
    onComplete = () => {},
}) => {
    const DOWN = 'ArrowDown'
    const ENTER = 'Enter'
    const ESCAPE = 'Escape'
    const UP = 'ArrowUp'

  const [value, setValue] = React.useState('');
  const [active, setActive] = React.useState(-1);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  const onFocus = () =>{
    setValue(value);
    onChange(value);
  }

  const moveUp = () => {
    if(active === -1)
        return active;
    else
        return active - 1;
  }
  
  const moveDown = () => {
    if(active === suggestions.length - 1)
        return active;
    else
        return active + 1;
  }

  const enterHandler = () => {
    if(active != -1) {
        onComplete(value)
    }
    else{
        const suggestion = suggestions[active];
        setValue(suggestion)
        onComplete(suggestion)
    }
  }

  const escapeHandler = () => {
    onComplete(null)
  }

  const onSelected = (text:string) => {
    setValue(text)
    onComplete(text)
  }

  const upDownHandler = (event: React.KeyboardEvent) => {
    // Never go to negative values or value higher than the list length
    const activeItem = event.key === DOWN ? moveDown() : moveUp()
    setActive(activeItem)
    event.stopPropagation()
    event.preventDefault()
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case UP:
      case DOWN:
        upDownHandler(event)
        break
      case ENTER:
        enterHandler()
        break
      case ESCAPE:
        escapeHandler()
        break
    }
  }

  const renderSuggestionElement = (suggestion: any, index: number) => {
    return <AutocompleteListItem index={index} suggestion={suggestion} onSelected={onSelected} selected={active == index} searchTerm={value} />;
  };

  const hasSuggestions = suggestions.length > 0;

  return (
    <div>
      <TextField
        fullWidth
        onChange={handleChange}
        onFocus={onFocus}
        onKeyDown={handleKeyDown}
        value={value}
        placeholder="search issue titles"
      />
      {hasSuggestions && <Paper>{suggestions.map(renderSuggestionElement)}</Paper>}
    </div>
  );
};