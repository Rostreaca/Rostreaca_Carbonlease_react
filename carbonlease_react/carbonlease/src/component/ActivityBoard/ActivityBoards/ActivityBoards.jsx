import PageTitle from '../../Common/Layout/PageTitle/PageTitle';

const ActivityBoards = () => {
    return(
        <>
            <PageTitle 
                title="인증 게시판" 
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '인증 게시판', current: true }
                ]} 
            />
            
        </>
    )
}

export default ActivityBoards;