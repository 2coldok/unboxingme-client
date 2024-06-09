
import { Link } from "react-router-dom";
import styled from "styled-components";


export default function AppHeader() {
  
  return (
    <StyledContainer>
      <nav>
        <ul>
         <li><Link to='/'>Home</Link></li>
        </ul>
      </nav>
    </StyledContainer>
  );
}

const StyledContainer = styled.header`
  width: 100%;
  height: 70px;
  border: 1px solid #99C3FF;
`;