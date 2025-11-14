import PageTitle from '../../Common/Layout/PageTitle/PageTitle';

const Notices = () => {
    return(
        <>
            <PageTitle 
                title="공지사항" 
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '공지사항', current: true }
                ]} 
            />
        </>
    )
}

export default Notices;