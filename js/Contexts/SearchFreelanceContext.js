import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useSyncQueryLocalstorage from '../hooks/useSyncQueryLocalstorage';

// create the context and the consumer
export const SearchFreelanceContext = React.createContext({});
export const SearchFreelanceConsumer = SearchFreelanceContext.Consumer;

// create the provider
export const SearchFreelanceProvider = ({ children }) => {
  const location = useLocation();

  const isOnSearchPage = () => {
    return location.pathname === '/search' || location.pathname === '/favoris';
  };

  const [searchKey, setSearchKeyState] = useState(null);
  const [query, setQuery, resetQuery, isDefaultQuery] =
    useSyncQueryLocalstorage('query', '', isOnSearchPage());
  const [extra, setExtra] = useState([]);

  const setSearchKey = (value) => {
    setSearchKeyState(value);
  };

  return (
    <SearchFreelanceContext.Provider
      value={{
        query,
        setQuery,
        isDefaultQuery,
        resetQuery,
        searchKey,
        setSearchKey,
        isOnSearchPage,
        setExtra,
        extra,
      }}
    >
      {children}
    </SearchFreelanceContext.Provider>
  );
};
