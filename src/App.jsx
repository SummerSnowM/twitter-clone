import AuthPage from './pages/AuthPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProfilePage from './pages/ProfilePage'
import store from './store'
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/login' element={<AuthPage />} />
          <Route path='*' element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>

  )
}