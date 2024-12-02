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
  width: 6px; // 폭죽 원 크기
  height: 6px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${fireworkExplode} 1s ease-out forwards;
  --dx: ${(props) => props.dx}px;
  --dy: ${(props) => props.dy}px;
`;

const FireworkContainer = styled.div<{ top: number; left: number }>`
  position: absolute;
  top: ${(props) => props.top}%;
  left: ${(props) => props.left}%;
  right: 0;
  transform: translate(-50%, -50%);
  width: 1px;
  height: 1px;
  pointer-events: none;
  z-index: 999;
`;

const colors = ["#ff6565", "#ffb163", "#ffe23d", "#44ff44", "#208ffd", "#ce3bff"];

interface FireworkProps {
  action: boolean;
}

export default function Firework({ action }: FireworkProps) {
  const [fireworks, setFireworks] = useState<number[]>([]);

  useEffect(() => {
    if (action) {
      const fireworkCount = 10; // 폭죽 밀도
      setFireworks(Array.from({ length: fireworkCount }, (_, index) => index));

      const timer = setTimeout(() => {
        setFireworks([]);
      }, 1000);
  
      return () => clearTimeout(timer);
    } else {
      setFireworks([]);
    }
  }, [action]);

  if (fireworks.length === 0) return null;

  const renderFireworkContainer = (top: number, left: number) => (
    <FireworkContainer top={top} left={left}>
      {fireworks.map((_, index) => {
        const angle = (index / fireworks.length) * 360;
        const dx = Math.cos((angle * Math.PI) / 180) * 180; // 폭죽 확산 거리
        const dy = Math.sin((angle * Math.PI) / 180) * 180;
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

  const fireworkPoints = [
    { top: 10, left: 10 },
    { top: 50, left: 10 },
    { top: 10, left: 90 },
    { top: 10, left: 50 },
    { top: 20, left: 80 },
    { top: 30, left: 30 },
    { top: 40, left: 70 },
    { top: 50, left: 50 },
    { top: 50, left: 90 },
    { top: 60, left: 20 },
    { top: 70, left: 80 },
    { top: 80, left: 40 },
    { top: 90, left: 10 },
    { top: 90, left: 90 },
    { top: 90, left: 60 }
  ];

  return (
    <>
      {fireworkPoints.map((point) => renderFireworkContainer(point.top, point.left))}
    </>
  );
}
