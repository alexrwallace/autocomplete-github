import React from 'react';
import { SearchPage } from './components/searchPage/searchPage';
import { IssueProps } from './components/shared/issueProps';
import useFetch from './hooks/useFetch';

function App() {
  let url = `https://api.github.com/repos/facebook/react/issues`
  const requestHeaders = {
    Accept: 'application/vnd.github.v3+json'
  }
  const { status, data, headers, error } = useFetch<IssueProps[]>(url, {headers: requestHeaders})

  console.log({ status, data, headers, error })

  return (
    <SearchPage issues={data} />
  );
}

export default App;
