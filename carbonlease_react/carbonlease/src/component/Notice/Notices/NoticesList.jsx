import DataTable from '../../Common/DataTable/DataTable';
import Pagination from '../../Common/Pagination/Pagination';


// TODO: field 명 수정해줄것
function NoticesList() {

    const [currentPage, setCurrentPage] = '1';
    const [totalPages, setTotalPages] = '1';
    const [pageNumbers, setPageNumbers] = [1, 2, 3, 4, 5];
    
    const columns = [
        {
            header: '순번',
            field: 'campaignNo'
        },
        {
            header: '제목',
            field: 'campaignTitle',
            render: (value) => <strong>{value}</strong>

        },
        {
            header: '등록일자',
            field: 'categoryNo',
            render: (value) => <strong>{value}</strong>
        },
        {
            header: '조회수',
            field: 'status',
            render: (value) => <strong>{value}</strong>
        },
       
    ];
    
    const data = [
        { 
            campaignNo: 1, 
            campaignTitle: '친환경 캠페인',
            categoryNo: '환경',
            status: '진행중' 
        },
        { 
            campaignNo: 2, 
            campaignTitle: '탄소중립 실천',
            categoryNo: '기술',
            status: '종료' 
        }
    ];

    return (
        <>
        <DataTable
            title="캠페인 목록"
            columns={columns}
            data={data}
            icon="fas fa-leaf" />
            
            <Pagination>
                currentPage={currentPage}
                totalPages={totalPages}
                pageNumbers={pageNumbers}
            </Pagination>
        </>
    )
}

export default NoticesList;
