import PageTitle from '../../Common/Layout/PageTitle/PageTitle';

const Campaigns = () => {
    return(
        <>
            <PageTitle 
                title="캠페인" 
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '캠페인', current: true }
                ]} 
            />
        </>
    )
}

export default Campaigns;   