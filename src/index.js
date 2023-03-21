import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from 'store/configureStore'

import App from './App'

import './assets/style_root/index.scss'
import 'react-tooltip/dist/react-tooltip.css'

window.addEventListener('beforeunload', () => {
  store.dispatch({ type: 'CLEAR_STORE' })
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
