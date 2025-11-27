import { Outlet, useLocation } from "react-router-dom";
import { LayoutWrap, MainContent, PageWrapper } from "./Layout.styled";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";

const Layout = () => {
    const location = useLocation();

    const showSidebar =
        location.pathname === "/" ||
        location.pathname.startsWith("/boards") ||
        location.pathname.startsWith("/activityBoards") ||
        location.pathname.startsWith("/campaigns");

    return (
        <LayoutWrap>
            <Header />

            <PageWrapper>
              <MainContent>
                <Outlet />
              </MainContent>

              {showSidebar && <Sidebar />}
            </PageWrapper>

            <Footer />
        </LayoutWrap>
    );
};

export default Layout;
