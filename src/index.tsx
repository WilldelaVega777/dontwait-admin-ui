//---------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------
import React                    from 'react';
import ReactDOM                 from 'react-dom';
import App                      from './App';
import reportWebVitals          from './reportWebVitals';
import './index.css';

//---------------------------------------------------------------------
// App Bootstrap Section
//---------------------------------------------------------------------
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

//---------------------------------------------------------------------
// WebVitals Section
//---------------------------------------------------------------------
reportWebVitals()
