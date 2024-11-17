import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface AlertProps {
  message: string;
  onClose: () => void;
}

export default function Alert({ message, onClose }: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleClick = () => {
    setIsVisible(false);
    onClose();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <AlertContainer>
      <MessageContainer>
        <Message>{message}</Message>
        <button onClick={handleClick}>확인</button>
     </MessageContainer>
    </AlertContainer>
  );
}

const AlertContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(93, 101, 112, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9000;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2em;
  border-radius: 0.5rem;
  /* background-color: #252932; */
  background-color: var(--background-riddle);
  border: 1px solid var(--border);
  font-weight: bold;

  width:  400px;
  @media (max-width: 768px) {
    width: 80%;
  }
  
`;

const Message = styled.p`
  margin-bottom: 2em;
`;
