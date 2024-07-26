import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import store from './app/store'
import {Provider} from 'react-redux'
import {ThemeProvider} from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <Provider store={store}>
      <App/>
    </Provider>
  </ThemeProvider>
)
