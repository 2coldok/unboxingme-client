import { useState } from 'react';
import styled from 'styled-components';

interface AlertProps {
  message: string;
  onClose: () => void;
}

export default function Alert({ message, onClose }: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    setIsVisible(false);
    onClose();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <AlertContainer>
      <MessageWrapper>
        <h2>{message}</h2>
        <button onClick={handleClick}>확인</button>
     </MessageWrapper>
    </AlertContainer>
  );
}

const AlertContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const MessageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 40%;
  height: 40%;
  background-color: white;
  color: black
`;
