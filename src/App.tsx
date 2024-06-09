// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { Outlet } from "react-router-dom"
import AppHeader from "./components/AppHeader"
import AppFooter from "./components/AppFooter"

function App() {  
  return (
    <>
      <AppHeader />
      <Outlet />
      <AppFooter />
    </>
  )
}

export default App
