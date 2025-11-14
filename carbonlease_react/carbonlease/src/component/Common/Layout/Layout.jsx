import LayoutWrap from "./Layout.styled";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
    return (
        <LayoutWrap>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </LayoutWrap>
    );
};

export default Layout;
