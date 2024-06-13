// initial
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import GlobalStyle from './styles/GlobalStyle.ts'

//
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// pages
import Home from './pages/Home.tsx'
import SearchResult from './pages/SearchResult.tsx'
import PandoraCover from './pages/PandoraCover.tsx'
import XGreenroom from './pages/XGreenroom.tsx'
import XElpis from './pages/XElpis.tsx'
import NotFound from './pages/NotFound.tsx'

//
import AuthService from './service/AuthService.ts'
import HttpClient from './network/HttpClient.ts'
import { AuthProvider } from './context/AuthContext.tsx'

const baseURL = 'http://localhost:8080';
const httpClient = new HttpClient(baseURL);
const authService = new AuthService(httpClient);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'search', element: <SearchResult /> },
      { path: 'pandora/:id', element: <PandoraCover /> },
      { path: 'pandora/greenroom', element: <XGreenroom /> },
      { path: 'pandora/elpis', element: <XElpis /> }
    ]
  },
  {
    path: '/404',
    element: <NotFound />
  }  
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider authService={authService}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
