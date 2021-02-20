import React from 'react';
import { AppBar, Toolbar, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Autocomplete } from '../autocomplete/autocomplete';
import { Results } from '../results/results';
import logo from './logo.svg';
import './searchpage.css';
import { useRef } from '@storybook/addons';

const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      
      borderRadius: theme.shape.borderRadius,
      marginRight: theme.spacing(20),
      marginLeft: theme.spacing(10),
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    }
  }));

export const SearchPage: React.FunctionComponent = () => {
    const classes = useStyles();
    const [autocompleteResults, setAutocompleteResults] = React.useState([]);
    const [autoCompleteString, setAutoCompleteString] = React.useState('')
    const [cachedResults, setCachedResults] = React.useState([]);
    const [searchResults, setSearchResults] = React.useState([]);

    const getResults = (text:string | null) => {
        if(!text) return [];

        const testData =  require('../shared/testfile.json');
        return testData.filter((data) => data.title.includes(text));
    }

    const onAutocompleteChange = (text: string) => {
        setAutoCompleteString(text);
        const results = getResults(text);
        setCachedResults(results);
        const autoCompleteResults = results.map((data: { title: any; })  => data.title);
        setAutocompleteResults(autoCompleteResults)
    }
    const onAutocompeteComplete = (text: string | null) => {
        setAutocompleteResults([])
        if(text == autoCompleteString) {
            setSearchResults(cachedResults);
        } else {
            setAutoCompleteString(text ? text : '');
            const result = cachedResults.filter(result => result.title == text)
            setSearchResults(result)
        }
    }
    return (
        <div className="App">
            <AppBar position="static" color='transparent'>
                <Toolbar>
                <img src={logo} className="App-logo" alt="logo" height='50px' />
                <Typography className={classes.title} variant="h6" noWrap>
                    React Issue Search
                </Typography>
                </Toolbar>
            </AppBar>
            <Paper>
                <div className={classes.search}>
                    <Autocomplete suggestions={autocompleteResults} onChange={onAutocompleteChange} onComplete={onAutocompeteComplete}/>
                </div>
                <Results results={searchResults} />
            </Paper>
        </div>
      );
};
