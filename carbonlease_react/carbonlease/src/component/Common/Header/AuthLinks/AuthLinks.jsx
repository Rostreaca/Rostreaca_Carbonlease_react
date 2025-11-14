import { Topbar } from "../Header.styled";
import { NavLink } from 'react-router-dom';

const AuthLinks = () => {
    return (
        <>
            <NavLink
            to="/login" 
            style={{padding: 0, flex: 'none', width: 'auto'}}
            >
                로그인
            </NavLink>
            <span style={{margin: '0 8px', color: 'var(--nav-dropdown-color)'}}>|</span>
            <NavLink 
            to="/member/enrollForm" 
            style={{padding: 0, flex: 'none', width: 'auto'}}
            >회원가입</NavLink>

        </>
    );

}

export default AuthLinks;