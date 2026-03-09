// Imports React's StrictMode
import { StrictMode } from 'react'

// Imports the function that mounts the React app onto the actual HTML page
import { createRoot } from 'react-dom/client'

// Imports global CSS
import './index.css'

// Imports root App component
import App from './App.jsx'

// Finds the <div id="root"> in index.html and mounts the React app inside it
createRoot(document.getElementById('root')).render(
  // Wraps the app in StrictMode for extra development warnings and checks
  <StrictMode>
    <App /> {/* App starts here */}
  </StrictMode>,
)
