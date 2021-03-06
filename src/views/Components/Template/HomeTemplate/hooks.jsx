import React from "react";

//  hooks
import { useSnackbar } from "~snackbar/hooks";

export const useHooks = () => {
  //  hooks
  const { errorMessage } = useSnackbar();
  /** ð¢ useRef */
  const searchInputRef = React.useRef();

  // constants
  const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

  //  states
  /**ð¢ useState */
  const [movies, setMovies] = React.useState([]);

  /** @description fetch */
  const fetchAction = React.useCallback(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        setMovies(jsonResponse.Search);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  /** @description æ¤ç´¢æ¬å¥åå¤ãªã»ãã */
  const resetSearchInputRef = React.useCallback(e => {
    searchInputRef.current.value = "";
  }, []);

  /** @description æ ç»æ¤ç´¢ã¤ãã³ã */
  const search = React.useCallback(
    searchValue => {
      fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
        .then(response => response.json())
        .then(jsonResponse => {
          if (jsonResponse.Response === "True") {
            setMovies(jsonResponse.Search);
          } else {
            errorMessage(jsonResponse.Error);
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    [errorMessage]
  );

  /** @description æ¤ç´¢ã¢ã¤ã³ã³æ¼ä¸å¾ã®submit */
  /**ð¢ useCallback  */
  const callSearchFunction = React.useCallback(
    e => {
      e.preventDefault();
      search(searchInputRef.current.value);
      resetSearchInputRef();
    },
    [searchInputRef, search, resetSearchInputRef]
  );

  /** @description ã¨ã³ã¿ã¼ã­ã¼æ¼ä¸å¾ã®ã¤ãã³ã */
  const handleKeyDown = React.useCallback(
    e => {
      if (e.keyCode === 13) {
        search(searchInputRef.current.value);
        resetSearchInputRef();
      }
    },
    [searchInputRef, search, resetSearchInputRef]
  );

  /**ð¢ useEffect */
  React.useEffect(() => {
    fetchAction();
  }, [fetchAction]);

  /**ð¢ useMemo  */
  const stateData = React.useMemo(() => {
    return {
      movies
    };
  }, [movies]);

  const handler = React.useMemo(() => {
    return {
      callSearchFunction,
      handleKeyDown,
      fetchAction
    };
  }, [callSearchFunction, handleKeyDown, fetchAction]);

  return {
    searchInputRef,
    stateData,
    handler
  };
};
