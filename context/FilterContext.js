import { useEffect, createContext, useContext, useMemo, useState, useReducer } from "react";
import { FilterReducer, initialState } from "./FilterReducer";

const FilterContext = createContext();

export function FilterWrapper({ children }) {
  const [filterState, dispatchFilter] = useReducer(FilterReducer, initialState);
  const contextValue = useMemo(() => {
     return [filterState, dispatchFilter];
  }, [filterState, dispatchFilter]);

  return (
  <FilterContext.Provider value={contextValue}>
     {children}
  </FilterContext.Provider>
  );
}

export function useFilterContext() {
  return useContext(FilterContext);
}
