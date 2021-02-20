import * as React from 'react';

export interface AutoCompleteSuggestionProps {
    suggestion?: string | null,
    searchTerm?: string | null
  }

export const AutoCompleteSuggestion: React.FunctionComponent<AutoCompleteSuggestionProps> = ({
    searchTerm = null,
    suggestion = null,
}) => {

    let renderedSuggestion = <>{suggestion}</>;
    if(suggestion != null && searchTerm != null && searchTerm != '' ){
        const renderedTermArray: Array<JSX.Element> = [];
        const split = suggestion.split(searchTerm);
        split.map((item, index) => {
            if(index != split.length -1){
                renderedTermArray.push(<>{item}<b>{searchTerm}</b></>)
            } else{
                renderedTermArray.push(<>{item}</>)
            }
            
        })
        renderedSuggestion = <>
            {renderedTermArray}
        </>;
    }
    
    return renderedSuggestion
}