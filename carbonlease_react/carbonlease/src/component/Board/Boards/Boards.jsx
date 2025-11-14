import PageTitle from '../../Common/Layout/PageTitle/PageTitle';


const Boards = () => {
    return(
        <>
            <PageTitle 
                title="일반 게시판" 
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '일반 게시판', current: true }
                ]} 
            />
        </>
    )
}

export default Boards;