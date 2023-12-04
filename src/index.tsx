import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

// Components
import App from './App';

const el = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(el);
root.render(<App />);
