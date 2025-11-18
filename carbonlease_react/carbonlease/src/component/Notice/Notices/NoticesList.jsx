import DataTable from '../../Common/DataTable/DataTable';
import Pagination from '../../Common/Pagination/Pagination';

import { useState, useEffect } from 'react';
import axios from 'axios';
import PaginationTest from '../../Common/Pagination/PaginationTest';

function NoticesList() {

    const [currentPage, setCurrentPage] = useState(1);
    const [notice, setNotice] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        startPage:"",
        endPage:"",
        totalPage:""
    });

    useEffect (()=>{

        getNoticeList(currentPage);
        getPageInfo();

    }, [currentPage])

    const getNoticeList = (page) =>{
        axios
            .get(`http://localhost/notices?pageNo=${currentPage}`)
            .then((result) => {
                //console.log(result) //data Array OK
                const response = result.data
                //console.log(response);
                setNotice([...response]);
            })
    }

    const getPageInfo = (() =>{
        axios
            .get(`http://localhost/notices/count?pageNo=${currentPage}`)
            .then((result) => {
                const response = result.data
                setPageInfo({
                    startPage: response.startPage,
                    endPage: response.endPage,
                    totalPage: response.maxPage
                })
                console.log(pageInfo);
            })
    })

    const columns = [
        {
            header: '순번',
            field: 'noticeNo'
        },
        {
            header: '제목',
            field: 'noticeTitle',
            render: (value) => <strong>{value}</strong>

        },
        {   
            header: '등록일자',
            field: 'createDate',
            render: (value) => <strong>{value}</strong>
        },
        {
            header: '조회수',
            field: 'viewCount',
            render: (value) => <strong>{value}</strong>
        },
       
    ];

    return (
        <>
        <DataTable
            title="공지사항 목록"
            columns={columns}
            data={notice}
            icon="fas fa-leaf" 
        />

        <PaginationTest
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage}
            pageInfo={pageInfo}
        />
        </>
    )
}

export default NoticesList;
