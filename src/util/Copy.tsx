import { useState } from "react";
// import { BsCopy } from "react-icons/bs";
import { BsFillStickiesFill } from "react-icons/bs";
import styled from "styled-components";


interface ICopyProps {
  text: string;
}

export function Copy({ text }: ICopyProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      },  3000);
    } catch (error) {
      console.error('복사 오류');
    }
  };

  return (
    <>
      <CopyIcon onClick={handleCopy} />
      {copied && (
        <ModalContainer visible={copied}>
          <span>메시지 링크를 복사하였습니다.</span>
        </ModalContainer>
      )}
      
    </>
  )
}

const CopyIcon = styled(BsFillStickiesFill)`
  cursor: pointer;
  font-size: 1.2em;
  color: var(--brand);
  :hover {
    filter: brightness(125%);
  }
`

const ModalContainer = styled.div<{ visible: boolean }>`
  position: fixed;
  bottom: 7%;
  left: 50%;
  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 768px) {
    width: 80%;
  }
  transform: translateX(-50%);
  background-color: var(--brand);
  color: black;
  padding: 0.7rem 1rem;
  border-radius: 0.2rem;
  z-index: 9000;
`;
