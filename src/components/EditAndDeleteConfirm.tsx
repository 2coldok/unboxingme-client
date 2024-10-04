import React, { useState } from 'react';
import styled from 'styled-components';
import { ISelectedPandora } from './mypage/MyPandoras';

interface IEditAndDeleteConfirmProps {
  pandora: ISelectedPandora,
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onCancel: () => void;
}

export default function EditAndDeleteConfirm({ pandora, onEdit, onDelete, onCancel }: IEditAndDeleteConfirmProps) {
  const [showWarning, setShowWarning] = useState(true);
  const [inputLabel, setInputLabel] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLabel(e.target.value.trim());
    setErrorMessage('');
  }

  const handleDeleteComplete = () => {
    if (inputLabel === pandora.label) {
      return onDelete(pandora.id);
    }
    console.log(inputLabel);
    console.log(pandora.label);
    setErrorMessage('입력한 제목이 일치하지 않습니다.');
  }

  if (showWarning && pandora.action === 'edit') {
    return (
      <ModalContainer>
        <ShowWarningContainer>
          <h3>'{pandora.title}' 노트를 수정하시겠습니까?</h3>
          <p>- 수정 도중 모든 수수께끼가 해결되면 수정할 수 없습니다.</p>
          <p>- 수정시 수수께끼에 도전한 사람들의 기록이 패널티를 포함하여 모두 초기화됩니다.</p>
          <button onClick={onCancel}>취소</button>
          <button onClick={() => onEdit(pandora.id)}>수정하기</button>
        </ShowWarningContainer>
      </ModalContainer>
    )
  }

  if (showWarning && pandora.action === 'delete') {
    return (
      <ModalContainer>
        <ShowWarningContainer>
          <h3>{pandora.title} 판도라를 정말 삭제하시겠습니까?</h3>
          <p>삭제시 해당 수수께끼에 도전한 사용자의 기록과, 도전현황이 모두 삭제됩니다.</p>
          <p>삭제된 수수께끼는 복구가 불가능합니다.</p>
          <button onClick={onCancel}>취소</button>
          <button onClick={() => setShowWarning(false)}>삭제하기</button>
        </ShowWarningContainer>
     </ModalContainer>
    )
  }
  
  return (
    <ModalContainer>
      <InputLabelContainer>
        <h3>삭제 확인을 위해 <h1>"{pandora.label}"</h1> 을 입력해주세요.</h3>
        <input
          type='text'
          value={inputLabel}
          onChange={handleInputChange}
         />
         {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
         <button onClick={onCancel}>취소</button>
         <button onClick={handleDeleteComplete}>삭제 완료</button>
      </InputLabelContainer>
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
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

const ShowWarningContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid red;
`;

const InputLabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 3px solid pink;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: bold;
`;
