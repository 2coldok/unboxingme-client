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
import { formatTimeAgo } from "../util/formatTimeAgo";
import { GoDotFill } from "react-icons/go";
import { AiFillLock } from "react-icons/ai"; // lock 자물쇠 - 총 질문 개수
import { BiSolidLabel } from "react-icons/bi"; // 라벨
import { SEARCH_KEYWORD } from "../constant/constraints";
import PandoraListSkeleton from "../loading/PandoraListSkeleton";


interface ISearchResultProps {
  pandoraService: IPandoraService;
}

interface IPandoraSearched {
  id: string;
  label: string;
  writer: string;
  title: string;
  totalProblems: number;
  coverViewCount: number;
  createdAt: string;
}

export default function SearchResult({ pandoraService }: ISearchResultProps) {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const navigate = useNavigate();
  const [pandoras, setPandoras] = useState<IPandoraSearched[] | null>(null);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    startLoading();
    if (keyword && keyword.length > SEARCH_KEYWORD.maxLength) {
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
      stopLoading();
    } else {
      fetchSearchResult();
    }
  }, [keyword, navigate, pandoraService, startLoading, stopLoading, currentPage]);

  const handleClick = (id: string) => {
    return navigate(`/pandora/${id}?keyword=${keyword}`);
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    saveInSession<number>('search-currentPage', page);
  };

  /*********************************************************************************/

  if (isLoading) {
    return (
      <>
        <SearchWrapper>
          <Search keyword={keyword as string} resetPage={() => setCurrentPage(1)} />
        </SearchWrapper>
        <PandoraListSkeleton />
      </>
    )
  }

  // 500ms 동안은(fetch가 빠를경우 로딩 안보여줌) isLoading이 false 임으로 이 시간동한만 null을 반환
  if (!pandoras) {
    return null;
  }

  return (
    <>
      <SearchWrapper>
        <Search keyword={keyword as string} resetPage={() => setCurrentPage(1)} />
      </SearchWrapper>
      {totalItems > 0 ? (
        <SearchUl>
          {pandoras.map((pandora) => (
            <SearchList key={pandora.id}>
              <h2 className="title" onClick={() => handleClick(pandora.id)}>{pandora.title}</h2>
              <InfoWrapper>
                <div className="left-contents">
                  <p className="writer"> <IoPerson /> {pandora.writer}</p>                  
                  <p className="view-createdat"> 
                    <AiFillLock /> {pandora.totalProblems} ·&nbsp;
                    <LuEye /> {pandora.coverViewCount} ·&nbsp;
                    {formatTimeAgo(pandora.createdAt)}
                  </p>
                  <p className="label"><BiSolidLabel /> {pandora.label}</p>
                </div>
                <div className="right-contents">
                  <p className="state"><GoDotFill /> 미열람</p>
                </div>
              </InfoWrapper>
            </SearchList>
          ))}
        </SearchUl>
      ) : (
        <NoContent>
          <h1>검색 결과가 없습니다.</h1>
          <p>* 게시글 작성자가 설정한 키워드를 통해서만 검색할 수 있습니다.</p>
          <p>* 게시글의 제목, 작성자 및 내용은 검색 결과에서 제외됩니다.</p>
          <p>* 모든 질문이 해결되어 게시물이 열람되었을 경우 검색 결과에서 제외됩니다.</p>
          <p>* 대소문자 및 띄어쓰기 구분합니다.</p>
        </NoContent>
       

      )}
      {totalItems > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={10}
          maxVisibleTotalPages={5}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const SearchUl = styled.ul`
  margin: 0;
`

const SearchList = styled.li`
  background-color: var(--black100);
  border-bottom: 1px solid var(--gray200);
  padding: 1em 1.5em 1em 1em;

  .title {
    color: var(--blue100);
    cursor: pointer;
    margin: 0;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-itmes: center;

  .writer {
    display: flex;
    color: var(--white200);
    font-weight: bold;
    font-size: 1.1em;
    margin: 0.9em 0 0.2em 0;
    & > svg {
      margin-right: 0.3em;
    }
  }

  .view-createdat {
    display: flex;
    color: var(--gray100);
    margin: 0.3em 0 0.2em 0;
    & > svg {
      margin-right: 0.3em;
    }
  }

  .label {
    display: flex;
    margin: 0.6em 0 0 0;
    font-size: 0.8em;
    color: var(--gray100);
    & > svg {
      margin-right: 0.3em;
    }
  }

  .state {
    display: flex;
    color: var(--gray100);  
    & > svg {
      margin-right: 0.3em;
      color: var(--red500);
    }
  }
`;

const NoContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--black100);
`;