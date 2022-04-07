import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';

import './index.scss';

const container = document.getElementById('root');

console.log(container);

// Create a root.
const root = ReactDOM.createRoot(container);

// Initial render
root.render(<App />);
