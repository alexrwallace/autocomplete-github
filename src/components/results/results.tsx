import { List } from '@material-ui/core';
import * as React from 'react';
import useEventListener from '../../hooks/useEventListener';
import { ResultItem } from './resultItem';
import { ResultProps } from './resultprops';

export interface ResultsProps {
    results?: Array<ResultProps>,
  }

export const Results: React.FunctionComponent<ResultsProps> = ({
    results = null,
}) => {
    const DOWN = 'ArrowDown'
    const ENTER = 'Enter'
    const UP = 'ArrowUp'
    const [active, setActive] = React.useState(-1);

    const moveUp = () => {
        if(active === -1)
            return active;
        else
            return active - 1;
      }
      
      const moveDown = () => {
        if(results && active === results.length - 1)
            return active;
        else
            return active + 1;
      }

    const upDownHandler = (event: Event) => {
        // Never go to negative values or value higher than the list length
        console.log(event.key)
        const activeItem = event.key === DOWN ? moveDown() : moveUp()
        setActive(activeItem)
      }

    const keyHandler = (event: Event) => {
        switch (event.key) {
            case UP:
            case DOWN:
              upDownHandler(event)
              break
        }
    };

    useEventListener('keydown', keyHandler)

    if(!results || results.length == 0) return null;

    const renderResults = () => {
        return results.map((result, index) => {
            return <ResultItem result={result} isActive={index == active} />
        })
    }

    return <List>
            {renderResults()}
        </List>
}