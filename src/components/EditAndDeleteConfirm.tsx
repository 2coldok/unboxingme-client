import styled from 'styled-components';
import { ISelectedPandora } from '../pages/PandoraDetail';
import { BsX } from "react-icons/bs";


interface IEditAndDeleteConfirmProps {
  pandora: ISelectedPandora
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onCancel: () => void;
}

export default function EditAndDeleteConfirm({ pandora, onEdit, onDelete, onCancel }: IEditAndDeleteConfirmProps) {
  
  return (
    <ModalContainer>
      <AlertWrapper>
        <div className='close' onClick={onCancel}><BsX /> </div>
        <h3 className='title'>{pandora.title}</h3>
        <span className='total-records'>(총 {pandora.totalRecords}명의 참여자 기록이 삭제됩니다)</span>
        <ButtonWrapper>
          {pandora.action === 'edit' && (
            <button className='edit' onClick={() => onEdit(pandora.id)}>수정하기</button>
          )}
          {pandora.action === 'delete' && (
            <button className='delete' onClick={() => onDelete(pandora.id)}>삭제하기</button>
          )}
        </ButtonWrapper>
      </AlertWrapper>
    </ModalContainer>
  )
}

const ModalContainer = styled.div`
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

const AlertWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  width: 410px;
  background-color: var(--background-riddle);
  border-radius: 0.5rem;
  border: 1px solid var(--border);
  margin-left: 1rem;
  margin-right: 1rem;
  padding: 1rem;

  .title {
    /* margin-bottom: 2rem; */
    margin-bottom: 0.3em;
  }

  .total-records {
    margin-top: 0;
    margin-bottom: 2em;
    color: var(--font-red);
  }

  .close {
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 24px;
    cursor: pointer;
    color: var(--font-subtitle);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  & > button {
    background-color: var(--background-color);
    font-weight: bold;
  }

  .edit {
    border: 1px solid #ffe177;
  background-color: #2f3642;
  color: #ffe177;
  }

  .delete {
    background-color: #2f3642;
    border: 1px solid var(--font-warning);
    color: var(--font-warning);
  }
`;
