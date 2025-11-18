import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";
import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import PageContent from '../../Common/PageContent/PageContent';
import BoardItem from './components/BoardItem';
import OutlineWriterButton from '../../Common/UI/Button/OutlineWriterButton';
import SearchFilterDropdowns from './components/SearchFilterDropdowns';
import SearchBox from './components/SearchBox';
import Pagination from '../../Common/Pagination/Pagination';

const ActivityBoards = () => {

    const navigate = useNavigate();
    const [ boards, setBoards ] = useState([]);
    const [ page, setPage] = useState(0);
    const [ totalPages, setTotalPages] = useState(1);
    const [ pageInfo, setPageInfo ] = useState({ startPage: 1, endPage: 1, maxPage: 1 });

    const [ filter, setFilter ] = useState('title'); 
    const [ keyword, setKeyword ] = useState('');

    const token = localStorage.getItem("accessToken");

    const fetchBoards = async () => {
        try {
            const res = await axios.get(
                `http://localhost:80/activityBoards?page=${page}&filter=${filter}&keyword=${keyword}`,
                { headers: { Authorization: token ? `Bearer ${token}` : undefined } }
            );
            setBoards(res.data.list);
            setPageInfo(res.data.pageInfo);
            setTotalPages(res.data.pageInfo.maxPage);
        } catch (err) {
            console.error("게시글 조회 실패:", err);
        }
    };

    useEffect(() => {
        fetchBoards();
    }, [page, filter, keyword]);

    const goWritePage = () => navigate("/activityBoards/insertForm");
    const handleSelectFilter = (value) => setFilter(value);
    const handleSearch = (value) => {
        setPage(0);
        setKeyword(value);
    }

    return (
        <>
            <PageTitle 
                title="인증 게시판" 
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '인증 게시판', current: true }
                ]} 
            />
            <PageContent>

                <div style={{ width:"1200px", margin:"0 auto", padding:"40px 0" }}>
                    {boards.length > 0 ? (
                        boards.map((item, idx) => (
                            <BoardItem 
                                key={idx} 
                                item={item}
                                onClick={() => navigate(`/activityBoards/${item.activityNo}`)}
                            />
                        ))
                    ) : (
                        <div style={{ textAlign:"center", color:"#777", padding:"40px 0" }}>
                            게시글이 없습니다.
                        </div>
                    )}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                    <OutlineWriterButton onClick={goWritePage}>
                        글쓰기
                    </OutlineWriterButton>
                    <div style={{ display:"flex", gap:"10px" }}>
                        <SearchFilterDropdowns onSelectFilter={handleSelectFilter} />
                        <SearchBox filter={filter} onSearch={handleSearch} />
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "center", marginTop:"20px" }}>
                    <Pagination
                        currentPage={pageInfo.currentPage}
                        totalPages={pageInfo.maxPage}
                        pageNumbers={Array.from(
                            { length: pageInfo.endPage - pageInfo.startPage + 1 },
                            (_, i) => pageInfo.startPage + i
                        )}
                        onFirstPage={() => setPage(0)}
                        onPrevPage={() => setPage(prev => Math.max(prev - 1, 0))}
                        onPageClick={(num) => setPage(num - 1)}
                        onNextPage={() => setPage(prev => Math.min(prev + 1, totalPages - 1))}
                        onLastPage={() => setPage(totalPages - 1)}
                    />

                </div>

            </PageContent>
        </>
    );
}

export default ActivityBoards;
