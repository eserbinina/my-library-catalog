import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './App.css'  // ← ЭТА СТРОЧКА ДОЛЖНА БЫТЬ

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)