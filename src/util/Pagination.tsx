import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdChevronLeft } from "react-icons/md"; // 이전
import { MdChevronRight } from "react-icons/md"; // 다음
import { saveInSession } from './storage';

interface PaginationProps {
  type: 'search' | 'mine' | 'conquered';
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalItems: number;
  itemsPerPage: number;
  maxVisibleTotalPages: number;
}

/**
 * type: 어떤 타입의 페이지인지
 * currentPage: 부모컴포넌트에서 관리하는 state
 * setCurrentPage: 부모컴포넌트에서 관리하는 state 함수
 * totalItems: 모든 페이지에 대한 아이템의 총 개수
 * itemsPerPage: 한 페이지에 보여지길 원하는 아이템 개수
 * maxVisibleTotalPages: 페이지네이션에 보여지길 원하는 페이지 번호 총 개수
 */

export function Pagination({ type, currentPage, setCurrentPage, totalItems, itemsPerPage, maxVisibleTotalPages }: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [visiblePages, setVisiblePages] = useState<number[]>([]);

  useEffect(() => {
    saveInSession<number>(`${type}_currentPage`, currentPage);

    const pageFloor: number = Math.ceil(parseFloat((currentPage / maxVisibleTotalPages).toFixed(1)));
    const maxPageInFloor = maxVisibleTotalPages * pageFloor;
    const startShowPage: number = maxPageInFloor - (maxVisibleTotalPages - 1);
    const endShowPage: number = (maxPageInFloor <= totalPages) ? maxPageInFloor : totalPages;
    
    const visiblePageArray = [];
    for (let i = startShowPage; i <= endShowPage; i++) {
      visiblePageArray.push(i);
    }

    setVisiblePages(visiblePageArray);
  }, [type, currentPage, maxVisibleTotalPages ,totalPages]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo(0, 0);
    }
    
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePageButton = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <PaginationContainer>
      <Direction onClick={handlePrevious} $disabled={currentPage === 1}>
        <MdChevronLeft />
      </Direction>
      {visiblePages.map((page) => (
        <PageButton
          key={page}
          $isActive={page === currentPage}
          onClick={() => handlePageButton(page)}
        >
          {page}
        </PageButton>
      ))}
      <Direction onClick={handleNext} $disabled={currentPage === totalPages}>
        <MdChevronRight />
      </Direction>
    </PaginationContainer>
  );
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  padding: 1em 0 1em 0;
  margin: 0;
  background-color: var(--background);
  font-size: 1.5em;
`;

const Direction = styled.div<{ $disabled: boolean }>`
  display: flex;
  color: ${({ $disabled }) => ($disabled ? 'var(--gray200)' : 'var(--blue100)')};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
  :hover {
    cursor: pointer;
  }
`;

const PageButton = styled.span<{ $isActive: boolean }>`
  padding: 0.1em 0.4em 0.1em 0.4em;
  border-radius: 0.4em;
  
  color: var(--blue100);
  border: 1px solid ${({ $isActive }) => ($isActive ? 'var(--blue100)' : 'none')};
  /* background-color: ${({ $isActive }) => ($isActive ? 'var(--background-riddle)' : 'none')}; */
  :hover {
    cursor: pointer;
  }
`;
