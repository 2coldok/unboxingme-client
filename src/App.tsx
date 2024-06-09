// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { Outlet } from "react-router-dom"
import XNavbar from "./components/XNavbar"
import XFooter from "./components/XFooter"

function App() {  
  return (
    <>
      <XNavbar />
      <Outlet />
      <XFooter />
    </>
  )
}

export default App
