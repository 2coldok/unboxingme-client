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
        <span className='total-records'>(문제풀이 참여 인원: {pandora.totalRecords}명)</span>
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
  background-color: rgba(43, 54, 61, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;  

const AlertWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  width: 410px;
  background-color: var(--background-color);
  border-radius: 0.5rem;
  border: 1px solid var(--dark-gray);
  margin-left: 1rem;
  margin-right: 1rem;
  padding: 1rem;

  .title {
    color: var(--light-white);
    /* margin-bottom: 2rem; */
    margin-bottom: 0.3em;
  }

  .total-records {
    margin-top: 0;
    margin-bottom: 2em;
    color: var(--light-gray);
  }

  .close {
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 24px;
    cursor: pointer;
    color: var(--light-gray);
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
    color: #a5b513;
    border: 2px solid #a5b513;
  }

  .delete {
    color: #c95047;
    border: 2px solid #c95047;
  }
`;
