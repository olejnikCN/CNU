import React, { createContext, useState } from 'react';

const SearchContext = createContext({
  searchString: '',
  updateSearchString: searchString => {},
});

const SearchContextProvider = props => {
  const [searchString, setSearchString] = useState('');

  const updateSearchString = searchString => setSearchString(searchString);

  return (
    <SearchContext.Provider
      value={{
        searchString: searchString,
        updateSearchString: updateSearchString,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchContextProvider };
