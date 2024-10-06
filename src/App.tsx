// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import styled from "styled-components";
import { Outlet } from "react-router-dom"
import AppHeader from "./components/AppHeader"
import AppFooter from "./components/AppFooter"
import { useLoading } from "./hook/LoadingHook";
import LoadingBar from "./loading/LoadingBar";

function App() {
  const { isLoading } = useLoading();

  return (
    <>
      <HeaderContainer>
        <LoadingBar isLoading={isLoading} />
        <AppHeader />
      </HeaderContainer>

      <MainContainer>
        <Outlet />
      </MainContainer>

      <FooterContainer>
        <AppFooter />
      </FooterContainer>
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
  border: 3px solid red;
`;

const MainContainer = styled.div`
  display: flex;
  width: 90%;
  @media (max-width: 900px) {
    width: 100%;
  }
  max-width: 1000px;
  min-height: 800px;
  border: 3px solid orange;
`;

const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 4em;
  border: 3px solid yellow;
  background-color: #5d696d;
`;

export default App
