// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { Outlet, useLocation } from "react-router-dom"
import AppHeader from "./components/AppHeader"
import AppFooter from "./components/AppFooter"

function App() {
  const location = useLocation();

  const hideFooterPaths = [
    '/pandora/greenroom',
    '/pandora/elphis'
  ];

  const shouldHideFooter = hideFooterPaths.includes(location.pathname);

  return (
    <>
      <AppHeader />
      <Outlet />
      {!shouldHideFooter && <AppFooter />}
    </>
  )
}

export default App
