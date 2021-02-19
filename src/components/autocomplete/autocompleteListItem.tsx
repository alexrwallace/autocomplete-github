import * as React from 'react';
import MenuItem from '@material-ui/core/MenuItem';

import {AutoCompleteSuggestion} from './autocompleteSuggestion'

export interface AutocompleteListItemProps {
    index?: number,
    suggestion?: string,
    searchTerm?: string,
    selected?: boolean,
    onSelected? : (suggestion: any) => void,
  }

export const AutocompleteListItem: React.FunctionComponent<AutocompleteListItemProps> = ({
    index = -1,
    suggestion = null,
    searchTerm = null,
    selected = false,
    onSelected = () => {},
}) => {
    const handleMenuItemClick = (suggestion: any) => {
        onSelected(suggestion);
      };
    return <MenuItem 
                dense={!selected}
                key={index}
                onClick={() => handleMenuItemClick(suggestion)}
                >
                    <AutoCompleteSuggestion suggestion={suggestion} searchTerm={searchTerm} />
            </MenuItem>;
}