import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Import fonts
import '@fontsource/inter';
import '@fontsource/poppins';
import '@fontsource/roboto';
import '@fontsource/source-sans-pro';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);