// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import styled from "styled-components";
import { Outlet } from "react-router-dom"
import AppHeader from "./components/AppHeader"
// import AppFooter from "./components/AppFooter"
import { useLoading } from "./hook/LoadingHook";
import LoadingBar from "./loading/LoadingBar";
import ScrollToTop from "./util/ScrollToTop";

function App() {
  const { isLoading } = useLoading();
  

  return (
    <>
      <ScrollToTop />
      <HeaderContainer>
        <LoadingBar isLoading={isLoading} />
        <AppHeader />
      </HeaderContainer>

      <MainContainer>
        <Outlet />
      </MainContainer>

      {/* {!isLoading && (
        <FooterContainer>
          <AppFooter />
        </FooterContainer>
      )} */}
    </>
  )
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 70px;
  background-color: var(--black100);
  border-bottom: 1px solid var(--gray200);

  position: fixed;
  top: 0; 
  left: 0;
  z-index: 8000;
  
`;

const MainContainer = styled.div`
  width: 90%;
  max-width: 1200px;
  margin-top: 100px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

// const FooterContainer = styled.footer`
//   display: flex;
//   align-items: center;
//   width: 100%;
//   height: 120px;
//   margin-top: 30px;
//   background-color: #0f2337;
// `;

export default App
