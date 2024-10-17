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

//
import AuthService from './service/AuthService.ts'
import HttpClient from './network/HttpClient.ts'
import { AuthProvider } from './context/AuthContext.tsx'
// import { env } from './config/env.ts'
import { PandoraService } from './service/PandoraService.ts'
import { UnboxingService } from './service/UnboxingService.ts'
import { DashboardService } from './service/DashboardService.ts'
import MyPage from './pages/MyPage.tsx'
import PandoraForm from './pages/PandoraForm.tsx'
import SolverAlias from './pages/SolverAlias.tsx'
import NotFoundFallback from './pages/fallback/NotFoundFallback.tsx'
import ErrorFallback from './pages/fallback/ErrorFallback.tsx'
import Note from './pages/Note.tsx'
import LoginFailureFallback from './pages/fallback/LoginFailureFallback.tsx'
import Riddle from './pages/Riddle.tsx'
import PenaltyFallback from './pages/fallback/PenaltyFallback.tsx'
import SessionFallback from './pages/fallback/SessionFallback.tsx'
import { LoadingProvider } from './context/LoadingContext.tsx'
import PandoraDetail from './pages/PandoraDetail.tsx'

const httpClient = new HttpClient(import.meta.env.VITE_SERVER_BASE_URL);
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
      { path: 'pandora/:id', element: <PandoraCover pandoraService={pandoraService} unboxingService={unboxingService} /> },
      { path: 'pandora/:id/riddle', element: <Riddle unboxingService={unboxingService} /> },
      { path: 'pandora/:id/solveralias', element: <SolverAlias unboxingService={unboxingService} /> },
      { path: 'pandora/:id/note', element: <Note unboxingService={unboxingService} /> },
      { path: 'pandora/form', element: <PandoraForm pandoraService={pandoraService} /> },
      { path: 'pandora/form/:id', element: <PandoraForm pandoraService={pandoraService} /> },
      { path: 'dashboard', element: <MyPage pandoraService={pandoraService} dashboardService={dashboardService} /> },
      { path: 'dashboard/pandora/:id', element: <PandoraDetail dashboardService={dashboardService} pandoraService={pandoraService} /> },
    ]
  },
  {
    path: '/fallback/404',
    element: <NotFoundFallback />
  },
  {
    path: '/fallback/error',
    element: <ErrorFallback />
  },
  {
    path: '/fallback/login-failed',
    element: <LoginFailureFallback />
  },
  {
    path: '/fallback/penalty',
    element: <PenaltyFallback />
  },
  {
    path: '/fallback/session',
    element: <SessionFallback />
  }  
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider authService={authService}>
    <LoadingProvider>
      <GlobalStyle />
      <RouterProvider router={router} />
    </LoadingProvider>
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