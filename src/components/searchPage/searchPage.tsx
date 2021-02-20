import React from 'react';
import { AppBar, Toolbar, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Autocomplete } from '../autocomplete/autocomplete';
import { Results } from '../results/results';
import { IssueProps } from '../shared/issueProps';
import logo from './logo.svg';
import './searchpage.css';


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

  export interface SearchPageProps {
    issues?: Array<IssueProps>,
  }


export const SearchPage: React.FunctionComponent<SearchPageProps> = ({
    issues = []
}) => {
    const classes = useStyles();
    const [autocompleteResults, setAutocompleteResults] = React.useState<Array<string>>([]);
    const [autoCompleteString, setAutoCompleteString] = React.useState('')
    const [cachedResults, setCachedResults] = React.useState<Array<IssueProps>>([]);
    const [searchResults, setSearchResults] = React.useState<Array<IssueProps>>([]);

    const getIssueResults = (text:string | null) => {
        if(!text) return [];

        return issues.filter((data: IssueProps) => data.title.includes(text));
    }

    const onAutocompleteChange = (text: string) => {
        setAutoCompleteString(text);
        const issueResults = getIssueResults(text);
        setCachedResults(issueResults);
        const autoCompleteResults = issueResults.map((data: { title: any; })  => data.title);
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
