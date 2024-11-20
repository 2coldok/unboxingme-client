import styled from "styled-components";

export const DContainer = styled.div`
  width: 100%;
  background-color: var(--background-riddle);
  padding: 1rem;
  padding-bottom: 3rem;
  border-radius: 0.4rem;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const DSection = styled.section`
  margin-bottom: 2rem;
`

export const DHead = styled.h1`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

export const DTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 800;
`;

export const DSubTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
`;

export const DContent = styled.div`
  font-size: 1rem;
  font-weight: 400;
  margin:0;
`;

export const DLink = styled.a`
  color: #e767f5;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
  :hover {
    filter: brightness(125%);
  }
`;

export const DList = styled.li`
  margin-left: 0.4rem;
`;

export const DWarning = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  color: #fb6376;
`;

export const DExample = styled.p`
  display: inline-block;
  color: #f4d58d;
  font-weight: bold;
  border: 1px solid gray;
  padding: 0.5em 1.2rem;
  border-radius: 0.8em;
  margin-right: 0.5em;
`;

export const DExampleWrong = styled.p`
  display: inline-block;
  color: #f97583;
  font-weight: bold;
  border: 1px solid gray;
  padding: 0.5em 1.2rem;
  border-radius: 0.8em;
  margin-right: 0.5em;
`;

export const DEmail = styled.span`
  color: #79b8ff;
  font-weight: 600;
`;

export const DDivder = styled.div`
  width: 100%;
  height: 1px;
  margin-top: 3rem;
  margin-bottom: 3rem;
  background-color: var(--border);
`;
