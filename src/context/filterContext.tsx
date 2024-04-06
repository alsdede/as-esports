import React, { createContext, ReactNode, useContext, useState } from 'react'

interface Filter {
  league: string | null
  date: string | null
  teamName: string | null
}

interface FilterContextType {
  filter: Filter
  updateFilter: (newFilter: Partial<Filter>) => void
}

const initialFilter: Filter = {
  league: null,
  date: null,
  teamName: null,
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export const useFilter = () => {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider')
  }
  return context
}

interface Props {
  children: ReactNode
}

export const FilterProvider = ({ children }: Props) => {
  const [filter, setFilter] = useState<Filter>(initialFilter)

  const updateFilter = (newFilter: Partial<Filter>) => {
    setFilter({ ...filter, ...newFilter })
  }

  const contextValue = {
    filter,
    updateFilter,
  }

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  )
}
