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
import { PandoraService } from './service/PandoraService.ts'
import { UnboxingService } from './service/UnboxingService.ts'
import { DashboardService } from './service/DashboardService.ts'
import MyPage from './pages/MyPage.tsx'
import PandoraLog from './pages/PandoraLog.tsx'
import NewPandora from './pages/NewPandora.tsx'

const httpClient = new HttpClient(env.url.serverBaseURL);
const authService = new AuthService(httpClient);
const pandoraService = new PandoraService(httpClient);
const unboxingService = new UnboxingService(httpClient);
const dashboardService = new DashboardService(httpClient);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'search', element: <SearchResult pandoraService={pandoraService} /> },
      { path: 'pandora/:id', element: <PandoraCover pandoraService={pandoraService} /> },
      { path: 'pandora/:id/greenroom', element: <Greenroom unboxingService={unboxingService} /> },
      { path: 'pandora/:id/elpis', element: <Elpis pandoraService={pandoraService} /> },
      { path: 'dashboard', element: <MyPage pandoraService={pandoraService} dashboardService={dashboardService} /> },
      { path: 'dashboard/pandora/:id/log', element: <PandoraLog dashboardService={dashboardService} /> },
      { path: '/pandora/create', element: <NewPandora pandoraService={pandoraService} /> }

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