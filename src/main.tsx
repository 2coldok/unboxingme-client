// initial
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import GlobalStyle from './styles/GlobalStyle.ts'

//
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// pages
import Home from './pages/Home.tsx'
import SearchResult from './pages/SearchResult.tsx'
import PandoraCover from './pages/PandoraCover.tsx'
import Greenroom from './pages/Greenroom.tsx'
import Elpis from './pages/Elpis.tsx'
import NotFound from './pages/NotFound.tsx'

//
import AuthService from './service/AuthService.ts'
import HttpClient from './network/HttpClient.ts'
import { AuthProvider } from './context/AuthContext.tsx'
import { env } from './config/env.ts'
import { SearchService } from './service/SearchService.ts'
import { PandoraService } from './service/PandoraService.ts'
import NewPandoraForm from './pages/NewPandoraForm.tsx'
import NewPandoraReview from './pages/NewPandoraReview.tsx'
import MyPandoras from './pages/MyPandoras.tsx'
import MyPandoraDashboard from './pages/MyPandoraDashboard.tsx'
import { UnboxingService } from './service/UnboxingService.ts'
import { ElpisService } from './service/ElpisService.ts'

const httpClient = new HttpClient(env.url.serverBaseURL);
const authService = new AuthService(httpClient);
const searchService = new SearchService(httpClient);
const pandoraService = new PandoraService(httpClient);
const unboxingService = new UnboxingService(httpClient);
const elpisService = new ElpisService(httpClient);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'search', element: <SearchResult searchService={searchService} /> },
      { path: 'pandora/:id', element: <PandoraCover pandoraService={pandoraService} /> },
      { path: 'pandora/new', element: <NewPandoraForm pandoraService={pandoraService} /> },
      { path: 'pandora/:id/greenroom', element: <Greenroom unboxingService={unboxingService} /> },
      { path: 'pandora/:id/elpis', element: <Elpis elpisService={elpisService} /> },
      { path: 'pandora/new/review', element: <NewPandoraReview /> },
      { path: 'issuer', element: <MyPandoras pandoraService={pandoraService} /> },
      { path: 'issuer/dashboard', element: <MyPandoraDashboard /> }
    ]
  },
  {
    path: '/404',
    element: <NotFound />
  }  
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider authService={authService}>
    <GlobalStyle />
    <RouterProvider router={router} />
  </AuthProvider>
)

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <AuthProvider authService={authService}>
//       <GlobalStyle />
//       <RouterProvider router={router} />
//     </AuthProvider>
//   </React.StrictMode>,
// )