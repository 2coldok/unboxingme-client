import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const fireworkExplode = keyframes`
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: translate(var(--dx), var(--dy)) scale(0.5);
    opacity: 0;
  }
`;

const FireworkDot = styled.div<{ color: string; dx: number; dy: number }>`
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${fireworkExplode} 1s ease-out forwards;
  --dx: ${(props) => props.dx}px;
  --dy: ${(props) => props.dy}px;
`;

const FireworkContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  pointer-events: none;
  z-index: 999;
`;

const colors = ["#ff3e3e", "#ff9933", "#ffd700", "#33cc33", "#3399ff", "#9900cc"];

interface FireworkProps {
  action: boolean;
}

export default function Firework({ action }: FireworkProps) {
  const [fireworks, setFireworks] = useState<number[]>([]);

  useEffect(() => {
    if (action) {
      
      const fireworkCount = 10;
      setFireworks(Array.from({ length: fireworkCount }, (_, index) => index));

      
      const timer = setTimeout(() => {
        setFireworks([]);
      }, 1000);

  
      return () => clearTimeout(timer);
    }
  }, [action]);

  
  if (fireworks.length === 0) return null;
  
  return ( 
    <FireworkContainer>
      {fireworks.map((_, index) => {
        const angle = (index / fireworks.length) * 360;
        const dx = Math.cos((angle * Math.PI) / 180) * 100;
        const dy = Math.sin((angle * Math.PI) / 180) * 100;
        return (
          <FireworkDot
            key={index}
            color={colors[Math.floor(Math.random() * colors.length)]}
            dx={dx}
            dy={dy}
          />
        );
      })}
    </FireworkContainer>
  );
}
