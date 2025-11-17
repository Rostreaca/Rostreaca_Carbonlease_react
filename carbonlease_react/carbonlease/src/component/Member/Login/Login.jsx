import { useContext, useEffect, useState } from 'react';
import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import PageContent from '../../Common/PageContent/PageContent';
import { AuthContext } from '../../Context/AuthContext';
import FormField from '../../Common/Form/FormField';
import SuccessButton from '../../Sample/Buttons/SuccessButton';
import { Button } from 'react-bootstrap';
import OutlineWarningButton from '../../Sample/Outlinebuttons/OutlineWarningButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '../../Common/Alert/Alert';


const Login = () => {

    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState('info');
    const [memberId, setMemberId] = useState("");
    const [memberPwd, setMemberPwd] = useState("");
    const [msg, setMsg] = useState("");
    const { login } = useContext(AuthContext);
    const navi = useNavigate();


    const handleLogin= (e) => {
        e.preventDefault();
        //const regexp = 

        axios.post("http://localhost/auth/login",{
            memberId, memberPwd
        }).then(result => {
            //console.log(result);
            const {memberId, nickName, accessToken, refreshToken, role} = result.data;
            login(memberId, nickName, accessToken, refreshToken, role);  
            setShowAlert(true);        

            navi('/');

        }).catch(error => {
            console.error(error);
        }
        )
    }

    return(
        <>
            <PageTitle 
                title="로그인" 
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '로그인', current: true }
                ]} 
            />
            <PageContent>
                <form onSubmit={handleLogin}>
                    <FormField
                        label="아이디"
                        type="text"
                        name="id"
                        placeholder="아이디를 입력하세요"
                        onChange={(e) => setMemberId(e.target.value)}
                        required
                    />
                    <FormField
                        label="비밀번호"
                        type="text"
                        name="password"
                        placeholder="비밀번호를 입력하세요"
                        onChange={(e) => setMemberPwd(e.target.value)}
                        required
                    />
                    <Button variant='success' type='submit'>로그인</Button>
                    <Button variant='dark' type='button'>회원가입</Button>
                </form>

            </PageContent>
            <Alert
                show={showAlert}
                onClose={() => setShowAlert(false)}
                title= '로그인'
                message= '로그인에 성공하였습니다.'
                variant={alertVariant}
            />
        </>
    )
}

export default Login;