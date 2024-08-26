import React, { useState, createContext, useContext, FunctionComponent, ReactNode } from 'react';

// Define an interface for the context data structure.
// completedLines: an array of strings representing completed lines.
// markAsCompleted: a function that takes an ID of type string and returns void.
interface DataContextType {
    loadedLines: string[];
    markAsLoaded: (id: string) => void;
}

// Define an interface for the DataProvider component's props.
// children: ReactNode, representing the child components that will be wrapped by the provider.
interface DataProviderProps {
    children: ReactNode;
}

// Create a context with a default value of null. This context will be used to share data across components.
const DataContext = createContext<DataContextType | null>(null);

// Create a provider component for the DataContext.
// This component will wrap any part of the app that needs access to the context data.
const DataProvider: FunctionComponent<DataProviderProps> = ({ children }) => {
  // State to keep track of completed lines.
  const [loadedLines, setLoadedLines] = useState<string[]>([]);

  // Function to add an ID to the list of completed lines.
  const markAsLoaded = (id: string) => {
    setLoadedLines((prev) => [...prev, id]);
  };

  // The provider component that passes down the context value to its children.
  return (
    <DataContext.Provider value={{ loadedLines, markAsLoaded }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to access the DataContext.
// Throws an error if the context is used outside of a DataProvider.
const useDataContext = () => useContext(DataContext)!;

// Export the DataProvider component and the custom hook for use in other components.
export { DataProvider, useDataContext };
