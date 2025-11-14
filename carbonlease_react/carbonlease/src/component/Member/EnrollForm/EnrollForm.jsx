import PageTitle from '../../Common/Layout/PageTitle/PageTitle';

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
           
        </>
    )
}

export default EnrollForm;