import styled from "styled-components";
import { Outlet } from "react-router-dom"
import AppHeader from "./components/AppHeader"
import { useLoading } from "./hook/LoadingHook";
import LoadingBar from "./loading/LoadingBar";
import ScrollToTop from "./util/ScrollToTop";
// import AppFooter from "./components/HomeFooter";

function App() {
  const { isLoading } = useLoading();
  // const location = useLocation();
  

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

      {/* {!isLoading && location.pathname === '/' && (
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
  background-color: var(--background);
  border-bottom: 1px solid var(--border);

  position: fixed;
  top: 0; 
  left: 0;
  z-index: 8000;
  
`;

const MainContainer = styled.main`
  width: 90%;
  max-width: 1200px;
  margin-top: 100px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

// const FooterContainer = styled.footer`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   width: 100%;
//   height: 100px;
//   margin-top: 30px;
//   background-color: #11202f;
// `;

export default App
