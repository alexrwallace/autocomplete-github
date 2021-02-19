import { List } from '@material-ui/core';
import * as React from 'react';
import { ResultItem } from './resultItem';

export interface ResultsProps {
    results?: Array<any>,
  }

export const Results: React.FunctionComponent<ResultsProps> = ({
    results = null,
}) => {
    if(!results || results.length == 0) return null;

    const renderResults = () => {
        return results.map((result) => {
            return <ResultItem result={result} />
        })
    }
    return <List>
        {renderResults()}
    </List>
}