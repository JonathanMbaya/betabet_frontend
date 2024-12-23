import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Assurez-vous qu'un fichier `App.js` existe dans le dossier `src`
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
