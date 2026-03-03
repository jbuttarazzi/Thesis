// Imports React's StrictMode
import { StrictMode } from 'react'

// Imports the function that mounts your React app onto the actual HTML page
import { createRoot } from 'react-dom/client'

// Imports your global CSS (the cleaned-up version) — applies to the whole app
import './index.css'

// Imports your root App component — the top of your component tree
import App from './App.jsx'

// Finds the <div id="root"> in index.html and mounts the React app inside it
createRoot(document.getElementById('root')).render(
  // Wraps the app in StrictMode for extra development warnings and checks
  <StrictMode>
    <App /> {/* Your entire app starts here */}
  </StrictMode>,
)