import { createContext, useContext, useState } from "react";


const SearchContext = createContext("");

export  const useSearchContext = () => {
    return useContext(SearchContext);
  };

export const SearchProvider = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const searchContextValue = { searchKeyword, setSearchKeyword };

    return (
      <SearchContext.Provider value={searchContextValue}>
        {children}
      </SearchContext.Provider>
    );
  };

