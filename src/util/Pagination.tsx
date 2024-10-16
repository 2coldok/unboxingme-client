import { useEffect, useState } from 'react';
import styled from 'styled-components';

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
      <Button onClick={handlePrevious} $disabled={currentPage === 1}>
        Previous
      </Button>
      {visiblePages.map((page) => (
        <PageButton
          key={page}
          $isActive={page === currentPage}
          onClick={() => handlePageButton(page)}
        >
          {page}
        </PageButton>
      ))}
      <Button onClick={handleNext} $disabled={currentPage === totalPages}>
        Next
      </Button>
    </PaginationContainer>
  );
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6em;
  margin-top: 5em;
`;

const Button = styled.button<{ $disabled: boolean }>`
  background-color: gray;
  color: white;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
`;

const PageButton = styled.button<{ $isActive: boolean }>`
  background-color: gray;
  background-color: ${({ $isActive }) => ($isActive ? '#007bff' : 'none')};
`;
