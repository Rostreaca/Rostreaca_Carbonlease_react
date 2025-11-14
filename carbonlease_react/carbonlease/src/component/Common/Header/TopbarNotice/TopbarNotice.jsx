
import { Topbar } from "../Header.styled";

const TopbarNotice = () => {

    return(
        <>
            <Topbar className="topbar d-flex align-items-center dark-background">
                <div className="container d-flex justify-content-center justify-content-md-between">
                    <div className="contact-info d-flex align-items-center">
                        <i className="bi bi-megaphone d-flex align-items-center">
                            {/* 스타일 작업 */}
                            <a href="#notices">공지사항영역</a>
                        </i>
                    </div>
                </div>
            </Topbar>
        </>
    )

}

export default TopbarNotice;