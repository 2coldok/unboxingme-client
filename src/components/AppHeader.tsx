import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../hook/AuthHook";

export default function AppHeader() {
  const { profile, signOut } = useAuth();
  
  return (
    <StyledContainer>
      <nav>
        <ListContainer>
          <li><Link to='/'>Home</Link></li>
          <li><a href="http://localhost:8080/auth/google">구글로그인</a></li>
        </ListContainer>
      </nav>

      <ProfileContainer>
        { profile && `${profile.displayName}` }
        { profile  &&  <ProfileAvatar src={profile.photo} alt="avatar" />}
        { profile && <button onClick={signOut}>로그아웃</button> }
      </ProfileContainer>

    </StyledContainer>
  );
}

const StyledContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 70px;
  border: 1px solid #99C3FF;
`;

const ListContainer = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  height: 70px;

  & > li {
    margin-right: 27px;
  }
`;

const ProfileContainer = styled.div`
  background-color: gray;
`;

const ProfileAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 10px;
`;
