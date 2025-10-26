import React from 'react'
import ReactDOM from 'react-dom/client'
import CalculadoraPeso from './containers/home/index.jsx' // Importa sua calculadora

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CalculadoraPeso /> 
  </React.StrictMode>,
)