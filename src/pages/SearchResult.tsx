import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Search from "../components/Search";
import { IPandoraService } from "../service/PandoraService";
import { HttpError } from "../network/HttpClient";
import { getInSession, saveInSession } from "../util/storage";
import { useLoading } from "../hook/LoadingHook";
import { Pagination } from "../util/Pagination";
import { IPandoraSearchResults } from "../types/pandora";

import { IoPerson } from "react-icons/io5"; // writer
import { LuEye } from "react-icons/lu"; // coverViewCount
import { IoIosFingerPrint } from "react-icons/io"; // label
import { formatTimeAgo } from "../util/formatTimeAgo";
import { LoadingSpinner } from "../loading/LoadingSpinner";


interface ISearchResultProps {
  pandoraService: IPandoraService;
}

interface IPandoraSearched {
  id: string;
  label: string;
  writer: string;
  title: string;
  coverViewCount: number;
  createdAt: string;
}

export default function SearchResult({ pandoraService }: ISearchResultProps) {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const navigate = useNavigate();
  const [pandoras, setPandoras] = useState<IPandoraSearched[]>([]);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    startLoading();
    if (keyword && keyword.length > 50) {
      return navigate('/fallback/404', { state: { message: '잘못된 접근: 검색 키워드 글자수 오류' } });
    }

    if (!keyword || keyword.length === 0) {
      return navigate('/fallback/404', { state: { message: '잘못된 접근: 존재하지 않는 검색' } });
    }

    const fetchSearchResult = async () => {
      try {
        const data = await pandoraService.getPandoraSearchResult(keyword, currentPage);
        const { pandoras, total} = data.payload;
        saveInSession<IPandoraSearchResults>(`search-${keyword}-${currentPage}`, data.payload);
        setPandoras(pandoras);
        setTotalItems(total);
      } catch (error) {
        if (error instanceof HttpError) {
          navigate('/fallback/error', { state: { error: error, type: error.payload } });
        }
      } finally {
        stopLoading();
      }
    }

    const cachedCurrentPage = getInSession<number>('search-currentPage');
    if (cachedCurrentPage) {
      setCurrentPage(cachedCurrentPage);
    } else {
      saveInSession<number>('search-currentPage', 1);
    }
  
    const cachedSearchResults = getInSession<IPandoraSearchResults>(`search-${keyword}-${currentPage}`);
    if (cachedSearchResults) {
      setPandoras(cachedSearchResults.pandoras);
      setTotalItems(cachedSearchResults.total);
      stopLoading()
    } else {
      fetchSearchResult();
    }
  }, [keyword, navigate, pandoraService, startLoading, stopLoading, currentPage]);

  const handleClick = (id: string) => {
    return navigate(`/pandora/${id}`);
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    saveInSession<number>('search-currentPage', page);
  };

  return (
    <StyledContainer>
      <SearchWrapper>
        <Search keyword={keyword as string} onChangeCurrentPage={() => setCurrentPage(1)} />
      </SearchWrapper>
     
      {isLoading ? (
        <LoadingSpinner />
      ) : ( 
      <>
        {totalItems > 0 ? (
          <>
            <ul>
              {pandoras.map((pandora) => (
                <SearchList key={pandora.id}>
                  <h1 onClick={() => handleClick(pandora.id)}>{pandora.title}</h1>
                  <p className="writer"> <IoPerson /> {pandora.writer}</p>                  
                  <span className="viewcount"> <LuEye /> {pandora.coverViewCount}</span>
                  <span className="created"> · {formatTimeAgo(pandora.createdAt)}</span>
                  <p className="label"><IoIosFingerPrint /> {pandora.label}</p>
                  <p className="br"></p>                
                </SearchList>
              ))}
            </ul>
            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={10}
              maxVisibleTotalPages={5}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <h1>검색 결과를 찾을 수 없습니다.</h1>
        )}
      </>
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  width: 100%;
  padding-left: 0.8em;
  padding-right: 0.8em;
`;

const SearchWrapper = styled.div`
  display: flex;
  width: 70%;
  margin-top: 1.5em;
  @media (max-width: 900px) {
    width: 100%;
  }
`;

const SearchList = styled.li`

  h1 {
    color: #3b90f9;
    margin: 0 0 0.3em 0;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
  
  .writer {
    color: #cbcbcb;
    font-weight: bold;
    margin: 0 0 0.2em 0;
  }

  .viewcount {
    color: #686868;
  }

  .created {
    color: #686868;
  }

  .br {
    width: 100%;
    height: 0.5px;
    background-color: #606060;
  }

  .label {
    margin: 0.1em 0 0 0;
    font-size: 0.8em;
    color: #646464;
  }
`
