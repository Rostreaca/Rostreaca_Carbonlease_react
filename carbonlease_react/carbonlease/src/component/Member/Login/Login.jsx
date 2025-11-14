import PageTitle from '../../Common/Layout/PageTitle/PageTitle';

const Login = () => {
    return(
        <>
            <PageTitle 
                title="로그인" 
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '로그인', current: true }
                ]} 
            />
           
        </>
    )
}

export default Login;