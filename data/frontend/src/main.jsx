import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import store from './app/store'
import { Provider } from 'react-redux'
import { ThemeProvider } from "@material-tailwind/react";
import { NotificationProvider } from './app/notifications.jsx'
import { SocketProvider } from './app/socket.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider>
        <Provider store={store}>
            <NotificationProvider>
                <SocketProvider>
                    <App />
                </SocketProvider>
            </NotificationProvider>
        </Provider>
    </ThemeProvider>
)
