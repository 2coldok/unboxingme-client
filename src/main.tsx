// initial
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import GlobalStyle from './styles/GlobalStyle.ts'

//
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// pages
import Home from './pages/Home.tsx'
import PandoraCover from './pages/PandoraCover.tsx'

//
import AuthService from './service/AuthService.ts'
import HttpClient from './network/HttpClient.ts'
import { AuthProvider } from './context/AuthContext.tsx'
import { PandoraService } from './service/PandoraService.ts'
import { UnboxingService } from './service/UnboxingService.ts'
import { DashboardService } from './service/DashboardService.ts'
import MyPage from './pages/MyPage.tsx'
import PandoraForm from './pages/PandoraForm.tsx'
import SolverAlias from './pages/SolverAlias.tsx'
import ErrorFallback from './pages/fallback/ErrorFallback.tsx'
import Note from './pages/Note.tsx'
import LoginFailureFallback from './pages/fallback/LoginFailureFallback.tsx'
import SessionFallback from './pages/fallback/SessionFallback.tsx'
import { LoadingProvider } from './context/LoadingContext.tsx'
import PandoraDetail from './pages/PandoraDetail.tsx'

import { env } from './config/env.ts'
// import Introduce from './pages/about/Introduce.tsx'
import Riddle from './pages/Riddle.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchResult from './pages/SearchResult.tsx';
import PrivacyPolicy from './pages/about/PrivacyPolicy.tsx';
import TermsOfService from './pages/about/TermsOfService.tsx';
import Guide from './pages/about/Guide.tsx';


// service
const httpClient = new HttpClient(env.url.serverBaseURL);
const authService = new AuthService(httpClient);
const pandoraService = new PandoraService(httpClient);
const unboxingService = new UnboxingService(httpClient);
const dashboardService = new DashboardService(httpClient);

// query
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home dashboardService={dashboardService} /> },
      { path: 'search', element: <SearchResult /> },
      { path: 'pandora/:id', element: <PandoraCover /> },
      { path: 'pandora/:id/note', element: <Note unboxingService={unboxingService} /> },
      { path: 'pandora/form', element: <PandoraForm pandoraService={pandoraService} /> },
      { path: 'pandora/form/:id', element: <PandoraForm pandoraService={pandoraService} /> },
      { path: 'dashboard', element: <MyPage /> },
      { path: 'dashboard/pandora/:id', element: <PandoraDetail dashboardService={dashboardService} pandoraService={pandoraService} /> },
      // { 
      //   path: '/about/introduce', 
      //   element: <Introduce /> 
      // },
      {
        path: '/about/privacy-policy',
        element: <PrivacyPolicy />
      },
      {
        path: '/about/terms-of-service',
        element: <TermsOfService />
      },
      {
        path: '/about/guide',
        element: <Guide />
      }
    ]
  },
  {
    path: 'pandora/:id/solveralias',
    element: <SolverAlias unboxingService={unboxingService} />
  },
  {
    path: '/pandora/:id/riddle',
    element: <Riddle unboxingService={unboxingService} />
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
    path: '/fallback/session',
    element: <SessionFallback />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <AuthProvider authService={authService}>
      <LoadingProvider>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </LoadingProvider>
    </AuthProvider>
  </HelmetProvider>
)

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <AuthProvider authService={authService}>
//       <GlobalStyle />
//       <RouterProvider router={router} />
//     </AuthProvider>
//   </React.StrictMode>,
// )