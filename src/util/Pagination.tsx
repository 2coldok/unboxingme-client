import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdChevronLeft } from "react-icons/md"; // 이전
import { MdChevronRight } from "react-icons/md"; // 다음

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  maxVisibleTotalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * currentPage: 현재 페이지 상태. 서버에 페이지 번호를 전달하기 위해 부모 컴포넌트에서 현재 페이지 상태를 관리한다.
 * totalItems: 모든 페이지에 대한 아이템의 총 개수
 * itemsPerPage: 한 페이지에 보여지길 원하는 아이템 개수
 * maxVisibleTotalPages: 페이지네이션에 보여지길 원하는 페이지 번호 총 개수
 * onPageChange: currentPage의 상태를 변경하는 state함수
 */

export function Pagination({ currentPage, totalItems, itemsPerPage, maxVisibleTotalPages, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [visiblePages, setVisiblePages] = useState<number[]>([]);

  useEffect(() => {
    const pageFloor: number = Math.ceil(parseFloat((currentPage / maxVisibleTotalPages).toFixed(1)));
    const maxPageInFloor = maxVisibleTotalPages * pageFloor;
    const startShowPage: number = maxPageInFloor - (maxVisibleTotalPages - 1);
    const endShowPage: number = (maxPageInFloor <= totalPages) ? maxPageInFloor : totalPages;
    
    const visiblePageArray = [];
    for (let i = startShowPage; i <= endShowPage; i++) {
      visiblePageArray.push(i);
    }

    setVisiblePages(visiblePageArray);
  }, [currentPage, maxVisibleTotalPages ,totalPages]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      window.scrollTo(0, 0);
    }
    
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePageButton = (page: number) => {
    onPageChange(page);
    window.scrollTo(0, 0);
  }

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
  gap: 0.6em;
  padding-top: 1em;
  padding-bottom: 1em;
  margin-bottom: 2em;
  background-color: var(--black100);
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
  border-radius: 0.1em;
  color: var(--blue100);
  border: 1px solid ${({ $isActive }) => ($isActive ? 'var(--blue100)' : 'none')};
  :hover {
    cursor: pointer;
  }
`;
