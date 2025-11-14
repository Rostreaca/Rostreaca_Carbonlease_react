import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import PageContent from '../../Common/PageContent/PageContent';

const EnrollForm = () => {
    return(
        <>
            <PageTitle 
                title="회원가입" 
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '회원가입', current: true }
                ]} 
            />
            <PageContent>
                컨텐츠가 들어가는 영역
            </PageContent>
        </>
    )
}

export default EnrollForm;