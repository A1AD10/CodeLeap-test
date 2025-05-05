import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Theme from './theme/index.jsx'
import { ThemeProvider } from '@emotion/react'
import './index.css'
import Login from './pages/login'
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './Redux/Store/index.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path='/login' element={<Login />}/>
            <Route path='/home' element={<Home />}/>
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
