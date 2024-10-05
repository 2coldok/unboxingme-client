// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { Outlet, useLocation } from "react-router-dom"
import AppHeader from "./components/AppHeader"
import AppFooter from "./components/AppFooter"
import { useLoading } from "./hook/LoadingHook";
import LoadingBar from "./loading/LoadingBar";

function App() {
  const location = useLocation();
  const { isLoading } = useLoading();

  const hideFooterPaths = [
    '/pandora/greenroom',
    '/pandora/elphis'
  ];

  const shouldHideFooter = hideFooterPaths.includes(location.pathname);

  return (
    <>
      <LoadingBar isLoading={isLoading} />
      <AppHeader />
      <Outlet />
      {!shouldHideFooter && <AppFooter />}
    </>
  )
}

export default App
