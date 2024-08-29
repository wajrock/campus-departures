import React from "react";
import { DataProvider } from "./utils/DataContext"; // Import the DataProvider from DataContext
import Dashboard from "./Dashboard"; // Import the Dashboard component

// Define the App component
function App() {
  
  
  return (
    // Wrap the Dashboard component with DataProvider to provide context
    <DataProvider>
      {/* Render the Dashboard component */}
      <Dashboard />
    </DataProvider>
  );
}

export default App; // Export the App component as the default export
