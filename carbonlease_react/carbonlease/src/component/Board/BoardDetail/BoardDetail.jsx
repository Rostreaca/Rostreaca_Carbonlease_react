import PageTitle from '../../Common/Layout/PageTitle/PageTitle';

const BoardDetail = () => {
    return(
        <>
            <PageTitle 
                title="상세보기" 
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '일반 게시판', path: '/boards' },
                    { label: '상세보기', current: true }
                ]} 
            />
        </>
    )
}

export default BoardDetail;