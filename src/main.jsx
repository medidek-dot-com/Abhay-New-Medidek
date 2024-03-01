import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './Utils/Store/store.js'
import ScrollToTop from './ScrollToTop.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
 <Provider store={store}>
 <PersistGate persistor={persistor}>

    <BrowserRouter>
    <ScrollToTop/>
    <App />
    </BrowserRouter>
    </PersistGate>

    </Provider>

  // </React.StrictMode>,
)